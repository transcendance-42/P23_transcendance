
const fastify = require('fastify')({ logger: true })
 
fastify.get('/health', async () => {
  return { status: 'config minimal ok prêt pour developper backend' }
})
 
fastify.listen({ port: 3000, host: '0.0.0.0' })
 