import type { LucideIcon } from 'lucide-react'
import {
  Compass,
  Landmark,
  Martini,
  ShoppingBag,
  Trees,
  UtensilsCrossed,
} from 'lucide-react'

import type { TripStyle } from '@/engine'
import { cn } from '@/lib/cn'

interface TripStyleBadgeProps {
  tripStyle: TripStyle
  className?: string
}

interface TripStyleMeta {
  icon: LucideIcon
  accentClassName: string
  glowClassName: string
  flavorText: string
}

const TRIP_STYLE_META: Record<TripStyle, TripStyleMeta> = {
  'Foodie Marathon': {
    icon: UtensilsCrossed,
    accentClassName:
      'border-orange-200 bg-orange-50 text-orange-700 shadow-[0_16px_36px_rgba(249,115,22,0.16)]',
    glowClassName: 'from-orange-300/45 via-orange-200/20 to-transparent',
    flavorText:
      'You turned the city into a tasting route and never let the momentum cool off.',
  },
  'Culture Vulture': {
    icon: Landmark,
    accentClassName:
      'border-sky-200 bg-sky-50 text-sky-700 shadow-[0_16px_36px_rgba(14,165,233,0.16)]',
    glowClassName: 'from-sky-300/45 via-sky-200/20 to-transparent',
    flavorText:
      'Your day leaned into museums, landmarks, and a strong sense of place.',
  },
  'Night Owl': {
    icon: Martini,
    accentClassName:
      'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 shadow-[0_16px_36px_rgba(217,70,239,0.18)]',
    glowClassName: 'from-fuchsia-300/45 via-fuchsia-200/20 to-transparent',
    flavorText:
      'You optimized for after-dark energy, bright lights, and a late finish.',
  },
  'Balanced Explorer': {
    icon: Compass,
    accentClassName:
      'border-teal-200 bg-teal-50 text-teal-700 shadow-[0_16px_36px_rgba(20,184,166,0.16)]',
    glowClassName: 'from-teal-300/45 via-teal-200/20 to-transparent',
    flavorText:
      'You built a well-rounded route with smart variety across the whole city.',
  },
  'Outdoor Adventurer': {
    icon: Trees,
    accentClassName:
      'border-emerald-200 bg-emerald-50 text-emerald-700 shadow-[0_16px_36px_rgba(16,185,129,0.16)]',
    glowClassName: 'from-emerald-300/45 via-emerald-200/20 to-transparent',
    flavorText:
      'Fresh air, movement, and open-space stops drove your day from start to finish.',
  },
  Shopaholic: {
    icon: ShoppingBag,
    accentClassName:
      'border-rose-200 bg-rose-50 text-rose-700 shadow-[0_16px_36px_rgba(244,63,94,0.16)]',
    glowClassName: 'from-rose-300/45 via-rose-200/20 to-transparent',
    flavorText:
      'Your itinerary favored stylish detours, browsing runs, and big shopping energy.',
  },
}

export function TripStyleBadge({ tripStyle, className }: TripStyleBadgeProps) {
  const {
    icon: Icon,
    accentClassName,
    glowClassName,
    flavorText,
  } = TRIP_STYLE_META[tripStyle]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border p-4 sm:p-5',
        accentClassName,
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-br blur-2xl',
          glowClassName
        )}
      />
      <div className="relative flex items-start gap-4">
        <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-current/15 bg-white/75">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-current/75">
            Trip style
          </p>
          <p className="font-display text-2xl leading-none tracking-tight text-slate-950">
            {tripStyle}
          </p>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            {flavorText}
          </p>
        </div>
      </div>
    </div>
  )
}
