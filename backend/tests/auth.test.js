import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import { findUserById } from '../src/modules/users/users_queries.js';
import { jwt_auth } from '../src/plugins/auth.js';

vi.mock('../src/modules/users/users_queries.js', () => ({
  findUserById: vi.fn(),
}));

const secret = 'test-secret';

describe('jwt_auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = secret;
  });

  it('refuse une requête sans authorization', async () => {
    await expect(jwt_auth({ headers: {} }, {})).rejects.toMatchObject({
      statusCode: 401,
      code: 'ACCESS_TOKEN_MISSING',
      message: 'Access token not found',
    });
  });

  it('refuse un token vide', async () => {
    const request = { headers: { authorization: 'Bearer ' } };

    await expect(jwt_auth(request, {})).rejects.toMatchObject({
      statusCode: 401,
      code: 'ACCESS_TOKEN_MISSING',
      message: 'Access token not found',
    });
  });

  it('refuse un token invalide', async () => {
    const request = { headers: { authorization: 'Bearer invalid-token' } };

    await expect(jwt_auth(request, {})).rejects.toMatchObject({
      statusCode: 401,
      code: 'INVALID_TOKEN',
      message: 'Access token is invalid',
    });
    expect(findUserById).not.toHaveBeenCalled();
  });

  it('signale un token expiré', async () => {
    const token = jwt.sign({ id: 42, role: 'user' }, secret, {
      expiresIn: -1,
    });
    const request = { headers: { authorization: `Bearer ${token}` } };

    await expect(jwt_auth(request, {})).rejects.toMatchObject({
      statusCode: 401,
      code: 'TOKEN_EXPIRED',
      message: 'Access token has expired',
    });
  });

  it('décode un token valide et renseigne la requête', async () => {
    const token = jwt.sign({ id: 42, role: 'user' }, secret);
    const request = { headers: { authorization: `Bearer ${token}` } };
    findUserById.mockResolvedValue({ id: 42, is_active: true });

    await expect(jwt_auth(request, {})).resolves.toBeUndefined();
    expect(request.userId).toBe(42);
    expect(request.role).toBe('user');
    expect(findUserById).toHaveBeenCalledWith(42, 42);
  });

  it('refuse un utilisateur inexistant', async () => {
    const token = jwt.sign({ id: 99, role: 'user' }, secret);
    const request = { headers: { authorization: `Bearer ${token}` } };
    findUserById.mockResolvedValue(null);

    await expect(jwt_auth(request, {})).rejects.toMatchObject({
      statusCode: 401,
      code: 'INVALID_TOKEN',
    });
  });

  it('refuse un utilisateur désactivé', async () => {
    const token = jwt.sign({ id: 42, role: 'user' }, secret);
    const request = { headers: { authorization: `Bearer ${token}` } };
    const reply = {
      code: vi.fn(function code(statusCode) {
        this.statusCode = statusCode;
        return this;
      }),
      send: vi.fn(function send(body) {
        this.body = body;
        return this;
      }),
    };
    findUserById.mockResolvedValue({ id: 42, is_active: false });

    await expect(jwt_auth(request, reply)).rejects.toMatchObject({
      statusCode: 401,
      code: 'INVALID_TOKEN',
      message: 'Access token is invalid',
    });
    expect(reply.code).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });
});
