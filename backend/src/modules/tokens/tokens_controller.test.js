import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findUserById } from '../users/users_queries.js';
import {
  findRefreshToken,
  revokeAllUserToken,
  revokeToken,
  saveRefreshToken,
} from './tokens_queries.js';
import { GetRefreshToken } from './tokens_controller.js';

vi.mock('./tokens_queries.js', () => ({
  findRefreshToken: vi.fn(),
  saveRefreshToken: vi.fn(),
  revokeToken: vi.fn(),
  revokeAllUserToken: vi.fn(),
}));

vi.mock('../users/users_queries.js', () => ({
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

    await GetRefreshToken({ cookies: {} }, reply);

    expect(reply.statusCode).toBe(401);
    expect(reply.body).toEqual({ error: 'No refresh token' });
  });

  it('retourne 401 si le refresh token est inconnu', async () => {
    findRefreshToken.mockResolvedValue(null);
    const reply = createReply();

    await GetRefreshToken({ cookies: { refresh_token: 'unknown' } }, reply);

    expect(reply.statusCode).toBe(401);
    expect(reply.body).toEqual({ error: 'Invalid token' });
  });

  it('retourne 401 si le refresh token est révoqué', async () => {
    findRefreshToken.mockResolvedValue({
      user_id: 7,
      expires_at: new Date(Date.now() + 60_000),
      is_revoked: true,
    });
    const reply = createReply();

    await GetRefreshToken({ cookies: { refresh_token: 'revoked' } }, reply);

    expect(reply.statusCode).toBe(401);
    expect(reply.body).toEqual({ error: 'Invalid token' });
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

    await GetRefreshToken({ cookies: { refresh_token: 'valid' } }, reply);

    expect(reply.statusCode).toBe(401);
    expect(reply.body).toEqual({ error: 'User not found' });
    expect(revokeToken).toHaveBeenCalledOnce();
  });
});
