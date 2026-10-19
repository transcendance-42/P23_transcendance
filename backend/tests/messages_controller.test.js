import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  countUnreadMessages,
  deleteMessage,
  findMessagesByMatchId,
  getUnreadPerRoom,
  markRoomAsRead,
} from '../src/modules/messages/messages_queries.js';
import {
  getMessages,
  getUnreadCount,
  readRoom,
  removeMessage,
  unreadPerRoom,
} from '../src/modules/messages/messages_controller.js';

vi.mock('../src/modules/messages/messages_queries.js', () => ({
  countUnreadMessages: vi.fn(),
  deleteMessage: vi.fn(),
  findMessagesByMatchId: vi.fn(),
  getUnreadPerRoom: vi.fn(),
  markRoomAsRead: vi.fn(),
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

describe('messages controllers', () => {
  beforeEach(() => vi.clearAllMocks());

  it('retourne les messages du match demandé', async () => {
    const messages = [{ id: 1, content: 'hello' }];
    findMessagesByMatchId.mockResolvedValue(messages);

    await expect(
      getMessages({ params: { matchId: '4' } }, createReply()),
    ).resolves.toBe(messages);
    expect(findMessagesByMatchId).toHaveBeenCalledWith('4');
  });

  it('supprime un message avec une réponse 204', async () => {
    deleteMessage.mockResolvedValue(undefined);
    const reply = createReply();

    await expect(
      removeMessage({ params: { id: '8' } }, reply),
    ).resolves.toBe(reply);
    expect(reply.statusCode).toBe(204);
    expect(deleteMessage).toHaveBeenCalledWith('8');
  });

  it('transforme une suppression inexistante en 404', async () => {
    deleteMessage.mockRejectedValue({ code: 'P2025' });

    await expect(
      removeMessage({ params: { id: '8' } }, createReply()),
    ).rejects.toMatchObject({
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'Message not found',
    });
  });

  it('retourne le nombre de messages non lus', async () => {
    countUnreadMessages.mockResolvedValue(3);

    await expect(
      getUnreadCount({ userId: 7 }, createReply()),
    ).resolves.toEqual({ unreadMessages: 3 });
    expect(countUnreadMessages).toHaveBeenCalledWith(7);
  });

  it('marque une room comme lue', async () => {
    await expect(
      readRoom({ params: { matchId: '4' }, userId: 7 }, createReply()),
    ).resolves.toEqual({ success: true });
    expect(markRoomAsRead).toHaveBeenCalledWith('4', 7);
  });

  it('retourne les compteurs par room', async () => {
    getUnreadPerRoom.mockResolvedValue({ '4': 2 });

    await expect(
      unreadPerRoom({ userId: 7 }, createReply()),
    ).resolves.toEqual({ '4': 2 });
    expect(getUnreadPerRoom).toHaveBeenCalledWith(7);
  });
});
