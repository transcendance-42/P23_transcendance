import { findDogsIdParams } from "../modules/dog/dogs_queries.js";
import { findPicsByDogId, findDogByPicId } from "../modules/dog-pics/dog_pics_queries.js";

async function checkAccesGetDogPic(request, reply) {
	if (request.role === 'admin')
		return
    const ownerDogPicId = await findDogByPicId(request.params.id)
    if (!ownerDogPicId)
        return reply.code(405).send({error: 'dog pic not found'})
    if (ownerDogPicId.dogs.owner_id.toString() === request.userId.toString())
        return
    const userdog = await findDogByUserId(request.userId)
	if (!userdog)
		return reply.code(405).send({ error: 'Yout dog not found' })
    const is_matched = await findActiveMatch(ownerDogPicId.dogs.id, userdog.id)
	if (!is_matched)
		return reply.code(403).send({ error: 'forbidden access' })
}

async function checkAccesDogPic(request, reply) {
    const userId = request.userId
    const dogId = request.body.dog_id.value
    if (request.role === 'admin')
        return
    const dog = await findDogsIdParams(dogId)
    if (!dog)
        return reply.code(404).send({error: 'Unknown dog'})        
    if (userId.toString() !== dog.owner_id.toString())
        return reply.code(403).send({error: 'Forbidden'})  
}

async function checkAccesDogPicDelete(request, reply) {
    const userId = request.userId
    const dogPicId = request.params.id
    if (request.role === 'admin')
        return;
    const dogPic = await findPicsByDogId(dogPicId)
    if (!dogPic)
        return reply.code(404).send({error: 'Unknown Dog Pic'})        
    if (userId.toString() !== dogPic.dogs.owner_id.toString())
        return reply.code(403).send({error: 'Forbidden'})  
}


export { checkAccesGetDogPic, checkAccesDogPic, checkAccesDogPicDelete }