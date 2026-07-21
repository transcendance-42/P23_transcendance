const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')

fastify.register(cors, {
  origin: 'http://localhost:5173'
})

BigInt.prototype.toJSON = function() { return this.toString() }

const prisma = require('./utils/prisma')

fastify.get('/health', async () => {
  return { status: 'ok' }
})

fastify.get('/users', async () => {
  const users = await prisma.users.findMany({
    omit: {
      password_hash: true
    }
  })
  return users
})

fastify.register(require('./routes/swipes'), { prefix: '/api' })

fastify.listen({ port: 3000, host: '0.0.0.0' })