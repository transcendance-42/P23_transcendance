require('./plugins/bigint')

const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')

function buildApp() {
  fastify.register(cors, {
    origin: 'http://localhost:5173'
  })

  fastify.get('/health', async () => {
    return { status: 'ok' }
  })

  fastify.register(require('./routes/users'))
  fastify.register(require('./routes/dogs'), { prefix: '/api' })
  fastify.register(require('./routes/swipes'), { prefix: '/api' })
  fastify.register(require('./routes/dog-pics'), { prefix: '/api' })
  fastify.register(require('./routes/matches'), { prefix: '/api' })
  fastify.register(require('./routes/messages'), { prefix: '/api' })

  return fastify
}

module.exports = buildApp