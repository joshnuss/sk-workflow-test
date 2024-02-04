import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

await db.user.create({
  data: {
    name: 'Test User',
    email: 'josh@test.com'
  }
})
