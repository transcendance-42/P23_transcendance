import prisma from '../../utils/prisma.js'

async function findActiveUsers() {
  return prisma.users.findMany({
    where: { is_active: true },
    omit: { password_hash: true }
  })
}

async function findUserById(id) {
  return prisma.users.findUnique({
    where: { id: BigInt(id) },
    include: {dogs:true},
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

export { findActiveUsers, findUserById, updateUser, deactivateUser }