import jwt from 'jsonwebtoken'

async function jwt_auth(request, reply){
    const token_bearer = request.headers.authorization
    const token = token_bearer.split(' ')[1]
    if (!token)
        reply.code(401).send({message: 'Authentication required'})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        request.userId = decoded.id
    }
    catch(err){
        reply.code(403).send({message: err})
    }
    }

export {jwt_auth}

