import { findRefreshToken, saveRefreshToken, revokeToken, revokeAllUserToken } from "./tokens_queries.js"
import { generateRefreshToken, generateAccessToken, COOKIE_OPTIONS } from "../auth/auth_controller.js"
import { findUserById } from "../users/users_queries.js"
import crypto  from 'crypto'

async function GetRefreshToken(request, reply){
    try{
        const token = request.cookies.refresh_token
        if (!token)
            return reply.code(401).send({error: 'No refresh token'})
        // on a pas de secret pour hassh le refresh token?
        const hash_token = crypto.createHash('sha256').update(token).digest('hex')
        // apparemment cette ligne est pas necessaire dans le sens ou un hash va
        // forcément fonctionner
        if (!hash_token)
            return reply.code(401).send({error: 'No refresh token'})        
        const stored = await findRefreshToken(hash_token)
        if (!stored || stored.expires_at < new Date())
        {
            console.log('TOKEN NON STOKE EN DB ou EXPIRE')
            return reply.code(401).send({error: 'Invalid token'})
        }

        if (stored?.is_revoked )
        {
            console.log('TOKEN REVOKE')
            await revokeAllUserToken(stored.user_id)
            return reply.code(401).send({error: 'Invalid token'})
        }
        //revoke the passed token
        await revokeToken(stored)

        //trouver le user
        const user = await findUserById(stored.user_id)
        if (!user)
            return reply.code(401).send({error: 'User not found'})
        // generate two new token
        const acces_token = generateAccessToken(user)
        const {refresh_token, refresh_token_hash} = generateRefreshToken()
        if (!acces_token || !refresh_token || !refresh_token_hash)
            return reply.code(401).send({error: 'Failed to generate token'})    
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 *60 * 1000)           
        await saveRefreshToken(stored.user_id, refresh_token_hash, expiresAt)
        return reply
                .code(200)
                .setCookie('refresh_token',refresh_token, COOKIE_OPTIONS)
                .send({success:true, userId: user.id, message: 'Login successful', acces_token})
    }
    catch(e)
    {
        return reply.code(500) 
    }

}

export { GetRefreshToken }