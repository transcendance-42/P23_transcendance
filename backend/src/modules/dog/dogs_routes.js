import {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete} from './dogs_schema.js'
import {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogsExceptMe, GetDogsAroundMe} from './dogs_controller.js'
import { checkDogAcces, checkMyOtherAccess} from '../../plugins/checkDogAccess.js'
import { checkUserAccesAdmin } from '../../plugins/checkUserAcces.js'
import { configRateLimit } from '../users_pic/user_pic_schema.js'

async function dogsRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route
  fastify.get('/dogs', {preHandler:checkUserAccesAdmin}, GetAllDogsExceptMe) 
  fastify.get('/neardog', GetDogsAroundMe)
  fastify.get('/dogs/:id', {schema : SchemaDogGetId, preHandler:checkMyOtherAccess}, GetDogsByID)
  fastify.post('/dogs', {schema : SchemaDogPost, config : configRateLimit}  , PostDogs)
  fastify.put('/dogs/:id', {schema : SchemaDogsPut, preHandler:checkDogAcces}, PutDogs)
  fastify.delete('/dogs/:id', {schema : SchemaDogsDelete, preHandler:checkDogAcces}, DeleteDogs)
}

export { dogsRoutes }