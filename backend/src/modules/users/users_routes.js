const { getUserByIdSchema, updateUserSchema, deactivateUserSchema } = require('./users_schema')
const { getUsers, getUser, putUser, patchDeactivateUser } = require('./users_controller')

async function userRoutes(fastify) {
    fastify.get('/users', getUsers)
    fastify.get('/users/:id', {schema : getUserByIdSchema}, getUser)
    fastify.put('/users/:id', {schema : updateUserSchema}, putUser)
    fastify.patch('/users/:id/deactivate', {schema : deactivateUserSchema}, patchDeactivateUser)
}

module.exports = userRoutes