import prisma from '../../utils/prisma.js'

async function findAllDogs() {
	return prisma.dogs.findMany({
		include: { dog_pics: true }
	})
}

async function findAllDogsExceptMe(userId) {
    const myDog = await prisma.dogs.findFirst({ where: { owner_id: BigInt(userId) } })
    if (!myDog) return []

    // deja swipe
    const swipedIds = await prisma.swipes.findMany({
        where: { swiper_id: myDog.id },
        select: { target_id: true }
    })
    const excludedIds = swipedIds.map(s => s.target_id)
    excludedIds.push(myDog.id)

    return prisma.dogs.findMany({
        where: { id: { notIn: excludedIds } },
        include: {dog_pics: true}
    })
}

async function findDogsAroundMe (userId) {
    const myDog = await prisma.dogs.findFirst({ where: { owner_id: BigInt(userId) } })
    if (!myDog) return []

    // deja swipe
    const swipedIds = await prisma.swipes.findMany({
        where: { swiper_id: myDog.id },
        select: { target_id: true }
    })
    const excludedIds = swipedIds.map(s => s.target_id)
    excludedIds.push(Number(myDog.id))

    const nearUsers = await prisma.$queryRaw`
        SELECT * 
        FROM users u
        CROSS JOIN (
            SELECT position, radius 
            FROM users
            WHERE id = ${userId}
        ) me
        WHERE ST_DWithin(   
            u.position,
            me.position,
            me.radius * 1000::float8
        )
        AND u.position IS NOT NULL
        `

    const Dogs =  await prisma.dogs.findMany({
        where: { 
            owner_id: { in: nearUsers.map(n => n.id)  },
            id: { notIn: excludedIds },
        },
        include: {dog_pics: true}
    }) 

    return Dogs
}

async function findDogsId(request) {
	return prisma.dogs.findUnique({
		where: { id: BigInt(request.params.id) },
		include: { dog_pics: true }
	})
}

async function findDogsIdParams(dogId) {
    console.log('LA DOG ID')
    console.log(dogId)
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

export {findDogsId, creatDogs, updateDogs, deleteDogs, findAllDogs, findDogsIdParams, findAllDogsExceptMe, findDogsAroundMe}