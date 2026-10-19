import { describe, expect, it } from 'vitest';
import { checkUserAcces, checkUserAccesAdmin } from '../src/plugins/checkUserAcces.js';

describe('checkUserAcces', () => {
  it('autorise un utilisateur à modifier ses propres données', async () => {
    const request = {
      userId: 7,
      role: 'user',
      params: { id: '7' },
    };

    await expect(checkUserAcces(request, {})).resolves.toBeUndefined();
    expect(request.userId).toBe(7);
  });

  it('refuse à un utilisateur de modifier les données d’un autre utilisateur', async () => {
    const request = {
      userId: 7,
      role: 'user',
      params: { id: '8' },
    };

    await expect(checkUserAcces(request, {})).rejects.toMatchObject({
      statusCode: 403,
      code: 'FORBIDDEN',
      message: 'Forbidden',
    });
  });

  it('autorise un administrateur à modifier les données de tout utilisateur', async () => {
    const request = {
      userId: 7,
      role: 'admin',
      params: { id: '8' },
    };

    await expect(checkUserAcces(request, {})).resolves.toBeUndefined();
  });
});

describe('checkUserAccesAdmin', () => {
  it('autorise uniquement le rôle admin', async () => {
    const request = { role: 'admin' };

    await expect(
      checkUserAccesAdmin(request, {}),
    ).resolves.toBeUndefined();
    expect(request.role).toBe('admin');
  });

  it('refuse un utilisateur standard', async () => {
    const request = { role: 'user' };

    await expect(
      checkUserAccesAdmin(request, {}),
    ).rejects.toMatchObject({
      statusCode: 403,
      code: 'FORBIDDEN',
      message: 'Forbidden',
    });
  });
});
