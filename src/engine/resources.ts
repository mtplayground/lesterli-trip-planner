import type { Attraction, Itinerary, ResourceTotals } from './types'
import { RESOURCE_LIMITS } from './types'

export const RESOURCE_WARNING_THRESHOLD = 0.8
const FLOATING_POINT_TOLERANCE = 1e-9

export const RESOURCE_LEVELS = ['safe', 'warning', 'danger'] as const

export type ResourceLevel = (typeof RESOURCE_LEVELS)[number]

export interface CanAddResult {
  ok: boolean
  reason: string | null
}

export function totalsOf(itinerary: Itinerary): ResourceTotals {
  return itinerary.reduce<ResourceTotals>(
    (totals, attraction) => ({
      timeHours: totals.timeHours + attraction.timeHours,
      costUsd: totals.costUsd + attraction.costUsd,
      energy: totals.energy + attraction.energy,
    }),
    {
      timeHours: 0,
      costUsd: 0,
      energy: 0,
    }
  )
}

export function canAdd(
  itinerary: Itinerary,
  attraction: Attraction
): CanAddResult {
  const nextTotals = totalsOf([...itinerary, attraction])

  if (nextTotals.timeHours > RESOURCE_LIMITS.timeHours) {
    return {
      ok: false,
      reason: `Would exceed the ${RESOURCE_LIMITS.timeHours}-hour limit`,
    }
  }

  if (nextTotals.costUsd > RESOURCE_LIMITS.costUsd) {
    return {
      ok: false,
      reason: `Would exceed the $${RESOURCE_LIMITS.costUsd} budget`,
    }
  }

  if (nextTotals.energy > RESOURCE_LIMITS.energy) {
    return {
      ok: false,
      reason: `Would exceed the ${RESOURCE_LIMITS.energy}-energy limit`,
    }
  }

  return {
    ok: true,
    reason: null,
  }
}

export function usageRatio(value: number, limit: number) {
  if (limit <= 0) {
    return 0
  }

  return value / limit
}

export function levelForUsage(value: number, limit: number): ResourceLevel {
  const ratio = usageRatio(value, limit)

  if (ratio >= 1 - FLOATING_POINT_TOLERANCE) {
    return 'danger'
  }

  if (ratio >= RESOURCE_WARNING_THRESHOLD - FLOATING_POINT_TOLERANCE) {
    return 'warning'
  }

  return 'safe'
}

export function hudLevels(totals: ResourceTotals) {
  return {
    timeHours: levelForUsage(totals.timeHours, RESOURCE_LIMITS.timeHours),
    costUsd: levelForUsage(totals.costUsd, RESOURCE_LIMITS.costUsd),
    energy: levelForUsage(totals.energy, RESOURCE_LIMITS.energy),
  } satisfies Record<keyof ResourceTotals, ResourceLevel>
}
