const prisma =  require('../../utils/prisma')

async function saveRefreshToken(userId, token, expiresAt)
{
    try{
        const refresh_token = await prisma.refresh_tokens.create({
            data:{user_id: BigInt(userId), token_hash:token, expires_at: expiresAt}
        })
        return refresh_token
    }
    catch(e){
    }
}

module.exports = saveRefreshToken