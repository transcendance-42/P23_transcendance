import { describe, expect, it, vi } from 'vitest';
import buildApp from '../src/app.js';
import { errorHandler } from '../src/error.js';

describe('HTTP contracts', () => {
  it('retourne 404 pour une route inconnue', async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/api/does-not-exist',
    });
    await app.close();

    expect(response.statusCode).toBe(404);
  });

  it('retourne 400 pour un body invalide sur une route publique', async () => {
    const reply = {
      code: vi.fn(function code(statusCode) {
        this.statusCode = statusCode;
        return this;
      }),
      send: vi.fn(function send(body) {
        this.body = body;
        return this;
      }),
    };

    errorHandler({ validation: true }, {}, reply);

    expect(reply.statusCode).toBe(400);
    expect(reply.body).toEqual({
      error: 'VALIDATION_ERROR',
      message: 'Invalid request data',
    });
  });
});
