const fp = require('fastify-plugin')
const cors = require('@fastify/cors')

async function corsPlugin(fastify){
    fastify.register(cors, {
    origin: 'http://localhost:5173'
})
}

module.exports = fp(corsPlugin)