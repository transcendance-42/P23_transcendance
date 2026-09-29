import { getMessagesSchema, createMessageSchema, deleteMessageSchema } from './messages_schema.js'
import { getMessages, removeMessage } from './messages_controller.js'
import { checkChatAccesParams, checkMessageDeleteAcces } from '../../plugins/checkChatAcces.js'

async function messagesRoutes(fastify) {
fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.get('/messages/:matchId', {schema : getMessagesSchema, preHandler:checkChatAccesParams}, getMessages)
    // fastify.post('/messages', {schema : createMessageSchema, preHandler:checkChatAccesBody}, postMessage) // route pas utilisé car gérée par le websocket
    fastify.delete('/messages/:id', {schema : deleteMessageSchema, preHandler: checkMessageDeleteAcces}, removeMessage)
}

export { messagesRoutes }