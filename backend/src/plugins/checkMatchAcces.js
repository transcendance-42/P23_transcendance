import { findMatch } from "../modules/matches/matches_queries.js";
import { findMessagesByMatchId } from "../modules/matches/matches_queries.js";

async function  checkMatchOfUserAccessParams(request, reply) {
 // const userId = request.userId // pour l'instant undefined besoin de l'auth de token        
    const userId = 1;
    const paramsUserId = request.params.userId
    if (request.role === 'admin')
        return;
    if (userId.toString() !== paramsUserId.toString())
        return reply.code(403).send({error: 'Forbidden'}) 
}

async function checkMatchAccessParamsDelete(request, reply) {
    // const userId = request.userId // pour l'instant undefined besoin de l'auth de token
    const userId = 1
    const matchId = request.params.id
    
    if (request.role === 'admin')
        return;
    const match = await findMatch(matchId)
    if (!match)
        return reply.code(404).send({error: 'Unknown room'})
    if (match.matchesAsDog1.owner_id.toString() === userId.toString() || match.matchesAsDog2.owner_id.toString() === userId.toString())
        request.matchId = matchId
    else
        return reply.code(403).send({error: 'Forbidden'})
}

async function checkMatchChatAccesParams(request, reply) {
    // const userId = request.userId // pour l'instant undefined besoin de l'auth de token
    const userId = 1
    const chatId = request.params.match_id
    
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



export {checkMatchOfUserAccessParams, checkMatchAccessParamsDelete, checkMatchChatAccesParams}