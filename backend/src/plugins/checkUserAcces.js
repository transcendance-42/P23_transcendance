import { findUserById } from "../modules/users/users_queries";

async function checkUserAcces(request, reply) {
     // const userId = request.userId // pour l'instant undefined besoin de l'auth de token
    const userId = 1;
    const paramsUserId = request.params.id
    if (request.role === 'admin')
        return;
    if (userId.toString() !== paramsUserId.toString())
        return reply.code(403).send({error: 'Forbidden'})      
}