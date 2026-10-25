import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findMessageById } from '../src/modules/messages/messages_queries.js';
import { checkMessageDeleteAcces } from '../src/plugins/checkChatAcces.js';

vi.mock('../src/modules/messages/messages_queries.js', () => ({
  findMessageById: vi.fn(),
}));

describe('checkMessageDeleteAcces', () => {
  beforeEach(() => vi.clearAllMocks());

  it('autorise un admin sans chercher le message', async () => {
    await expect(checkMessageDeleteAcces({
      role: 'admin',
      userId: 1,
      params: { id: '3' },
    }, {})).resolves.toBeUndefined();
    expect(findMessageById).not.toHaveBeenCalled();
  });

  it('retourne 404 si le message est absent', async () => {
    findMessageById.mockResolvedValue(null);

    await expect(checkMessageDeleteAcces({
      role: 'user',
      userId: 1,
      params: { id: '3' },
    }, {})).rejects.toMatchObject({
      statusCode: 404,
      code: 'NOT_FOUND',
    });
  });

  it('autorise l’auteur du message', async () => {
    findMessageById.mockResolvedValue({ sender_id: 1 });

    await expect(checkMessageDeleteAcces({
      role: 'user',
      userId: 1,
      params: { id: '3' },
    }, {})).resolves.toBeUndefined();
  });

  it('refuse un autre utilisateur avec un statut HTTP valide', async () => {
    findMessageById.mockResolvedValue({ sender_id: 2 });

    await expect(checkMessageDeleteAcces({
      role: 'user',
      userId: 1,
      params: { id: '3' },
    }, {})).rejects.toMatchObject({
      statusCode: 403,
      code: 'FORBIDDEN',
    });
  });
});
