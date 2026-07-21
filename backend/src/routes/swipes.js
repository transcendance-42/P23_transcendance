const prisma = require('../utils/prisma')

async function swipesRoutes(fastify) {
    fastify.post('/swipes', async (request) => {
        const { swiper_dog_id, swiped_dog_id, direction } = request.body

        const swipe = await prisma.swipes.create({
            data: {
                direction: String(direction),
                swiped_dog_id: BigInt(swiped_dog_id),
                swiper_dog_id: BigInt(swiper_dog_id)
            }
        })
        if (direction === 'right') {
            const isItAMatch = await prisma.swipes.findFirst({
                where: {
                    swiper_dog_id: BigInt(swiped_dog_id),
                    swiped_dog_id: BigInt(swiper_dog_id),
                    direction: 'right',
                }
            })
            if (isItAMatch) {
                const existingMatch = await prisma.matches.findFirst({
                    where: {
                        OR: [
                            { id_dog1: BigInt(swiper_dog_id), id_dog2: BigInt(swiped_dog_id) },
                            { id_dog1: BigInt(swiped_dog_id), id_dog2: BigInt(swiper_dog_id) }
                        ]
                    }
                })
                if (!existingMatch) {
                    const match = await prisma.matches.create({
                        data: { id_dog1: BigInt(swiper_dog_id), id_dog2: BigInt(swiped_dog_id) }
                    })
                    return { swipe, match, matched: true }
                }

                return { swipe, match: existingMatch, matched: true }
            }
        }
        return { swipe, matched: false }
    })
}

module.exports = swipesRoutes