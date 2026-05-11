import { describe, expect, it } from 'vitest'

import type { Attraction, Itinerary, TripStyle } from './types'
import {
  baseScoreOf,
  classifyTripStyle,
  modifierDeltaOf,
  scoreItinerary,
} from './scoring'

const sampleAttractions: Record<string, Attraction> = {
  breakfast: {
    id: 'breakfast',
    name: 'Breakfast Counter',
    category: 'food',
    description: 'Coffee and a strong breakfast.',
    timeHours: 1.5,
    costUsd: 16,
    energy: 8,
    score: 10,
  },
  lunch: {
    id: 'lunch',
    name: 'Lunch Hall',
    category: 'food',
    description: 'A busy local lunch stop.',
    timeHours: 2,
    costUsd: 20,
    energy: 10,
    score: 12,
  },
  dinner: {
    id: 'dinner',
    name: 'Dinner Tasting',
    category: 'food',
    description: 'A longer evening meal.',
    timeHours: 2,
    costUsd: 34,
    energy: 11,
    score: 15,
  },
  lateSnack: {
    id: 'late-snack',
    name: 'Late Snack',
    category: 'food',
    description: 'One more food stop.',
    timeHours: 1,
    costUsd: 10,
    energy: 6,
    score: 8,
  },
  museum: {
    id: 'museum',
    name: 'Grand Museum',
    category: 'museum',
    description: 'A major museum stop.',
    timeHours: 2.5,
    costUsd: 24,
    energy: 11,
    score: 16,
  },
  gallery: {
    id: 'gallery',
    name: 'Modern Gallery',
    category: 'museum',
    description: 'A smaller design-focused museum.',
    timeHours: 2,
    costUsd: 18,
    energy: 8,
    score: 13,
  },
  garden: {
    id: 'garden',
    name: 'Botanical Garden',
    category: 'outdoors',
    description: 'A calm outdoor stop.',
    timeHours: 1.5,
    costUsd: 8,
    energy: 7,
    score: 10,
  },
  hike: {
    id: 'hike',
    name: 'Urban Ridge Hike',
    category: 'outdoors',
    description: 'A longer outdoor stretch.',
    timeHours: 3,
    costUsd: 0,
    energy: 17,
    score: 17,
  },
  bar: {
    id: 'bar',
    name: 'Listening Bar',
    category: 'nightlife',
    description: 'Cocktails and music.',
    timeHours: 2,
    costUsd: 28,
    energy: 14,
    score: 14,
  },
  club: {
    id: 'club',
    name: 'Jazz Club',
    category: 'nightlife',
    description: 'Late-night live music.',
    timeHours: 2.5,
    costUsd: 32,
    energy: 18,
    score: 16,
  },
  market: {
    id: 'market',
    name: 'Design Market',
    category: 'shopping',
    description: 'Souvenirs and small finds.',
    timeHours: 1.5,
    costUsd: 18,
    energy: 7,
    score: 11,
  },
  flagship: {
    id: 'flagship',
    name: 'Flagship Store',
    category: 'shopping',
    description: 'A longer shopping stop.',
    timeHours: 2,
    costUsd: 26,
    energy: 10,
    score: 13,
  },
}

describe('scoring helpers', () => {
  it('sums base attraction scores', () => {
    const itinerary: Itinerary = [
      sampleAttractions.breakfast,
      sampleAttractions.museum,
      sampleAttractions.bar,
    ]

    expect(baseScoreOf(itinerary)).toBe(40)
  })

  it('sums modifier deltas and includes both bonuses and penalties', () => {
    expect(
      modifierDeltaOf([
        {
          id: 'bonus',
          label: 'Bonus',
          kind: 'bonus',
          delta: 12,
          description: 'A test bonus.',
        },
        {
          id: 'penalty',
          label: 'Penalty',
          kind: 'penalty',
          delta: -8,
          description: 'A test penalty.',
        },
      ])
    ).toBe(4)
  })

  it('scores an itinerary as base score plus active modifiers', () => {
    const itinerary: Itinerary = [
      sampleAttractions.breakfast,
      sampleAttractions.lunch,
      sampleAttractions.dinner,
      sampleAttractions.lateSnack,
    ]

    expect(scoreItinerary(itinerary)).toBe(46)
  })
})

describe('trip-style classification', () => {
  it.each<{
    itinerary: Itinerary
    expected: TripStyle
  }>([
    {
      itinerary: [
        sampleAttractions.breakfast,
        sampleAttractions.lunch,
        sampleAttractions.dinner,
      ],
      expected: 'Foodie Marathon',
    },
    {
      itinerary: [sampleAttractions.museum, sampleAttractions.gallery],
      expected: 'Culture Vulture',
    },
    {
      itinerary: [sampleAttractions.bar, sampleAttractions.club],
      expected: 'Night Owl',
    },
    {
      itinerary: [sampleAttractions.garden, sampleAttractions.hike],
      expected: 'Outdoor Adventurer',
    },
    {
      itinerary: [sampleAttractions.market, sampleAttractions.flagship],
      expected: 'Shopaholic',
    },
    {
      itinerary: [
        sampleAttractions.breakfast,
        sampleAttractions.museum,
        sampleAttractions.garden,
        sampleAttractions.market,
      ],
      expected: 'Balanced Explorer',
    },
    {
      itinerary: [sampleAttractions.breakfast, sampleAttractions.museum],
      expected: 'Balanced Explorer',
    },
    {
      itinerary: [],
      expected: 'Balanced Explorer',
    },
  ])('classifies $expected itineraries', ({ itinerary, expected }) => {
    expect(classifyTripStyle(itinerary)).toBe(expected)
  })
})
