import type { Attraction } from '@/engine'

import { NEW_YORK_ATTRACTIONS } from './new-york'
import { PARIS_ATTRACTIONS } from './paris'
import { TOKYO_ATTRACTIONS } from './tokyo'

export const CITY_IDS = ['tokyo', 'paris', 'new-york'] as const

export type CityId = (typeof CITY_IDS)[number]

export interface City {
  id: CityId
  name: string
  themeColor: string
  attractions: Attraction[]
}

export const cities = {
  tokyo: {
    id: 'tokyo',
    name: 'Tokyo',
    themeColor: '#7c3aed',
    attractions: TOKYO_ATTRACTIONS,
  },
  paris: {
    id: 'paris',
    name: 'Paris',
    themeColor: '#ec4899',
    attractions: PARIS_ATTRACTIONS,
  },
  'new-york': {
    id: 'new-york',
    name: 'New York',
    themeColor: '#2563eb',
    attractions: NEW_YORK_ATTRACTIONS,
  },
} satisfies Record<CityId, City>

export function isCityId(value: string): value is CityId {
  return CITY_IDS.some((cityId) => cityId === value)
}

export function getCity(id: string) {
  return isCityId(id) ? cities[id] : undefined
}
