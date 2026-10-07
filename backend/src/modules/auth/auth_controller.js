import { creatUser, findUser } from './auth_queries.js'
import crypto  from 'crypto'
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { saveRefreshToken, findRefreshToken, revokeToken } from '../tokens/tokens_queries.js'

const COOKIE_OPTIONS = {
        path:'/',
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge: 7 * 24 * 60 * 60 * 1000
}

function generateAccessToken (user){
        const token = jwt.sign({id:user.id, email:user.email, role:user.role}, process.env.JWT_SECRET, {expiresIn:'15m'})
        return token
}

function generateRefreshToken(){
        const refresh_token = crypto.randomBytes(32).toString('hex')
        const refresh_token_hash = crypto.createHash('sha256').update(refresh_token).digest('hex')
        return {refresh_token, refresh_token_hash}
}

function isUserComplete(user)
{
        if(user.date_of_birth && user.city && user.first_name && user.last_name)
                return true
        return false
}

async function issueSession(user, reply, redirect = false) {
    const token = generateAccessToken(user)
    const { refresh_token, refresh_token_hash } = generateRefreshToken()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await saveRefreshToken(user.id, refresh_token_hash, expiresAt)

    if (redirect) {
        return reply
            .setCookie('refresh_token', refresh_token, COOKIE_OPTIONS)
            .redirect(`http://localhost:5173/oauth-callback?profileComplete=${isUserComplete(user)}`)
    }

    return reply
        .code(200)
        .setCookie('refresh_token', refresh_token, COOKIE_OPTIONS)
        .send({ success: true, userId: user.id, message: 'Login successful', access_token: token, profileComplete: isUserComplete(user) })
}

async function login(request, reply) {
        const { email, password } = request.body
        try{
                const user = await findUser(email)
                const hash = user?.password_hash ?? 'un hash bidon pour faire croire que le password a ete comparé'
                const isMatch = await bcrypt.compare(password, hash)
                if (!user || !isMatch)
                        return reply.code(401).send({error:'Invalid credentials'})
                return issueSession(user, reply)
        }
        catch(e)
        {
                return reply.code(500).send({message: 'Internal server error'})
        }
}

async function logout(request, reply) {
    try {
        const token = request.cookies.refresh_token
        if (!token)
            return reply.code(400).send({error : 'No refresh token found'})
        const hash_token = crypto.createHash('sha256').update(token).digest('hex')
        const stored = await findRefreshToken(hash_token)
        if (!stored || stored.expires_at < new Date())
        {
            console.log('TOKEN NON STOKE EN DB ou EXPIRE')
            return reply.code(401).send({error: 'Invalid token'})
        }
        if (stored && !stored.is_revoked) {
            console.log(`User ID: ${stored.user_id} logged out successfully`)
            // en faisant ca on kill toutes les session du user, est ce que c'est vrmt
            // ca qu on veut faire?
            await revokeToken(stored)
            return reply.code(200)
                        .clearCookie('refresh_token', COOKIE_OPTIONS)
                        .send({ success: `Logout ${stored.user_id} successful` })
        }
    } catch (e) {
        console.error('LOGOUT ERROR:', e)
        return reply.code(500).send({message: 'Internal server error'})
    }
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
                const user = await creatUser(request, hashPassword, birthDate)
                return reply.code(201).send({ success: true, userId: user.id })
        } catch (e) {
                console.error(e)
                return reply.code(500).send({error : e.message})
        }
}

export { login, register, logout, generateRefreshToken, generateAccessToken , issueSession, COOKIE_OPTIONS }