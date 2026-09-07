const prisma = require('../utils/prisma')

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
  fastify.get('/dogs/:id', {
    schema: {
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
        required: ['id'] 
      }
    }
  }, async (request, reply) => {
    try {
      const dog = await prisma.dogs.findUnique({
        where: { id: BigInt(request.params.id) }
      })
      if (!dog) return reply.code(404).send({ error: 'Dog not found' })
      return dog
    } catch (e) {
      return reply.code(500).send({ error: e.message })
    }
  })

  //POST /dogs
  fastify.post('/dogs', {
    schema: {
      body: {
        type: 'object',
        properties: {
          owner_id: { type: 'integer' },
          dog_name: { type: 'string' },
          bio: { type: 'string' },
          gender: { type: 'string' },
          size: { type: 'string' }
        },
        required: ['owner_id', 'dog_name', 'gender', 'size']
      }
    }
  }, async (request, reply) => {
    try {
      const { owner_id, ...rest } = request.body
      const dog = await prisma.dogs.create({
        data: { owner_id: BigInt(owner_id), ...rest }
      })
      return dog
    } catch (e) {
      return reply.code(500).send({ error: e.message })
    }
  })

  //PUT dogs/:id
  fastify.put('/dogs/:id', {
    schema: {
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
        required: ['id']
      }, 
      body: {
        type: 'object',
        properties: {
          dog_name: { type: 'string' },
          bio: { type: 'string' },
          gender: { type: 'string' },
          size: { type: 'string' }
        },
        additionalProperties: false
      }
    }
  }, async (request, reply) => {
    try {
      const dog = await prisma.dogs.update({
        where: { id: BigInt(request.params.id) },
        data: request.body
      })
      return dog
    } catch (e) {
        if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog not found' })
        return reply.code(500).send({ error: e.message })
      }
  })

  //DELETE /dogs/:id
  fastify.delete('/dogs/:id', {
    schema: {
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
        required: ['id']
      }
    }
  }, async (request, reply) => {
    try {
      const dog = await prisma.dogs.delete({
        where: { id: BigInt(request.params.id) }
      })
      return dog
    } catch (e) {
      if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog not found' })
      return reply.code(500).send({ error: e.message })
    }
  })
}

module.exports = dogRoutes