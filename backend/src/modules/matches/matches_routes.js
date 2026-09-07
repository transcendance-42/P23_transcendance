const { getMatchesByUserSchema, deleteMatchSchema } = require('./matches_schema')
const { getMatchesByUser, getAllMatches, removeMatch } = require('./matches_controller')

async function matchesRoutes(fastify) {
    fastify.get('/matches/:userId', getMatchesByUserSchema, getMatchesByUser)
    fastify.get('/matches', getAllMatches)
    fastify.delete('/matches/:id', deleteMatchSchema, removeMatch)
}

module.exports = matchesRoutes