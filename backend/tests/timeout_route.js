async function timeoutRoutes(fastify) {
	fastify.post('/api/caddy', async (request) => {
	  await new Promise(resolve => setTimeout(resolve, 40_000))
	  return { received: true }
	})
	
	fastify.post('/api/test-slow-upload', async (request) => {
	  return { received: true }
	})
}

export {timeoutRoutes} 