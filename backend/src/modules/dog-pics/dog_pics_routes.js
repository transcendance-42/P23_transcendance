const { getDogPicsSchema, createDogPicSchema, deleteDogPicSchema } = require('./dog_pics_schema')
const { getDogPics, postDogPic, removeDogPic } = require('./dog_pics_controller')

async function dogPicsRoutes(fastify) {
  fastify.get('/dog-pics/:dogId', getDogPicsSchema, getDogPics)
  fastify.post('/dog-pics', createDogPicSchema, postDogPic)
  fastify.delete('/dog-pics/:id', deleteDogPicSchema, removeDogPic)
}

module.exports = dogPicsRoutes