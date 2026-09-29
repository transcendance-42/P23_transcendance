import {creatSwipe, findReverseSwipe, findExistingMatch, createMatch} from './swipes_queries.js'
import prisma from '../../utils/prisma.js'

async function postSwipe(request, reply) {
        try {
            const {target_id, direction } = request.body
            const userId = request.userId

            const myDog = await prisma.dogs.findFirst({ where: { owner_id: BigInt(userId) } })
            if (!myDog)
                return reply.code(404).send({ error: 'No dog found for this user' })

            const swiper_id = myDog.id

            const swipe = await creatSwipe(swiper_id, target_id, direction);
            
            if (direction === 'right') {
                const isItAMatch = await findReverseSwipe(swiper_id, target_id)
                if (isItAMatch) {
                    const existingMatch = await findExistingMatch(swiper_id, target_id)
                    if (!existingMatch) {
                        const match = await createMatch(swiper_id, target_id)
                        return { swipe, match, matched: true }
                    }
                    return { swipe, match: existingMatch, matched: true }
                }
            }
            return { swipe, matched: false }
        } catch (e) {
            return reply.code(500).send({ error: e.message })
        }
    }

export { postSwipe }