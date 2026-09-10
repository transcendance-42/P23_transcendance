import prisma from '../../utils/prisma.js'

async function findUser(email) {
	return prisma.users.findUnique({ where: { email } })
}

async function creatUser(request) {
	return prisma.users.create({
		data: {
			first_name: request.body.first_name,
			last_name: request.body.last_name,
			age: request.body.age,
			email: request.body.email,
			password_hash: request.body.password
		}
	})
}

export {findUser, creatUser}