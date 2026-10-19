import { findUserById } from '../modules/users/users_queries.js'
import jwt from 'jsonwebtoken'
import { AppError } from '../error.js'


async function jwt_auth(request, reply){
    const token_bearer = request.headers.authorization
    if (!token_bearer)
        throw new AppError(401, 'ACCESS_TOKEN_MISSING', 'Access token not found')   
    const token = token_bearer.split(' ')[1]
    if (!token)
        throw new AppError(401, 'ACCESS_TOKEN_MISSING', 'Access token not found')
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
            throw new AppError(401, 'TOKEN_EXPIRED', 'Access token has expired')
        throw new AppError(401, 'INVALID_TOKEN', 'Access token is invalid')
    }
}
export {jwt_auth}
