const prisma = require('../utils/prisma')

async function messagesRoutes(fastify) {
    //GET /messages/:matchId
    fastify.get('/messages/:matchId', async (request) => {
        const message = await prisma.messages.findMany({
        where: { match_id: BigInt(request.params.matchId )},
        orderBy: { send_at: 'asc' }  
        })
        return message
    })

    //POST /messages
    fastify.post('/messages', async (request) => {
        const { match_id, sender_id, content } = request.body
        const message = await prisma.messages.create({
        data: { match_id: BigInt(match_id),
            sender_id: BigInt(sender_id),
            content }
        })
        return message
    })

  //DELETE /messages/:id
    fastify.delete('/messages/:id', async (request) => {
        const message = await prisma.messages.delete({
            where: { id: BigInt(request.params.id) }
        })
        return message
    })
}

module.exports = messagesRoutes