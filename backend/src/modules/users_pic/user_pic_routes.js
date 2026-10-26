import { getUserPicSchema, putUserPicSchema, deleteUserPicSchema, configRateLimit, configRateLimitAdmin } from './user_pic_schema.js'
import { getUserPic, putUserPic, removeUserPic } from './user_pic_controller.js'
import { checkUserAcces, checkUserGetPicAcces, checkActiveFromUserId } from '../../plugins/checkUserAcces.js'

async function userPicRoutes(fastify) {
	fastify.addHook('onRequest', fastify.authorize)
	fastify.get('/user/:id/pic', { schema: getUserPicSchema, config: configRateLimitAdmin, preHandler:checkActiveFromUserId}, getUserPic) // preHandler:checkUserGetPicAcces desactivé
	fastify.put('/user/:id/pic', { schema: putUserPicSchema, preHandler:checkUserAcces, config: configRateLimit }, putUserPic)
	fastify.delete('/user/:id/pic', { schema: deleteUserPicSchema, preHandler:checkUserAcces}, removeUserPic)
}

export { userPicRoutes }