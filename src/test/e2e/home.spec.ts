import { test, expect } from '@playwright/test'

test('homepage has correct title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Comuna Bârnova - Portal Digital Oficial/)
})

test('navigation to news section works', async ({ page }) => {
  await page.goto('/')
  await page.click('a[href="#news"]')
  await expect(page).toHaveURL(/#news/)
})

test('language toggle works', async ({ page }) => {
  await page.goto('/')
  // The page might default to EN depending on system settings in the test runner
  const h1 = page.locator('h1')
  const text = await h1.innerText()
  
  if (text.includes('The Future of Bârnova Village')) {
    // Current is EN, toggle to RO
    await page.click('a[href="/?lang=ro"]')
    await expect(page).toHaveURL(/\?lang=ro/)
    await expect(page.locator('h1')).toContainText(/Viitorul Comunei Bârnova/i)
  } else {
    // Current is RO, toggle to EN
    await page.click('a[href="/?lang=en"]')
    await expect(page).toHaveURL(/\?lang=en/)
    await expect(page.locator('h1')).toContainText(/The Future of Bârnova Village/i)
  }
})
