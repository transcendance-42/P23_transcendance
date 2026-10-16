import { findUserById } from '../modules/users/users_queries.js'
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
        const user = await findUserById(decoded.id)
        if (!user.is_active)
            return reply.code(401).send({error: 'INVALID_TOKEN'})
        request.userId = decoded.id
        request.role = decoded.role
    }
    catch(err){
        if (err.name === 'TokenExpiredError')
            return reply.code(401).send({error: 'TOKEN_EXPIRED'})
        return reply.code(401).send({error: 'INVALID_TOKEN'})
    }
}
export {jwt_auth}
