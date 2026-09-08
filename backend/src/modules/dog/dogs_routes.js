const prisma = require('../../utils/prisma')
const {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete} = require('./dogs_schema')
const {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogs } = require('./dogs_controller')

async function dogRoutes(fastify) {
  fastify.get('/dogs', GetAllDogs)
  fastify.get('/dogs/:id', {schema : SchemaDogGetId}, GetDogsByID)
  fastify.post('/dogs', {schema : SchemaDogPost}, PostDogs)
  fastify.put('/dogs/:id', {schema : SchemaDogsPut}, PutDogs)
  fastify.delete('/dogs/:id', {schema : SchemaDogsDelete}, DeleteDogs)
}

module.exports = dogRoutes