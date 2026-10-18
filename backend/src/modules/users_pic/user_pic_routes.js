import { getUserPicSchema, putUserPicSchema, deleteUserPicSchema, configRateLimit } from './user_pic_schema.js'
import { getUserPic, putUserPic, removeUserPic } from './user_pic_controller.js'
import { checkUserAcces, checkUserGetPicAcces } from '../../plugins/checkUserAcces.js'

async function userPicRoutes(fastify) {
	fastify.addHook('onRequest', fastify.authorize)
	fastify.get('/user/:id/pic', { schema: getUserPicSchema, preHandler:checkUserGetPicAcces  }, getUserPic)
	fastify.put('/user/:id/pic', { schema: putUserPicSchema, preHandler:checkUserAcces, config: configRateLimit }, putUserPic)
	fastify.delete('/user/:id/pic', { schema: deleteUserPicSchema, preHandler:checkUserAcces}, removeUserPic)
}

export { userPicRoutes }