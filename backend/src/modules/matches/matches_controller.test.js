import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  deleteMatch,
  desactivateMatchWithReq,
  findAllMatches,
  findMatchesByUserId,
  findMessagesByMatchId,
} from './matches_queries.js';
import {
  desactivateMatch,
  getAllMatches,
  getMatchMessages,
  getMatchesByUser,
  getMyMatches,
  removeMatch,
} from './matches_controller.js';

vi.mock('./matches_queries.js', () => ({
  findMatchesByUserId: vi.fn(),
  findAllMatches: vi.fn(),
  deleteMatch: vi.fn(),
  findMessagesByMatchId: vi.fn(),
  desactivateMatchWithReq: vi.fn(),
}));

function createReply() {
  return {
    code: vi.fn(function code(statusCode) {
      this.statusCode = statusCode;
      return this;
    }),
    send: vi.fn(function send(body) {
      this.body = body;
      return this;
    }),
  };
}

describe('matches controllers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retourne les matchs d’un utilisateur', async () => {
    const matches = [{ id: 1 }];
    findMatchesByUserId.mockResolvedValue(matches);

    await expect(
      getMatchesByUser({ params: { userId: '7' } }, createReply()),
    ).resolves.toEqual(matches);
  });

  it('retourne les matchs de l’utilisateur connecté', async () => {
    const matches = [{ id: 2 }];
    findMatchesByUserId.mockResolvedValue(matches);

    await expect(
      getMyMatches({ userId: 7 }, createReply()),
    ).resolves.toEqual(matches);
    expect(findMatchesByUserId).toHaveBeenCalledWith(7);
  });

  it('retourne tous les matchs', async () => {
    const matches = [{ id: 3 }];
    findAllMatches.mockResolvedValue(matches);

    await expect(getAllMatches({}, createReply())).resolves.toEqual(matches);
  });

  it('retourne les messages d’un match', async () => {
    const messages = [{ id: 4, content: 'hello' }];
    findMessagesByMatchId.mockResolvedValue(messages);

    await expect(
      getMatchMessages({ params: { match_id: '9' } }, createReply()),
    ).resolves.toEqual(messages);
  });

  it('retourne 404 quand la suppression du match échoue avec P2025', async () => {
    deleteMatch.mockRejectedValue({ code: 'P2025' });
    const reply = createReply();

    await removeMatch({ params: { id: '9' } }, reply);

    expect(reply.statusCode).toBe(404);
    expect(reply.body).toEqual({ error: 'Match not found' });
  });

  it('retourne 500 en cas d’erreur inattendue lors de la suppression', async () => {
    deleteMatch.mockRejectedValue(new Error('database unavailable'));
    const reply = createReply();

    await removeMatch({ params: { id: '9' } }, reply);

    expect(reply.statusCode).toBe(500);
    expect(reply.body).toEqual({ error: 'database unavailable' });
  });

  it('retourne 404 quand la désactivation échoue avec P2025', async () => {
    desactivateMatchWithReq.mockRejectedValue({ code: 'P2025' });
    const reply = createReply();

    await desactivateMatch({ params: { id: '9' }, userId: 7 }, reply);

    expect(reply.statusCode).toBe(404);
    expect(reply.body).toEqual({ error: 'Match not found' });
  });
});
