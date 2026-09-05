require('./plugins/bigint');

const fastify = require('fastify')({ logger: true });
const swagger = require('@fastify/swagger');
const swaggerUI = require('@fastify/swagger-ui');
const fastifyCookie = require('@fastify/cookie');
const fastifyJWT = require('@fastify/jwt');


function buildApp() {
  fastify.get('/health', async () => {
    return { status: 'ok' }
  })

  fastify.register(swagger, {
    openapi:{
      info: {
        title: 'Mon API',
        version: '1.0.0'
      }
    }
  })

  fastify.register(swaggerUI, {
    routePrefix: '/documentation'
  })
  fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET
  })

  fastify.register(fastifyJWT, {
    secret: process.env.JWT_SECRET
  })

  fastify.register(require('./plugins/cors'))
  fastify.register(require('./routes/users'), { prefix: '/api' })
  fastify.register(require('./routes/dogs'), { prefix: '/api' })
  fastify.register(require('./routes/swipes'), { prefix: '/api' })
  fastify.register(require('./routes/dog-pics'), { prefix: '/api' })
  fastify.register(require('./routes/matches'), { prefix: '/api' })
  fastify.register(require('./routes/messages'), { prefix: '/api' }) 
  fastify.register(require('./routes/auth'), { prefix: '/api' })
  fastify.register(require('./modules/auth/providers/google.provider'))

  return fastify
}

module.exports = buildApp