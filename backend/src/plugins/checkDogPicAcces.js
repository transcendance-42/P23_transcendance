import { findDogsIdParams, findDogByUserId } from "../modules/dog/dogs_queries.js";
import { findPicsByDogId, findDogByPicId, findPicDogById } from "../modules/dog_upload/dog_pics/dog_pics_queries.js";
import { findActiveMatch } from "../modules/matches/matches_queries.js";
import { AppError } from "../error.js";

async function checkAccesDogPicParams(request, reply) {
    const userId = request.userId
    const dogId = request.params.dogId
    if (request.role === 'admin')
        return;
    const dog = await findDogsIdParams(dogId)
    if (!dog)
        throw new AppError(404, 'NOT FOUND', 'Dog not found')        
    if (userId.toString() !== dog.owner_id.toString())
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')
}
    
async function checkAccesGetDogPic(request, reply) {
    if (request.role === 'admin')
        return
    const ownerDogPicId = await findDogByPicId(request.params.id)
    if (!ownerDogPicId)
        throw new AppError(404, 'NOT FOUND', 'Dog pic not found')
    if (ownerDogPicId.dogs.owner_id.toString() === request.userId.toString())
        return
    const userdog = await findDogByUserId(request.userId)
    if (!userdog)
        throw new AppError(404, 'NOT FOUND', 'Your Dog not found')
    const is_matched = await findActiveMatch(ownerDogPicId.dogs.id, userdog.id)
    if (!is_matched)
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')
}

async function checkAccesDogPic(request, reply) {
    const userId = request.userId
    const dogId = request.body.dog_id.value
    if (request.role === 'admin')
        return
    const dog = await findDogsIdParams(dogId)
    if (!dog)
        throw new AppError(404, 'NOT FOUND', 'Dog not found')        
    if (userId.toString() !== dog.owner_id.toString())
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')   
}

async function checkAccesDogPicDelete(request, reply) {
    const userId = request.userId
    const dogPicId = request.params.id
    if (request.role === 'admin')
        return;
    const dogPic = await findPicDogById(dogPicId)
    if (!dogPic)
        throw new AppError(404, 'NOT FOUND', 'Dog pic not found')       
    if (userId.toString() !== dogPic.dogs.owner_id.toString())
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')   
}

async function checkAccesDogPicPut(request, reply) {
    const userId = request.userId
    const dogPicId = request.params.id
    if (request.role === 'admin')
        return;
    const dogPic = await findPicDogById(dogPicId)
    console.log(dogPic)
    if (userId.toString() !== dogPic.dogs.owner_id?.toString())
        return reply.code(403).send({error: 'Forbidden'})  
}


export { checkAccesGetDogPic, checkAccesDogPic, checkAccesDogPicDelete, checkAccesDogPicPut }