import { getUserByIdSchema, updateUserSchema, deactivateUserSchema, updateUserPositionSchema } from './users_schema.js'
import { getAllUsers, getUser, putUser, patchDeactivateUser, putUserPosition } from './users_controller.js'
import { checkUserAcces, checkUserGetAcces, checkUserAccesAdmin } from '../../plugins/checkUserAcces.js'

async function usersRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.get('/users', { preHandler:checkUserAccesAdmin }, getAllUsers) // route pour l'admin
    fastify.get('/users/:id', {schema : getUserByIdSchema}, getUser) // preHandler:checkUserGetAcces desactivé
    fastify.put('/users/:id', {schema : updateUserSchema, preHandler:checkUserAcces}, putUser)
    fastify.put('/users/:id/position', {schema : updateUserPositionSchema, preHandler:checkUserAcces}, putUserPosition)
    fastify.patch('/users/:id/deactivate', {schema : deactivateUserSchema, preHandler:checkUserAcces}, patchDeactivateUser)
}

export {usersRoutes}
