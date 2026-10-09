import {} from './user_pic_schema'
import {} from './user_pic_controller'

async function userPicRoutes(fastify) {
	fastify.addHook('onRequest', fastify.authorize)
	fastify.get()
	fastify.post()
	fastify.put()
	fastify.delete()
}