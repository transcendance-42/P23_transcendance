const prisma = require('../utils/prisma')

async function matchesRoutes(fastify) {
    //GET matches:userId
    //the function receive the id of the user connected 
    //and return to the frontend if the match exist, who are the 2 dogs, the infos of the dogs 
    fastify.get('/matches/:userId', async (request) => {
        const matches = await prisma.matches.findMany({
        where: {
            OR: [
            { dogs_matches_id_dog1Todogs: { owner_id: BigInt(request.params.userId) } },
            { dogs_matches_id_dog2Todogs: { owner_id: BigInt(request.params.userId) } },
            ]
        },
        include: {
            dogs_matches_id_dog1Todogs: true,
            dogs_matches_id_dog2Todogs: true,
        },
        orderBy: { created_at: 'asc' }
        })
        return matches
    })

  //DELETE /matches/:id
    fastify.delete('/matches/:id', async (request) => {
        const match = await prisma.matches.delete({
            where: { id: BigInt(request.params.id) }
        })
        return match
    })
}

module.exports = matchesRoutes