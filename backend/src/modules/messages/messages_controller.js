import { findMessagesByMatchId, deleteMessage, findMessageById, countUnreadMessages, markRoomAsRead, getUnreadPerRoom} from './messages_queries.js'
import { AppError } from '../../error.js'


async function getMessages(request, reply) {
    return await findMessagesByMatchId(request.params.matchId)
}

async function removeMessage(request, reply) {
  try {
    await deleteMessage(request.params.id)
    return reply.code(204).send()
  } catch (e) {
    if (e.code === 'P2025')
      throw new AppError(404, 'NOT_FOUND', 'Message not found')
    throw e
  }
}

async function getUnreadCount(request, reply) {
  const count = await countUnreadMessages(request.userId)
  return { unreadMessages: count }
}

async function readRoom(request, reply) {
  await markRoomAsRead(request.params.matchId, request.userId)
  return { success: true }
}

async function unreadPerRoom(request, reply) {
    const data = await getUnreadPerRoom(request.userId)
    return data
}

export { getMessages, removeMessage, getUnreadCount, readRoom, unreadPerRoom }