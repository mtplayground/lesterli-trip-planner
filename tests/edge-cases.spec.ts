import { expect, test, type Page } from '@playwright/test'

test('covers limit edge cases and the nightlife penalty flow', async ({
  page,
}) => {
  await page.goto('/')

  await chooseCity(page, 'tokyo')

  await addAttraction(page, 'Tsukiji Outer Market')
  await addAttraction(page, 'Tokyo Ramen Street')
  await addAttraction(page, 'teamLab Planets TOKYO')
  await addAttraction(page, 'Shinjuku Gyoen National Garden')
  await addAttraction(page, 'Omoide Yokocho')
  await addAttraction(page, 'Shinjuku Golden Gai')

  await expect(
    page.getByRole('progressbar', { name: /time usage/i })
  ).toHaveAttribute('aria-valuetext', '12 hours of 12 hours. Limit reached.')
  await expect(
    page.getByRole('progressbar', { name: /cost usage/i })
  ).toHaveAttribute('aria-valuetext', '$145 of $150. Warning.')
  await expect(
    page.getByRole('progressbar', { name: /energy usage/i })
  ).toHaveAttribute(
    'aria-valuetext',
    '83 energy points of 100 energy points. Warning.'
  )

  const akihabaraCard = cardFor(page, 'Akihabara Electric Town')
  await expect(
    akihabaraCard.getByRole('button', { name: /unavailable/i })
  ).toBeDisabled()
  await expect(
    akihabaraCard.getByLabel(
      /cannot add attraction: would exceed the 12-hour limit/i
    )
  ).toHaveAttribute('title', 'Would exceed the 12-hour limit')

  await page.getByRole('button', { name: /back to city select/i }).click()

  await chooseCity(page, 'paris')
  await addAttraction(page, 'Moulin Rouge Féerie Show')

  await expect(
    page.getByRole('progressbar', { name: /cost usage/i })
  ).toHaveAttribute('aria-valuetext', '$140 of $150. Warning.')

  const rueClerCard = cardFor(page, 'Rue Cler Market Lunch')
  await expect(
    rueClerCard.getByRole('button', { name: /unavailable/i })
  ).toBeDisabled()
  await expect(
    rueClerCard.getByLabel(
      /cannot add attraction: would exceed the \$150 budget/i
    )
  ).toHaveAttribute('title', 'Would exceed the $150 budget')

  await page.getByRole('button', { name: /back to city select/i }).click()

  await chooseCity(page, 'tokyo')
  await addAttraction(page, 'Omoide Yokocho')
  await addAttraction(page, 'Shinjuku Golden Gai')

  const modifiersRegion = page.getByRole('region', {
    name: /active modifiers/i,
  })
  await expect(modifiersRegion.getByText('All-Nighter')).toBeVisible()
  await expect(
    modifiersRegion.getByLabel(/all-nighter, penalty -10/i)
  ).toBeVisible()

  await page.getByRole('button', { name: /finish trip/i }).click()

  await expect(
    page.getByRole('heading', { name: /trip complete/i })
  ).toBeVisible()
  await expect(page.getByLabel('Final score 22')).toBeVisible()
  await expect(page.getByText('32 + 0 - 10 = 22')).toBeVisible()
  await expect(page.getByText('Night Owl')).toBeVisible()
  await expect(
    page.getByText(
      'You optimized for after-dark energy, bright lights, and a late finish.'
    )
  ).toBeVisible()
})

async function chooseCity(page: Page, cityName: string) {
  await page
    .getByRole('button', { name: new RegExp(`choose ${cityName}`, 'i') })
    .click()
}

async function addAttraction(page: Page, name: string) {
  const card = cardFor(page, name)
  await card.getByRole('button', { name: /^add$/i }).click()
}

function cardFor(page: Page, name: string) {
  return page
    .getByRole('heading', { name })
    .locator('xpath=ancestor::div[@data-slot="card"][1]')
}
