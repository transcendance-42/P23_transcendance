const prisma = require('../utils/prisma')
const {SchemaDogGetId, SchemaDogPost, SchemaDogsPut, SchemaDogsDelete} = require('./dogs_schema')
const {GetDogsByID, PostDogs, PutDogs, DeleteDogs} = require('./dogs_controller')

async function dogRoutes(fastify) {
  //GET /dogs
  fastify.get('/dogs', async (request, reply) => {
    try {
      const dogs = await prisma.dogs.findMany()
      return dogs
    } catch (e) {
      return reply.code(500).send({ error: e.message })
    }
  })

  //GET /dogs/:id
  fastify.get('/dogs/:id', SchemaDogGetId, GetDogsByID)

  //POST /dogs
  fastify.post('/dogs', SchemaDogPost, PostDogs)

  //PUT dogs/:id
  fastify.put('/dogs/:id', SchemaDogsPut, PutDogs)

  //DELETE /dogs/:id
  fastify.delete('/dogs/:id', SchemaDogsDelete, DeleteDogs)
}

module.exports = dogRoutes