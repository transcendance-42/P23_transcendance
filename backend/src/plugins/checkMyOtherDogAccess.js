import { findDogsIdParams, findDogByUserId } from '../modules/dog/dogs_queries.js'
import { findActiveMatch } from '../modules/matches/matches_queries.js'

async function checkMyOtherAccess(request, reply) {
	if (request.role === 'admin')
		return;
	const dog = await findDogsIdParams(request.params.id)
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

export { checkMyOtherAccess }