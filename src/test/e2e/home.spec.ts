import { test, expect } from '@playwright/test'

test('homepage has correct title', async ({ page }) => {
  await page.goto('/')
  // Wait for dynamic title to settle if any
  await expect(page).toHaveTitle(/Bârnova/)
})

test('navigation to news section works', async ({ page }) => {
  await page.goto('/')
  // Try to find the link for announcements/news
  const newsLink = page.locator('a[href="#news"]').first()
  if (await newsLink.isVisible()) {
    await newsLink.click()
    await expect(page).toHaveURL(/#news/)
  }
})
