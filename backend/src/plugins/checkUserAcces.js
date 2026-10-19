import { AppError } from "../error.js";

async function checkUserAcces(request, reply) {
    const userId = request.userId
    const paramsUserId = request.params.id
    if (request.role === 'admin')
        return;
    if (userId.toString() !== paramsUserId.toString())
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')      
}

async function checkUserAccesAdmin(request, reply) {
    if (request.role === 'admin') // seulement l'admin a le droit de get tous les users
        return;
    else
        throw new AppError(403, 'FORBIDDEN', 'Forbidden')      
}

export { checkUserAcces, checkUserAccesAdmin }