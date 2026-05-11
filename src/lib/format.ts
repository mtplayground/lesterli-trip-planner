const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const decimalFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
})

function pluralize(value: number, singular: string, plural: string) {
  return Math.abs(value) === 1 ? singular : plural
}

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function formatHours(value: number) {
  return `${decimalFormatter.format(value)} ${pluralize(value, 'hour', 'hours')}`
}

export function formatEnergy(value: number) {
  return `${decimalFormatter.format(value)} ${pluralize(value, 'energy point', 'energy points')}`
}
