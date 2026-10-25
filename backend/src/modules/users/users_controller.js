import { findActiveUsers, findUserById, updateUser, deactivateUser, updateUserPosition, activateUser, anonymized } from './users_queries.js'
import { AppError } from '../../error.js'

async function getAllUsers(request, reply) {
    return await findActiveUsers(request)
}

async function getUser(request, reply) {
    const user = await findUserById(request.params.id, request.userId)
    if (!user) throw new AppError(404, 'NOT_FOUND', 'User not found')
    if (!user.is_active) throw new AppError(401, 'NOT_FOUND', 'User not found')
    return user
}

async function putUser(request, reply) {
  try {
    return await updateUser(request.params.id, request.body)
  } catch (e) {
    if (e.code === 'P2025') throw new AppError(404, 'NOT_FOUND', 'User not found')
    throw e
  }
}

async function putUserPosition(request, reply){
  try {
    await updateUserPosition(request.params.id, request.body)
    reply.code(204).send()
  } catch (e) {
    if (e.code === 'P2025') throw new AppError(404, 'NOT_FOUND', 'User not found')
    throw e
  }
}

async function patchDeactivateUser(request, reply) {
  try {
    return await deactivateUser(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') throw new AppError(404, 'NOT_FOUND', 'User not found')
    throw e
  }
}

async function removeUser(request, reply) {
  if (request.role === 'admin' && request.userId.toString() === request.params.id.toString())
    throw new AppError(409, 'CONFLICT', 'Admin account cannot delete itself')
  const removed = await anonymized(request.params.id)
  if (!removed)
    throw new AppError(404, 'NOT_FOUND', 'User not found')
  else 
    return reply.code(204).send()
}

async function reactivateUser(request, reply) {
  try {
    return await activateUser(request.params.id)
  } catch (e) {
    if (e.code === 'P2025') throw new AppError(404, 'NOT_FOUND', 'User not found')
    throw e
  }
}

export { getAllUsers, getUser, putUser, patchDeactivateUser, putUserPosition, removeUser, reactivateUser }
