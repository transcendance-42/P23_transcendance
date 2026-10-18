import { getDogPicSchema, getDogPicsSchema, createDogPicSchema, updateDogPicSchema, deleteDogPicSchema, rateLimitPhoto } from './dog_pics_schema.js'
import { getDogPic, getDogPics, putDogPic, postDogPic, removeDogPic } from './dog_pics_controller.js'
import { checkAccesGetDogPic, checkAccesDogPic, checkAccesDogPicDelete, checkAccesDogPicPut } from '../../plugins/checkDogPicAcces.js'
import { checkMyOtherAccess } from '../../plugins/checkDogAccess.js'

async function dogPicsRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route
  fastify.get('/dogs/:dogId/pics', {schema : getDogPicsSchema}, getDogPics) // preHandler:checkMyOtherAccess desactivé
  fastify.get('/dog-pics/:id', {schema : getDogPicSchema}, getDogPic)// preHandler:checkAccesGetDogPic desactivé
  fastify.post('/dog-pics', {schema : createDogPicSchema, config : rateLimitPhoto, preHandler: checkAccesDogPic}, postDogPic)
  fastify.put('/dog-pics/:id', {schema : updateDogPicSchema, config : rateLimitPhoto, preHandler:checkAccesDogPicPut}, putDogPic) // Route non utilisée par le front on peut la supprimer
  fastify.delete('/dog-pics/:id', {schema : deleteDogPicSchema, preHandler: checkAccesDogPicDelete}, removeDogPic)
  // add une route qui pourrait supprimer toutes les photos d'un dog?
}

export { dogPicsRoutes }