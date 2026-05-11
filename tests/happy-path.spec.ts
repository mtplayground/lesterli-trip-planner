import { expect, test, type Page } from '@playwright/test'

test('plays through the Paris happy path, triggers a combo, and finishes the trip', async ({
  page,
}) => {
  await page.goto('/')

  await page.getByRole('button', { name: /choose paris/i }).click()

  await expect(
    page.getByRole('heading', { name: /planning in paris/i })
  ).toBeVisible()

  await addAttraction(page, 'Rue Cler Market Lunch')
  await addAttraction(page, "Musée d'Orsay")
  await addAttraction(page, 'Jardin du Luxembourg')
  await addAttraction(page, 'Le Marais Boutique Crawl')

  await expect(
    page.getByRole('progressbar', { name: /time usage/i })
  ).toHaveAttribute('aria-valuetext', '8.5 hours of 12 hours. Healthy.')
  await expect(
    page.getByRole('progressbar', { name: /cost usage/i })
  ).toHaveAttribute('aria-valuetext', '$74 of $150. Healthy.')
  await expect(
    page.getByRole('progressbar', { name: /energy usage/i })
  ).toHaveAttribute(
    'aria-valuetext',
    '43 energy points of 100 energy points. Healthy.'
  )

  const modifiersRegion = page.getByRole('region', {
    name: /active modifiers/i,
  })
  await expect(modifiersRegion.getByText('Balanced Mix')).toBeVisible()
  await expect(
    modifiersRegion.getByLabel(/balanced mix, bonus \+12/i)
  ).toBeVisible()

  const moulinRougeCard = cardFor(page, 'Moulin Rouge Féerie Show')
  await expect(
    moulinRougeCard.getByRole('button', { name: /unavailable/i })
  ).toBeDisabled()

  await page.getByRole('button', { name: /finish trip/i }).click()

  await expect(
    page.getByRole('heading', { name: /trip complete/i })
  ).toBeVisible()
  await expect(page.getByLabel('Final score 66')).toBeVisible()
  await expect(page.getByText('54 + 12 - 0 = 66')).toBeVisible()
  await expect(page.getByText('Balanced Explorer')).toBeVisible()
  await expect(
    page.getByText(
      'You built a well-rounded route with smart variety across the whole city.'
    )
  ).toBeVisible()
})

async function addAttraction(page: Page, name: string) {
  const card = cardFor(page, name)
  await card.getByRole('button', { name: /^add$/i }).click()
}

function cardFor(page: Page, name: string) {
  return page
    .getByRole('heading', { name })
    .locator('xpath=ancestor::div[@data-slot="card"][1]')
}
