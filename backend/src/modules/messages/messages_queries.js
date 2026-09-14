import prisma from '../../utils/prisma.js'

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

async function findMessageById(id) {
  return prisma.messages.findUnique({ where: { id: BigInt(id) } })  
}

async function deleteMessage(id) {
  return prisma.messages.delete({ where: { id: BigInt(id) } })
}

export { findMessagesByMatchId, createMessage, deleteMessage, findMessageById }