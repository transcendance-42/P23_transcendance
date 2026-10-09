import prisma from '../../utils/prisma.js'
import {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete} from './dogs_schema.js'
import {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogsExceptMe, GetDogsAroundMe} from './dogs_controller.js'

async function dogsRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route
  fastify.get('/dogs', GetAllDogsExceptMe)
  fastify.get('/neardog', GetDogsAroundMe)
  fastify.get('/dogs/:id', {schema : SchemaDogGetId}, GetDogsByID)
  fastify.post('/dogs', {
    schema : SchemaDogPost,
    config : {
      rateLimit: {
      max: 10,
      timeWindow: '1 minute'
      }
    }
  }  , PostDogs)
  fastify.put('/dogs/:id', {schema : SchemaDogsPut}, PutDogs)
  fastify.delete('/dogs/:id', {schema : SchemaDogsDelete}, DeleteDogs)
}

export { dogsRoutes }