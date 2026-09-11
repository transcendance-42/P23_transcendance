import prisma from '../../utils/prisma.js'

async function findUser(email) {
	return prisma.users.findUnique({ where: { email } })
}

async function creatUser(request, hashPassword, date) {
	return prisma.users.create({
		data: {
			first_name: request.body.first_name,
			last_name: request.body.last_name,
			email: request.body.email,
			password_hash: hashPassword,
			city: request.body.city,
			date_of_birth: date
		}
	})
}

export {findUser, creatUser}