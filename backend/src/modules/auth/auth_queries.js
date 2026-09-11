import prisma from '../../utils/prisma.js'

async function findUser(email) {
	return prisma.users.findUnique({ where: { email } })
}

export {findUser}