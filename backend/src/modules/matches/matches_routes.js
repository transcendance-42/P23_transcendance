const { getMatchesByUserSchema, deleteMatchSchema, getMatchMessagesSchema } = require('./matches_schema')
const { getMatchesByUser, getAllMatches, removeMatch, getMatchMessages } = require('./matches_controller')

async function matchesRoutes(fastify) {
    fastify.get('/matches/:userId', {schema : getMatchesByUserSchema}, getMatchesByUser)
    fastify.get('/matches/:match_id/messages', { schema: getMatchMessagesSchema }, getMatchMessages)
    fastify.get('/matches', getAllMatches)
    fastify.delete('/matches/:id', {schema : deleteMatchSchema}, removeMatch)
}

module.exports = matchesRoutes 