import { getMatchesByUserSchema, deleteMatchSchema, getMatchMessagesSchema} from './matches_schema.js'
import { getMatchesByUser, getAllMatches, removeMatch, getMatchMessages, getMyMatches, desactivateMatch } from './matches_controller.js'
import { checkChatAccesParams } from '../../plugins/checkChatAcces.js'
import { checkMatchOfUserAccessParams, checkMatchAccessParamsDelete, checkMatchChatAccesParams } from '../../plugins/checkMatchAcces.js'
import { checkUserAccesAdmin } from '../../plugins/checkUserAcces.js'

async function matchesRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.get('/matches/:userId', {schema : getMatchesByUserSchema, preHandler:checkMatchOfUserAccessParams}, getMatchesByUser)
    fastify.get('/matches/me', getMyMatches)
    fastify.get('/matches/:match_id/messages', { schema: getMatchMessagesSchema, preHandler:checkMatchChatAccesParams }, getMatchMessages)
    fastify.get('/matches',{preHandler:checkUserAccesAdmin} , getAllMatches)
    fastify.delete('/matches/:id', {schema : deleteMatchSchema, preHandler:checkMatchAccessParamsDelete}, removeMatch)
    fastify.patch ('/matches/:id', {schema: deleteMatchSchema}, desactivateMatch)
}

export { matchesRoutes } 