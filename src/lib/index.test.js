import { test, expect } from 'vitest'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

await db.product.deleteMany()

test('counts', async () => {
  await db.product.create({ data: {}})
  const count = await db.product.count()

  expect(count).toEqual(1)
})
