import { findDogsIdParams, findDogByUserId } from "../modules/dog/dogs_queries.js";
import { findActiveMatch } from '../modules/matches/matches_queries.js'
import { AppError } from "../error.js";
import { findUserById } from "../modules/users/users_queries.js";

async function checkDogAcces(request, reply) {
    const userId = request.userId
    const dogId = request.params.id
    if (request.role === 'admin')
        return;
    const dog = await findDogsIdParams(dogId)
    if(!dog)
        throw new AppError(404, 'NOT FOUND', 'Dog not found')
    if (userId.toString() !== dog.owner_id.toString())
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')    
}

async function checkMyOtherAccess(request, reply) {
	if (request.role === 'admin')
		return;
    const dogId = request.params.id ?? request.params.dogId
	const dog = await findDogsIdParams(dogId)
	if (!dog)
		throw new AppError(404, 'NOT FOUND', 'Dog not found')
	const userdog = await findDogByUserId(request.userId)
	if (!userdog)
		throw new AppError(404, 'NOT FOUND', 'Your Dog not found')
	if (dog.owner_id.toString() === request.userId.toString())
		return
    const otherUser = await findUserById(dog.owner_id, request.userId)
    if (!otherUser)
		throw new AppError(404, 'NOT FOUND', 'Dog not found')
	if (!otherUser.is_active)
		throw new AppError(404, 'NOT FOUND', 'Dog not found')	
	const is_matched = await findActiveMatch(dog.id, userdog.id)
	if (!is_matched)
		throw new AppError(403, 'FORBIDDEN', 'Forbidden')
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