import { beforeEach, describe, expect, it, vi } from 'vitest';
import { sendRequestSwipes } from './swipes';

vi.mock('./authFetch', () => ({ authFetch: vi.fn() }));

import { authFetch } from './authFetch';

describe('swipes API', () => {
  beforeEach(() => vi.clearAllMocks());

  it('envoie la direction et la cible', async () => {
    authFetch.mockResolvedValue(new Response(JSON.stringify({
      matched: false,
    }), { status: 200 }));

    await expect(sendRequestSwipes('right', 12)).resolves.toEqual({
      matched: false,
    });
    expect(authFetch).toHaveBeenCalledWith('/api/swipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ direction: 'right', target_id: 12 }),
    });
  });

  it('transforme une erreur HTTP en erreur métier', async () => {
    authFetch.mockResolvedValue(new Response(JSON.stringify({
      error: 'CONFLICT',
    }), { status: 409 }));

    await expect(sendRequestSwipes('right', 12)).rejects.toThrow('CONFLICT');
  });
});
