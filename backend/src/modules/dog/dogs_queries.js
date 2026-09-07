async function findDogsId() {
	prisma.dogs.findUnique({
		where: { id: BigInt(request.params.id) }
		})
}

modules.exports = {findDogsId, }