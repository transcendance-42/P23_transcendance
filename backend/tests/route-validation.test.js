import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import buildApp from '../src/app.js';

let app;

beforeAll(async () => {
  app = await buildApp();
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe('POST /api/auth/login validation', () => {
  it.each([
    [{ password: 'password123' }, 'email manquant'],
    [{ email: 'user@example.com' }, 'password manquant'],
    [{ email: 'not-an-email', password: 'password123' }, 'email invalide'],
    [{ email: 'user@example.com', password: 'short' }, 'password trop court'],
  ])('rejette une requête avec %s', async (payload) => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload,
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty('error');
  });
});

describe('POST /api/auth/register validation', () => {
  it.each([
    [{}, 'champs requis manquants'],
    [
      {
        first_name: 'Al',
        last_name: 'Martin',
        email: 'user@example.com',
        password: 'password123',
        city: 'Paris',
        date_of_birth: '2000-01-01',
        longitude: 2.35,
        latitude: 48.85,
      },
      'prénom trop court',
    ],
    [
      {
        first_name: 'Alice',
        last_name: 'Martin',
        email: 'not-an-email',
        password: 'password123',
        city: 'Paris',
        date_of_birth: '2000-01-01',
        longitude: 2.35,
        latitude: 48.85,
      },
      'email invalide',
    ],
  ])('rejette une requête avec %s', async (payload) => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload,
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty('error');
  });
});
