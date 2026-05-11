import { expect, test } from '@playwright/test'

test('opens the app shell', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/trip planner/i)
  await expect(
    page.getByRole('heading', {
      name: /choose your city and start building a one-day adventure/i,
    })
  ).toBeVisible()

  await page.getByRole('button', { name: /choose tokyo/i }).click()

  await expect(
    page.getByRole('heading', {
      name: /planning in tokyo/i,
    })
  ).toBeVisible()
})
