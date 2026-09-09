import { getUserByIdSchema, updateUserSchema, deactivateUserSchema } from './users_schema.js'
import { getUsers, getUser, putUser, patchDeactivateUser } from './users_controller.js'

async function usersRoutes(fastify) {
    fastify.get('/users', getUsers)
    fastify.get('/users/:id', {schema : getUserByIdSchema}, getUser)
    fastify.put('/users/:id', {schema : updateUserSchema}, putUser)
    fastify.patch('/users/:id/deactivate', {schema : deactivateUserSchema}, patchDeactivateUser)
}

export {usersRoutes}