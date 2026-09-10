import { findUser } from './auth_queries.js'
import crypto  from 'crypto'
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { saveRefreshToken } from '../tokens/tokens_queries.js'

const COOKIE_OPTIONS = {
        path:'/',
        httpOnly:true,
        sameSite:'none',
        secure:true,
        maxAge: 7 * 24 * 60 * 60 * 1000
}

function generateAccessToken (user){
        const token = jwt.sign({id:user.id, email:user.email}, process.env.JWT_SECRET, {expiresIn:'15m'})
        return token
}

function generateRefreshToken(){
        const refresh_token = crypto.randomBytes(32).toString('hex')
        const refresh_token_hash = crypto.createHash('sha256').update(refresh_token).digest('hex')
        return {refresh_token, refresh_token_hash}
}

async function login(request, reply) {
        const { email, password } = request.body
        try{
                const user = await findUser(email)
                if (!user)
                        return reply.code(401).send({ error: 'Invalid credentials' })
                const isMatch = await bcrypt.compare(password, user.password_hash)
                if (!isMatch){
                        return reply.code(400).send({error:'Invalid credentials'})
                }
                const token = generateAccessToken(user)
                const {refresh_token, refresh_token_hash} = generateRefreshToken()
                console.log('REFRESH TOKEN')
                console.log(refresh_token)
                const expiresAt = new Date(Date.now() + 7 * 24 * 60 *60 * 1000)           
                await saveRefreshToken(user.id, refresh_token_hash, expiresAt)
                return reply
                        .code(200)
                        .setCookie('refresh_token',refresh_token, COOKIE_OPTIONS)
                        .send({success:true, userId: user.id, message: 'Login successful', token})
        }
        catch(e)
        {
                return reply.code(500).send({message: e.message})
        }

    }

export { login, generateRefreshToken, generateAccessToken , COOKIE_OPTIONS }