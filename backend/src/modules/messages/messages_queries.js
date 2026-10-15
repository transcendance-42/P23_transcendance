import prisma from '../../utils/prisma.js'
import { UserPublicFields } from '../users/users_queries.js'


async function findMessagesByMatchId(matchId) {
  return prisma.messages.findMany({
    where: { match_id: BigInt(matchId) },
    orderBy: { send_at: 'asc' },
    include: { users:{
               select:UserPublicFields
    }}
  })
}
// pas utilisée le post est gérée dans le index.js du websocket
// async function createMessage(match_id, sender_id, content) {
//   return prisma.messages.create({
//     data: {
//       match_id: BigInt(match_id),
//       sender_id: BigInt(sender_id),
//       content
//     }
//   })
// }

async function findMessageById(id) {
  return prisma.messages.findUnique({ where: { id: BigInt(id) } })  
}

async function deleteMessage(id) {
  return prisma.messages.delete({ where: { id: BigInt(id) } })
}

async function countUnreadMessages(userId) {
  return prisma.messages.count({
    where: {
      read_at: null,
      sender_id: { not: BigInt(userId) },
      matches: {
        OR: [
          { id_dog1: { in: (await prisma.dogs.findMany({ where: { owner_id: BigInt(userId) }, select: { id: true } })).map(d => d.id) } },
          { id_dog2: { in: (await prisma.dogs.findMany({ where: { owner_id: BigInt(userId) }, select: { id: true } })).map(d => d.id) } }
        ]
      }
    }
  })
}

async function markRoomAsRead(matchId, userId) {
  const userDogs = await prisma.dogs.findMany({ where: { owner_id: BigInt(userId) }, select: { id: true } })
  const dogIds = userDogs.map(d => d.id)
  return prisma.messages.updateMany({
    where: {
      match_id: BigInt(matchId),
      sender_id: { not: BigInt(userId) },
      read_at: null
    },
    data: { read_at: new Date() }
  })
}

async function getUnreadPerRoom(userId) {
    const dog = await prisma.dogs.findUnique({
        where: { owner_id: BigInt(userId) },
        select: { id: true }
    })
    if (!dog) return {}
    const rows = await prisma.messages.groupBy({
        by: ['match_id'],
        where: {
            read_at: null,
            sender_id: { not: BigInt(userId) },
            matches: { OR: [{ id_dog1: dog.id }, { id_dog2: dog.id }] }
        },
        _count: { id: true }
    })
    return Object.fromEntries(rows.map(r => [String(r.match_id), r._count.id]))
}

export { findMessagesByMatchId, deleteMessage, findMessageById, countUnreadMessages, markRoomAsRead, getUnreadPerRoom }