import prisma from '../../utils/prisma.js'

async function findMatchesByUserId(userId) {
  return prisma.matches.findMany({
    where: {
      OR: [
        { matchesAsDog1: { owner_id: BigInt(userId) } },
        { matchesAsDog2: { owner_id: BigInt(userId) } },
      ],
      is_active: true
    },
    include: {
      matchesAsDog1:{
        include: {
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
        include: {
          users:{
          select:{
            id: true,
            first_name:true,
            last_name:true,
            lastSeenAt:true
          }
        }}
      },
    },
    orderBy: { created_at: 'desc' }
  })
}

async function findAllMatches() {
  return prisma.matches.findMany({
    include: {
      matchesAsDog1: true,
      matchesAsDog2: true
    }
  })
}

async function findMessagesByMatchId(match_id) {
  return prisma.messages.findMany({
    where: { match_id: BigInt(match_id) },
    orderBy: { send_at: 'asc' },
    include: { users: true }
  })
}

async function findMatch(id) {
  return prisma.matches.findUnique({
    where: { id: BigInt(id) },
    include: {
      matchesAsDog1: true,
      matchesAsDog2: true
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

export { findMatchesByUserId, findAllMatches, findMessagesByMatchId, deleteMatch, desactivateMatchWithReq, findMatch }