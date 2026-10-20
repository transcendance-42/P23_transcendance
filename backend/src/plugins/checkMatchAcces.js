import { findMatch } from "../modules/matches/matches_queries.js";
import { findMessagesByMatchId } from "../modules/matches/matches_queries.js";
import { AppError } from "../error.js";

async function  checkMatchOfUserAccessParams(request, reply) {
    const userId = request.userId
    const paramsUserId = request.params.id
    if (request.role === 'admin')
        return;
    if (userId.toString() !== paramsUserId)
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')
}

async function checkMatchAccessParams(request, reply) {
    const userId = request.userId
    const matchId = request.params.id
    
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

export {checkMatchOfUserAccessParams, checkMatchAccessParams}