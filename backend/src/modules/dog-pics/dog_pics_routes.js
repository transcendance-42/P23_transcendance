const { getDogPicsSchema, createDogPicSchema, deleteDogPicSchema } = require('./dog_pics_schema')
const { getDogPics, postDogPic, removeDogPic } = require('./dog_pics_controller')

async function dogPicsRoutes(fastify) {
  fastify.get('/dog-pics/:dogId', {schema : getDogPicsSchema}, getDogPics)
  fastify.post('/dog-pics', {schema : createDogPicSchema}, postDogPic)
  fastify.delete('/dog-pics/:id', {schema : deleteDogPicSchema}, removeDogPic)
}

module.exports = dogPicsRoutes