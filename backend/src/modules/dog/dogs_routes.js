import prisma from '../../utils/prisma.js'
import {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete} from './dogs_schema.js'
import {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogs } from './dogs_controller.js'
import { checkUserAcces } from '../../plugins/checkUserAcces.js'
import { checkDogAcces, checkDogAccesPost } from '../../plugins/checkDogAccess.js'

async function dogsRoutes(fastify) {
  // fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route
  fastify.get('/dogs', GetAllDogs) 
  fastify.get('/dogs/:id', {schema : SchemaDogGetId, preHandler:checkDogAcces}, GetDogsByID)
  fastify.post('/dogs', {schema : SchemaDogPost, preHandler:checkDogAccesPost}, PostDogs)
  fastify.put('/dogs/:id', {schema : SchemaDogsPut, preHandler:checkDogAcces}, PutDogs)
  fastify.delete('/dogs/:id', {schema : SchemaDogsDelete, preHandler:checkDogAcces}, DeleteDogs)
}

export { dogsRoutes }