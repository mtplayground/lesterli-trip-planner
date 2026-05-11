import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

import { CitySelectPhase, FinishedPhase, PlayingPhase } from '@/pages'
import { selectSelectedCity, useGameStore } from '@/store'

const fallbackTitle = 'Trip Planner'
const appTitle = import.meta.env.VITE_APP_TITLE?.trim() || fallbackTitle
const fallbackThemeColor = '#7c3aed'

function App() {
  const phase = useGameStore((state) => state.phase)
  const selectedCity = useGameStore(selectSelectedCity)
  const prefersReducedMotion = useReducedMotion() ?? false

  useEffect(() => {
    document.title = appTitle
  }, [])

  const themeColor = selectedCity?.themeColor ?? fallbackThemeColor

  return (
    <main
      className="min-h-screen px-4 py-6 text-foreground transition-[background] duration-500 motion-reduce:transition-none sm:px-6 lg:px-8"
      style={{
        backgroundImage: buildShellBackground(themeColor),
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col gap-6">
        <header className="flex items-center justify-between gap-3 rounded-3xl border border-white/55 bg-white/52 px-5 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
              Trip Planner
            </p>
            <p className="mt-1 font-display text-2xl tracking-tight text-slate-950">
              Phase-driven app shell
            </p>
          </div>
          <div className="rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            {selectedCity ? `${selectedCity.name} theme` : 'Global shell theme'}
          </div>
        </header>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={phase}
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 24, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -18, scale: 0.985 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.28, ease: 'easeOut' }
            }
            className="flex-1"
          >
            {phase === 'city-select' && <CitySelectPhase />}
            {phase === 'playing' && <PlayingPhase />}
            {phase === 'finished' && <FinishedPhase />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}

export default App

function buildShellBackground(themeColor: string) {
  return [
    `radial-gradient(circle at 12% 12%, ${withAlpha(themeColor, '38')}, transparent 28%)`,
    `radial-gradient(circle at 86% 18%, ${withAlpha(themeColor, '22')}, transparent 26%)`,
    'radial-gradient(circle at bottom, rgba(245, 158, 11, 0.14), transparent 38%)',
    'linear-gradient(180deg, #fffaf2 0%, #f4f8ff 100%)',
  ].join(', ')
}

function withAlpha(hex: string, alpha: string) {
  return /^#[\da-f]{6}$/i.test(hex) ? `${hex}${alpha}` : hex
}
