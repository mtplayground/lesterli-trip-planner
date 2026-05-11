import { describe, expect, it } from 'vitest'

import type { Attraction, Itinerary } from './types'
import {
  BALANCED_MIX_CATEGORY_COUNT,
  categoryCountsOf,
  modifiersOf,
  SINGLE_CATEGORY_OVERLOAD_COUNT,
} from './modifiers'

const sampleAttractions: Record<string, Attraction> = {
  brunch: {
    id: 'brunch',
    name: 'Brunch Counter',
    category: 'food',
    description: 'Start the day with a strong breakfast.',
    timeHours: 1.5,
    costUsd: 20,
    energy: 8,
    score: 10,
  },
  market: {
    id: 'market',
    name: 'Street Food Market',
    category: 'food',
    description: 'Snack your way through the market stalls.',
    timeHours: 2,
    costUsd: 24,
    energy: 10,
    score: 12,
  },
  dinner: {
    id: 'dinner',
    name: 'Chef Counter Dinner',
    category: 'food',
    description: 'A splurge-worthy dinner stop.',
    timeHours: 2,
    costUsd: 34,
    energy: 12,
    score: 15,
  },
  cocktailBar: {
    id: 'cocktail-bar',
    name: 'Cocktail Bar',
    category: 'nightlife',
    description: 'A first late-night stop.',
    timeHours: 2,
    costUsd: 30,
    energy: 15,
    score: 14,
  },
  jazzClub: {
    id: 'jazz-club',
    name: 'Jazz Club',
    category: 'nightlife',
    description: 'A second late-night stop.',
    timeHours: 2.5,
    costUsd: 36,
    energy: 18,
    score: 16,
  },
  museum: {
    id: 'museum',
    name: 'City Museum',
    category: 'museum',
    description: 'A major museum visit.',
    timeHours: 2.5,
    costUsd: 22,
    energy: 10,
    score: 15,
  },
  park: {
    id: 'park',
    name: 'Riverside Park',
    category: 'outdoors',
    description: 'A green reset between stops.',
    timeHours: 1.5,
    costUsd: 0,
    energy: 7,
    score: 10,
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade Crawl',
    category: 'shopping',
    description: 'Browse and buy a few souvenirs.',
    timeHours: 2,
    costUsd: 18,
    energy: 9,
    score: 11,
  },
}

describe('modifier rules', () => {
  it('counts itinerary categories for rule evaluation', () => {
    const itinerary: Itinerary = [
      sampleAttractions.brunch,
      sampleAttractions.market,
      sampleAttractions.museum,
    ]

    expect(categoryCountsOf(itinerary)).toEqual({
      food: 2,
      museum: 1,
      outdoors: 0,
      nightlife: 0,
      shopping: 0,
    })
  })

  it('applies the balanced mix bonus once four categories are represented', () => {
    const itinerary: Itinerary = [
      sampleAttractions.brunch,
      sampleAttractions.museum,
      sampleAttractions.park,
      sampleAttractions.arcade,
    ]

    expect(itinerary).toHaveLength(BALANCED_MIX_CATEGORY_COUNT)
    expect(modifiersOf(itinerary)).toContainEqual({
      id: 'balanced-mix-bonus',
      label: 'Balanced Mix',
      kind: 'bonus',
      delta: 12,
      description:
        'Pick attractions from at least four different categories to earn a variety bonus.',
    })
  })

  it('applies the three-food combo bonus', () => {
    const itinerary: Itinerary = [
      sampleAttractions.brunch,
      sampleAttractions.market,
      sampleAttractions.dinner,
    ]

    expect(modifiersOf(itinerary)).toContainEqual({
      id: 'foodie-streak-bonus',
      label: 'Three-Course Crawl',
      kind: 'bonus',
      delta: 9,
      description:
        'Chain together three food stops for a dedicated culinary combo bonus.',
    })
  })

  it('applies the all-nightlife penalty when every stop is nightlife', () => {
    const itinerary: Itinerary = [
      sampleAttractions.cocktailBar,
      sampleAttractions.jazzClub,
    ]

    expect(modifiersOf(itinerary)).toContainEqual({
      id: 'all-nightlife-penalty',
      label: 'All-Nighter',
      kind: 'penalty',
      delta: -10,
      description:
        'A nightlife-only plan loses points for lacking daytime balance.',
    })
  })

  it('applies the overload penalty when one category dominates the day', () => {
    const itinerary: Itinerary = [
      sampleAttractions.brunch,
      sampleAttractions.market,
      sampleAttractions.dinner,
      {
        ...sampleAttractions.brunch,
        id: 'late-snack',
        name: 'Late Snack',
      },
    ]

    expect(itinerary).toHaveLength(SINGLE_CATEGORY_OVERLOAD_COUNT)
    expect(modifiersOf(itinerary)).toContainEqual({
      id: 'single-category-overload-penalty',
      label: 'Category Overload',
      kind: 'penalty',
      delta: -8,
      description:
        'Leaning too hard on one category costs points once it dominates the day.',
    })
  })

  it('returns active modifiers in rule order and omits inactive rules', () => {
    const itinerary: Itinerary = [
      sampleAttractions.brunch,
      sampleAttractions.market,
      sampleAttractions.dinner,
      sampleAttractions.museum,
      sampleAttractions.park,
      sampleAttractions.arcade,
    ]

    expect(modifiersOf(itinerary)).toEqual([
      {
        id: 'balanced-mix-bonus',
        label: 'Balanced Mix',
        kind: 'bonus',
        delta: 12,
        description:
          'Pick attractions from at least four different categories to earn a variety bonus.',
      },
      {
        id: 'foodie-streak-bonus',
        label: 'Three-Course Crawl',
        kind: 'bonus',
        delta: 9,
        description:
          'Chain together three food stops for a dedicated culinary combo bonus.',
      },
    ])
  })
})
