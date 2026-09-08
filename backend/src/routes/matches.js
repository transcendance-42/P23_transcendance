const prisma = require('../utils/prisma')

async function matchesRoutes(fastify) {
   // GET matches:userId
   // the function receive the id of the user connected 
   // and return to the frontend if the match exist, who are the 2 dogs, the infos of the dogs 
    fastify.get('/matches/:userId', {
        schema: {
            params: {
                type: 'object',
                properties: { userId: { type: 'integer' } },
                required: ['userId']
            }
        }
    }, async (request, reply) => {
        try {
            const matches = await prisma.matches.findMany({
                where: {
                    OR: [
                        { matchesAsDog1: { owner_id: BigInt(request.params.userId) } },
                        { matchesAsDog2: { owner_id: BigInt(request.params.userId) } },
                    ]
                },
                include: {
                    matchesAsDog1: true,
                    matchesAsDog2: true,
                },
                orderBy: { created_at: 'asc' }
            })
            return matches
        } catch (e) {
            return reply.code(500).send({ error: e.message })
        }
    })
    fastify.get('/matches/:match_id/messages', async (request, reply) => {
        try {
            const messages = await prisma.messages.findMany({
                where: {
                    match_id: BigInt(request.params.match_id)
                },
                orderBy:{
                    created_at: 'asc'
                }
        });
            return messages;
        }
        catch (e) {
            return reply.code(500).send({error: e.message})
        }
    })

    fastify.get('/matches', async (request, reply) => {
        try {
            const matches = await prisma.matches.findMany({
                include:{
                    matchesAsDog1:true,
                    matchesAsDog2:true
                }
            })
            return matches;
        }
        catch (e) {
          return reply.code(500).send({ error: e.message })  
        }
    })

  //DELETE /matches/:id
  fastify.delete('/matches/:id', {
        schema: {
            params: {
                type: 'object',
                properties: { id: { type: 'integer' } },
                required: ['id']
            }
        }
    }, async (request, reply) => {
        try {
            const match = await prisma.matches.delete({
                where: { id: BigInt(request.params.id) }
            })
            return match
        } catch (e) {
            if (e.code === 'P2025') return reply.code(404).send({ error: 'Match not found' })
            return reply.code(500).send({ error: e.message })
        }
    })
}


module.exports = matchesRoutes