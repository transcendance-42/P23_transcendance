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
        try {
                const existingUser = await findUser(request.body.email)
                if (existingUser)
                        return reply.code(409).send({error : 'Email already exists'})
        } catch (e) {
                console.error(e)
                return reply.code(500).send({error : e.message})
        }
        const birthDate = new Date(request.body.date_of_birth);
        const today = new Date();
        const maxBirthDate = new Date(
                1899,
                today.getMonth(),
                today.getDate()
        )
        const minBirthDate = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate()
        )
        if (birthDate > minBirthDate)
                return reply.code(401).send({error : 'TOO_YOUNG'})
        if (birthDate < maxBirthDate)
                return reply.code(401).send({error : 'TOO_OLD'})
        try {
                const hashPassword = await bcrypt.hash(request.body.password, 10)
                await creatUser(request, hashPassword, birthDate)
        } catch (e) {
                console.error(e)
                return reply.code(500).send({error : e.message})
        }
}

export { login, register }