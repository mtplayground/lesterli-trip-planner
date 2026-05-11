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

test('opens the mobile itinerary drawer and shows selected picks', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await page.getByRole('button', { name: /choose tokyo/i }).click()
  await page.getByRole('button', { name: /^add$/i }).first().click()
  await page.getByRole('button', { name: /open your day drawer/i }).click()

  const drawer = page.locator('[data-slot="dialog-content"]')

  await expect(drawer).toBeVisible()
  await expect(drawer.getByText(/tsukiji outer market/i)).toBeVisible()
})
