import { findRefreshToken, saveRefreshToken, revokeToken, revokeAllUserToken } from "./tokens_queries.js"
import { generateRefreshToken, generateAccessToken, COOKIE_OPTIONS } from "../auth/auth_controller.js"
import { findUserById } from "../users/users_queries.js"
import crypto  from 'crypto'
import { error } from "console"
import { AppError } from "../../error.js"

async function GetRefreshToken(request, reply){
    const token = request.cookies.refresh_token
    if (!token)
        throw new AppError(401, 'REFRESH_TOKEN_MISSING', 'No refresh token')
    // on a pas de secret pour hassh le refresh token?
    const hash_token = crypto.createHash('sha256').update(token).digest('hex')
    // apparemment cette ligne est pas necessaire dans le sens ou un hash va
    // forcément fonctionner
    if (!hash_token)
        throw new AppError(401, 'REFRESH_TOKEN_MISSING', 'No refresh token')        
    const stored = await findRefreshToken(hash_token)
    if (!stored || stored.expires_at < new Date())
    {
        throw new AppError(401, 'REFRESH_TOKEN_INVALID', 'Invalid token')
    }

    if (stored?.is_revoked )
    {
        await revokeAllUserToken(stored.user_id)
        throw new AppError(401, 'REFRESH_TOKEN_INVALID', 'Invalid token')
    }
    //revoke the passed token
    await revokeToken(stored)

    //trouver le user
    const user = await findUserById(stored.user_id, stored.user_id)
    if (!user)
        throw new AppError(404, 'NOT_FOUND', 'User not found')
    if (!user.is_active)
        throw new AppError(404, 'NOT_FOUND', 'User not found')
    // generate two new token
    const acces_token = generateAccessToken(user)
    const {refresh_token, refresh_token_hash} = generateRefreshToken()
    if (!acces_token || !refresh_token || !refresh_token_hash)
        throw new AppError(401, 'GENERATE_FAILED', 'Failed to generate token')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 *60 * 1000)           
    await saveRefreshToken(stored.user_id, refresh_token_hash, expiresAt)
    return reply
            .code(200)
            .setCookie('refresh_token',refresh_token, COOKIE_OPTIONS)
            .send({success:true, userId: user.id, message: 'Login successful', acces_token})
}

export { GetRefreshToken }