import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findDogsIdParams } from '../src/modules/dog/dogs_queries.js';
import { checkDogAcces } from '../src/plugins/checkDogAccess.js';

vi.mock('../src/modules/dog/dogs_queries.js', () => ({
  findDogsIdParams: vi.fn(),
}));

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

    await expect(checkDogAcces(request, {})).resolves.toBeUndefined();
    expect(findDogsIdParams).toHaveBeenCalledWith('12');
  });

  it('refuse un utilisateur qui ne possède pas le chien', async () => {
    findDogsIdParams.mockResolvedValue({ owner_id: 8 });

    const request = {
      userId: 7,
      role: 'user',
      params: { id: '12' },
    };

    await expect(checkDogAcces(request, {})).rejects.toMatchObject({
      statusCode: 403,
      code: 'FORBIDDEN',
      message: 'Forbidden',
    });
    expect(findDogsIdParams).toHaveBeenCalledWith('12');
  });

  it('retourne 405 si le chien est inconnu', async () => {
    findDogsIdParams.mockResolvedValue(null);

    const request = {
      userId: 7,
      role: 'user',
      params: { id: '12' },
    };

    await expect(checkDogAcces(request, {})).rejects.toMatchObject({
      statusCode: 404,
      code: 'NOT FOUND',
      message: 'Dog not found',
    });
  });

  it('autorise un administrateur sans chercher le chien', async () => {
    const request = {
      userId: 7,
      role: 'admin',
      params: { id: '12' },
    };

    await expect(checkDogAcces(request, {})).resolves.toBeUndefined();
    expect(findDogsIdParams).not.toHaveBeenCalled();
  });
});
