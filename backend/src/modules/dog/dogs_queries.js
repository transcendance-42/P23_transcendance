import prisma from '../../utils/prisma.js'

async function findAllDogs(){
	return prisma.dogs.findMany()
}

async function findAllDogsExceptMe(userId) {
    return prisma.dogs.findMany({
        where: { owner_id: { not: BigInt(userId) } }
    })
}

async function findDogsId(request) {
	return prisma.dogs.findUnique({where: { id: BigInt(request.params.id) }})
}

async function creatDogs(owner_id, rest) {
	return prisma.dogs.create({data: { owner_id: BigInt(owner_id), ...rest }})
}

async function updateDogs(request) {
	return prisma.dogs.update({
			where: { id: BigInt(request.params.id) },
			data: request.body
		})
}

async function deleteDogs(request) {
    const id = BigInt(request.params.id)
    await prisma.dog_pics.deleteMany({ where: { dog_id: id } })
    await prisma.swipes.deleteMany({ where: { OR: [{ swiper_id: id }, { target_id: id }] } })
    const matches = await prisma.matches.findMany({ where: { OR: [{ id_dog1: id }, { id_dog2: id }] } })
    for (const match of matches) {
        await prisma.messages.deleteMany({ where: { match_id: match.id } })
    }
    await prisma.matches.deleteMany({ where: { OR: [{ id_dog1: id }, { id_dog2: id }] } })
    return prisma.dogs.delete({ where: { id } })
}

export {findDogsId, creatDogs, updateDogs, deleteDogs, findAllDogs, findAllDogsExceptMe}