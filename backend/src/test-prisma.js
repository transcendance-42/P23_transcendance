require('dotenv').config()
const prisma = require('./utils/prisma')

async function main() {
  const count = await prisma.users.count()
  console.log('Users count:', count)
}

main()