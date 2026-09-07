const { findMatchesByUserId, findAllMatches, deleteMatch } = require('./matches_queries')

async function getMatchesByUser(request, reply) {
  try {
    return await findMatchesByUserId(request.params.userId)
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

async function removeMatch(request, reply) {
  try {
    return await deleteMatch(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'Match not found' })
    return reply.code(500).send({ error: e.message })
  }
}

module.exports = { getMatchesByUser, getAllMatches, removeMatch }