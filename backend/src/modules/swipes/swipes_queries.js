import prisma from '../../utils/prisma.js'

async function creatSwipe(swiper_id, target_id, direction) {
	return prisma.swipes.create({
                data: {
                    direction,
                    target_id: BigInt(target_id),
                    swiper_id: BigInt(swiper_id)
                }
            })	
}

async function findReverseSwipe (swiper_id, target_id) {
	return prisma.swipes.findFirst({
                    where: {
                        swiper_id: BigInt(target_id),
                        target_id: BigInt(swiper_id),
                        direction: 'right',
                    }
                })
}

async function findExistingMatch(dog1_id, dog2_id) {
  return prisma.matches.findFirst({
    where: {
      OR: [
        { id_dog1: BigInt(dog1_id), id_dog2: BigInt(dog2_id) },
        { id_dog1: BigInt(dog2_id), id_dog2: BigInt(dog1_id) }
      ]
    }
  })
}

async function createMatch(dog1_id, dog2_id) {
  return prisma.matches.create({
    data: { id_dog1: BigInt(dog1_id), id_dog2: BigInt(dog2_id) }
  })
}

export {creatSwipe, findReverseSwipe, findExistingMatch, createMatch}