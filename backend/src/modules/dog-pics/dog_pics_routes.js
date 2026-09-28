import { getDogPicSchema, getDogPicsSchema, createDogPicSchema, deleteDogPicSchema } from './dog_pics_schema.js'
import { getDogPic, getDogPics, postDogPic, removeDogPic } from './dog_pics_controller.js'

async function dogPicsRoutes(fastify) {
  fastify.get('/dogs/:dogId/pics', {schema : getDogPicsSchema}, getDogPics)
  fastify.get('/dog-pics/:id', {schema : getDogPicSchema}, getDogPic)
  fastify.post('/dog-pics', {schema : createDogPicSchema}, postDogPic)
  fastify.put('/dog-pics/:id', {}, )
  fastify.delete('/dog-pics/:id', {schema : deleteDogPicSchema}, removeDogPic)
  // add une route qui pourrait supprimer toutes les photos d'un dog?
}

export { dogPicsRoutes }