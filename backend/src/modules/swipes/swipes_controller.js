import {creatSwipe, findReverseSwipe, findExistingMatch, createMatch} from './swipes_queries.js'
import prisma from '../../utils/prisma.js'
import { AppError } from '../../error.js'
import { findUserById } from '../users/users_queries.js'
import { findDogsIdParams} from '../dog/dogs_queries.js'

async function postSwipe(request, reply) {
    const {target_id, direction } = request.body
    const userId = request.userId

    const targetDog = await findDogsIdParams(target_id)
    if(!targetDog)
        throw new AppError(404, 'NOT_FOUND', 'Dog not found')
    const targetUser = await findUserById(targetDog.owner_id, userId)
    if(!targetUser)
        throw new AppError(404, 'NOT_FOUND', 'Dog not found')
    if(!targetUser.is_active)
        throw new AppError(404, 'NOT_FOUND', 'Dog not found')
    const myDog = await prisma.dogs.findFirst({ where: { owner_id: BigInt(userId) } })
    if (!myDog)
        throw new AppError(404, 'NOT_FOUND', 'No dog found for this user')
    if (BigInt(target_id) === BigInt(myDog.id))
        throw new AppError(409, 'CONFLICT', 'you can not swipe yourself')

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
            return { matched: true }
        }
    }
    return { matched: false }
}

export { postSwipe }