import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findUserById } from '../src/modules/users/users_queries.js';
import {
  findRefreshToken,
  revokeAllUserToken,
  revokeToken,
  saveRefreshToken,
} from '../src/modules/tokens/tokens_queries.js';
import { GetRefreshToken } from '../src/modules/tokens/tokens_controller.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

vi.mock('../src/modules/tokens/tokens_queries.js', () => ({
  findRefreshToken: vi.fn(),
  saveRefreshToken: vi.fn(),
  revokeToken: vi.fn(),
  revokeAllUserToken: vi.fn(),
}));

vi.mock('../src/modules/users/users_queries.js', () => ({
  findUserById: vi.fn(),
}));

function createReply() {
  return {
    code: vi.fn(function code(statusCode) {
      this.statusCode = statusCode;
      return this;
    }),
    setCookie: vi.fn(function setCookie() {
      return this;
    }),
    send: vi.fn(function send(body) {
      this.body = body;
      return this;
    }),
  };
}

describe('GetRefreshToken', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('retourne 401 sans refresh token', async () => {
    const reply = createReply();

    await expect(GetRefreshToken({ cookies: {} }, reply)).rejects.toMatchObject({
      statusCode: 401,
      code: 'REFRESH_TOKEN_MISSING',
      message: 'No refresh token',
    });
  });

  it('retourne 401 si le refresh token est inconnu', async () => {
    findRefreshToken.mockResolvedValue(null);
    const reply = createReply();

    await expect(
      GetRefreshToken({ cookies: { refresh_token: 'unknown' } }, reply),
    ).rejects.toMatchObject({
      statusCode: 401,
      code: 'REFRESH_TOKEN_INVALID',
      message: 'Invalid token',
    });
    expect(findRefreshToken).toHaveBeenCalledWith(
      crypto.createHash('sha256').update('unknown').digest('hex'),
    );
  });

  it('retourne 401 si le refresh token est expiré', async () => {
    findRefreshToken.mockResolvedValue({
      expires_at: new Date(Date.now() - 60_000),
      is_revoked: false,
    });

    await expect(
      GetRefreshToken({ cookies: { refresh_token: 'expired' } }, createReply()),
    ).rejects.toMatchObject({
      statusCode: 401,
      code: 'REFRESH_TOKEN_INVALID',
    });
    expect(revokeToken).not.toHaveBeenCalled();
  });

  it('retourne 401 si le refresh token est révoqué', async () => {
    findRefreshToken.mockResolvedValue({
      user_id: 7,
      expires_at: new Date(Date.now() + 60_000),
      is_revoked: true,
    });
    const reply = createReply();

    await expect(
      GetRefreshToken({ cookies: { refresh_token: 'revoked' } }, reply),
    ).rejects.toMatchObject({
      statusCode: 401,
      code: 'REFRESH_TOKEN_INVALID',
      message: 'Invalid token',
    });
    expect(revokeAllUserToken).toHaveBeenCalledWith(7);
  });

  it('retourne 401 si l’utilisateur lié au token est introuvable', async () => {
    findRefreshToken.mockResolvedValue({
      id: 1,
      user_id: 7,
      expires_at: new Date(Date.now() + 60_000),
      is_revoked: false,
    });
    findUserById.mockResolvedValue(null);
    const reply = createReply();

    await expect(
      GetRefreshToken({ cookies: { refresh_token: 'valid' } }, reply),
    ).rejects.toMatchObject({
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'User not found',
    });
    expect(revokeToken).toHaveBeenCalledOnce();
  });

  it('renouvelle la session pour un token valide et un utilisateur actif', async () => {
    findRefreshToken.mockResolvedValue({
      id: 1,
      user_id: 7,
      expires_at: new Date(Date.now() + 60_000),
      is_revoked: false,
    });
    findUserById.mockResolvedValue({
      id: 7,
      email: 'user@example.com',
      role: 'user',
      is_active: true,
    });
    const reply = createReply();

    await GetRefreshToken({ cookies: { refresh_token: 'valid' } }, reply);

    expect(revokeToken).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    expect(saveRefreshToken).toHaveBeenCalledWith(
      7,
      expect.any(String),
      expect.any(Date),
    );
    expect(reply.statusCode).toBe(200);
    expect(reply.body).toMatchObject({
      success: true,
      userId: 7,
    });
    expect(jwt.verify(reply.body.acces_token, 'test-secret')).toMatchObject({
      id: 7,
      role: 'user',
    });
    expect(reply.setCookie).toHaveBeenCalledWith(
      'refresh_token',
      expect.any(String),
      expect.objectContaining({ httpOnly: true }),
    );
  });

  it('refuse un utilisateur inactif', async () => {
    findRefreshToken.mockResolvedValue({
      id: 1,
      user_id: 7,
      expires_at: new Date(Date.now() + 60_000),
      is_revoked: false,
    });
    findUserById.mockResolvedValue({ id: 7, is_active: false });

    await expect(
      GetRefreshToken({ cookies: { refresh_token: 'valid' } }, createReply()),
    ).rejects.toMatchObject({
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'User not found',
    });
    expect(saveRefreshToken).not.toHaveBeenCalled();
  });
});
