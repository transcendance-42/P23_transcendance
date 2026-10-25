import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  authFetch,
  getToken,
  registerLogFunction,
  setFetchToken,
} from './authFetch';

describe('authFetch', () => {
  beforeEach(() => {
    setFetchToken(null);
    registerLogFunction({ apiRefresh: null, apiLogout: null });
    vi.stubGlobal('fetch', vi.fn());
  });

  it('ajoute le token courant à la requête', async () => {
    setFetchToken('initial-token');
    fetch.mockResolvedValue(new Response('ok', { status: 200 }));

    await authFetch('/api/users');

    expect(fetch).toHaveBeenCalledWith('/api/users', {
      headers: { Authorization: 'Bearer initial-token' },
    });
  });

  it('rafraîchit puis rejoue une requête 401', async () => {
    setFetchToken('old-token');
    const refresh = vi.fn().mockResolvedValue({ token: 'new-token' });
    registerLogFunction({ apiRefresh: refresh, apiLogout: vi.fn() });
    fetch
      .mockResolvedValueOnce(new Response('', { status: 401 }))
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));

    const response = await authFetch('/api/users', { method: 'GET' });

    expect(refresh).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenNthCalledWith(2, '/api/users', {
      method: 'GET',
      headers: { Authorization: 'Bearer new-token' },
    });
    expect(response.status).toBe(200);
    expect(getToken()).toBe('new-token');
  });

  it('ne rafraîchit pas une réponse qui n’est pas 401', async () => {
    const refresh = vi.fn();
    registerLogFunction({ apiRefresh: refresh, apiLogout: vi.fn() });
    fetch.mockResolvedValue(new Response('', { status: 403 }));

    const response = await authFetch('/api/users');

    expect(response.status).toBe(403);
    expect(refresh).not.toHaveBeenCalled();
  });

  it('déconnecte et propage l’erreur si le refresh échoue', async () => {
    const error = new Error('refresh failed');
    const refresh = vi.fn().mockRejectedValue(error);
    const logout = vi.fn().mockResolvedValue(undefined);
    registerLogFunction({ apiRefresh: refresh, apiLogout: logout });
    fetch.mockResolvedValue(new Response('', { status: 401 }));

    await expect(authFetch('/api/users')).rejects.toBe(error);
    expect(logout).toHaveBeenCalledOnce();
  });
});
