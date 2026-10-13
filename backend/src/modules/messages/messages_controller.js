import { findMessagesByMatchId, deleteMessage, findMessageById, countUnreadMessages, markRoomAsRead, getUnreadPerRoom} from './messages_queries.js'

async function getMessages(request, reply) {
  try {
    return await findMessagesByMatchId(request.params.matchId)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

// async function postMessage(request, reply) {
//   try {
//     const { match_id, sender_id, content } = request.body
//     return await createMessage(match_id, sender_id, content)
//   } catch (e) {
//     return reply.code(500).send({ error: e.message })
//   }
// }

async function removeMessage(request, reply) {
  try {
    return await deleteMessage(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'Message not found' })
    return reply.code(500).send({ error: e.message })
  }
}


async function getUnreadCount(request, reply) {
  try {
    const count = await countUnreadMessages(request.userId)
    return { unreadMessages: count }
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function readRoom(request, reply) {
  try {
    await markRoomAsRead(request.params.matchId, request.userId)
    return { success: true }
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function unreadPerRoom(request, reply) {
    const data = await getUnreadPerRoom(request.userId)
    return data
}

export { getMessages, removeMessage, getUnreadCount, readRoom, unreadPerRoom }