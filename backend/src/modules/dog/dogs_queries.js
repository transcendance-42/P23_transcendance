import prisma from '../../utils/prisma.js'

async function findAllDogs(){
	return prisma.dogs.findMany()
}

async function findDogsId(request) {
	return prisma.dogs.findUnique({where: { id: BigInt(request.params.id) }})
}

async function findDogsIdParams(dogId) {
	return prisma.dogs.findUnique({where: { id: BigInt(dogId) }})
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
	return prisma.dogs.delete({
			where: { id: BigInt(request.params.id) }
		})
}

export {findDogsId, creatDogs, updateDogs, deleteDogs, findAllDogs, findDogsIdParams}