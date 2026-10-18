import { findDogsId, creatDogs, updateDogs, deleteDogs, findAllDogs, findAllDogsExceptMe, findDogsAroundMe } from './dogs_queries.js'

async function GetAllDogs(reply) {
    try {
      const dogs = await findAllDogs()
      return dogs
    } 
    catch (e) {
      return reply.code(500).send({ error: e.message })
    } 
}

async function GetAllDogsExceptMe(request, reply) {
    try {
        const dogs = await findAllDogsExceptMe(request.userId)
        return dogs
    } catch (e) {
        return reply.code(500).send({ error: e.message })
    }
}

async function GetDogsAroundMe(request, reply) {
    try {
        const dogs = await findDogsAroundMe(request.userId)
        return dogs
    } catch (e) {
        return reply.code(500).send({ error: e.message })
    }
}

async function GetDogsByID (request, reply) {
    try {
      const dog = await findDogsId(request)
      if (!dog) return reply.code(404).send({ error: 'Dog not found' })
      return dog
    } catch (e) {
      return reply.code(500).send({ error: e.message })
    }
}

async function PostDogs(request, reply) {
    try {
      const rest  = request.body
      const owner_id = request.userId
      const dog = await creatDogs(owner_id, rest)
      return { id: dog.id }
    } catch (e) {
      if (e.code === 'P2002') return reply.code(409).send({ error: 'Dog already exist' })
      return reply.code(500).send({ error: e.message })
    }
}

async function PutDogs (request, reply) {
    try {
      const dog = await updateDogs(request)
      return dog  // la par exemple on envoie tous les champs complet et ils sont pas tous necessaire
                  // mais c est du boulot a tout changer
    } catch (e) {
        if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog not found' })
        return reply.code(500).send({ error: e.message })
      }
}

async function DeleteDogs (request, reply) {
    try {
      await deleteDogs(request)
      return reply.code(204).send({ success: true })
    } catch (e) {
      console.error('DeleteDogs error:', e.message)  
      if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog not found' })
      return reply.code(500).send({ error: e.message })
    }
}

export {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogs, GetAllDogsExceptMe, GetDogsAroundMe }