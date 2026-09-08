import fp from 'fastify-plugin'
import cors from '@fastify/cors'

async function corsPlugin(fastify){
    fastify.register(cors, {
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ]
})
}

export default fp(corsPlugin)