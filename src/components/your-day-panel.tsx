import { ListChecks, Trash2 } from 'lucide-react'

import type { Attraction, Itinerary } from '@/engine'
import { formatCurrency, formatHours } from '@/lib/format'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface YourDayPanelProps {
  itinerary: Itinerary
  onRemoveAttraction: (attractionId: Attraction['id']) => void
  onFinishTrip: () => void
  className?: string
}

export function YourDayPanel({
  itinerary,
  onRemoveAttraction,
  onFinishTrip,
  className,
}: YourDayPanelProps) {
  const isEmpty = itinerary.length === 0

  return (
    <Card
      className={
        className ??
        'border-white/60 bg-white/78 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur'
      }
    >
      <CardHeader className="gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
          <ListChecks className="size-4" />
          Your day
        </div>
        <CardTitle className="font-display text-2xl text-slate-950">
          <h3>Your Day itinerary</h3>
        </CardTitle>
        <CardDescription>
          Selected attractions appear here in the order you picked them.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isEmpty ? (
          <EmptyItineraryState />
        ) : (
          <div className="space-y-3">
            {itinerary.map((attraction, index) => (
              <div
                key={attraction.id}
                className="rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex size-8 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                        {index + 1}
                      </span>
                      <p className="font-display text-xl tracking-tight text-slate-950">
                        {attraction.name}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500">
                      {attraction.category} •{' '}
                      {formatHours(attraction.timeHours)} •{' '}
                      {formatCurrency(attraction.costUsd)}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveAttraction(attraction.id)}
                  >
                    <Trash2 className="size-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button size="lg" onClick={onFinishTrip} disabled={isEmpty}>
          Finish trip
        </Button>
      </CardContent>
    </Card>
  )
}

function EmptyItineraryState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300/80 bg-slate-50/70 px-5 py-8 text-center">
      <p className="font-display text-2xl tracking-tight text-slate-950">
        No picks yet
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Add attractions from the board to build out your day. The finish action
        will unlock once you have at least one stop.
      </p>
    </div>
  )
}
