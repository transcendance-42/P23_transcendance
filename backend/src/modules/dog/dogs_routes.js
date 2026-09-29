import prisma from '../../utils/prisma.js'
import {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete} from './dogs_schema.js'
import {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogsExceptMe} from './dogs_controller.js'

async function dogsRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route
  fastify.get('/dogs', GetAllDogsExceptMe)
  fastify.get('/dogs/:id', {schema : SchemaDogGetId}, GetDogsByID)
  fastify.post('/dogs', {schema : SchemaDogPost}, PostDogs)
  fastify.put('/dogs/:id', {schema : SchemaDogsPut}, PutDogs)
  fastify.delete('/dogs/:id', {schema : SchemaDogsDelete}, DeleteDogs)
}

export { dogsRoutes }