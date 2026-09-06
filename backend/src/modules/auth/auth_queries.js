async function findUser(email) {
	return prisma.users.findUnique({ where: { email } })
}

module.exports = findUser