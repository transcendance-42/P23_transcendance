import prisma from '../../utils/prisma.js'
import { findPicsByDogId } from '../dog_upload/dog_pics/dog_pics_queries.js'
import { promises as fs } from 'node:fs'
import { findDogDocuByDogId } from '../dog_upload/dog_docu/dog_docu_queries.js'


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
    excludedIds.push(BigInt(myDog.id))

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
	return prisma.dogs.findUnique({where: { id: BigInt(dogId) }})
}

async function findDogByUserId(userId) {
    return prisma.dogs.findUnique({where: { owner_id: BigInt(userId)}})
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

async function deleteDogs(request, reply) {
    const id = BigInt(request.params.id)
    await prisma.$transaction(async (tx) => {
        const pics = await tx.dog_pics.findMany({
                        where: { dog_id: BigInt(id) },
                        orderBy: { position: 'asc' },
                        include: {dogs: true}
                    })
        if (pics){
            for (const pic of pics){
                await tx.dog_pics.delete({ where: { id: BigInt(pic.id) } })
                await fs.unlink(pic.file_path)
            }
        }
        const docu = await findDogDocuByDogId(id)
        if (docu?.dog_formular_path){
            await 	tx.dogs.update({
                where: { id: BigInt(id) },
			    data: {
                    dog_formular_path: null,
                    dog_formular_type: null
			    }
	        })
            await fs.unlink(docu.dog_formular_path)
        }
        await tx.swipes.deleteMany({ where: { OR: [{ swiper_id: id }, { target_id: id }] } })
        const matches = await tx.matches.findMany({ where: { OR: [{ id_dog1: id }, { id_dog2: id }] } })
        for (const match of matches) {
            await tx.messages.deleteMany({ where: { match_id: match.id } })
        }
        await tx.matches.deleteMany({ where: { OR: [{ id_dog1: id }, { id_dog2: id }] } })
        return await tx.dogs.delete({ where: { id:id } })
    })
}

export {findDogsId, findDogByUserId, creatDogs, updateDogs, deleteDogs, findAllDogs, findDogsIdParams, findAllDogsExceptMe, findDogsAroundMe}