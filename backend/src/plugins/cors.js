const fp = require('fastify-plugin')
const cors = require('@fastify/cors')

async function corsPlugin(fastify){
    fastify.register(cors, {
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ]
})
}

module.exports = fp(corsPlugin)