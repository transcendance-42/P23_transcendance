import prisma from '../../../utils/prisma.js'
import { DogPrivateFields } from '../../dog/dogs_queries.js'
import { DogPublicFields } from '../../dog/dogs_queries.js'

async function findPicDogById(id) {
  return prisma.dog_pics.findUnique({ where: { id: BigInt(id)},
                                      include: {dogs: {select: DogPublicFields} }
})
}

async function findDogByPicId(id) {
  return prisma.dog_pics.findUnique({
    where: { id: BigInt(id) },
    include: {dogs: {select: DogPublicFields} }
  })
}

async function findPicsByDogId(dogId) {
  return prisma.dog_pics.findMany({
    where: { dog_id: BigInt(dogId) },
    orderBy: { position: 'asc' },
    include: {dogs: {select: DogPublicFields} }
  })
}

async function createDogPic(request, file_path) {
  return prisma.dog_pics.create({
    data: { dog_id: BigInt(request.body.dog_id.value), 
            file_path: file_path,
            mime_type: request.body.file.mimetype,
            position: Number(request.body.position.value) }
  })
}

async function updateDogPic(request, id, file_path) {
  return prisma.dog_pics.update({
    where: { id: BigInt(id) },
    data: {
      file_path: file_path,
      mime_type: request.body.file.mimetype,
      position: Number(request.body.position.value)
    }
  })
}

async function deleteDogPic(id) {
  return prisma.dog_pics.delete({ where: { id: BigInt(id) } })
}

export { findPicsByDogId, findPicDogById, findDogByPicId, createDogPic, updateDogPic, deleteDogPic }