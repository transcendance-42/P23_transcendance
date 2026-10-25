import {findDogsId, creatDogs, updateDogs, deleteDogs, findAllDogs, findAllDogsExceptMe, findDogsAroundMe} from './dogs_queries.js'
import { AppError } from '../../error.js'

async function GetAllDogs(reply) {
	const dogs = await findAllDogs()
	return dogs
}

async function GetAllDogsExceptMe(request, reply) {
	const dogs = await findAllDogsExceptMe(request.userId)
	return dogs
}

async function GetDogsAroundMe(request, reply) {
	const dogs = await findDogsAroundMe(request.userId)
	return dogs
}

async function GetDogsByID (request, reply) {
	const dog = await findDogsId(request)
	if (!dog) throw new AppError(404, 'NOT_FOUND', 'Dog not found')
	return dog
}

async function PostDogs(request, reply) {
    try {
      const rest  = request.body
      const owner_id = request.userId
      const dog = await creatDogs(owner_id, rest)
      return { id: dog.id }
    } catch (e) {
    	if (e.code === 'P2002')
			throw new AppError(409, 'DOG_ALREADY_EXISTS', 'A dog already exists')
		throw e
    }
}

async function PostDogsPublicApi(request, reply) {
    try {
      const rest  = request.body
      const owner_id = request.params.userId
      const dog = await creatDogs(owner_id, rest)
      return { id: dog.id }
    } catch (e) {
    	if (e.code === 'P2002')
			throw new AppError(409, 'DOG_ALREADY_EXISTS', 'A dog already exists')
		throw e
    }
}

async function PutDogs (request, reply) {
    try {
      const dog = await updateDogs(request)
      return dog  // la par exemple on envoie tous les champs complet et ils sont pas tous necessaire
                  // mais c est du boulot a tout changer
    } catch (e) {
        if (e.code === 'P2025') throw new AppError(404, 'NOT_FOUND', 'Dog not found')
        throw e
    }
  }

async function DeleteDogs (request, reply) {
    try {
      await deleteDogs(request)
      return reply.code(204).send()
    } catch (e) {
      if (e.code === 'P2025') throw new AppError(404, 'NOT_FOUND', 'Dog not found')
      throw e
    }
}

export {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogs, GetAllDogsExceptMe, GetDogsAroundMe, PostDogsPublicApi }