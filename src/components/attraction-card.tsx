import {
  Landmark,
  Martini,
  ShoppingBag,
  Sparkles,
  Trees,
  UtensilsCrossed,
} from 'lucide-react'

import type { Attraction, CanAddResult, Category } from '@/engine'
import { formatCurrency, formatEnergy, formatHours } from '@/lib/format'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const categoryMeta: Record<
  Category,
  {
    icon: typeof UtensilsCrossed
    label: string
    iconClassName: string
    badgeClassName: string
  }
> = {
  food: {
    icon: UtensilsCrossed,
    label: 'Food',
    iconClassName: 'bg-sunrise text-white',
    badgeClassName: 'bg-amber-50 text-amber-700 border-amber-200/80',
  },
  museum: {
    icon: Landmark,
    label: 'Museum',
    iconClassName: 'bg-berry text-white',
    badgeClassName: 'bg-violet-50 text-violet-700 border-violet-200/80',
  },
  outdoors: {
    icon: Trees,
    label: 'Outdoors',
    iconClassName: 'bg-lagoon text-white',
    badgeClassName: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  },
  nightlife: {
    icon: Martini,
    label: 'Nightlife',
    iconClassName: 'bg-slate-900 text-white',
    badgeClassName: 'bg-slate-100 text-slate-700 border-slate-200/80',
  },
  shopping: {
    icon: ShoppingBag,
    label: 'Shopping',
    iconClassName: 'bg-blue-600 text-white',
    badgeClassName: 'bg-blue-50 text-blue-700 border-blue-200/80',
  },
}

interface AttractionCardProps {
  attraction: Attraction
  selected?: boolean
  canAddResult?: CanAddResult
  onAdd?: (attraction: Attraction) => void
}

export function AttractionCard({
  attraction,
  selected = false,
  canAddResult = { ok: true, reason: null },
  onAdd,
}: AttractionCardProps) {
  const category = categoryMeta[attraction.category]
  const disabledReason =
    selected || canAddResult.ok ? null : (canAddResult.reason ?? 'Unavailable')
  const actionDisabled = selected || !canAddResult.ok
  const CategoryIcon = category.icon

  return (
    <Card
      className={cn(
        'h-full border-white/70 bg-white/85 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur transition-all',
        selected &&
          'border-lagoon/60 bg-lagoon/8 shadow-[0_28px_70px_rgba(15,118,110,0.14)] ring-1 ring-lagoon/30'
      )}
    >
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]',
                  category.badgeClassName
                )}
              >
                <span
                  className={cn('rounded-full p-1', category.iconClassName)}
                >
                  <CategoryIcon className="size-3.5" />
                </span>
                {category.label}
              </span>
              {selected && (
                <span className="inline-flex items-center gap-1 rounded-full border border-lagoon/20 bg-lagoon/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-lagoon">
                  <Sparkles className="size-3.5" />
                  Selected
                </span>
              )}
            </div>
            <CardTitle className="font-display text-2xl text-slate-950">
              <h3>{attraction.name}</h3>
            </CardTitle>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white/75 px-3 py-2 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Score
            </p>
            <p className="mt-1 font-display text-2xl tracking-tight text-slate-950">
              {attraction.score}
            </p>
          </div>
        </div>
        <CardDescription className="text-sm leading-6 text-slate-600">
          {attraction.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <MetricBadge label="Time" value={formatHours(attraction.timeHours)} />
          <MetricBadge
            label="Cost"
            value={formatCurrency(attraction.costUsd)}
          />
          <MetricBadge label="Energy" value={formatEnergy(attraction.energy)} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            disabled={actionDisabled}
            onClick={() => onAdd?.(attraction)}
            variant={selected ? 'secondary' : 'default'}
          >
            {selected ? 'Selected' : canAddResult.ok ? 'Add' : 'Unavailable'}
          </Button>

          {disabledReason && (
            <span
              aria-label={`Cannot add attraction: ${disabledReason}`}
              title={disabledReason}
              className="inline-flex items-center rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
            >
              Why unavailable?
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function MetricBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  )
}
