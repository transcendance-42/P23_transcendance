const { getMessagesSchema, createMessageSchema, deleteMessageSchema } = require('./messages_schema')
const { getMessages, postMessage, removeMessage } = require('./messages_controller')

async function messagesRoutes(fastify) {
    fastify.get('/messages/:matchId', getMessagesSchema, getMessages)
    fastify.post('/messages', createMessageSchema, postMessage)
    fastify.delete('/messages/:id', deleteMessageSchema, removeMessage)
}

module.exports = messagesRoutes