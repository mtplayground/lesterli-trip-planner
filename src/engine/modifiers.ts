import { CATEGORIES } from './types'
import type { Category, Itinerary, Modifier } from './types'

export interface ModifierRule {
  id: Modifier['id']
  label: Modifier['label']
  kind: Modifier['kind']
  delta: Modifier['delta']
  description: Modifier['description']
  isActive: (itinerary: Itinerary) => boolean
}

export const BALANCED_MIX_CATEGORY_COUNT = 4
export const FOOD_COMBO_COUNT = 3
export const ALL_NIGHTLIFE_MINIMUM = 2
export const SINGLE_CATEGORY_OVERLOAD_COUNT = 4

export function categoryCountsOf(
  itinerary: Itinerary
): Record<Category, number> {
  return itinerary.reduce<Record<Category, number>>(
    (counts, attraction) => ({
      ...counts,
      [attraction.category]: counts[attraction.category] + 1,
    }),
    {
      food: 0,
      museum: 0,
      outdoors: 0,
      nightlife: 0,
      shopping: 0,
    }
  )
}

function distinctCategoryCount(itinerary: Itinerary) {
  return new Set(itinerary.map((attraction) => attraction.category)).size
}

function highestCategoryCount(itinerary: Itinerary) {
  const counts = categoryCountsOf(itinerary)

  return Math.max(...CATEGORIES.map((category) => counts[category]))
}

export const MODIFIER_RULES = [
  {
    id: 'balanced-mix-bonus',
    label: 'Balanced Mix',
    kind: 'bonus',
    delta: 12,
    description:
      'Pick attractions from at least four different categories to earn a variety bonus.',
    isActive: (itinerary) =>
      distinctCategoryCount(itinerary) >= BALANCED_MIX_CATEGORY_COUNT,
  },
  {
    id: 'foodie-streak-bonus',
    label: 'Three-Course Crawl',
    kind: 'bonus',
    delta: 9,
    description:
      'Chain together three food stops for a dedicated culinary combo bonus.',
    isActive: (itinerary) =>
      categoryCountsOf(itinerary).food >= FOOD_COMBO_COUNT,
  },
  {
    id: 'all-nightlife-penalty',
    label: 'All-Nighter',
    kind: 'penalty',
    delta: -10,
    description:
      'A nightlife-only plan loses points for lacking daytime balance.',
    isActive: (itinerary) =>
      itinerary.length >= ALL_NIGHTLIFE_MINIMUM &&
      categoryCountsOf(itinerary).nightlife === itinerary.length,
  },
  {
    id: 'single-category-overload-penalty',
    label: 'Category Overload',
    kind: 'penalty',
    delta: -8,
    description:
      'Leaning too hard on one category costs points once it dominates the day.',
    isActive: (itinerary) =>
      highestCategoryCount(itinerary) >= SINGLE_CATEGORY_OVERLOAD_COUNT,
  },
] as const satisfies ModifierRule[]

export function modifiersOf(itinerary: Itinerary): Modifier[] {
  return MODIFIER_RULES.filter((rule) => rule.isActive(itinerary)).map(
    ({ id, label, kind, delta, description }) => ({
      id,
      label,
      kind,
      delta,
      description,
    })
  )
}
