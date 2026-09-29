import { findUserById } from "../modules/users/users_queries.js";

async function checkUserAcces(request, reply) {
    const userId = request.userId
    const paramsUserId = request.params.id
    if (request.role === 'admin')
        return;
    if (userId.toString() !== paramsUserId.toString())
        return reply.code(403).send({error: 'Forbidden'})      
}

async function checkUserAccesAdmin(request, reply) {
    if (request.role === 'admin') // seulement l'admin a le droit de get tous les users
        return;
    else
        return reply.code(403).send({error: 'Forbidden'})      
}

export { checkUserAcces, checkUserAccesAdmin }