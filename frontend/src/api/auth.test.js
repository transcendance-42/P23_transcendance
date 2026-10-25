import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiLogin, apiLogout, apiRefresh } from './auth';

describe('auth API', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('retourne le token après un login réussi', async () => {
    fetch.mockResolvedValue(new Response(JSON.stringify({
      success: true,
      access_token: 'access',
      userId: 42,
    }), { status: 200 }));

    await expect(apiLogin('user@example.com', 'password123')).resolves.toEqual({
      token: 'access',
      userId: 42,
    });
  });

  it('retourne le message backend pour un login refusé', async () => {
    fetch.mockResolvedValue(new Response(JSON.stringify({
      error: 'Invalid credentials',
    }), { status: 401 }));

    await expect(apiLogin('user@example.com', 'wrongpass'))
      .rejects.toThrow('Invalid credentials');
  });

  it('envoie les cookies lors du refresh', async () => {
    fetch.mockResolvedValue(new Response(JSON.stringify({
      success: true,
      acces_token: 'refreshed',
      userId: 42,
    }), { status: 200 }));

    await expect(apiRefresh()).resolves.toEqual({
      token: 'refreshed',
      userId: 42,
    });
    expect(fetch).toHaveBeenCalledWith('/api/token/refresh', {
      method: 'POST',
      credentials: 'include',
    });
  });

  it('transforme une réponse 429 en erreur avec retryAfter', async () => {
    fetch.mockResolvedValue(new Response('{}', {
      status: 429,
      headers: { 'Retry-After': '7' },
    }));

    await expect(apiRefresh()).rejects.toMatchObject({
      status: 429,
      retryAfter: 7,
    });
  });

  it('retourne une erreur si le logout échoue', async () => {
    fetch.mockResolvedValue(new Response(JSON.stringify({
      error: 'Invalid token',
    }), { status: 401 }));

    await expect(apiLogout()).rejects.toThrow('Invalid token');
  });
});
