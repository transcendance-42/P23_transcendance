const prisma = require('../utils/prisma')

async function swipesRoutes(fastify) {
    //POST /swipes
    fastify.post('/swipes', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    swiper_id: { type: 'integer' },
                    target_id: { type: 'integer' },
                    direction: { type: 'string', enum: ['left', 'right'] }
                },
                required: ['swiper_id', 'target_id', 'direction']
            }
        }
    }, async (request, reply) => {
        try {
            const { swiper_id, target_id, direction } = request.body

            const swipe = await prisma.swipes.create({
                data: {
                    direction,
                    target_id_id: BigInt(target_id),
                    swiper_id: BigInt(swiper_id)
                }
            })

            if (swiper_id === target_id)
                return reply.code(400).send({ error: 'A dog cannot swipe itself' })

            if (direction === 'right') {
                const isItAMatch = await prisma.swipes.findFirst({
                    where: {
                        swiper_id: BigInt(target_id),
                        target_id: BigInt(swiper_id),
                        direction: 'right',
                    }
                })

                if (isItAMatch) {
                    const existingMatch = await prisma.matches.findFirst({
                        where: {
                            OR: [
                                { id_dog1: BigInt(swiper_id), id_dog2: BigInt(target_id) },
                                { id_dog1: BigInt(target_id), id_dog2: BigInt(swiper_id) }
                            ]
                        }
                    })

                    if (!existingMatch) {
                        const match = await prisma.matches.create({
                            data: { id_dog1: BigInt(swiper_id), id_dog2: BigInt(target_id) }
                        })
                        return { swipe, match, matched: true }
                    }

                    return { swipe, match: existingMatch, matched: true }
                }
            }

            return { swipe, matched: false }
        } catch (e) {
            return reply.code(500).send({ error: e.message })
        }
    })
}

module.exports = swipesRoutes