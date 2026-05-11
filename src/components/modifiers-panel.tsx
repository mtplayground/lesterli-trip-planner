import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Blend, Sparkles } from 'lucide-react'

import type { Modifier } from '@/engine'
import { cn } from '@/lib/cn'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ModifiersPanelProps {
  modifiers: Modifier[]
  className?: string
}

export function ModifiersPanel({ modifiers, className }: ModifiersPanelProps) {
  const prefersReducedMotion = useReducedMotion() ?? false

  return (
    <Card
      className={cn(
        'border-white/60 bg-white/78 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur',
        className
      )}
    >
      <CardHeader className="gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
          <Blend className="size-4" />
          Live modifiers
        </div>
        <CardTitle className="font-display text-2xl text-slate-950">
          <h3>Combos & penalties</h3>
        </CardTitle>
        <CardDescription>
          Active rule effects update as soon as your itinerary changes.
        </CardDescription>
      </CardHeader>

      <CardContent
        role="region"
        aria-label="Active modifiers"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {modifiers.length === 0 ? (
            <motion.div
              key="empty"
              role="status"
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.18, ease: 'easeOut' }
              }
              className="rounded-3xl border border-dashed border-slate-300/80 bg-slate-50/70 px-5 py-8 text-center"
            >
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white text-berry shadow-[0_12px_30px_rgba(124,58,237,0.14)]">
                <Sparkles className="size-5" />
              </div>
              <p className="mt-4 font-display text-2xl tracking-tight text-slate-950">
                No live modifiers
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Mix categories or lean into a theme to unlock combo bonuses and
                penalties here.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout={!prefersReducedMotion}
              className="space-y-3"
              role="list"
            >
              {modifiers.map((modifier) => (
                <motion.div
                  key={modifier.id}
                  role="listitem"
                  aria-label={`${modifier.label}, ${modifier.kind} ${modifier.delta > 0 ? '+' : ''}${modifier.delta}`}
                  layout={!prefersReducedMotion}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, y: 12, scale: 0.98 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, y: -10, scale: 0.98 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.2, ease: 'easeOut' }
                  }
                  className={cn(
                    'rounded-3xl border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]',
                    modifier.kind === 'bonus'
                      ? 'border-emerald-200/80 bg-emerald-50/85'
                      : 'border-rose-200/80 bg-rose-50/85'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-display text-xl tracking-tight text-slate-950">
                        {modifier.label}
                      </p>
                      <p className="text-sm leading-6 text-slate-600">
                        {modifier.description}
                      </p>
                    </div>

                    <div
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold',
                        modifier.kind === 'bonus'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      )}
                    >
                      {modifier.kind === 'bonus' ? (
                        <ArrowUpRight className="size-4" />
                      ) : (
                        <ArrowDownRight className="size-4" />
                      )}
                      {modifier.delta > 0 ? '+' : ''}
                      {modifier.delta}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
