const prisma = require('../utils/prisma')

async function authRoutes(fastify) {
    fastify.post("/auth/login", {schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      },
      required: ['email', 'password']
    }
    }
    },  async (request, reply) => {
        const email = request.body.email
        const password = request.body.password
        const user = await prisma.users.findUnique({ where: { email } })
        if (!user)
                return reply.code(401).send({ error: 'User not found' })
        return { success: true, userId: user.id }
    }
    )
  }

module.exports = authRoutes