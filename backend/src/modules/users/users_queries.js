import { Client } from 'pg'
import prisma from '../../utils/prisma.js'

// est ce qu on met ca ailleurs ou on choisit manuellemtn le champs envoyé au front pour les autres controllers
const UserPublicFields = {
  first_name: true,
  last_name: true,
  city: true,
  id:true,
  is_active:true,
  lastSeenAt:true,
  role:true
}

const UserPrivateFields = {
  first_name: true,
  last_name: true,
  city: true,
  date_of_birth: true,
  email: true, 
  id:true,
  is_active:true,
  lastSeenAt:true,
  role:true
}

async function findActiveUsers(request) { // route pour l'admin donc je laisse private fields
  const adminId = request.userId
  return prisma.users.findMany({
    where: { id:{not: adminId}
     },
    select: UserPrivateFields 
  })
}

async function findUserById(id, clientId) {
  const isSelf = BigInt(id) === BigInt(clientId)
  const fields = isSelf ? UserPrivateFields : UserPublicFields

  return prisma.users.findUnique({
    where: { id: BigInt(id) },
    select: {...fields,
      dogs: { include: { dog_pics: true } }
    } 
  })
}

async function updateUserPosition(id , data){
  const lng = Number(data.longitude)
	const lat = Number(data.latitude)
  if(data.radius)
  {
    await prisma.users.update({
      where: { id: id },
      data: { radius: Number(data.radius)}
    })
  }

  await prisma.$executeRaw`
      UPDATE "users"
      SET "position" = ST_setSRID(ST_Makepoint(${lng}::float8,${lat}::float8), 4326)::geography,
          "city" = ${data.city}
      WHERE "id" = ${Number(id)}`

  return {succes:true}
}

async function updateUser(id, data) {
  const parsed = { ...data }
    if (parsed.date_of_birth)
        parsed.date_of_birth = new Date(parsed.date_of_birth)
    return prisma.users.update({
        where: { id: BigInt(id) },
        data: parsed,
        select: UserPrivateFields
    })
}

async function deactivateUser(id) {
  return prisma.users.update({
    where: { id: BigInt(id) },
    data: { is_active: false },
    select: UserPrivateFields
  })
}

async function activateUser(id) {
  return prisma.users.update({
    where: { id: BigInt(id) },
    data: { is_active: true },
    select: publicFields
  })
}

export { findActiveUsers, findUserById, updateUser, deactivateUser, updateUserPosition, UserPrivateFields, UserPublicFields, activateUser }