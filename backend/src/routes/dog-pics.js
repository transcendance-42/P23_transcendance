const prisma = require('../utils/prisma')

async function dogPicsRoutes(fastify) {
  //GET /dog-pics/:dogId
  fastify.get('/dog-pics/:dogId', {
    schema: {
      params: {
        type: 'object',
        properties: { dogId: { type: 'integer' } },
        required: ['dogId']
      }
    }
  }, async (request, reply) => {
    try {
      const pics = await prisma.dog_pics.findMany({
        where: { dog_id: BigInt(request.params.dogId) },
        orderBy: { position: 'asc' }
    })
    return pics
  } catch (e) {
      return reply.code(500).send({ error: e.message })
    }
})

  //POST /dog-pics
  fastify.post('/dog-pics', {
    schema: {
      body: {
        type: 'object',
          properties: {
          dog_id: { type: 'integer' },
          file_path: { type: 'string' },
          position: { type: 'integer' }
          },
          required: ['dog_id', 'file_path', 'position']
      }
    }
  }, async (request, reply) => {
      try {
        const { dog_id, file_path, position } = request.body
        const pic = await prisma.dog_pics.create({
        data: { dog_id: BigInt(dog_id), file_path, position }
      })
      return pic
    } catch (e) {
      return reply.code(500).send({ error: e.message })
    }
  })

    //DELETE dog-pics/:id
    fastify.delete('/dog-pics/:id', {
      schema: {
          params: {
              type: 'object',
              properties: { id: { type: 'integer' } },
              required: ['id']
          }
      }
  }, async (request, reply) => {
      try {
          const pic = await prisma.dog_pics.delete({
              where: { id: BigInt(request.params.id) }
          })
          return pic
      } catch (e) {
          if (e.code === 'P2025') {
              return reply.code(404).send({ error: 'Dog pic not found' })
          }
          return reply.code(500).send({ error: e.message })
      }
  })
}

module.exports = dogPicsRoutes