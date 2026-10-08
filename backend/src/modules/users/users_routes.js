import { getUserByIdSchema, updateUserSchema, deactivateUserSchema, updateUserPositionSchema } from './users_schema.js'
import { getUsers, getUser, putUser, patchDeactivateUser, putUserPosition } from './users_controller.js'

async function usersRoutes(fastify) {
    fastify.addHook('onRequest', fastify.authorize) // pour autoriser la route    
    fastify.get('/users', getUsers)
    fastify.get('/users/:id', {schema : getUserByIdSchema}, getUser)
    fastify.put('/users/:id', {schema : updateUserSchema}, putUser)
    fastify.put('/users/:id/position', {schema : updateUserPositionSchema}, putUserPosition)
    fastify.patch('/users/:id/deactivate', {schema : deactivateUserSchema}, patchDeactivateUser)
}

export {usersRoutes}