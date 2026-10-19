import { findDogsIdParams } from "../modules/dog/dogs_queries.js";
import { AppError } from "../error.js";

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

// async function checkDogAccesPost(request, reply) {
//     const userId = request.userId
//     const ownerId = request.body.owner_id
//     if (request.role === 'admin')
//         return;
//     if (userId.toString() !== ownerId.toString())
//         return reply.code(403).send({error: 'Forbidden'})     
// }

export { checkDogAcces }