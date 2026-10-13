import { getUserByIdSchema, updateUserSchema, deactivateUserSchema, updateUserPositionSchema } from './users_schema.js'
import { getUsers, getUser, putUser, patchDeactivateUser, putUserPosition } from './users_controller.js'
import { checkUserAcces, checkUserAccesAdmin } from '../../plugins/checkUserAcces.js'

async function usersRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.get('/users', getUsers) // a mettre une autre route pour les users /discover
    fastify.get('/users/:id', {schema : getUserByIdSchema}, getUser) // a mettre un handler qui va gerer ce que le client peut voir selon si il match ou pas
    fastify.put('/users/:id', {schema : updateUserSchema, preHandler:checkUserAcces}, putUser)
    fastify.put('/users/:id/position', {schema : updateUserPositionSchema, preHandler:checkUserAcces}, putUserPosition)
    fastify.patch('/users/:id/deactivate', {schema : deactivateUserSchema, preHandler:checkUserAcces}, patchDeactivateUser)
}

export {usersRoutes}