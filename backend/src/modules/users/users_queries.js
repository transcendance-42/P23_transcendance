import prisma from '../../utils/prisma.js'

const publicFields = {
  first_name: true,
  last_name: true,
  city: true,
  date_of_birth: true,
  email: true, 
  id:true,
  is_active:true,
  role:true
  
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
    select: {...publicFields,
      dogs: { include: { dog_pics: true } }
    } 
  })
}

async function updateUser(id, data) {
  const parsed = { ...data }
    if (parsed.date_of_birth)
        parsed.date_of_birth = new Date(parsed.date_of_birth)
    return prisma.users.update({
        where: { id: BigInt(id) },
        data: parsed,
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