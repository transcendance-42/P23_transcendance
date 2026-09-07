const { findPicsByDogId, createDogPic, deleteDogPic } = require('./dog-pics.queries')

async function getDogPics(request, reply) {
  try {
    return await findPicsByDogId(request.params.dogId)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function postDogPic(request, reply) {
  try {
    const { dog_id, file_path, position } = request.body
    return await createDogPic(dog_id, file_path, position)
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function removeDogPic(request, reply) {
  try {
    return await deleteDogPic(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'Dog pic not found' })
    return reply.code(500).send({ error: e.message })
  }
}
	
module.exports = { getDogPics, postDogPic, removeDogPic }