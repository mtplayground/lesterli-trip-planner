import { useMemo } from 'react'
import { MapPinned, RotateCcw } from 'lucide-react'

import {
  classifyTripStyle,
  modifiersOf,
  scoreItinerary,
  totalsOf,
} from '@/engine'
import { selectSelectedCity, useGameStore } from '@/store'
import {
  AttractionGrid,
  FinishScreen,
  MobileItineraryDrawer,
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
    <section className="grid gap-6 pb-24 md:pb-0 xl:grid-cols-[1.08fr_0.92fr]">
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

        <MobileItineraryDrawer
          itinerary={itinerary}
          onRemoveAttraction={removeAttraction}
          onFinishTrip={finishTrip}
        />
      </div>

      <div className="grid gap-6">
        <YourDayPanel
          className="hidden md:block border-white/60 bg-white/78 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur"
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

  const modifiers = useMemo(() => modifiersOf(itinerary), [itinerary])
  const score = useMemo(() => scoreItinerary(itinerary), [itinerary])
  const tripStyle = useMemo(() => classifyTripStyle(itinerary), [itinerary])

  return (
    <FinishScreen
      cityName={selectedCity?.name ?? 'No city'}
      itinerary={itinerary}
      modifiers={modifiers}
      score={score}
      tripStyle={tripStyle}
      onPlayAgain={restart}
    />
  )
}
