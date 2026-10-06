import { findMatchesByUserId, findAllMatches, deleteMatch, findMessagesByMatchId, desactivateMatchWithReq } from './matches_queries.js'

async function getMatchesByUser(request, reply) {
  try {
    return await findMatchesByUserId(request.params.userId)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function getMyMatches(request, reply) {
  try {
    return await findMatchesByUserId(request.userId)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function getAllMatches(request, reply) {
  try {
    return await findAllMatches()
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function getMatchMessages(request, reply) {
  try {
    return await findMessagesByMatchId(request.params.match_id)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function removeMatch(request, reply) {
  try {
    return await deleteMatch(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'Match not found' })
    return reply.code(500).send({ error: e.message })
  }
}

async function desactivateMatch(request, reply) {
  try {
    return await desactivateMatchWithReq(request)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'Match not found' })
    return reply.code(500).send({ error: e.message })
  }
}

export { getMatchesByUser, getAllMatches, getMatchMessages, removeMatch, getMyMatches, desactivateMatch }