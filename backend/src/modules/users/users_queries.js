import { Client } from 'pg'
import prisma from '../../utils/prisma.js'
import fs from 'node:fs/promises'
import path from 'node:path'

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
  role:true,
  file_path: true,
}

async function findActiveUsers(request) { // route pour l'admin donc je laisse private fields
  const adminId = request.userId
  return prisma.users.findMany({
    where: { 
      id:{not: adminId},
      first_name: { not: null }
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

async function removeFile(path) {
  try {
    await fs.unlink(path)
  } catch (e) {
    if (e.code === 'ENOENT')
      return
  }
}

async function anonymized(id) {
  const user = await prisma.users.findUnique({
    where: {id: BigInt(id)},
    select: { 
      file_path: true,
      dogs: {
        select: {
          dog_formular_path: true,
          dog_pics: {
            select: { file_path: true },
          }
        }
      }
    },
  })
  if (!user)
    return user
  await prisma.$transaction([
    prisma.refresh_tokens.deleteMany({where: {user_id: id}}),
    prisma.messages.updateMany({ where: { sender_id: id }, data: { content: 'Message supprimé' } }),
    prisma.matches.updateMany({
      where: {
        is_active: true,
        OR: [
          {matchesAsDog1: {owner_id: id}},
          {matchesAsDog2: {owner_id: id}},
        ],
      },
      data: {is_active: false},
    }),
    prisma.dog_pics.deleteMany({ where:{dogs:{owner_id:id}}}),
    prisma.dogs.updateMany({
      where: {owner_id:id},
      data: {
        dog_name: 'deleted',
        bio: '',
        dog_formular_path: null,
        dog_formular_type: null,
      }
    }),
    prisma.users.updateMany({
      where: {id: id},
      data: {
        is_active: false,
        google_id: null,
        email: `deleted${id}@mail`,
        password_hash: null,
        first_name: null,
        last_name: null,
        city: null,
        file_path: null,
        mime_type: null,
      }
    }),
    prisma.$executeRaw`UPDATE users SET position = NULL WHERE id = ${id}`,
  ])
  const files = [
    user.file_path,
    user.dogs?.dog_formular_path,
    ...(user.dogs?.dog_pics.map(p => p.file_path) ?? []),
  ].filter(Boolean)
  for (const file of files) {
    await removeFile(file)
  }
  return true
}

async function activateUser(id) {
  return prisma.users.update({
    where: { id: BigInt(id) },
    data: { is_active: true },
    select: UserPrivateFields
  })
}

export { findActiveUsers, findUserById, updateUser, deactivateUser, updateUserPosition, UserPrivateFields, UserPublicFields, activateUser, anonymized }
