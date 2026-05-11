import { motion } from 'framer-motion'
import {
  Compass,
  Landmark,
  MoonStar,
  Palette,
  PlaneTakeoff,
} from 'lucide-react'

import { cities, type CityId } from '@/data'
import { buttonVariants } from '@/components/ui/button-variants'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/cn'

const cityStories: Record<
  CityId,
  {
    kicker: string
    headline: string
    description: string
    highlights: string[]
    accentGlow: string
  }
> = {
  tokyo: {
    kicker: 'Neon rhythm',
    headline: 'Arcades, ramen alleys, and shrine-side resets.',
    description:
      'Tokyo leans electric and kinetic, mixing late-night glow with precise food stops and calm cultural breaks.',
    highlights: [
      'Street food energy',
      'Immersive museums',
      'Nightlife districts',
    ],
    accentGlow: 'rgba(124,58,237,0.28)',
  },
  paris: {
    kicker: 'Golden culture',
    headline: 'Gallery afternoons, riverside walks, and café rituals.',
    description:
      'Paris plays best as a polished mix of museum prestige, outdoor drift, and unhurried food-and-shopping moments.',
    highlights: ['Museum density', 'Outdoor boulevards', 'Café-to-bistro flow'],
    accentGlow: 'rgba(236,72,153,0.24)',
  },
  'new-york': {
    kicker: 'Skyline sprint',
    headline: 'Big energy museums, parks, rooftops, and retail loops.',
    description:
      'New York rewards ambitious planning with dense attraction clusters, strong late-day momentum, and bold contrasts.',
    highlights: ['Iconic parks', 'Fast-paced food', 'Skyline nightlife'],
    accentGlow: 'rgba(37,99,235,0.24)',
  },
}

const cityIcons = {
  tokyo: MoonStar,
  paris: Palette,
  'new-york': Landmark,
} as const

interface CitySelectScreenProps {
  onSelectCity: (cityId: CityId) => void
}

export function CitySelectScreen({ onSelectCity }: CitySelectScreenProps) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-berry/75">
            Phase 1 of 3
          </p>
          <h1 className="font-display text-4xl tracking-tight text-slate-950 sm:text-5xl">
            Choose your city and start building a one-day adventure.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Pick one of three distinct day-planning moods. Each city card is a
            direct tap target that triggers the game store and hands off to the
            planning board.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {Object.values(cities).map((city) => {
            const story = cityStories[city.id]
            const CityIcon = cityIcons[city.id]

            return (
              <motion.button
                key={city.id}
                type="button"
                whileHover={{ y: -8, scale: 1.012 }}
                whileTap={{ scale: 0.985, y: -2 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                onClick={() => onSelectCity(city.id)}
                className="group text-left"
                aria-label={`Choose ${city.name}`}
              >
                <Card
                  className="h-full border-white/65 bg-white/78 shadow-[0_26px_64px_rgba(15,23,42,0.09)] backdrop-blur transition-shadow duration-200 group-hover:shadow-[0_34px_84px_rgba(15,23,42,0.14)]"
                  style={{
                    backgroundImage: [
                      `radial-gradient(circle at 80% 18%, ${story.accentGlow}, transparent 30%)`,
                      'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.82) 100%)',
                    ].join(', '),
                  }}
                >
                  <div
                    className="h-2 w-full"
                    style={{ backgroundColor: city.themeColor }}
                  />
                  <CardHeader className="gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                          {story.kicker}
                        </p>
                        <CardTitle className="mt-2 font-display text-2xl text-slate-950">
                          <h2>{city.name}</h2>
                        </CardTitle>
                      </div>
                      <div
                        className="rounded-2xl p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
                        style={{ backgroundColor: city.themeColor }}
                      >
                        <CityIcon className="size-5" />
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-6 text-slate-600">
                      {story.headline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-6 text-slate-600">
                      {story.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {story.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="rounded-2xl border border-white/70 bg-white/76 p-4 text-sm leading-6 text-slate-600">
                      {city.attractions.length} attractions already loaded for{' '}
                      {city.name}.
                    </div>
                    <div
                      className={cn(
                        buttonVariants({ size: 'lg' }),
                        'pointer-events-none mt-1 w-full'
                      )}
                    >
                      <PlaneTakeoff className="size-4" />
                      Start in {city.name}
                    </div>
                  </CardContent>
                </Card>
              </motion.button>
            )
          })}
        </div>
      </div>

      <Card className="border-white/60 bg-white/72 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <CardHeader className="gap-3">
          <CardTitle className="font-display text-2xl text-slate-950">
            CitySelect screen
          </CardTitle>
          <CardDescription>
            This screen now owns the actual city-pick interaction for the app
            shell, not just placeholder routing copy.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm leading-6 text-slate-600">
          <div className="rounded-2xl border border-border/70 bg-white/75 p-4">
            <div className="mb-2 flex items-center gap-2 font-medium text-slate-900">
              <Compass className="size-4 text-berry" />
              Whole-card interaction
            </div>
            Hover and tap motion are bound to each themed city card, while the
            store dispatch still runs from one clear click target.
          </div>
          <div className="rounded-2xl border border-border/70 bg-white/75 p-4">
            <div className="mb-2 flex items-center gap-2 font-medium text-slate-900">
              <Landmark className="size-4 text-sunrise" />
              Distinct visual identity
            </div>
            Tokyo, Paris, and New York each carry separate copy, iconography,
            glow, and tone instead of feeling interchangeable.
          </div>
          <div className="rounded-2xl border border-border/70 bg-white/75 p-4">
            <div className="mb-2 flex items-center gap-2 font-medium text-slate-900">
              <PlaneTakeoff className="size-4 text-lagoon" />
              Router handoff
            </div>
            Selecting a city immediately dispatches `selectCity`, which flips
            the app phase to `playing` and transitions to the board shell.
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
