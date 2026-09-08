const prisma = require('../../utils/prisma')

async function findMessagesByMatchId(matchId) {
  return prisma.messages.findMany({
    where: { match_id: BigInt(matchId) },
    orderBy: { send_at: 'asc' },
    include: { users: true }
  })
}

async function createMessage(match_id, sender_id, content) {
  return prisma.messages.create({
    data: {
      match_id: BigInt(match_id),
      sender_id: BigInt(sender_id),
      content
    }
  })
}

async function deleteMessage(id) {
  return prisma.messages.delete({ where: { id: BigInt(id) } })
}

module.exports = { findMessagesByMatchId, createMessage, deleteMessage }