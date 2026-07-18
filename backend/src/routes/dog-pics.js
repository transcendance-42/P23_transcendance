const prisma = require('../utils/prisma')

async function dogPicsRoutes(fastify) {
    //GET /dog-pics/:dogId
    fastify.get('/dog-pics/:dogId', async (request) => {
      const pics = await prisma.dog_pics.findMany({
        where: { dog_id: BigInt(request.params.dogId) },
        orderBy: { position: 'asc' }
      })
      return pics
    })

    //POST /dog-pics
    fastify.post('/dog-pics', async (request) => {
      const { dog_id, file_path, position } = request.body
      const pic = await prisma.dog_pics.create({
        data: {
          dog_id: BigInt(dog_id),
          file_path,
          position,
        }
      })
      return pic
    })

    //DELETE dog-pics/:id
    fastify.delete('/dog-pics/:id', async (request) => {
      const pic = await prisma.dog_pics.delete({
        where: { id: BigInt(request.params.id) }
      })
      return pic
    })
}

module.exports = dogPicsRoutes