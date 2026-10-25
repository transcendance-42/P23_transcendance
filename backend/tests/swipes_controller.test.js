import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createMatch,
  creatSwipe,
  findExistingMatch,
  findReverseSwipe,
} from '../src/modules/swipes/swipes_queries.js';
import prisma from '../src/utils/prisma.js';
import { postSwipe } from '../src/modules/swipes/swipes_controller.js';

vi.mock('../src/modules/swipes/swipes_queries.js', () => ({
  creatSwipe: vi.fn(),
  findReverseSwipe: vi.fn(),
  findExistingMatch: vi.fn(),
  createMatch: vi.fn(),
}));

vi.mock('../src/utils/prisma.js', () => ({
  default: { dogs: { findFirst: vi.fn() } },
}));

describe('postSwipe', () => {
  beforeEach(() => vi.clearAllMocks());

  it('refuse un swipe si l’utilisateur n’a pas de chien', async () => {
    prisma.dogs.findFirst.mockResolvedValue(null);

    await expect(postSwipe({
      userId: 7,
      body: { target_id: 12, direction: 'right' },
    }, {})).rejects.toMatchObject({ statusCode: 404, code: 'NOT_FOUND' });
  });

  it('refuse de swiper son propre chien', async () => {
    prisma.dogs.findFirst.mockResolvedValue({ id: 12 });

    await expect(postSwipe({
      userId: 7,
      body: { target_id: 12, direction: 'right' },
    }, {})).rejects.toMatchObject({ statusCode: 409, code: 'CONFLICT' });
  });

  it('retourne matched false pour un swipe sans réciprocité', async () => {
    prisma.dogs.findFirst.mockResolvedValue({ id: 7 });
    creatSwipe.mockResolvedValue({ id: 1 });
    findReverseSwipe.mockResolvedValue(null);

    await expect(postSwipe({
      userId: 7,
      body: { target_id: 12, direction: 'right' },
    }, {})).resolves.toEqual({ matched: false });
  });

  it('crée un match après un swipe réciproque', async () => {
    const swipe = { id: 1 };
    const match = { id: 2 };
    prisma.dogs.findFirst.mockResolvedValue({ id: 7 });
    creatSwipe.mockResolvedValue(swipe);
    findReverseSwipe.mockResolvedValue({ id: 3 });
    findExistingMatch.mockResolvedValue(null);
    createMatch.mockResolvedValue(match);

    await expect(postSwipe({
      userId: 7,
      body: { target_id: 12, direction: 'right' },
    }, {})).resolves.toEqual({ swipe, match, matched: true });
  });

  it('ne crée pas un second match existant', async () => {
    prisma.dogs.findFirst.mockResolvedValue({ id: 7 });
    creatSwipe.mockResolvedValue({ id: 1 });
    findReverseSwipe.mockResolvedValue({ id: 3 });
    findExistingMatch.mockResolvedValue({ id: 2 });

    await expect(postSwipe({
      userId: 7,
      body: { target_id: 12, direction: 'right' },
    }, {})).resolves.toEqual({ matched: true });
    expect(createMatch).not.toHaveBeenCalled();
  });
});
