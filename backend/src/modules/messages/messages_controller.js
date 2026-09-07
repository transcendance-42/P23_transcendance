const { findMessagesByMatchId, createMessage, deleteMessage } = require('./messages.queries')

async function getMessages(request, reply) {
  try {
    return await findMessagesByMatchId(request.params.matchId)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function postMessage(request, reply) {
  try {
    const { match_id, sender_id, content } = request.body
    return await createMessage(match_id, sender_id, content)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function removeMessage(request, reply) {
  try {
    return await deleteMessage(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'Message not found' })
    return reply.code(500).send({ error: e.message })
  }
}

module.exports = { getMessages, postMessage, removeMessage }