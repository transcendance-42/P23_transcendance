import prisma from '../../utils/prisma.js'

async function saveRefreshToken(userId, token, expiresAt)
{
        const refresh_token = await prisma.refresh_tokens.create({
            data:{user_id: BigInt(userId), token_hash:token, expires_at: expiresAt}
        })
        return refresh_token
}

async function findRefreshToken(token) {
    return prisma.refresh_tokens.findUnique({
        where: { token_hash:token}
     })
}

async function revokeToken(token) {
    return prisma.refresh_tokens.update({
        where:{id: token.id},
        data: {is_revoked: true}
    })
}

async function revokeAllUserToken(userId){
    return prisma.refresh_tokens.updateMany({
    where:{user_id: userId},
    data: {is_revoked: true}
})
}

export { saveRefreshToken, findRefreshToken, revokeToken, revokeAllUserToken }