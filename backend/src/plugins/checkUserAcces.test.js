import { describe, expect, it } from 'vitest';
import { checkUserAcces, checkUserAccesAdmin } from './checkUserAcces.js';

function createReply() {
  return {
    code: (statusCode) => ({
      send: (body) => ({ statusCode, body }),
    }),
  };
}

describe('checkUserAcces', () => {
  it('autorise un utilisateur à modifier ses propres données', async () => {
    const request = {
      userId: 7,
      role: 'user',
      params: { id: '7' },
    };

    await expect(checkUserAcces(request, createReply())).resolves.toBeUndefined();
  });

  it('refuse à un utilisateur de modifier les données d’un autre utilisateur', async () => {
    const request = {
      userId: 7,
      role: 'user',
      params: { id: '8' },
    };

    await expect(checkUserAcces(request, createReply())).resolves.toEqual({
      statusCode: 403,
      body: { error: 'Forbidden' },
    });
  });

  it('autorise un administrateur à modifier les données de tout utilisateur', async () => {
    const request = {
      userId: 7,
      role: 'admin',
      params: { id: '8' },
    };

    await expect(checkUserAcces(request, createReply())).resolves.toBeUndefined();
  });
});

describe('checkUserAccesAdmin', () => {
  it('autorise uniquement le rôle admin', async () => {
    const request = { role: 'admin' };

    await expect(
      checkUserAccesAdmin(request, createReply()),
    ).resolves.toBeUndefined();
  });

  it('refuse un utilisateur standard', async () => {
    const request = { role: 'user' };

    await expect(
      checkUserAccesAdmin(request, createReply()),
    ).resolves.toEqual({
      statusCode: 403,
      body: { error: 'Forbidden' },
    });
  });
});
