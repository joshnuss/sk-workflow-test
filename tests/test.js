import { expect, test } from '@playwright/test'

test('index page has expected h1', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible()
})

test('sign in', async({ page }) => {
  await page.goto('/auth/signin')
  await page.getByLabel('Username').fill('josh@test.com')
  await page.getByLabel('Password').fill('123456')
  await page.getByRole('button').click()
  await page.screenshot({ path: 'screenshot.png' })
  await expect(page.locator('pre')).toContainText('josh@test.com')
})
