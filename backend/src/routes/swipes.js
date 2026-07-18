const prisma = require('../utils/prisma')

async function swipesRoutes(fastify) {
    //POST /swipes 
    fastify.post('/swipes', async (request) => {
        const { swiper_dog_id, swiped_dog_id, direction } = request.body
        const swipes = await prisma.swipes.create({
            data: {direction: String(direction), 
                swiped_dog_id: BigInt(swiped_dog_id),
                swiper_dog_id: BigInt(swiper_dog_id)
            }
        })
        // if match --> create match and return swipes with match = true
        if (direction === 'right')
        {
            const isItAMatch = await prisma.swipes.findFirst({
                where : {
                    swiper_dog_id: BigInt(swiped_dog_id),
                    swiped_dog_id: BigInt(swiper_dog_id),
                    direction: 'right',
                }
            })
            if (isItAMatch)
            {
                const matches = await prisma.matches.create({
                    data: {
                        id_dog1: BigInt(swiper_dog_id),
                        id_dog2: BigInt(swiped_dog_id),
                    }
                })
                return { swipe: swipes, match: matches, matched: true }
            }
        }
        //else return swipes with match = false
        return { swipe: swipes, matched: false }
    })
}
module.exports = swipesRoutes