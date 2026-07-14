const fastify = require('fastify')({ logger: true })

const prisma = require('./utils/prisma')

fastify.get('/health', async () => {
  return { status: 'ok' }
})

fastify.get('/users', async () => {
  const users = await prisma.users.findFirst()
  return users
})

fastify.listen({ port: 3000, host: '0.0.0.0' })