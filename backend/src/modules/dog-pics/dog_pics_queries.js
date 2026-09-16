import prisma from '../../utils/prisma.js'

async function findPicsByDogId(dogId) {
  return prisma.dog_pics.findMany({
    where: { dog_id: BigInt(dogId) },
    orderBy: { position: 'asc' }
  })
}

async function createDogPic(data) {
  return prisma.dog_pics.create({
    data: { dog_id: BigInt(data.dog_id), 
            file_path: data.file_path,
            position: data.position }
  })
}

async function deleteDogPic(id) {
  return prisma.dog_pics.delete({ where: { id: BigInt(id) } })
}

export { findPicsByDogId, createDogPic, deleteDogPic }