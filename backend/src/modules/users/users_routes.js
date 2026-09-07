const { getUserByIdSchema, updateUserSchema, deactivateUserSchema } = require('./users_schema')
const { getUsers, getUser, putUser, patchDeactivateUser } = require('./users_controller')

async function userRoutes(fastify) {
    fastify.get('/users', getUsers)
    fastify.get('/users/:id', getUserByIdSchema, getUser)
    fastify.put('/users/:id', updateUserSchema, putUser)
    fastify.patch('/users/:id/deactivate', deactivateUserSchema, patchDeactivateUser)
}

module.exports = userRoutes