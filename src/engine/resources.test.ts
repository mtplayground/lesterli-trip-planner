import { describe, expect, it } from 'vitest'

import type { Attraction, Itinerary } from './types'
import {
  canAdd,
  hudLevels,
  levelForUsage,
  totalsOf,
  usageRatio,
} from './resources'

const sampleAttractions: Record<string, Attraction> = {
  market: {
    id: 'market',
    name: 'Market Lunch',
    category: 'food',
    description: 'Quick lunch stop.',
    timeHours: 2,
    costUsd: 24,
    energy: 12,
    score: 10,
  },
  museum: {
    id: 'museum',
    name: 'Museum Block',
    category: 'museum',
    description: 'A long museum visit.',
    timeHours: 3.5,
    costUsd: 30,
    energy: 14,
    score: 16,
  },
  rooftop: {
    id: 'rooftop',
    name: 'Rooftop Drinks',
    category: 'nightlife',
    description: 'An expensive late-night stop.',
    timeHours: 2.5,
    costUsd: 48,
    energy: 18,
    score: 15,
  },
  marathon: {
    id: 'marathon',
    name: 'Marathon Activity',
    category: 'outdoors',
    description: 'A demanding long stop.',
    timeHours: 7,
    costUsd: 20,
    energy: 65,
    score: 18,
  },
}

describe('resource helpers', () => {
  it('sums itinerary totals', () => {
    const itinerary: Itinerary = [
      sampleAttractions.market,
      sampleAttractions.museum,
      sampleAttractions.rooftop,
    ]

    expect(totalsOf(itinerary)).toEqual({
      timeHours: 8,
      costUsd: 102,
      energy: 44,
    })
  })

  it('allows attractions that remain within resource limits', () => {
    const itinerary: Itinerary = [
      sampleAttractions.market,
      sampleAttractions.museum,
    ]

    expect(canAdd(itinerary, sampleAttractions.rooftop)).toEqual({
      ok: true,
      reason: null,
    })
  })

  it('blocks attractions that exceed the first violated limit', () => {
    const itinerary: Itinerary = [
      sampleAttractions.market,
      sampleAttractions.museum,
    ]

    expect(canAdd(itinerary, sampleAttractions.marathon)).toEqual({
      ok: false,
      reason: 'Would exceed the 12-hour limit',
    })
  })

  it('converts usage ratios into hud levels', () => {
    expect(usageRatio(6, 12)).toBe(0.5)
    expect(levelForUsage(9.6, 12)).toBe('warning')
    expect(levelForUsage(12, 12)).toBe('danger')

    expect(
      hudLevels({
        timeHours: 10,
        costUsd: 151,
        energy: 40,
      })
    ).toEqual({
      timeHours: 'warning',
      costUsd: 'danger',
      energy: 'safe',
    })
  })
})
