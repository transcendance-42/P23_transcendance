import { findDogsIdParams } from "../modules/dog/dogs_queries.js";

async function checkDogAcces(request, reply) {
     // const userId = request.userId // pour l'instant undefined besoin de l'auth de token
    const userId = 1;
    const dogId = request.params.id
    if (request.role === 'admin')
        return;
    const dog = await findDogsIdParams(dogId)
    if(!dog)
        return reply.code(405).send({error: 'Unknown dog'})
    if (userId.toString() !== dog.owner_id.toString())
        return reply.code(403).send({error: 'Forbidden'})     
}

async function checkDogAccesPost(request, reply) {
     // const userId = request.userId // pour l'instant undefined besoin de l'auth de token
    const userId = 1;
    const ownerId = request.body.owner_id
    if (request.role === 'admin')
        return;
    if (userId.toString() !== ownerId.toString())
        return reply.code(403).send({error: 'Forbidden'})     
}

export { checkDogAcces, checkDogAccesPost }