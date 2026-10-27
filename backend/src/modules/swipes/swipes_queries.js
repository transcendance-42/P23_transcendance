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
    const firstDog = BigInt(dog1_id)
    const secondDog = BigInt(dog2_id)

    const [idDog1, idDog2] = firstDog < secondDog
        ? [firstDog, secondDog]
        : [secondDog, firstDog]

    return prisma.matches.findUnique({
        where: {
            id_dog1_id_dog2: {
                id_dog1: idDog1,
                id_dog2: idDog2
            }
        }
    })
}

async function createMatch(dog1_id, dog2_id) {
  const firstDog = BigInt(dog1_id)
  const secondDog = BigInt(dog2_id)
  const [idDog1, idDog2] = firstDog < secondDog
    ? [firstDog, secondDog]
    : [secondDog, firstDog]

  return prisma.matches.upsert({
    where: {
      id_dog1_id_dog2: {
        id_dog1: idDog1,
        id_dog2: idDog2
      }
    },
    create: {
      id_dog1: idDog1,
      id_dog2: idDog2
    },
    update: {}
  })
}

export {creatSwipe, findReverseSwipe, findExistingMatch, createMatch}