import { creatUser, findUser, updateLastSeenAt } from './auth_queries.js'
import crypto  from 'crypto'
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { saveRefreshToken, findRefreshToken, revokeToken } from '../tokens/tokens_queries.js'
import { AppError } from '../../error.js'

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
            .redirect(`https://localhost/oauth-callback?profileComplete=${isUserComplete(user)}`)
    }

    return reply
        .code(201)
        .setCookie('refresh_token', refresh_token, COOKIE_OPTIONS)
        .send({ success: true, userId: user.id, message: 'Login successful', access_token: token, profileComplete: isUserComplete(user) })
}

async function login(request, reply) {
        const { email, password } = request.body
        const user = await findUser(email)
        const hash = user?.password_hash ?? 'un hash bidon pour faire croire que le password a ete comparé'
        const isMatch = await bcrypt.compare(password, hash)
        if (!user || !isMatch)
                throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid credentials')
        return issueSession(user, reply)
}

async function logout(request, reply) {
        const token = request.cookies.refresh_token
        if (!token)
                throw new AppError(401, 'REFRESH_TOKEN_MISSING', 'No refresh token found')
        const hash_token = crypto.createHash('sha256').update(token).digest('hex')
        const stored = await findRefreshToken(hash_token)
        if (!stored || stored.expires_at < new Date())
                throw new AppError(401, 'REFRESH_TOKEN_INVALID', 'Invalid token')
        if (stored && !stored.is_revoked) {
                console.log(`User ID: ${stored.user_id} logged out successfully`)
                await revokeToken(stored)
                return reply.code(200)
                        .clearCookie('refresh_token', COOKIE_OPTIONS)
                        .send({ success: `Logout ${stored.user_id} successful` })
        }
}

async function register(request, reply) {
        const existingUser = await findUser(request.body.email)
        if (existingUser)
                throw new AppError(409, 'ALREADY_EXISTS', 'Email already exists')
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
                throw new AppError(401, 'TOO_YOUNG', 'You must be at least 18 years old')
        if (birthDate < maxBirthDate)
                throw new AppError(401, 'TOO_OLD', 'You must be alive :)')
        const hashPassword = await bcrypt.hash(request.body.password, 10)
        const user = await creatUser(request, hashPassword, birthDate)
        return reply.code(201).send({ success: true, userId: user.id })
}

async function postHearthBeat(request, reply) {
        await updateLastSeenAt(request.userId)
        return reply.code(200).send({success: true})
}


export { login, register, logout, generateRefreshToken, generateAccessToken , issueSession, COOKIE_OPTIONS, postHearthBeat }