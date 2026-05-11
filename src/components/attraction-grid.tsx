import { useMemo, useState } from 'react'
import { Filter, Sparkles } from 'lucide-react'

import {
  canAdd,
  CATEGORIES,
  type Attraction,
  type Category,
  type Itinerary,
} from '@/engine'
import { cn } from '@/lib/cn'
import { AttractionCard } from '@/components/attraction-card'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const filterLabels: Record<Category, string> = {
  food: 'Food',
  museum: 'Museum',
  outdoors: 'Outdoors',
  nightlife: 'Nightlife',
  shopping: 'Shopping',
}

interface AttractionGridProps {
  cityName: string
  attractions: Attraction[]
  itinerary: Itinerary
  onAddAttraction: (attraction: Attraction) => void
  className?: string
}

export function AttractionGrid({
  cityName,
  attractions,
  itinerary,
  onAddAttraction,
  className,
}: AttractionGridProps) {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all')

  const visibleAttractions = useMemo(() => {
    if (activeFilter === 'all') {
      return attractions
    }

    return attractions.filter(
      (attraction) => attraction.category === activeFilter
    )
  }, [activeFilter, attractions])

  const allVisibleDisabled = useMemo(
    () =>
      visibleAttractions.length > 0 &&
      visibleAttractions.every((attraction) => {
        const alreadySelected = itinerary.some(
          (plannedAttraction) => plannedAttraction.id === attraction.id
        )

        return alreadySelected || !canAdd(itinerary, attraction).ok
      }),
    [itinerary, visibleAttractions]
  )

  return (
    <Card
      className={cn(
        'border-white/60 bg-white/78 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur',
        className
      )}
    >
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              <Filter className="size-4" />
              Board main column
            </div>
            <CardTitle className="font-display text-2xl text-slate-950">
              <h3>{cityName} attraction board</h3>
            </CardTitle>
            <CardDescription className="text-sm leading-6">
              Browse the full city deck, filter by category, and add attractions
              that still fit your day plan.
            </CardDescription>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Attraction category filters"
          >
            <FilterChip
              label="All"
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            />
            {CATEGORIES.map((category) => (
              <FilterChip
                key={category}
                label={filterLabels[category]}
                active={activeFilter === category}
                onClick={() => setActiveFilter(category)}
              />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {visibleAttractions.length === 0 ? (
          <EmptyState
            title="No attractions match this filter"
            description={`There are no ${activeFilter} attractions available in ${cityName}. Try another category.`}
          />
        ) : (
          <>
            {allVisibleDisabled && (
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/90 p-4 text-sm leading-6 text-amber-800">
                Everything in this view is currently unavailable because the
                remaining attractions would exceed your trip limits or are
                already selected.
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {visibleAttractions.map((attraction) => {
                const selected = itinerary.some(
                  (plannedAttraction) => plannedAttraction.id === attraction.id
                )
                const canAddResult = selected
                  ? { ok: true, reason: null }
                  : canAdd(itinerary, attraction)

                return (
                  <AttractionCard
                    key={attraction.id}
                    attraction={attraction}
                    selected={selected}
                    canAddResult={canAddResult}
                    onAdd={onAddAttraction}
                  />
                )
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      variant={active ? 'default' : 'outline'}
      size="sm"
      className={cn(
        'rounded-full',
        active && 'shadow-[0_12px_24px_rgba(124,58,237,0.22)]'
      )}
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </Button>
  )
}

function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300/80 bg-slate-50/70 px-5 py-8 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white text-berry shadow-[0_12px_30px_rgba(124,58,237,0.14)]">
        <Sparkles className="size-5" />
      </div>
      <p className="mt-4 font-display text-2xl tracking-tight text-slate-950">
        {title}
      </p>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  )
}
