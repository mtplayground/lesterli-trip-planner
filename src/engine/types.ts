export const CATEGORIES = [
  'food',
  'museum',
  'outdoors',
  'nightlife',
  'shopping',
] as const

export type Category = (typeof CATEGORIES)[number]

export const TRIP_STYLES = [
  'Foodie Marathon',
  'Culture Vulture',
  'Night Owl',
  'Balanced Explorer',
  'Outdoor Adventurer',
  'Shopaholic',
] as const

export type TripStyle = (typeof TRIP_STYLES)[number]

export const MODIFIER_KINDS = ['bonus', 'penalty'] as const

export type ModifierKind = (typeof MODIFIER_KINDS)[number]

export interface Attraction {
  id: string
  name: string
  category: Category
  description: string
  timeHours: number
  costUsd: number
  energy: number
  score: number
}

export type Itinerary = Attraction[]

export interface ResourceTotals {
  timeHours: number
  costUsd: number
  energy: number
}

export interface Modifier {
  id: string
  label: string
  kind: ModifierKind
  delta: number
  description: string
}

export interface GameResult {
  itinerary: Itinerary
  totals: ResourceTotals
  modifiers: Modifier[]
  score: number
  tripStyle: TripStyle
}

export const MAX_TIME_HOURS = 12
export const MAX_BUDGET_USD = 150
export const MAX_ENERGY = 100

export const RESOURCE_LIMITS = {
  timeHours: MAX_TIME_HOURS,
  costUsd: MAX_BUDGET_USD,
  energy: MAX_ENERGY,
} as const satisfies ResourceTotals
