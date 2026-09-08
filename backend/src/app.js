import './plugins/bigint.js';

import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import corsPlugin from './plugins/cors.js';
import fastifyCookie from '@fastify/cookie';
import { usersRoutes } from './modules/users/users_routes.js';
import { dogsRoutes } from './modules/dog/dogs_routes.js';
import { swipesRoutes }from './modules/swipes/swipes_routes.js';
import { dogPicsRoutes} from './modules/dog-pics/dog_pics_routes.js';
import { matchesRoutes }from './modules/matches/matches_routes.js';
import { messagesRoutes } from './modules/messages/messages_routes.js';
import { authRoutes } from './modules/auth/auth_routes.js';

const fastify = Fastify({ logger: true });

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
    secret: process.env.COOKIE_SECRET,
    parseOptions:{}
  })



  fastify.register(corsPlugin)
  fastify.register(usersRoutes, { prefix: '/api' })
  fastify.register(dogsRoutes, { prefix: '/api' })
  fastify.register(swipesRoutes, { prefix: '/api' })
  fastify.register(dogPicsRoutes, { prefix: '/api' })
  fastify.register(matchesRoutes, { prefix: '/api' })
  fastify.register(messagesRoutes, { prefix: '/api' }) 
  fastify.register(authRoutes, { prefix: '/api' }) 

  return fastify
}

export default buildApp