const fastify = require('fastify')({ logger: true })
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

fastify.register(require('./routes/dogs'), { prefix: '/api' })
fastify.register(require('./routes/swipes'), { prefix: '/api' })
fastify.register(require('./routes/dog-pics'), { prefix: '/api' })
fastify.register(require('./routes/matches'), { prefix: '/api' })
fastify.register(require('./routes/messages'), { prefix: '/api' })

fastify.listen({ port: 3000, host: '0.0.0.0' })