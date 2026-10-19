import { findDogByUserId } from '../modules/dog/dogs_queries.js'
import { findActiveMatch } from '../modules/matches/matches_queries.js'
import { findUserById } from '../modules/users/users_queries.js'
import { AppError } from "../error.js";

async function checkUserGetAcces(request, reply) {
    if (request.roles === 'amdin')
        return
    const userByid = await findUserById(request.params.id)
    if (!userByid)
		throw new AppError(404, 'NOT_FOUND', 'Dog not found')
    if (userByid.id.toString() === request.params.id.toString())
        return
    const dogUser = await findDogByUserId(request.userId)
    if (!dogUser)
		throw new AppError(404, 'NOT_FOUND', 'Dog not found')
    const dogUserTarget = await findDogByUserId(request.params.id)
    if (!dogUserTarget)
		throw new AppError(404, 'NOT_FOUND', 'Dog not found')
    const is_matched = await findActiveMatch(dogUser.id, dogUserTarget.id)
    if (!is_matched)
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')
}

async function checkUserGetPicAcces(request, reply) {
    try {
        if (request.roles === 'admin')
            return
        const dogUser = await findDogByUserId(request.userId)
        if (!dogUser)
            return reply.code(405).send({ error: 'Dog not found' })
        const dogUserTarget = await findDogByUserId(request.params.id)
        if (!dogUserTarget)
            return reply.code(405).send({ error: 'Dog not found' })
        if (dogUserTarget.owner_id.toString() === request.userId.toString())
            return
        const is_matched = await findActiveMatch(dogUser.id, dogUserTarget.id)
        if (!is_matched)
            return reply.code(403).send({ error: 'forbidden access' })
    } catch (e) {
        request.log.error(e)
        return reply.code(500).send({ error: e.message })
    }
}

async function checkUserAcces(request, reply) {
    const userId = request.userId
    const paramsUserId = request.params.id
    if (request.role === 'admin')
        return;
    if (userId.toString() !== paramsUserId.toString())
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')      
}

async function checkUserAccesAdmin(request, reply) {
    if (request.role === 'admin') // seulement l'admin a le droit de get tous les users
        return;
    else
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')      
}

export { checkUserAcces, checkUserGetAcces, checkUserGetPicAcces, checkUserAccesAdmin }