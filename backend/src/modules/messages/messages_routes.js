import { getMessagesSchema, createMessageSchema, deleteMessageSchema } from './messages_schema.js'
import { getMessages, removeMessage, getUnreadCount, readRoom, unreadPerRoom } from './messages_controller.js'
import { checkChatAccesParams, checkMessageDeleteAcces } from '../../plugins/checkChatAcces.js'

async function messagesRoutes(fastify) {
fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route   
    fastify.get('/messages/unread-count', getUnreadCount)
    fastify.patch('/messages/:matchId/read', readRoom)
    fastify.get('/messages/unread-per-room', unreadPerRoom)
    fastify.get('/messages/:matchId', {schema : getMessagesSchema, preHandler:checkChatAccesParams}, getMessages)
    // fastify.post('/messages', {schema : createMessageSchema, preHandler:checkChatAccesBody}, postMessage) // route pas utilisé car gérée par le websocket
    fastify.delete('/messages/:id', {schema : deleteMessageSchema, preHandler: checkMessageDeleteAcces}, removeMessage)
}

export { messagesRoutes }