import prisma from '../../utils/prisma.js'
import { UserPublicFields } from '../users/users_queries.js'
import { DogPublicFields } from '../dog/dogs_queries.js'

async function findMatchesByUserId(userId) {
  return prisma.matches.findMany({
    where: {
      OR: [
        { matchesAsDog1: { owner_id: BigInt(userId) } },
        { matchesAsDog2: { owner_id: BigInt(userId) } },
      ],
      is_active: true,
      matchesAsDog1: { users: { is_active: true } },
      matchesAsDog2: { users: { is_active: true } }


      
    },
    include: {
      matchesAsDog1:{
        select: {...DogPublicFields,
          users:{
          select:{
            id: true,
            first_name:true,
            last_name:true,
            lastSeenAt:true
          }
        }}
      },
      matchesAsDog2:{
        select: {...DogPublicFields,
          users:{
          select:{
            id: true,
            first_name:true,
            last_name:true,
            lastSeenAt:true
          }
        }}
      },
      messages: {
        orderBy: { send_at: 'desc' },
        take: 1,
        select: { send_at: true }
      }
    },
    orderBy: { created_at: 'desc' }
  })
}

async function findActiveMatch(dog_id1, dog_id2) {
  return prisma.matches.findFirst({
    where: {
      is_active: true,
      OR: [
        {
          id_dog1: BigInt(dog_id1),
          id_dog2: BigInt(dog_id2)
        },
        {
          id_dog1: BigInt(dog_id2),
          id_dog2: BigInt(dog_id1)
        }
      ]
    }
  })
}

async function findAllMatches() {
  return prisma.matches.findMany({
    include: {
      matchesAsDog1: {select: DogPublicFields},
      matchesAsDog2: {select: DogPublicFields}
    }
  })
}

async function findMessagesByMatchId(match_id) {
  return prisma.messages.findMany({
    where: { match_id: BigInt(match_id) },
    orderBy: { send_at: 'asc' },
    include: { users:{
               select:UserPublicFields
    }}
  })
}

async function findMatch(id) {
  return prisma.matches.findUnique({
    where: { id: BigInt(id) },
    include: {
      matchesAsDog1: {select: DogPublicFields},
      matchesAsDog2: {select: DogPublicFields}
    }
  })
}

async function deleteMatch(id) {
  return prisma.matches.delete({ where: { id: BigInt(id) } })
}

async function desactivateMatchWithReq(request) {
  return prisma.matches.update({ 
    where: { id: BigInt(request.params.id) },
    data: {
      is_active: false,
      unmatched_by: BigInt(request.userId)
    }
  })  
}

export { findMatchesByUserId, findActiveMatch, findAllMatches, findMessagesByMatchId, deleteMatch, desactivateMatchWithReq, findMatch }