import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findUser, creatUser } from './auth_queries.js';
import { login, register } from './auth_controller.js';

vi.mock('./auth_queries.js', () => ({
  findUser: vi.fn(),
  creatUser: vi.fn(),
}));

vi.mock('../tokens/tokens_queries.js', () => ({
  saveRefreshToken: vi.fn().mockResolvedValue(undefined),
  findRefreshToken: vi.fn(),
  revokeToken: vi.fn(),
}));

function createReply() {
  return {
    code: vi.fn(function code(statusCode) {
      this.statusCode = statusCode;
      return this;
    }),
    send: vi.fn(function send(body) {
      this.body = body;
      return this;
    }),
    setCookie: vi.fn(function setCookie() {
      return this;
    }),
  };
}

describe('login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('retourne 401 si l’utilisateur est inconnu', async () => {
    findUser.mockResolvedValue(null);
    const reply = createReply();

    await login(
      { body: { email: 'missing@example.com', password: 'password123' } },
      reply,
    );

    expect(reply.statusCode).toBe(401);
    expect(reply.body).toEqual({ error: 'Invalid credentials' });
  });

  it('retourne 401 si le mot de passe est incorrect', async () => {
    findUser.mockResolvedValue({
      id: 1,
      email: 'user@example.com',
      role: 'user',
      password_hash: '$2b$10$7EqJtq98hPqEX7fNZaFWoO6zN7z5h7u5u3lP6hY9z4dJtR3M9mJfK',
    });
    const reply = createReply();

    await login(
      { body: { email: 'user@example.com', password: 'wrongpass' } },
      reply,
    );

    expect(reply.statusCode).toBe(401);
    expect(reply.body).toEqual({ error: 'Invalid credentials' });
  });
});

describe('register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validBody = {
    first_name: 'Alice',
    last_name: 'Martin',
    email: 'alice@example.com',
    password: 'password123',
    city: 'Paris',
    date_of_birth: '2000-01-01',
    longitude: 2.35,
    latitude: 48.85,
  };

  it('retourne 409 si l’adresse existe déjà', async () => {
    findUser.mockResolvedValue({ id: 1 });
    const reply = createReply();

    await register({ body: validBody }, reply);

    expect(reply.statusCode).toBe(409);
    expect(reply.body).toEqual({ error: 'Email already exists' });
    expect(creatUser).not.toHaveBeenCalled();
  });

  it('retourne 401 si l’utilisateur est trop jeune', async () => {
    findUser.mockResolvedValue(null);
    const reply = createReply();

    await register(
      { body: { ...validBody, date_of_birth: '2015-01-01' } },
      reply,
    );

    expect(reply.statusCode).toBe(401);
    expect(reply.body).toEqual({ error: 'TOO_YOUNG' });
  });

  it('retourne 400 si la position est invalide', async () => {
    findUser.mockResolvedValue(null);
    const reply = createReply();

    await register(
      { body: { ...validBody, longitude: 181 } },
      reply,
    );

    expect(reply.statusCode).toBe(400);
    expect(reply.body).toEqual({ error: 'Invalid position' });
  });

  it('retourne 201 après une inscription réussie', async () => {
    findUser.mockResolvedValue(null);
    creatUser.mockResolvedValue({ id: 42 });
    const reply = createReply();

    await register({ body: validBody }, reply);

    expect(reply.statusCode).toBe(201);
    expect(reply.body).toEqual({ success: true, userId: 42 });
    expect(creatUser).toHaveBeenCalledOnce();
  });
});
