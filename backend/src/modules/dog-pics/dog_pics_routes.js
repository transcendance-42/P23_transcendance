import { getDogPicSchema, getDogPicsSchema, createDogPicSchema, updateDogPicSchema, deleteDogPicSchema } from './dog_pics_schema.js'
import { getDogPic, getDogPics, putDogPic, postDogPic, removeDogPic } from './dog_pics_controller.js'
import { checkAccesGetDogPic, checkAccesDogPic, checkAccesDogPicDelete } from '../../plugins/checkDogPicAcces.js'
import { checkMyOtherAccess } from '../../plugins/checkDogAccess.js'

async function dogPicsRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route
  fastify.get('/dogs/:dogId/pics', {schema : getDogPicsSchema, preHandler:checkMyOtherAccess}, getDogPics) // a mettre un handler qui va gerer ce que le client peut voir selon si il match ou pas
  fastify.get('/dog-pics/:id', {schema : getDogPicSchema}, getDogPic)
  fastify.post('/dog-pics', {
	schema : createDogPicSchema, preHandler: checkAccesDogPic,
	config :{
		rateLimit: {
		max: 10,
		timeWindow: '1 minute'
	}
	}
  }, postDogPic)
  fastify.put('/dog-pics/:id', {
	schema : updateDogPicSchema,
	config : {
		rateLimit: {
		max: 10,
		timeWindow: '1 minute'
	}
	}
  }, putDogPic)
  fastify.delete('/dog-pics/:id', {schema : deleteDogPicSchema, preHandler: checkAccesDogPicDelete}, removeDogPic)
  // add une route qui pourrait supprimer toutes les photos d'un dog?
}

export { dogPicsRoutes }