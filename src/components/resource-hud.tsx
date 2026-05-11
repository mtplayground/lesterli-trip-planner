import { Clock3, HeartPulse, Wallet } from 'lucide-react'

import {
  hudLevels,
  RESOURCE_LIMITS,
  usageRatio,
  type ResourceLevel,
  type ResourceTotals,
} from '@/engine'
import { formatCurrency, formatEnergy, formatHours } from '@/lib/format'
import { cn } from '@/lib/cn'
import { Progress } from '@/components/ui/progress'

const resourceConfig = [
  {
    key: 'timeHours',
    label: 'Time',
    icon: Clock3,
    limitLabel: formatHours(RESOURCE_LIMITS.timeHours),
    formatValue: formatHours,
  },
  {
    key: 'costUsd',
    label: 'Cost',
    icon: Wallet,
    limitLabel: formatCurrency(RESOURCE_LIMITS.costUsd),
    formatValue: formatCurrency,
  },
  {
    key: 'energy',
    label: 'Energy',
    icon: HeartPulse,
    limitLabel: formatEnergy(RESOURCE_LIMITS.energy),
    formatValue: formatEnergy,
  },
] as const satisfies Array<{
  key: keyof ResourceTotals
  label: string
  icon: typeof Clock3
  limitLabel: string
  formatValue: (value: number) => string
}>

interface ResourceHUDProps {
  totals: ResourceTotals
  className?: string
}

export function ResourceHUD({ totals, className }: ResourceHUDProps) {
  const levels = hudLevels(totals)

  return (
    <div
      className={cn('grid gap-4 md:grid-cols-3', className)}
      aria-label="Resource HUD"
    >
      {resourceConfig.map((resource) => {
        const value = totals[resource.key]
        const level = levels[resource.key]
        const progressValue = Math.min(
          Math.max(usageRatio(value, RESOURCE_LIMITS[resource.key]) * 100, 0),
          100
        )
        const Icon = resource.icon

        return (
          <section
            key={resource.key}
            aria-label={`${resource.label} resource`}
            className={cn(
              'rounded-3xl border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition-colors',
              containerClassName(level)
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {resource.label}
                </p>
                <p className="mt-2 font-display text-3xl tracking-tight text-slate-950">
                  {resource.formatValue(value)}
                </p>
              </div>
              <div className={cn('rounded-2xl p-2.5', iconClassName(level))}>
                <Icon className="size-4.5 text-white" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Limit {resource.limitLabel}</span>
                <span className={statusClassName(level)}>
                  {statusLabel(level)}
                </span>
              </div>
              <Progress
                value={progressValue}
                className={trackClassName(level)}
                indicatorClassName={indicatorClassName(level)}
              />
            </div>
          </section>
        )
      })}
    </div>
  )
}

function statusLabel(level: ResourceLevel) {
  switch (level) {
    case 'warning':
      return 'Warning'
    case 'danger':
      return 'Limit reached'
    default:
      return 'Healthy'
  }
}

function containerClassName(level: ResourceLevel) {
  switch (level) {
    case 'warning':
      return 'border-amber-300/80 bg-amber-50/90'
    case 'danger':
      return 'border-rose-300/80 bg-rose-50/90'
    default:
      return 'border-white/70 bg-white/88'
  }
}

function iconClassName(level: ResourceLevel) {
  switch (level) {
    case 'warning':
      return 'bg-amber-500'
    case 'danger':
      return 'bg-rose-500'
    default:
      return 'bg-lagoon'
  }
}

function trackClassName(level: ResourceLevel) {
  switch (level) {
    case 'warning':
      return 'h-2 bg-amber-100'
    case 'danger':
      return 'h-2 bg-rose-100'
    default:
      return 'h-2 bg-sky/70'
  }
}

function indicatorClassName(level: ResourceLevel) {
  switch (level) {
    case 'warning':
      return 'bg-amber-500'
    case 'danger':
      return 'bg-rose-500'
    default:
      return 'bg-lagoon'
  }
}

function statusClassName(level: ResourceLevel) {
  switch (level) {
    case 'warning':
      return 'text-amber-700'
    case 'danger':
      return 'text-rose-700'
    default:
      return 'text-lagoon'
  }
}
