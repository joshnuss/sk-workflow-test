import { expect, test } from '@playwright/test'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

await db.user.deleteMany()

test('index page has expected h1', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible()
})

test('sign in', async({ page }) => {
  const user = await db.user.create({
    data: {
      email: 'user@example.com',
      name: 'Test User'
    }
  })
  await page.goto('/auth/signin')
  await page.getByLabel('Username').fill('user@example.com')
  await page.getByLabel('Password').fill('123456')
  await page.getByRole('button').click()
  await page.screenshot({ path: 'screenshot.png' })
  await expect(page.locator('pre')).toContainText('user@example.com')
})
