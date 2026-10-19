import { findMessagesByMatchId, findMessageById } from "../modules/messages/messages_queries.js"
import { AppError } from "../error.js";

async function checkMessageDeleteAcces(request, reply) {
    const userId = request.userId
    const messageId = request.params.id
    
    if (request.role === 'admin')
        return;
    const message = await findMessageById(messageId)
    if (!message)
        throw new AppError(404, 'NOT_FOUND', 'Message not found')
    if (message.sender_id.toString() !== userId.toString())
        throw new AppError(4043, 'FORBIDDEN', 'Forbidden')
}

export { checkMessageDeleteAcces}