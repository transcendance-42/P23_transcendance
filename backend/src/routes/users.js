const prisma = require('../utils/prisma')

async function usersRoutes(fastify) {
  fastify.get('/users', async () => {
    const users = await prisma.users.findMany({
      omit: {
        password_hash: true
      }
    })
    return users
  })
}

module.exports = usersRoutes