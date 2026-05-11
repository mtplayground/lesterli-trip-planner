import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PartyPopper, RotateCcw, Sparkles } from 'lucide-react'

import {
  baseScoreOf,
  modifierDeltaOf,
  type Itinerary,
  type Modifier,
  type TripStyle,
} from '@/engine'
import { formatCurrency, formatHours } from '@/lib/format'
import { TripStyleBadge } from '@/components/trip-style-badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface FinishScreenProps {
  cityName: string
  itinerary: Itinerary
  modifiers: Modifier[]
  score: number
  tripStyle: TripStyle
  onPlayAgain: () => void
}

export function FinishScreen({
  cityName,
  itinerary,
  modifiers,
  score,
  tripStyle,
  onPlayAgain,
}: FinishScreenProps) {
  const baseScore = useMemo(() => baseScoreOf(itinerary), [itinerary])
  const bonusTotal = useMemo(
    () =>
      modifiers
        .filter((modifier) => modifier.delta > 0)
        .reduce((total, modifier) => total + modifier.delta, 0),
    [modifiers]
  )
  const penaltyTotal = useMemo(
    () =>
      Math.abs(
        modifiers
          .filter((modifier) => modifier.delta < 0)
          .reduce((total, modifier) => total + modifier.delta, 0)
      ),
    [modifiers]
  )
  const modifierNet = useMemo(() => modifierDeltaOf(modifiers), [modifiers])

  return (
    <section className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <Card className="overflow-hidden border-white/60 bg-white/82 shadow-[0_28px_72px_rgba(15,23,42,0.1)] backdrop-blur">
          <CardHeader className="gap-4 border-b border-white/70 bg-[linear-gradient(135deg,rgba(124,58,237,0.12),rgba(15,118,110,0.08))] pb-6">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              <PartyPopper className="size-4" />
              Finish screen
            </div>
            <CardTitle className="font-display text-4xl tracking-tight text-slate-950">
              <h2>Trip complete</h2>
            </CardTitle>
            <CardDescription className="text-base leading-7">
              Your final score reveals alongside the exact breakdown used by the
              game engine.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 p-6 md:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-4 rounded-3xl border border-white/70 bg-white/86 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Score reveal
              </p>
              <div className="flex items-end gap-3">
                <AnimatedScore key={score} score={score} />
              </div>
              <TripStyleBadge tripStyle={tripStyle} />
              <div className="grid gap-3 pt-2">
                <BreakdownRow label="Base score" value={baseScore} />
                <BreakdownRow label="Bonuses" value={bonusTotal} positive />
                <BreakdownRow label="Penalties" value={penaltyTotal} negative />
                <BreakdownRow
                  label="Modifier net"
                  value={Math.abs(modifierNet)}
                  positive={modifierNet > 0}
                  negative={modifierNet < 0}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/70 bg-white/86 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Itinerary recap
                </p>
                <p className="mt-2 font-display text-3xl tracking-tight text-slate-950">
                  {cityName}
                </p>
                <div className="mt-4 space-y-3">
                  {itinerary.map((attraction, index) => (
                    <div
                      key={attraction.id}
                      className="rounded-2xl border border-slate-200/80 bg-white/78 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                          {index + 1}
                        </span>
                        <div className="space-y-1">
                          <p className="font-medium text-slate-900">
                            {attraction.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {attraction.category} •{' '}
                            {formatHours(attraction.timeHours)} •{' '}
                            {formatCurrency(attraction.costUsd)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/70 bg-white/86 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Modifier recap
                </p>
                <div className="mt-4 space-y-3">
                  {modifiers.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/70 px-4 py-5 text-center">
                      <Sparkles className="mx-auto size-5 text-berry" />
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        No live modifiers changed your score this round.
                      </p>
                    </div>
                  ) : (
                    modifiers.map((modifier) => (
                      <div
                        key={modifier.id}
                        className="rounded-2xl border border-slate-200/80 bg-white/80 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-slate-900">
                            {modifier.label}
                          </p>
                          <span className="text-sm font-semibold text-slate-700">
                            {modifier.delta > 0 ? '+' : ''}
                            {modifier.delta}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {modifier.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.06, ease: 'easeOut' }}
        className="grid gap-6 content-start"
      >
        <Card className="border-white/60 bg-white/78 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-slate-950">
              Breakdown formula
            </CardTitle>
            <CardDescription>
              Final score = base score + bonuses − penalties.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-secondary/80 p-4">
              {baseScore} + {bonusTotal} - {penaltyTotal} = {score}
            </div>
            <Button size="lg" onClick={onPlayAgain}>
              <RotateCcw className="size-4" />
              Play again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

function AnimatedScore({ score }: { score: number }) {
  const [revealedScore, setRevealedScore] = useState(0)

  useEffect(() => {
    if (score === 0) {
      return
    }

    let frame = 0
    const totalFrames = 18
    const stepMs = 45
    const timer = window.setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      const eased = 1 - (1 - progress) ** 3

      setRevealedScore(Math.round(score * eased))

      if (frame >= totalFrames) {
        window.clearInterval(timer)
      }
    }, stepMs)

    return () => window.clearInterval(timer)
  }, [score])

  return (
    <span className="font-display text-7xl leading-none tracking-tight text-slate-950">
      {revealedScore}
    </span>
  )
}

function BreakdownRow({
  label,
  value,
  positive = false,
  negative = false,
}: {
  label: string
  value: number
  positive?: boolean
  negative?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-secondary/70 px-4 py-3 text-sm">
      <span className="text-slate-600">{label}</span>
      <span
        className={
          positive
            ? 'font-semibold text-emerald-700'
            : negative
              ? 'font-semibold text-rose-700'
              : 'font-semibold text-slate-900'
        }
      >
        {positive ? '+' : negative && value > 0 ? '-' : ''}
        {value}
      </span>
    </div>
  )
}
