import { findMatchesByUserId, findAllMatches, deleteMatch, findMessagesByMatchId, desactivateMatchWithReq } from './matches_queries.js'
import { AppError } from '../../error.js'

async function getMatchesByUser(request, reply) {
    return await findMatchesByUserId(request.params.id)
}

async function getMyMatches(request, reply) {
    return await findMatchesByUserId(request.userId)
}

async function getAllMatches(request, reply) {
    return await findAllMatches()
}

async function getMatchMessages(request, reply) {
    return await findMessagesByMatchId(request.params.id)
}

async function removeMatch(request, reply) {
  try {
    return await deleteMatch(request.params.id)
  } catch (e) {
    if (e.code === 'P2025')
      throw new AppError(404, 'NOT_FOUND', 'Match not found')
    throw e
  }
}

async function desactivateMatch(request, reply) {
  try {
    return await desactivateMatchWithReq(request)
  } catch (e) {
    if (e.code === 'P2025')
      throw new AppError(404, 'NOT_FOUND', 'Match not found')
    throw e
  }
}

export { getMatchesByUser, getAllMatches, getMatchMessages, removeMatch, getMyMatches, desactivateMatch }