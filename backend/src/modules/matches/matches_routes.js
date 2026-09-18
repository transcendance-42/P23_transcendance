import { getMatchesByUserSchema, deleteMatchSchema, getMatchMessagesSchema, getMyMatchesSchema } from './matches_schema.js'
import { getMatchesByUser, getAllMatches, removeMatch, getMatchMessages, getMyMatches } from './matches_controller.js'

async function matchesRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.get('/matches/:userId', {schema : getMatchesByUserSchema}, getMatchesByUser)
    fastify.get('/matches/me', {schema : getMyMatchesSchema}, getMyMatches)
    fastify.get('/matches/:match_id/messages', { schema: getMatchMessagesSchema }, getMatchMessages)
    fastify.get('/matches', getAllMatches)
    fastify.delete('/matches/:id', {schema : deleteMatchSchema}, removeMatch)
}

export { matchesRoutes } 