import { getMessagesSchema, createMessageSchema, deleteMessageSchema } from './messages_schema.js'
import { getMessages, postMessage, removeMessage } from './messages_controller.js'

async function messagesRoutes(fastify) {
fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.get('/messages/:matchId', {schema : getMessagesSchema}, getMessages)
    // fastify.post('/messages', {schema : createMessageSchema}, postMessage) // route pas utilisé car gérée par le websocket
    fastify.delete('/messages/:id', {schema : deleteMessageSchema}, removeMessage)
}

export { messagesRoutes }