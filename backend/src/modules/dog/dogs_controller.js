const {findDogsId, creatDogs, updateDogs, deleteDogs} = require('./dogs_queries')

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
      const { owner_id, ...rest } = request.body
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
      if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog not found' })
      return reply.code(500).send({ error: e.message })
    }
  }

module.exports = {GetDogsByID, PostDogs, PutDogs, DeleteDogs}