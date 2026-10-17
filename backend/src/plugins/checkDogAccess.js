import { findDogsIdParams, findDogByUserId } from "../modules/dog/dogs_queries.js";
import { findActiveMatch } from '../modules/matches/matches_queries.js'

async function checkDogAcces(request, reply) {
    const userId = request.userId
    const dogId = request.params.id
    if (request.role === 'admin')
        return;
    const dog = await findDogsIdParams(dogId)
    if(!dog)
        return reply.code(405).send({error: 'Unknown dog'})
    if (userId.toString() !== dog.owner_id.toString())
        return reply.code(403).send({error: 'Forbidden'})     
}

async function checkMyOtherAccess(request, reply) {
	if (request.role === 'admin')
		return;
    const dogId = request.params.id ?? request.params.dogId
	const dog = await findDogsIdParams(dogId)
	if (!dog)
		return reply.code(405).send({ error: 'Dog not found' })
	const userdog = await findDogByUserId(request.userId)
	if (!userdog)
		return reply.code(405).send({ error: 'Yout dog not found' })
	if (dog.owner_id.toString() === request.userId.toString())
		return
	const is_matched = await findActiveMatch(dog.id, userdog.id)
	if (!is_matched)
		return reply.code(403).send({ error: 'forbidden no match found' })
}

// async function checkDogAccesPost(request, reply) {
//     const userId = request.userId
//     const ownerId = request.body.owner_id
//     if (request.role === 'admin')
//         return;
//     if (userId.toString() !== ownerId.toString())
//         return reply.code(403).send({error: 'Forbidden'})     
// }

export { checkDogAcces, checkMyOtherAccess }