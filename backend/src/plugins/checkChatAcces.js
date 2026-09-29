import { findMessagesByMatchId, findMessageById } from "../modules/messages/messages_queries.js"

async function checkChatAccesParams(request, reply) {
    const userId = request.userId
    const chatId = request.params.matchId
    
    if (request.role === 'admin')
        return;
    const room = await findMessagesByMatchId(chatId)
    if (!room)
        return reply.code(404).send({error: 'Unknown room'})
    if (room[0].users.id.toString() === userId.toString() || room[1].users.id.toString() === userId.toString())
        request.chat = room[0].match_id;
    else
        return reply.code(403).send({error: 'Forbidden'})
}

// async function checkChatAccesBody(request, reply) {
//     const userId = request.userId
//     const chatId = request.body.match_id
    
//     if (request.role === 'admin')
//         return;
//     const room = await findMessagesByMatchId(chatId)
//     if (!room)
//         return reply.code(404).send({error: 'Unknown room'})
//     if (room[0].users.id.toString() === userId.toString() || room[1].users.id.toString() === userId.toString())
//         request.chat = room[0].match_id;
//     else
//         return reply.code(403).send({error: 'Forbidden'})
// }

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

export {checkChatAccesParams, checkMessageDeleteAcces}