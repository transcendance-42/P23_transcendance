import prisma from '../../utils/prisma.js'

async function findUser(email) {
	return prisma.users.findUnique({ where: { email } })
}

async function creatUser(request, hashPassword, date, geoData) {
	const lng = geoData.longitude
	const lat = geoData.latitude

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
		}
	})
}

async function updateLastSeenAt(id) {
	return prisma.users.update({
		where: { id:id },
		data: { lastSeenAt: new Date() }
	})
}

export {findUser, creatUser, creatUserRawData, updateLastSeenAt}