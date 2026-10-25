import { getMatchesByUserSchema, deleteMatchSchema, getMatchMessagesSchema} from './matches_schema.js'
import { getMatchesByUser, getAllMatches, getMatchMessages, getMyMatches, desactivateMatch } from './matches_controller.js'
import { checkMatchOfUserAccessParams, checkMatchAccessParams } from '../../plugins/checkMatchAcces.js'
import { checkUserAccesAdmin } from '../../plugins/checkUserAcces.js'

async function matchesRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route 
    // dans ce cas la userId c bien mais pas grv 
    fastify.get('/matches/user/:id', {schema : getMatchesByUserSchema, preHandler:checkMatchOfUserAccessParams}, getMatchesByUser) // route pas necessaire soit on la supp soit on la reserve à l'admin
    fastify.get('/matches/me', getMyMatches)
    //fastify.get('/matches/:id/messages', { schema: getMatchMessagesSchema, preHandler:checkMatchAccessParams }, getMatchMessages) // pas necessaire on peut avoir les messages via la route messages
    fastify.get('/matches',{preHandler:checkUserAccesAdmin} , getAllMatches)
    // fastify.delete('/matches/:matchId', {schema : deleteMatchSchema, preHandler:checkMatchAccessParams}, removeMatch) pour l'instant on ne supprime pas les matchs, on les desactive
    fastify.patch ('/matches/:id', {schema: deleteMatchSchema, preHandler:checkMatchAccessParams}, desactivateMatch)
}

export { matchesRoutes }