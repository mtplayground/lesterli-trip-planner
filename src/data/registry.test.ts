import { describe, expect, it } from 'vitest'

import { CITY_IDS, cities, getCity } from './registry'

describe('city registry', () => {
  it('exposes every city in the registry by id', () => {
    expect(CITY_IDS).toEqual(['tokyo', 'paris', 'new-york'])
    expect(Object.keys(cities)).toEqual(CITY_IDS)
  })

  it('loads a city by id with themed attractions', () => {
    const city = getCity('paris')

    expect(city).toBeDefined()
    expect(city?.name).toBe('Paris')
    expect(city?.themeColor).toBe('#ec4899')
    expect(city?.attractions.length).toBeGreaterThanOrEqual(10)
  })

  it('returns undefined for unknown ids', () => {
    expect(getCity('london')).toBeUndefined()
  })
})
