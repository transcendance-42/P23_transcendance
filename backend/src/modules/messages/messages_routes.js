import { getMessagesSchema, createMessageSchema, deleteMessageSchema } from './messages_schema.js'
import { getMessages, postMessage, removeMessage } from './messages_controller.js'
import { checkChatAccesParams, checkChatAccesBody, checkMessageDeleteAcces } from '../../plugins/checkChatAcces.js'

async function messagesRoutes(fastify) {
    fastify.get('/messages/:matchId', {schema : getMessagesSchema, preHandler:checkChatAccesParams}, getMessages)
    fastify.post('/messages', {schema : createMessageSchema, preHandler:checkChatAccesBody}, postMessage)
    fastify.delete('/messages/:id', {schema : deleteMessageSchema, preHandler: checkMessageDeleteAcces}, removeMessage)
}

export { messagesRoutes }