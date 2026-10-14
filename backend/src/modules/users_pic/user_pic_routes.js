import { getUserPicSchema, putUserPicSchema, deleteUserPicSchema, configRateLimit } from './user_pic_schema.js'
import { getUserPic, putUserPic, removeUserPic } from './user_pic_controller.js'

async function userPicRoutes(fastify) {
	fastify.addHook('onRequest', fastify.authorize)
	fastify.get('/user/:id/pic', { schema: getUserPicSchema }, getUserPic)
	fastify.put('/user/:id/pic', { schema: putUserPicSchema, config: configRateLimit }, putUserPic)
	fastify.delete('/user/:id/pic', { schema: deleteUserPicSchema}, removeUserPic)
}

export { userPicRoutes }