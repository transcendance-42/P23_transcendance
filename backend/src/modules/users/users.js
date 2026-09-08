const prisma = require('../../utils/prisma')

async function userRoutes(fastify) {

    // GET /users 
    fastify.get('/users', async (request, reply) => {
        try {
            const users = await prisma.users.findMany({
                where: { is_active: true },
                omit: { password_hash: true }
            })
            return users
        } catch (e) {
            return reply.code(500).send({ error: e.message })
        }
    })

    // GET /users/:id
    fastify.get('/users/:id', {
        schema: {
            params: {
                type: 'object',
                properties: { id: { type: 'integer' } },
                required: ['id']
            }
        }
    }, async (request, reply) => {
        try {
            const user = await prisma.users.findUnique({
                where: { id: BigInt(request.params.id) },
                omit: { password_hash: true }
            })
            if (!user) return reply.code(404).send({ error: 'User not found' })
            if (!user.is_active) return reply.code(404).send({ error: 'User not found' })
            return user
        } catch (e) {
            return reply.code(500).send({ error: e.message })
        }
    })

    // PUT /users/:id
    fastify.put('/users/:id', {
        schema: {
            params: {
                type: 'object',
                properties: { id: { type: 'integer' } },
                required: ['id']
            },
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    email: { type: 'string' }
                },
                additionalProperties: false
            }
        }
    }, async (request, reply) => {
        try {
            const user = await prisma.users.update({
                where: { id: BigInt(request.params.id) },
                data: request.body,
                omit: { password_hash: true }
            })
            return user
        } catch (e) {
            if (e.code === 'P2025') return reply.code(404).send({ error: 'User not found' })
            return reply.code(500).send({ error: e.message })
        }
    })

    // PATCH /users/:id/deactivate
    fastify.patch('/users/:id/deactivate', {
        schema: {
            params: {
                type: 'object',
                properties: { id: { type: 'integer' } },
                required: ['id']
            }
        }
    }, async (request, reply) => {
        try {
            const user = await prisma.users.update({
                where: { id: BigInt(request.params.id) },
                data: { is_active: false },
                omit: { password_hash: true }
            })
            return user
        } catch (e) {
            if (e.code === 'P2025') return reply.code(404).send({ error: 'User not found' })
            return reply.code(500).send({ error: e.message })
        }
    })
}

module.exports = userRoutes