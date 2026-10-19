import { beforeEach, describe, expect, it, vi } from 'vitest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  creatUser,
  findUser,
  updateLastSeenAt,
} from '../src/modules/auth/auth_queries.js';
import {
  login,
  logout,
  postHearthBeat,
  register,
} from '../src/modules/auth/auth_controller.js';
import {
  findRefreshToken,
  revokeToken,
  saveRefreshToken,
} from '../src/modules/tokens/tokens_queries.js';

vi.mock('../src/modules/auth/auth_queries.js', () => ({
  findUser: vi.fn(),
  creatUser: vi.fn(),
  updateLastSeenAt: vi.fn(),
}));

vi.mock('../src/modules/tokens/tokens_queries.js', () => ({
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
    clearCookie: vi.fn(function clearCookie() {
      return this;
    }),
  };
}

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

describe('login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('refuse un utilisateur inconnu ou un mot de passe incorrect', async () => {
    findUser.mockResolvedValue(null);

    await expect(
      login(
        { body: { email: 'missing@example.com', password: 'password123' } },
        createReply(),
      ),
    ).rejects.toMatchObject({
      statusCode: 401,
      code: 'INVALID_CREDENTIALS',
    });
    expect(saveRefreshToken).not.toHaveBeenCalled();
  });

  it('refuse un utilisateur désactivé', async () => {
    findUser.mockResolvedValue({
      id: 1,
      password_hash: 'hash',
      is_active: false,
    });

    await expect(
      login(
        { body: { email: 'inactive@example.com', password: 'password123' } },
        createReply(),
      ),
    ).rejects.toMatchObject({
      statusCode: 401,
      code: 'INVALID_CREDENTIALS',
    });
    expect(saveRefreshToken).not.toHaveBeenCalled();
  });

  it('crée une session complète après une connexion valide', async () => {
    const user = {
      id: 7,
      email: 'user@example.com',
      role: 'user',
      is_active: true,
      password_hash: await bcrypt.hash('password123', 4),
      date_of_birth: '2000-01-01',
      city: 'Paris',
      first_name: 'Alice',
      last_name: 'Martin',
    };
    findUser.mockResolvedValue(user);
    const reply = createReply();

    await login(
      { body: { email: user.email, password: 'password123' } },
      reply,
    );

    expect(reply.statusCode).toBe(201);
    expect(reply.body).toMatchObject({
      success: true,
      userId: user.id,
      profileComplete: true,
    });
    expect(jwt.verify(reply.body.access_token, 'test-secret')).toMatchObject({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    expect(saveRefreshToken).toHaveBeenCalledWith(
      user.id,
      expect.any(String),
      expect.any(Date),
    );
    expect(reply.setCookie).toHaveBeenCalledWith(
      'refresh_token',
      expect.any(String),
      expect.objectContaining({ httpOnly: true, secure: true }),
    );
  });
});

describe('register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('refuse une adresse déjà utilisée', async () => {
    findUser.mockResolvedValue({ id: 1 });

    await expect(
      register({ body: validBody }, createReply()),
    ).rejects.toMatchObject({
      statusCode: 409,
      code: 'ALREADY_EXISTS',
    });
    expect(creatUser).not.toHaveBeenCalled();
  });

  it('refuse un utilisateur trop jeune ou trop âgé', async () => {
    findUser.mockResolvedValue(null);

    await expect(
      register(
        { body: { ...validBody, date_of_birth: '2015-01-01' } },
        createReply(),
      ),
    ).rejects.toMatchObject({ statusCode: 401, code: 'TOO_YOUNG' });

    await expect(
      register(
        { body: { ...validBody, date_of_birth: '1800-01-01' } },
        createReply(),
      ),
    ).rejects.toMatchObject({ statusCode: 401, code: 'TOO_OLD' });
    expect(creatUser).not.toHaveBeenCalled();
  });

  it('crée un utilisateur valide avec un mot de passe haché', async () => {
    findUser.mockResolvedValue(null);
    creatUser.mockResolvedValue({ id: 42 });
    const request = { body: validBody };
    const reply = createReply();

    await register(request, reply);

    expect(reply.statusCode).toBe(201);
    expect(reply.body).toEqual({ success: true, userId: 42 });
    expect(creatUser).toHaveBeenCalledWith(
      request,
      expect.not.stringMatching(/^password123$/),
      expect.any(Date),
    );
  });
});

describe('logout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('refuse une déconnexion sans refresh token', async () => {
    await expect(logout({ cookies: {} }, createReply())).rejects.toMatchObject({
      statusCode: 401,
      code: 'REFRESH_TOKEN_MISSING',
    });
  });

  it('révoque le refresh token et efface le cookie', async () => {
    findRefreshToken.mockResolvedValue({
      user_id: 7,
      expires_at: new Date(Date.now() + 60_000),
      is_revoked: false,
    });
    const reply = createReply();

    await logout({ cookies: { refresh_token: 'refresh-token' } }, reply);

    expect(revokeToken).toHaveBeenCalledOnce();
    expect(reply.statusCode).toBe(200);
    expect(reply.body).toEqual({ success: 'Logout' });
    expect(reply.clearCookie).toHaveBeenCalledWith(
      'refresh_token',
      expect.objectContaining({ httpOnly: true }),
    );
  });

  it('refuse un refresh token déjà révoqué', async () => {
    findRefreshToken.mockResolvedValue({
      expires_at: new Date(Date.now() + 60_000),
      is_revoked: true,
    });

    await expect(
      logout({ cookies: { refresh_token: 'revoked-token' } }, createReply()),
    ).rejects.toMatchObject({
      statusCode: 401,
      code: 'REFRESH_TOKEN_CONFLICT',
    });
    expect(revokeToken).not.toHaveBeenCalled();
  });
});

describe('postHearthBeat', () => {
  it('met à jour la présence et répond 200', async () => {
    const reply = createReply();

    await postHearthBeat({ userId: 42 }, reply);

    expect(updateLastSeenAt).toHaveBeenCalledWith(42);
    expect(reply.statusCode).toBe(200);
    expect(reply.body).toEqual({ success: true });
  });
});
