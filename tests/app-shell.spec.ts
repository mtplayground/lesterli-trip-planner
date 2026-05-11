import { expect, test } from '@playwright/test'

test('opens the app shell', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/trip planner/i)
  await expect(
    page.getByRole('heading', {
      name: /tailwind and shadcn are wired into the trip planner starter/i,
    })
  ).toBeVisible()
})
