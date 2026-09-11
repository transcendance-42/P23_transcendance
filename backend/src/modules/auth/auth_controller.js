import { creatUser, findUser } from './auth_queries.js'
import bcrypt from 'bcryptjs'

async function login(request, reply) {
        const email = request.body.email
        const password = request.body.password
        const user = await findUser(email)
        if (!user)
                return reply.code(401).send({ error: 'User not found' })
        return { success: true, userId: user.id }
    }

async function register(request, reply) {
        const existingUser = await findUser(request.body.email)
        if (existingUser)
                return reply.code(409).send({error : 'Email already exists'})
        const hashPassword = await bcrypt.hash(request.body.password, 10)
        await creatUser(request, hashPassword)
}

export { login, register }