const { findUser } = require('./auth_queries')

async function login(request, reply) {
        const email = request.body.email
        const password = request.body.password
        const user = await findUser(email)
        if (!user)
                return reply.code(401).send({ error: 'User not found' })
        return { success: true, userId: user.id }
    }

module.exports = { login }