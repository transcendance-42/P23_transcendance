import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findMatch } from '../src/modules/matches/matches_queries.js';
import {
  checkMatchAccessParams,
  checkMatchOfUserAccessParams,
} from '../src/plugins/checkMatchAcces.js';

vi.mock('../src/modules/matches/matches_queries.js', () => ({
  findMatch: vi.fn(),
}));

describe('match access plugins', () => {
  beforeEach(() => vi.clearAllMocks());

  it('autorise un utilisateur à consulter ses propres matchs', async () => {
    await expect(
      checkMatchOfUserAccessParams(
        { userId: 7, role: 'user', params: { id: '7' } },
        {},
      ),
    ).resolves.toBeUndefined();
  });

  it('refuse un utilisateur qui consulte les matchs d’un autre', async () => {
    await expect(
      checkMatchOfUserAccessParams(
        { userId: 7, role: 'user', params: { id: '8' } },
        {},
      ),
    ).rejects.toMatchObject({ statusCode: 403, code: 'FORBIDDEN' });
  });

  it('autorise un admin sans consulter la base', async () => {
    await expect(
      checkMatchAccessParams(
        { userId: 1, role: 'admin', params: { id: '4' } },
        {},
      ),
    ).resolves.toBeUndefined();
    expect(findMatch).not.toHaveBeenCalled();
  });

  it('attache le match à la requête si l’utilisateur en fait partie', async () => {
    findMatch.mockResolvedValue({
      is_active: true,
      matchesAsDog1: { owner_id: 7 },
      matchesAsDog2: { owner_id: 8 },
    });
    const request = {
      userId: 7,
      role: 'user',
      params: { id: '4' },
    };

    await expect(checkMatchAccessParams(request, {})).resolves.toBeUndefined();
    expect(request.matchId).toBe('4');
    expect(findMatch).toHaveBeenCalledWith('4');
  });

  it('refuse un match inexistant ou appartenant à un autre utilisateur', async () => {
    findMatch.mockResolvedValueOnce(null);
    await expect(
      checkMatchAccessParams(
        { userId: 7, role: 'user', params: { id: '4' } },
        {},
      ),
    ).rejects.toMatchObject({ statusCode: 404, code: 'NOT_FOUND' });

    findMatch.mockResolvedValueOnce({
      matchesAsDog1: { owner_id: 8 },
      matchesAsDog2: { owner_id: 9 },
    });
    await expect(
      checkMatchAccessParams(
        { userId: 7, role: 'user', params: { id: '4' } },
        {},
      ),
    ).rejects.toMatchObject({ statusCode: 403, code: 'FORBIDDEN' });
  });
});
