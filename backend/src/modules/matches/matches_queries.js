import prisma from '../../utils/prisma.js'

async function findMatchesByUserId(userId) {
  return prisma.matches.findMany({
    where: {
      OR: [
        { matchesAsDog1: { owner_id: BigInt(userId) } },
        { matchesAsDog2: { owner_id: BigInt(userId) } },
      ]
    },
    include: {
      matchesAsDog1: true,
      matchesAsDog2: true,
    },
    orderBy: { created_at: 'asc' }
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

export { findMatchesByUserId, findAllMatches, findMessagesByMatchId, deleteMatch, findMatch }