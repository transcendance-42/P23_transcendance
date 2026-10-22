import { getDogPicSchema, getDogPicsSchema, createDogPicSchema, updateDogPicSchema, deleteDogPicSchema, rateLimitPhoto } from './dog_pics/dog_pics_schema.js'
import { getDocuDogSchema, putDocuDogSchema, deleteDocuDogSchema } from './dog_docu/dog_docu_schema.js'
import { getDogPic, getDogPics, putDogPic, postDogPic, removeDogPic } from './dog_pics/dog_pics_controller.js'
import { getDogDocu, putDogDocu, removeDogDocu } from './dog_docu/dog_docu_controllers.js'
import { checkAccesGetDogPic, checkAccesDogUpload, checkAccesDogPicDelete, checkAccesDogPicPut } from '../../plugins/checkDogPicAcces.js'
import { checkMyOtherAccess } from '../../plugins/checkDogAccess.js'

async function dogUploadsRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route
  fastify.get('/dogs/:dogId/pics', {schema : getDogPicsSchema}, getDogPics) // preHandler:checkMyOtherAccess desactivé
  fastify.get('/dog-pics/:id', {schema : getDogPicSchema}, getDogPic)// preHandler:checkAccesGetDogPic desactivé
  fastify.post('/dog-pics', {schema : createDogPicSchema, config : rateLimitPhoto, preHandler: checkAccesDogUpload}, postDogPic)
  fastify.put('/dog-pics/:id', {schema : updateDogPicSchema, config : rateLimitPhoto, preHandler:checkAccesDogPicPut}, putDogPic) // Route non utilisée par le front on peut la supprimer
  fastify.delete('/dog-pics/:id', {schema : deleteDogPicSchema, preHandler: checkAccesDogPicDelete}, removeDogPic)

  fastify.get('/dog-docu/:dogId', {schema : getDocuDogSchema}, getDogDocu)
  fastify.put('/dog-docu/:dogId', {schema : putDocuDogSchema, config : rateLimitPhoto, preHandler: checkAccesDogUpload}, putDogDocu)
  fastify.delete('/dog-docu/:dogId', {schema : deleteDocuDogSchema, preHandler: checkAccesDogUpload}, removeDogDocu)
  // add une route qui pourrait supprimer toutes les photos d'un dog?
}

export { dogUploadsRoutes }