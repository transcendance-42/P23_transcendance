import { getDogPicsSchema, createDogPicSchema, deleteDogPicSchema } from './dog_pics_schema.js'
import { getDogPics, postDogPic, removeDogPic } from './dog_pics_controller.js'
import { checkAccesDogPicParams, checkAccesDogPic, checkAccesDogPicDelete } from '../../plugins/checkDogPicAcces.js'

async function dogPicsRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route  
  fastify.get('/dog-pics/:dogId', {schema : getDogPicsSchema, preHandler: checkAccesDogPicParams}, getDogPics)
  fastify.post('/dog-pics', {schema : createDogPicSchema, preHandler: checkAccesDogPic}, postDogPic)
  fastify.delete('/dog-pics/:id', {schema : deleteDogPicSchema, preHandler: checkAccesDogPicDelete}, removeDogPic)
}

export { dogPicsRoutes }