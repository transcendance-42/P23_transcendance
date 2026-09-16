import jwt from 'jsonwebtoken'

async function jwt_auth(request, reply){
    const token_bearer = request.headers.authorization
    if (!token_bearer)
        return reply.code(401).send({error: 'NO_TOKEN'})      
    const token = token_bearer.split(' ')[1]
    if (!token)
        return reply.code(401).send({error: 'NO_TOKEN'})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        request.userId = decoded.id
    }
    catch(err){
        if (err.name === 'TokenExpiredError')
            return reply.code(401).send({error: 'TOKEN_EXPIRED'})
        return reply.code(401).send({error: 'INVALID_TOKEN'})
    }
}
export {jwt_auth}

