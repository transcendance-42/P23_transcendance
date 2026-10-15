import { findDogsIdParams } from "../modules/dog/dogs_queries.js";
import { findPicsByDogId } from "../modules/dog_upload/dog_pics/dog_pics_queries.js";

async function checkAccesDogPicParams(request, reply) {
    const userId = request.userId
    const dogId = request.params.dogId
    if (request.role === 'admin')
        return;
    const dog = await findDogsIdParams(dogId)
    if (!dog)
        return reply.code(404).send({error: 'Unknown dog'})        
    if (userId.toString() !== dog.owner_id.toString())
        return reply.code(403).send({error: 'Forbidden'})  
    
}

async function checkAccesDogPic(request, reply) {
    const userId = request.userId
    const dogId = request.body.dog_id.value
    if (request.role === 'admin')
        return;
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


export { checkAccesDogPicParams, checkAccesDogPic, checkAccesDogPicDelete }