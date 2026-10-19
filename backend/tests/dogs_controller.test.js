import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  creatDogs,
  deleteDogs,
  findAllDogs,
  findAllDogsExceptMe,
  findDogsAroundMe,
  findDogsId,
  updateDogs,
} from '../src/modules/dog/dogs_queries.js';
import {
  DeleteDogs,
  GetAllDogs,
  GetAllDogsExceptMe,
  GetDogsAroundMe,
  GetDogsByID,
  PostDogs,
  PutDogs,
} from '../src/modules/dog/dogs_controller.js';

vi.mock('../src/modules/dog/dogs_queries.js', () => ({
  creatDogs: vi.fn(),
  deleteDogs: vi.fn(),
  findAllDogs: vi.fn(),
  findAllDogsExceptMe: vi.fn(),
  findDogsAroundMe: vi.fn(),
  findDogsId: vi.fn(),
  updateDogs: vi.fn(),
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

describe('dogs controllers', () => {
  beforeEach(() => vi.clearAllMocks());

  it('retourne tous les chiens', async () => {
    const dogs = [{ id: 1 }];
    findAllDogs.mockResolvedValue(dogs);

    await expect(GetAllDogs(createReply())).resolves.toBe(dogs);
    expect(findAllDogs).toHaveBeenCalledOnce();
  });

  it('filtre les chiens déjà vus et transmet le userId', async () => {
    findAllDogsExceptMe.mockResolvedValue([]);
    findDogsAroundMe.mockResolvedValue([{ id: 2 }]);

    await expect(
      GetAllDogsExceptMe({ userId: 7 }, createReply()),
    ).resolves.toEqual([]);
    await expect(
      GetDogsAroundMe({ userId: 7 }, createReply()),
    ).resolves.toEqual([{ id: 2 }]);
    expect(findAllDogsExceptMe).toHaveBeenCalledWith(7);
    expect(findDogsAroundMe).toHaveBeenCalledWith(7);
  });

  it('lève une AppError si le chien demandé est introuvable', async () => {
    findDogsId.mockResolvedValue(null);

    await expect(
      GetDogsByID({ params: { id: '9' } }, createReply()),
    ).rejects.toMatchObject({
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'Dog not found',
    });
  });

  it('retourne un chien existant', async () => {
    const dog = { id: 9, name: 'Rex' };
    findDogsId.mockResolvedValue(dog);

    await expect(
      GetDogsByID({ params: { id: '9' } }, createReply()),
    ).resolves.toBe(dog);
    expect(findDogsId).toHaveBeenCalledWith({ params: { id: '9' } });
  });

  it('crée un chien et ne renvoie que son identifiant', async () => {
    creatDogs.mockResolvedValue({ id: 12, owner_id: 7 });
    const request = { userId: 7, body: { name: 'Rex' } };

    await expect(PostDogs(request, createReply())).resolves.toEqual({ id: 12 });
    expect(creatDogs).toHaveBeenCalledWith(7, { name: 'Rex' });
  });

  it('convertit une contrainte Prisma de création en DOG_ALREADY_EXISTS', async () => {
    creatDogs.mockRejectedValue({ code: 'P2002' });

    await expect(
      PostDogs({ userId: 7, body: {} }, createReply()),
    ).rejects.toMatchObject({
      statusCode: 409,
      code: 'DOG_ALREADY_EXISTS',
    });
  });

  it('met à jour un chien et transforme P2025 en 404', async () => {
    updateDogs.mockResolvedValue({ id: 12, name: 'Updated' });
    await expect(
      PutDogs({ params: { id: '12' }, body: { name: 'Updated' } }, createReply()),
    ).resolves.toEqual({ id: 12, name: 'Updated' });

    updateDogs.mockRejectedValue({ code: 'P2025' });
    await expect(
      PutDogs({ params: { id: '12' }, body: {} }, createReply()),
    ).rejects.toMatchObject({ statusCode: 404, code: 'NOT_FOUND' });
  });

  it('supprime un chien avec une réponse 204', async () => {
    deleteDogs.mockResolvedValue(undefined);
    const reply = createReply();

    await expect(
      DeleteDogs({ params: { id: '12' } }, reply),
    ).resolves.toBe(reply);
    expect(reply.statusCode).toBe(204);
    expect(reply.body).toEqual({ success: true });
    expect(deleteDogs).toHaveBeenCalledWith({ params: { id: '12' } });
  });
});
