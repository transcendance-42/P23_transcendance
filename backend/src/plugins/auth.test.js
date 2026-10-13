import { beforeEach, describe, expect, it } from 'vitest';
import jwt from 'jsonwebtoken';
import { jwt_auth } from './auth.js';

const secret = 'test-secret';

function createReply() {
  return {
    code: (statusCode) => ({
      send: (body) => ({ statusCode, body }),
    }),
  };
}

describe('jwt_auth', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = secret;
  });

  it('refuse une requête sans authorization', async () => {
    const result = await jwt_auth({ headers: {} }, createReply());

    expect(result).toEqual({
      statusCode: 401,
      body: { error: 'NO_TOKEN' },
    });
  });

  it('refuse un token vide', async () => {
    const request = {
      headers: { authorization: 'Bearer ' },
    };

    const result = await jwt_auth(request, createReply());

    expect(result).toEqual({
      statusCode: 401,
      body: { error: 'NO_TOKEN' },
    });
  });

  it('refuse un token invalide', async () => {
    const request = {
      headers: { authorization: 'Bearer invalid-token' },
    };

    const result = await jwt_auth(request, createReply());

    expect(result).toEqual({
      statusCode: 401,
      body: { error: 'INVALID_TOKEN' },
    });
  });

  it('signale un token expiré', async () => {
    const token = jwt.sign({ id: 42, role: 'user' }, secret, {
      expiresIn: -1,
    });
    const request = {
      headers: { authorization: `Bearer ${token}` },
    };

    const result = await jwt_auth(request, createReply());

    expect(result).toEqual({
      statusCode: 401,
      body: { error: 'TOKEN_EXPIRED' },
    });
  });

  it('décode un token valide et renseigne la requête', async () => {
    const token = jwt.sign({ id: 42, role: 'user' }, secret);
    const request = {
      headers: { authorization: `Bearer ${token}` },
    };

    const result = await jwt_auth(request, createReply());

    expect(result).toBeUndefined();
    expect(request.userId).toBe(42);
    expect(request.role).toBe('user');
  });
});
