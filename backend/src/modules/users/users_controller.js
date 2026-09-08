const { findActiveUsers, findUserById, updateUser, deactivateUser } = require('./users_queries')

async function getUsers(request, reply) {
  try {
    return await findActiveUsers()
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function getUser(request, reply) {
  try {
    const user = await findUserById(request.params.id)
    if (!user) return reply.code(404).send({ error: 'User not found' })
    if (!user.is_active) return reply.code(404).send({ error: 'User not found' })
    return user
  } catch (e) {
    return reply.code(500).send({ error: e.message })
  }
}

async function putUser(request, reply) {
  try {
    return await updateUser(request.params.id, request.body)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'User not found' })
    return reply.code(500).send({ error: e.message })
  }
}

async function patchDeactivateUser(request, reply) {
  try {
    return await deactivateUser(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') return reply.code(404).send({ error: 'User not found' })
    return reply.code(500).send({ error: e.message })
  }
}

module.exports = { getUsers, getUser, putUser, patchDeactivateUser }