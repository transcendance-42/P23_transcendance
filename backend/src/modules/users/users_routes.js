import { getUserByIdSchema, updateUserSchema, deactivateUserSchema } from './users_schema.js'
import { getUsers, getUser, putUser, patchDeactivateUser } from './users_controller.js'
import { checkUserAcces, checkUserAccesAdmin } from '../../plugins/checkUserAcces.js'

async function usersRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.get('/users',{preHandler: checkUserAccesAdmin} , getUsers)
    fastify.get('/users/:id', {schema : getUserByIdSchema, preHandler:checkUserAcces }, getUser)
    fastify.put('/users/:id', {schema : updateUserSchema, preHandler:checkUserAcces}, putUser)
    fastify.patch('/users/:id/deactivate', {schema : deactivateUserSchema, preHandler:checkUserAcces}, patchDeactivateUser)
}

export {usersRoutes}