import prisma from '../../utils/prisma.js'

async function findDogDocuByDogId(dogId) {
	return prisma.dogs.findUnique({
		where: { id: BigInt(dogId) },
			select: {
				id: true,
				dog_formular_path: true,
				dog_formular_type: true
			}
		})
}

async function updateDogDocu(dogId, filePath, mimeType) {
	return prisma.dogs.update({
		where: { id: BigInt(dogId) },
			data: {
				dog_formular_path: filePath,
				dog_formular_type: mimeType
			}
		})
}

async function deleteDogDocu(dogId) {
	return prisma.dogs.update({
		where: { id: BigInt(dogId) },
			data: {
				dog_formular_path: null,
				dog_formular_type: null
			}
	})
}

export { findDogDocuByDogId, updateDogDocu, deleteDogDocu }