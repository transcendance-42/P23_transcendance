import prisma from '../../utils/prisma.js'

const publicFields = {
  first_name: true,
  last_name: true,
  city: true,
  date_of_birth: true,
}

async function findActiveUsers() {
  return prisma.users.findMany({
    where: { is_active: true },
    select: publicFields
  })
}

async function findUserById(id) {
  return prisma.users.findUnique({
    where: { id: BigInt(id) },
    include: {dogs:true},
    select: publicFields
  })
}

async function updateUser(id, data) {
  return prisma.users.update({
    where: { id: BigInt(id) },
    data,
    select: publicFields
  })
}

async function deactivateUser(id) {
  return prisma.users.update({
    where: { id: BigInt(id) },
    data: { is_active: false },
    select: publicFields
  })
}

export { findActiveUsers, findUserById, updateUser, deactivateUser }