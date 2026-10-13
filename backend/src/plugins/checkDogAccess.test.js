import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findDogsIdParams } from '../modules/dog/dogs_queries.js';
import { checkDogAcces } from './checkDogAccess.js';

vi.mock('../modules/dog/dogs_queries.js', () => ({
  findDogsIdParams: vi.fn(),
}));

function createReply() {
  return {
    code: (statusCode) => ({
      send: (body) => ({ statusCode, body }),
    }),
  };
}

describe('checkDogAcces', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('autorise le propriétaire du chien', async () => {
    findDogsIdParams.mockResolvedValue({ owner_id: 7 });

    const request = {
      userId: 7,
      role: 'user',
      params: { id: '12' },
    };

    await expect(checkDogAcces(request, createReply())).resolves.toBeUndefined();
  });

  it('refuse un utilisateur qui ne possède pas le chien', async () => {
    findDogsIdParams.mockResolvedValue({ owner_id: 8 });

    const request = {
      userId: 7,
      role: 'user',
      params: { id: '12' },
    };

    await expect(checkDogAcces(request, createReply())).resolves.toEqual({
      statusCode: 403,
      body: { error: 'Forbidden' },
    });
  });

  it('retourne 405 si le chien est inconnu', async () => {
    findDogsIdParams.mockResolvedValue(null);

    const request = {
      userId: 7,
      role: 'user',
      params: { id: '12' },
    };

    await expect(checkDogAcces(request, createReply())).resolves.toEqual({
      statusCode: 405,
      body: { error: 'Unknown dog' },
    });
  });

  it('autorise un administrateur sans chercher le chien', async () => {
    const request = {
      userId: 7,
      role: 'admin',
      params: { id: '12' },
    };

    await expect(checkDogAcces(request, createReply())).resolves.toBeUndefined();
    expect(findDogsIdParams).not.toHaveBeenCalled();
  });
});
