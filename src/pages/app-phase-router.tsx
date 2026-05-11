import { useMemo } from 'react'
import { MapPinned, PartyPopper, RotateCcw } from 'lucide-react'

import {
  classifyTripStyle,
  modifiersOf,
  scoreItinerary,
  totalsOf,
} from '@/engine'
import { formatCurrency, formatHours } from '@/lib/format'
import { selectSelectedCity, useGameStore } from '@/store'
import {
  AttractionGrid,
  ModifiersPanel,
  ResourceHUD,
  YourDayPanel,
} from '@/components'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CitySelectScreen } from './city-select-screen'

export function CitySelectPhase() {
  const selectCity = useGameStore((state) => state.selectCity)

  return <CitySelectScreen onSelectCity={selectCity} />
}

export function PlayingPhase() {
  const selectedCity = useGameStore(selectSelectedCity)
  const itinerary = useGameStore((state) => state.itinerary)
  const addAttraction = useGameStore((state) => state.addAttraction)
  const removeAttraction = useGameStore((state) => state.removeAttraction)
  const finishTrip = useGameStore((state) => state.finishTrip)
  const restart = useGameStore((state) => state.restart)

  const totals = useMemo(() => totalsOf(itinerary), [itinerary])
  const modifiers = useMemo(() => modifiersOf(itinerary), [itinerary])
  const score = useMemo(() => scoreItinerary(itinerary), [itinerary])

  if (!selectedCity) {
    return <CitySelectPhase />
  }

  const availableAttractions = selectedCity.attractions

  return (
    <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <div className="space-y-6">
        <Card className="overflow-hidden border-white/60 bg-white/78 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div
            className="h-2 w-full"
            style={{ backgroundColor: selectedCity.themeColor }}
          />
          <CardHeader className="gap-3">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              <MapPinned className="size-4" />
              Playing phase
            </div>
            <CardTitle className="font-display text-3xl text-slate-950">
              <h2>Planning in {selectedCity.name}</h2>
            </CardTitle>
            <CardDescription className="text-base leading-7">
              This is the phase-routed board shell. Later issues will swap in
              the real attraction grid and itinerary panels while keeping this
              route contract intact.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResourceHUD totals={totals} />
          </CardContent>
        </Card>

        <AttractionGrid
          cityName={selectedCity.name}
          attractions={availableAttractions}
          itinerary={itinerary}
          onAddAttraction={addAttraction}
        />
      </div>

      <div className="grid gap-6">
        <YourDayPanel
          itinerary={itinerary}
          onRemoveAttraction={removeAttraction}
          onFinishTrip={finishTrip}
        />

        <ModifiersPanel modifiers={modifiers} />

        <Card className="border-white/60 bg-white/78 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-slate-950">
              Live snapshot
            </CardTitle>
            <CardDescription>
              Selectors already expose the derived values the next screens will
              consume.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-secondary/80 p-4">
              Selected attractions: {itinerary.length}
            </div>
            <div className="rounded-2xl bg-secondary/80 p-4">
              Projected score: {score}
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" size="lg" onClick={restart}>
          <RotateCcw className="size-4" />
          Back to city select
        </Button>
      </div>
    </section>
  )
}

export function FinishedPhase() {
  const selectedCity = useGameStore(selectSelectedCity)
  const itinerary = useGameStore((state) => state.itinerary)
  const restart = useGameStore((state) => state.restart)

  const totals = useMemo(() => totalsOf(itinerary), [itinerary])
  const modifiers = useMemo(() => modifiersOf(itinerary), [itinerary])
  const score = useMemo(() => scoreItinerary(itinerary), [itinerary])
  const tripStyle = useMemo(() => classifyTripStyle(itinerary), [itinerary])

  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card className="overflow-hidden border-white/60 bg-white/80 shadow-[0_28px_72px_rgba(15,23,42,0.1)] backdrop-blur">
        <div
          className="h-2 w-full"
          style={{ backgroundColor: selectedCity?.themeColor ?? '#7c3aed' }}
        />
        <CardHeader className="gap-4">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            <PartyPopper className="size-4" />
            Finished phase
          </div>
          <CardTitle className="font-display text-4xl tracking-tight text-slate-950">
            <h2>Trip summary ready</h2>
          </CardTitle>
          <CardDescription className="text-base leading-7">
            The finish route is now part of the top-level app shell, with score
            and trip-style data already sourced from the shared engine.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <StatCard label="City" value={selectedCity?.name ?? 'No city'} />
          <StatCard label="Trip style" value={tripStyle} />
          <StatCard label="Final score" value={String(score)} />
          <StatCard label="Modifiers" value={String(modifiers.length)} />
          <StatCard label="Time used" value={formatHours(totals.timeHours)} />
          <StatCard
            label="Budget used"
            value={formatCurrency(totals.costUsd)}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card className="border-white/60 bg-white/78 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-slate-950">
              Modifier recap
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {modifiers.length === 0 ? (
              <div className="rounded-2xl bg-secondary/80 p-4 text-sm text-secondary-foreground">
                No bonuses or penalties are active yet.
              </div>
            ) : (
              modifiers.map((modifier) => (
                <div
                  key={modifier.id}
                  className="rounded-2xl border border-border/70 bg-white/85 p-4"
                >
                  <p className="font-medium text-slate-900">
                    {modifier.label} ({modifier.delta > 0 ? '+' : ''}
                    {modifier.delta})
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {modifier.description}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Button size="lg" onClick={restart}>
          <RotateCcw className="size-4" />
          Plan another day
        </Button>
      </div>
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-border/70 bg-white/85 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  )
}
