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
      dogs:true
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
  return prisma.users.update({
    where: { id: BigInt(id) },
    data,
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

export { findActiveUsers, findUserById, updateUser, deactivateUser, updateUserPosition }