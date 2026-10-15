import { getMatchesByUserSchema, deleteMatchSchema, getMatchMessagesSchema} from './matches_schema.js'
import { getMatchesByUser, getAllMatches, removeMatch, getMatchMessages, getMyMatches, desactivateMatch } from './matches_controller.js'
import { checkMatchOfUserAccessParams, checkMatchAccessParams } from '../../plugins/checkMatchAcces.js'
import { checkUserAccesAdmin } from '../../plugins/checkUserAcces.js'

async function matchesRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.get('/matches/:userId', {schema : getMatchesByUserSchema, preHandler:checkMatchOfUserAccessParams}, getMatchesByUser)
    fastify.get('/matches/me', getMyMatches)
    fastify.get('/matches/:matchId/messages', { schema: getMatchMessagesSchema, preHandler:checkMatchAccessParams }, getMatchMessages)
    fastify.get('/matches',{preHandler:checkUserAccesAdmin} , getAllMatches)
    // fastify.delete('/matches/:matchId', {schema : deleteMatchSchema, preHandler:checkMatchAccessParams}, removeMatch) pour l'instant on ne supprime pas les matchs, on les desactive
    fastify.patch ('/matches/:matchId', {schema: deleteMatchSchema, preHandler:checkMatchAccessParams}, desactivateMatch)
}

export { matchesRoutes } 