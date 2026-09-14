import jwt from 'jsonwebtoken'

async function jwt_auth(request, reply){
    const token_bearer = request.headers.authorization
    if (!token_bearer)
        return reply.code(401).send({message: 'Authentication required'})        
    const token = token_bearer.split(' ')[1]
    if (!token)
        return reply.code(401).send({message: 'Authentication required'})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        request.userId = decoded.id
        request.role = decoded.role
    }
    catch(err){
        return reply.code(403).send({message: 'Invalid or expired token'})
    }
}
export {jwt_auth}
