require('./plugins/bigint');

const fastify = require('fastify')({ logger: true });
const swagger = require('@fastify/swagger');
const swaggerUI = require('@fastify/swagger-ui');


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

  fastify.register(require('./plugins/cors'))
  fastify.register(require('./modules/users/users_routes'), { prefix: '/api' })
  fastify.register(require('./modules/dog/dogs_routes'), { prefix: '/api' })
  fastify.register(require('./modules/swipes/swipes_routes'), { prefix: '/api' })
  fastify.register(require('./modules/dog-pics/dog_pics_routes'), { prefix: '/api' })
  fastify.register(require('./modules/matches/matches_routes'), { prefix: '/api' })
  fastify.register(require('./modules/messages/messages_routes'), { prefix: '/api' }) 
  fastify.register(require('./modules/auth/auth_routes'), { prefix: '/api' }) 

  return fastify
}

module.exports = buildApp