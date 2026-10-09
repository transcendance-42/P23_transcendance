import { postUserPicSchema } from './user_pic_schema.js'
import { postUserPic } from './user_pic_controller.js'

async function userPicRoutes(fastify) {
	fastify.addHook('onRequest', fastify.authorize)
	// fastify.get()
	fastify.post('/user/:id/pic', { schema: postUserPicSchema }, postUserPic)
	// fastify.put()
	// fastify.delete()
}

export { userPicRoutes }