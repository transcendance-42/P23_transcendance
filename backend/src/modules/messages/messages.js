const prisma = require('../utils/prisma')

async function messagesRoutes(fastify) {
    //GET /messages/:matchId
    fastify.get('/messages/:matchId', {
        schema: {
            params: {
                type: 'object',
                properties: { matchId: { type: 'integer' } },
                required: ['matchId']
            }
        }
    }, async (request, reply) => {
        try {
            const messages = await prisma.messages.findMany({
                where: { match_id: BigInt(request.params.matchId) },
                orderBy: { send_at: 'asc' },
                include:{users:true}
            })
            return messages
        } catch (e) {
            return reply.code(500).send({ error: e.message })
        }
    })

    //POST /messages
    fastify.post('/messages', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    match_id: { type: 'integer' },
                    sender_id: { type: 'integer' },
                    content: { type: 'string' }
                },
                required: ['match_id', 'sender_id', 'content']
            }
        }
    }, async (request, reply) => {
        try {
            const { match_id, sender_id, content } = request.body
            const message = await prisma.messages.create({
                data: {
                    match_id: BigInt(match_id),
                    sender_id: BigInt(sender_id),
                    content
                }
            })
            return message
        } catch (e) {
            return reply.code(500).send({ error: e.message })
        }
    })


  //DELETE /messages/:id
    fastify.delete('/messages/:id', {
        schema: {
            params: {
                type: 'object',
                properties: { id: { type: 'integer' } },
                required: ['id']
            }
        }
    }, async (request, reply) => {
        try {
            const message = await prisma.messages.delete({
                where: { id: BigInt(request.params.id) }
            })
            return message
        } catch (e) {
            if (e.code === 'P2025') return reply.code(404).send({ error: 'Message not found' })
            return reply.code(500).send({ error: e.message })
        }
    })
}

module.exports = messagesRoutes