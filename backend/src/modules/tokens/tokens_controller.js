import { findRefreshToken, saveRefreshToken, revokeToken } from "./tokens_queries.js"
import { generateRefreshToken, generateAccessToken, COOKIE_OPTIONS } from "../auth/auth_controller.js"
import { findUserById } from "../users/users_queries.js"
import crypto  from 'crypto'

async function GetRefreshToken(request, reply){
    try{
        const token = request.cookies.refresh_token
        if (!token)
            reply.code(401).send({error: 'No refresh token'})
        const hash_token = crypto.createHash('sha256').update(token).digest('hex')
        const stored = await findRefreshToken(hash_token)
        if (!stored || stored?.is_revoked || stored.expires_at < new Date())
            reply.code(401).send({error: 'Invalid Token'})
        
        //reuse state to implement for security to do

        //revoke the passed token
        await revokeToken(stored)

        //trouver le user
        const user = await findUserById(stored.user_id)

        // generate two new token
        const acces_token = generateAccessToken(user)
        const {refresh_token, refresh_token_hash} = generateRefreshToken()
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 *60 * 1000)           
        await saveRefreshToken(stored.user_id, refresh_token_hash, expiresAt)
        return reply
                .code(200)
                .setCookie('refresh_token',refresh_token, COOKIE_OPTIONS)
                .send({success:true, userId: user.id, message: 'Login successful', acces_token})
    }
    catch(e)
    {
        return reply.code(500).send({message: e.message})        
    }

}

export { GetRefreshToken }