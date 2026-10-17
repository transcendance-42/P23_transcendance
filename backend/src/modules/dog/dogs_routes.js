import prisma from '../../utils/prisma.js'
import {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete} from './dogs_schema.js'
import {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogsExceptMe, GetDogsAroundMe} from './dogs_controller.js'
import { checkUserAcces } from '../../plugins/checkUserAcces.js'
import { checkDogAcces} from '../../plugins/checkDogAccess.js'
import { checkMyOtherAccess } from '../../plugins/checkMyOtherDogAccess.js'

async function dogsRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route
  fastify.get('/dogs', GetAllDogsExceptMe) 
  fastify.get('/neardog', GetDogsAroundMe)
  fastify.get('/dogs/:id', {schema : SchemaDogGetId, preHandler:checkMyOtherAccess}, GetDogsByID) // a mettre un handler qui va gerer ce que le client peut voir selon si il match ou pas
  fastify.post('/dogs', {
    schema : SchemaDogPost,
    config : {
      rateLimit: {
      max: 10,
      timeWindow: '1 minute'
      }
    }
  }  , PostDogs)
  fastify.put('/dogs/:id', {schema : SchemaDogsPut, preHandler:checkDogAcces}, PutDogs)
  fastify.delete('/dogs/:id', {schema : SchemaDogsDelete, preHandler:checkDogAcces}, DeleteDogs)
}

export { dogsRoutes }