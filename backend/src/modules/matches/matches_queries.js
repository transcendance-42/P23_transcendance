const prisma = require('../../utils/prisma')

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

async function deleteMatch(id) {
  return prisma.matches.delete({ where: { id: BigInt(id) } })
}

module.exports = { findMatchesByUserId, findAllMatches, deleteMatch }