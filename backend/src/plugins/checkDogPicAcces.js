import { findDogsIdParams } from "../modules/dog/dogs_queries.js";
import { findPicsByDogId } from "../modules/dog_upload/dog_pics/dog_pics_queries.js";
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

async function checkAccesDogPic(request, reply) {
    const userId = request.userId
    const dogId = request.body.dog_id.value
    if (request.role === 'admin')
        return;
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
    const dogPic = await findPicsByDogId(dogPicId)
    if (!dogPic)
        throw new AppError(404, 'NOT FOUND', 'Dog pic not found')       
    if (userId.toString() !== dogPic.dogs.owner_id.toString())
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')
}


export { checkAccesDogPicParams, checkAccesDogPic, checkAccesDogPicDelete }