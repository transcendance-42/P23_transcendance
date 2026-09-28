import {findDogsId, creatDogs, updateDogs, deleteDogs, findAllDogs, findAllDogsExceptMe} from './dogs_queries.js'

async function GetAllDogs() {
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
      return dog
    } catch (e) {
      return reply.code(500).send({ error: e.message })
    }
  }

async function PutDogs (request, reply) {
    try {
      const dog = await updateDogs(request)
      return dog
    } catch (e) {
        if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog not found' })
        return reply.code(500).send({ error: e.message })
      }
  }

async function DeleteDogs (request, reply) {
    try {
      const dog = await deleteDogs(request)
      return dog
    } catch (e) {
      console.error('DeleteDogs error:', e.message)  
      if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog not found' })
      return reply.code(500).send({ error: e.message })
    }
  }

export {GetDogsByID, PostDogs, PutDogs, DeleteDogs, GetAllDogs, GetAllDogsExceptMe }