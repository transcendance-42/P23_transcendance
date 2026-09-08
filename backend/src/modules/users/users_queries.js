const prisma = require('../../utils/prisma')

async function findActiveUsers() {
  return prisma.users.findMany({
    where: { is_active: true },
    omit: { password_hash: true }
  })
}

async function findUserById(id) {
  return prisma.users.findUnique({
    where: { id: BigInt(id) },
    omit: { password_hash: true }
  })
}

async function updateUser(id, data) {
  return prisma.users.update({
    where: { id: BigInt(id) },
    data,
    omit: { password_hash: true }
  })
}

async function deactivateUser(id) {
  return prisma.users.update({
    where: { id: BigInt(id) },
    data: { is_active: false },
    omit: { password_hash: true }
  })
}

module.exports = { findActiveUsers, findUserById, updateUser, deactivateUser }