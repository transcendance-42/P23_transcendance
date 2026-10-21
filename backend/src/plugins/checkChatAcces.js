import { findMessagesByMatchId, findMessageById } from "../modules/messages/messages_queries.js"
import { findMatch } from "../modules/matches/matches_queries.js";
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

async function checkMessageAccessParams(request, reply) {
    const userId = request.userId
    const matchId = request.params.matchId
    
    if (request.role === 'admin')
        return;
    const match = await findMatch(matchId)
    if (!match)
        throw new AppError(404, 'NOT_FOUND', 'Match not found')
    if (match.matchesAsDog1.owner_id.toString() === userId.toString() || match.matchesAsDog2.owner_id.toString() === userId.toString())
        request.matchId = matchId
    else
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')
}

export { checkMessageDeleteAcces, checkMessageAccessParams}