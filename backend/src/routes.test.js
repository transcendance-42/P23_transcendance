import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import buildApp from './app.js';

let app;

beforeAll(async () => {
  app = await buildApp();
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe('public routes', () => {
  it('GET /api/health retourne un statut ok', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });

  it.each([
    ['POST', '/api/auth/login'],
    ['POST', '/api/auth/register'],
  ])('%s %s rejette un body invalide', async (method, url) => {
    const response = await app.inject({
      method,
      url,
      payload: {},
    });

    expect(response.statusCode).toBe(400);
  });
});

describe('protected routes', () => {
  it.each([
    ['GET', '/api/users'],
    ['GET', '/api/users/1'],
    ['PUT', '/api/users/1'],
    ['PUT', '/api/users/1/position'],
    ['PATCH', '/api/users/1/deactivate'],
    ['GET', '/api/dogs'],
    ['GET', '/api/neardog'],
    ['GET', '/api/dogs/1'],
    ['POST', '/api/dogs'],
    ['PUT', '/api/dogs/1'],
    ['DELETE', '/api/dogs/1'],
    ['POST', '/api/swipes'],
    ['GET', '/api/dogs/1/pics'],
    ['GET', '/api/dog-pics/1'],
    ['POST', '/api/dog-pics'],
    ['PUT', '/api/dog-pics/1'],
    ['DELETE', '/api/dog-pics/1'],
    ['GET', '/api/matches/1'],
    ['GET', '/api/matches/me'],
    ['GET', '/api/matches/1/messages'],
    ['GET', '/api/matches'],
    ['DELETE', '/api/matches/1'],
    ['PATCH', '/api/matches/1'],
    ['GET', '/api/messages/1'],
    ['DELETE', '/api/messages/1'],
    ['POST', '/api/hearthbeat'],
  ])('%s %s refuse une requête sans token', async (method, url) => {
    const response = await app.inject({
      method,
      url,
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({ error: 'NO_TOKEN' });
  });
});
