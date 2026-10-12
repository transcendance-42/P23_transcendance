import prisma from '../../utils/prisma.js'

async function findUser(email) {
	return prisma.users.findUnique({
		where: { email },
		select: {
            id: true,
            email: true,
            role: true,
            password_hash: true,
            date_of_birth: true,
            city: true,
            first_name: true,
            last_name: true
        }
	})
}

async function creatUser(request, hashPassword, date) {

	const lng = Number(request.body.longitude)
	const lat = Number(request.body.latitude)

	return prisma.$transaction(async (tx) => {

		const newUser = await tx.users.create({
			data: {
				first_name: request.body.first_name,
				last_name: request.body.last_name,
				email: request.body.email,
				password_hash: hashPassword,
				city: request.body.city,
				date_of_birth: date, 
				radius: Number(request.body.radius)
			},
			select: {
			id: true
		}
		})

		await tx.$executeRaw`
			UPDATE "users"
			SET "position" = ST_setSRID(ST_Makepoint(${lng}::float8,${lat}::float8), 4326)::geography
			WHERE "id" = ${newUser.id}`

		return newUser
	})
}

async function creatUserRawData(data) {
	return prisma.users.create({
		data: {
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			google_id: data.google_id,
			password_hash: data.password_hash ?? null,
			city: data.city ?? null, 
			date_of_birth: data.date ?? null
		},
		select: {
            id: true,
            email: true,
            role: true,
            date_of_birth: true,
            city: true,
            first_name: true,
            last_name: true
        }
	})
}

async function updateLastSeenAt(id) {
	return prisma.users.update({
		where: { id:id },
		data: {
			lastSeenAt: new Date()
		},
		select: {
            id: true
        }
	})
}

export {findUser, creatUser, creatUserRawData, updateLastSeenAt}