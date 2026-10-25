import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import { findUserById } from '../src/modules/users/users_queries.js';
import { authenticateSocket } from '../src/websocket/index.js';

vi.mock('../src/modules/users/users_queries.js', () => ({
  findUserById: vi.fn(),
}));

describe('authenticateSocket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'socket-secret';
  });

  it('refuse un token invalide', async () => {
    const next = vi.fn();

    await authenticateSocket({ handshake: { auth: { token: 'bad' } } }, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Authentication error: invalid token' }),
    );
  });

  it('refuse un utilisateur désactivé', async () => {
    const token = jwt.sign({ id: 7 }, process.env.JWT_SECRET);
    findUserById.mockResolvedValue({ id: 7, is_active: false });
    const next = vi.fn();

    await authenticateSocket({ handshake: { auth: { token } } }, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Authentication error: invalid token' }),
    );
  });

  it('autorise un utilisateur actif', async () => {
    const token = jwt.sign({ id: 7 }, process.env.JWT_SECRET);
    findUserById.mockResolvedValue({ id: 7, is_active: true });
    const socket = { handshake: { auth: { token } } };
    const next = vi.fn();

    await authenticateSocket(socket, next);

    expect(next).toHaveBeenCalledWith();
    expect(socket.user.id).toBe(7);
  });
});
