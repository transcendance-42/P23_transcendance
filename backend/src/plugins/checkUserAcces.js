import { findDogByUserId } from '../modules/dog/dogs_queries.js'
import { findActiveMatch } from '../modules/matches/matches_queries.js'

async function checkUserGetAcces(request, reply) {
    if (request.roles === 'amdin')
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
}

async function checkUserAcces(request, reply) {
    const userId = request.userId
    const paramsUserId = request.params.id
    if (request.role === 'admin')
        return;
    if (userId.toString() !== paramsUserId.toString())
        return reply.code(403).send({error: 'Forbidden'})      
}

async function checkUserAccesAdmin(request, reply) {
    if (request.role === 'admin') // seulement l'admin a le droit de get tous les users
        return;
    else
        return reply.code(403).send({error: 'Forbidden'})      
}

export { checkUserAcces, checkUserGetAcces, checkUserAccesAdmin }