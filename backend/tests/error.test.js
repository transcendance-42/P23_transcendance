import { describe, expect, it, vi } from 'vitest';
import { AppError, errorHandler } from '../src/error.js';

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

describe('errorHandler', () => {
  it('convertit une AppError en réponse HTTP', () => {
    const reply = createReply();

    errorHandler(
      new AppError(401, 'ACCESS_TOKEN_MISSING', 'Access token not found'),
      {},
      reply,
    );

    expect(reply.statusCode).toBe(401);
    expect(reply.body).toEqual({
      error: 'ACCESS_TOKEN_MISSING',
      message: 'Access token not found',
    });
  });

  it('convertit une erreur Prisma P2025 en 404 standardisé', () => {
    const reply = createReply();

    errorHandler({ code: 'P2025' }, {}, reply);

    expect(reply.statusCode).toBe(404);
    expect(reply.body).toEqual({
      error: 'RESOURCE_NOT_FOUND',
      message: 'The requested resource was not found',
    });
  });

  it('convertit une erreur inattendue en 500 sans exposer son message', () => {
    const reply = createReply();

    errorHandler(new Error('database credentials leaked'), {}, reply);

    expect(reply.statusCode).toBe(500);
    expect(reply.body).toEqual({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  });

  it.each([
    ['P2002', 409, 'RESOURCE_ALREADY_EXISTS'],
    ['P2003', 409, 'FOREIGN_KEY_VIOLATION'],
    ['P2000', 400, 'VALUE_TOO_LONG'],
    ['P2024', 404, 'DB_BUSY'],
  ])('standardise l’erreur Prisma %s', (code, statusCode, errorCode) => {
    const reply = createReply();

    errorHandler({ code }, {}, reply);

    expect(reply.statusCode).toBe(statusCode);
    expect(reply.body.error).toBe(errorCode);
    expect(reply.send).toHaveBeenCalledOnce();
  });

  it('standardise une erreur de validation Fastify', () => {
    const reply = createReply();

    errorHandler({ validation: [{ keyword: 'required' }] }, {}, reply);

    expect(reply.statusCode).toBe(400);
    expect(reply.body).toEqual({
      error: 'VALIIDATION_ERROR',
      message: 'Invalid request data',
    });
  });
});
