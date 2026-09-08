import prisma from '../../utils/prisma.js'

async function findPicsByDogId(dogId) {
  return prisma.dog_pics.findMany({
    where: { dog_id: BigInt(dogId) },
    orderBy: { position: 'asc' }
  })
}

async function createDogPic(dog_id, file_path, position) {
  return prisma.dog_pics.create({
    data: { dog_id: BigInt(dog_id), file_path, position }
  })
}

async function deleteDogPic(id) {
  return prisma.dog_pics.delete({ where: { id: BigInt(id) } })
}

export { findPicsByDogId, createDogPic, deleteDogPic }