import {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete} from './dogs_schema.js'
import {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogsExceptMe, GetDogsAroundMe, GetAllDogs, PostDogsPublicApi} from './dogs_controller.js'
import { checkDogAcces, checkMyOtherAccess} from '../../plugins/checkDogAccess.js'
import { checkUserAccesAdmin } from '../../plugins/checkUserAcces.js'
import { configRateLimit } from '../users_pic/user_pic_schema.js'
import { api_auth } from '../../plugins/auth.js'

async function dogsRoutes(fastify) {
  fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route
  fastify.get('/dogs', {preHandler:checkUserAccesAdmin}, GetAllDogsExceptMe) 
  fastify.get('/neardog', GetDogsAroundMe)
  fastify.get('/dogs/:id', {schema : SchemaDogGetId, preHandler:checkMyOtherAccess}, GetDogsByID)
  fastify.post('/dogs', {schema : SchemaDogPost, config : configRateLimit}  , PostDogs)
  fastify.put('/dogs/:id', {schema : SchemaDogsPut, preHandler:checkDogAcces}, PutDogs)
  fastify.delete('/dogs/:id', {schema : SchemaDogsDelete, preHandler:checkDogAcces}, DeleteDogs)


}

async function dogsRoutesPublic(fastify) {
  fastify.addHook('onRequest', api_auth)
  fastify.get('/public/dogs',{schema: {security: [{apiKeyAuth:[]}]}} ,GetAllDogs)
  fastify.get('/public/dogs/:id', {schema : {...SchemaDogGetId, security: [{apiKeyAuth:[]}]}}, GetDogsByID)
  fastify.post('/public/dogs/:userId', {schema :{...SchemaDogPost, security: [{apiKeyAuth:[]}]},  config : configRateLimit}  , PostDogsPublicApi)
  fastify.put('/public/dogs/:id', {schema : {...SchemaDogsPut, security: [{apiKeyAuth:[]}]}}, PutDogs)
  fastify.delete('/public/dogs/:id', {schema : {...SchemaDogsDelete, security: [{apiKeyAuth:[]}]}}, DeleteDogs)
}

export { dogsRoutes, dogsRoutesPublic }