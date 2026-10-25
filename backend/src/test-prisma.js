import'dotenv/config'
import prisma from './utils/prisma.js'

async function main() {
  const count = await prisma.users.count()
}

main()