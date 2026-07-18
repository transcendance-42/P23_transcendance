const prisma = require('../utils/prisma')

async function dogRoutes(fastify) {
  //GET /dogs
  fastify.get('/dogs', async () => {
    const dogs = await prisma.dogs.findMany()  
    return dogs 
  })

  //GET /dogs/:id
  fastify.get('/dogs/:id', async (request) => {
    const dog = await prisma.dogs.findUnique({
        where: { id: BigInt(request.params.id) }
    })
    return dog
  })

  //POST /dogs
  fastify.post('/dogs', async (request) => {
    const dog = await prisma.dogs.create({
        data: request.body
    })
    return dog
  })

  //PUT dogs/:id
  fastify.put('/dogs/:id', async (request) => {
    const dog = await prisma.dogs.update({
        where: { id: BigInt(request.params.id)},
        data: request.body
    })
    return dog
  })

  //DELETE /dogs/:id
  fastify.delete('/dogs/:id', async (request) => {
    const dog = await prisma.dogs.delete({
        where: {id: BigInt(request.params.id) }
    })
    return dog
  })
}

module.exports = dogRoutes