import { getDogPicsSchema, createDogPicSchema, deleteDogPicSchema } from './dog_pics_schema.js'
import { getDogPics, postDogPic, removeDogPic } from './dog_pics_controller.js'

async function dogPicsRoutes(fastify) {
  fastify.get('/dog-pics/:dogId', {schema : getDogPicsSchema}, getDogPics)
  fastify.post('/dog-pics', {schema : createDogPicSchema}, postDogPic)
  fastify.delete('/dog-pics/:id', {schema : deleteDogPicSchema}, removeDogPic)
}

export { dogPicsRoutes }