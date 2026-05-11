import {
  BALANCED_MIX_CATEGORY_COUNT,
  categoryCountsOf,
  modifiersOf,
} from './modifiers'
import { CATEGORIES } from './types'
import type { Category, Itinerary, Modifier, TripStyle } from './types'

const CATEGORY_TRIP_STYLES: Record<Category, TripStyle> = {
  food: 'Foodie Marathon',
  museum: 'Culture Vulture',
  nightlife: 'Night Owl',
  outdoors: 'Outdoor Adventurer',
  shopping: 'Shopaholic',
}

export function baseScoreOf(itinerary: Itinerary) {
  return itinerary.reduce((total, attraction) => total + attraction.score, 0)
}

export function modifierDeltaOf(modifiers: Modifier[]) {
  return modifiers.reduce((total, modifier) => total + modifier.delta, 0)
}

export function scoreItinerary(itinerary: Itinerary) {
  const modifiers = modifiersOf(itinerary)

  return baseScoreOf(itinerary) + modifierDeltaOf(modifiers)
}

export function classifyTripStyle(itinerary: Itinerary): TripStyle {
  if (itinerary.length === 0) {
    return 'Balanced Explorer'
  }

  const counts = categoryCountsOf(itinerary)
  const representedCategories = CATEGORIES.filter(
    (category) => counts[category] > 0
  )

  if (representedCategories.length >= BALANCED_MIX_CATEGORY_COUNT) {
    return 'Balanced Explorer'
  }

  const highestCount = Math.max(
    ...representedCategories.map((category) => counts[category])
  )
  const dominantCategories = representedCategories.filter(
    (category) => counts[category] === highestCount
  )

  if (dominantCategories.length !== 1) {
    return 'Balanced Explorer'
  }

  return CATEGORY_TRIP_STYLES[dominantCategories[0]]
}
