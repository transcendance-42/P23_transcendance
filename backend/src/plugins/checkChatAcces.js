import { findMessagesByMatchId, findMessageById } from "../modules/messages/messages_queries.js"

async function checkMessageDeleteAcces(request, reply) {
    const userId = request.userId
    const messageId = request.params.id
    
    if (request.role === 'admin')
        return;
    const message = await findMessageById(messageId)
    if (!message)
        return reply.code(404).send({error: 'Unknown message'})
    if (message.sender_id.toString() !== userId.toString())
        return reply.code(403).send({error: 'Forbidden'})
}

export { checkMessageDeleteAcces}