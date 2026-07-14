require('dotenv').config()
const { PrismaClient } = require('../src/generated/prisma')
const { PrismaPg } = require('@prisma/adapter-pg')

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const user = await prisma.users.create({
    data: {
      email: 'parissa@test.com',
      first_name: 'Parissa',
      last_name: 'Chatagny',
      city: 'Lausanne',
      date_of_birth: new Date('2000-09-03'),
    }
  })
  console.log('Created user:', user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())