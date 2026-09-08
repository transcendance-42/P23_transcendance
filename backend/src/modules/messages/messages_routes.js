const { getMessagesSchema, createMessageSchema, deleteMessageSchema } = require('./messages_schema')
const { getMessages, postMessage, removeMessage } = require('./messages_controller')

async function messagesRoutes(fastify) {
    fastify.get('/messages/:matchId', {schema : getMessagesSchema}, getMessages)
    fastify.post('/messages', {schema : createMessageSchema}, postMessage)
    fastify.delete('/messages/:id', {schema : deleteMessageSchema}, removeMessage)
}

module.exports = messagesRoutes