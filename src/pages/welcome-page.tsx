import { motion } from 'framer-motion'
import { StructureCard } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, formatEnergy, formatHours } from '@/lib/format'
import { Sparkles, SwatchBook, Wand2 } from 'lucide-react'

const structureSections = [
  {
    title: 'src/engine',
    description: 'Pure game logic, scoring rules, and shared domain types.',
  },
  {
    title: 'src/data',
    description: 'Static city datasets and registries for the trip planner.',
  },
  {
    title: 'src/components',
    description: 'Reusable UI elements that compose each screen.',
  },
  {
    title: 'src/store',
    description: 'Central client state for itinerary selection and flow state.',
  },
  {
    title: 'src/pages',
    description: 'Top-level screens that wire the app shell together.',
  },
] as const

export function WelcomePage() {
  return (
    <main className="min-h-screen bg-aurora px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="overflow-hidden rounded-card border border-white/60 bg-[linear-gradient(135deg,rgba(124,58,237,0.96),rgba(15,118,110,0.92))] text-white shadow-float"
        >
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">
                Issue #2 design system base
              </p>
              <div className="space-y-3">
                <h1 className="font-display text-4xl leading-none tracking-tight sm:text-5xl">
                  Tailwind and shadcn are wired into the Trip Planner starter.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-white/84 sm:text-lg">
                  The app now ships with Tailwind v4, semantic theme tokens,
                  shadcn primitives, and a reusable visual foundation for later
                  gameplay screens.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-white text-berry shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:bg-white/90"
                  size="lg"
                >
                  <Sparkles className="size-4" />
                  Theme ready
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white/14 text-white hover:bg-white/20"
                    >
                      <Wand2 className="size-4" />
                      Preview base setup
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-white/60 bg-white/96 sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>shadcn base installed</DialogTitle>
                      <DialogDescription>
                        Button, Card, Progress, and Dialog are available under
                        <code className="ml-1 rounded bg-muted px-1.5 py-0.5 text-xs">
                          src/components/ui
                        </code>
                        .
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Theme token coverage</span>
                          <span className="font-medium text-berry">100%</span>
                        </div>
                        <Progress value={100} className="h-2 bg-secondary" />
                      </div>
                      <div className="rounded-xl bg-muted/70 p-4 text-sm leading-6 text-muted-foreground">
                        Tailwind is configured through the Vite plugin and an
                        explicit <code>tailwind.config.ts</code>, while shadcn
                        theme variables live in <code>src/index.css</code>.
                      </div>
                    </div>
                    <DialogFooter showCloseButton />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card className="border-white/10 bg-white/10 text-white shadow-none backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-display text-2xl">
                  Foundation status
                </CardTitle>
                <CardDescription className="text-white/72">
                  Visual tokens and primitives are ready for the gameplay UI.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-white/78">
                    <span>Tailwind setup</span>
                    <span>Complete</span>
                  </div>
                  <Progress value={100} className="h-2 bg-white/16" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-white/78">
                    <span>shadcn primitives</span>
                    <span>4 of 4</span>
                  </div>
                  <Progress value={100} className="h-2 bg-white/16" />
                </div>
                <div className="grid gap-3 text-sm text-white/88 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/12 bg-white/10 p-4">
                    <div className="mb-2 flex items-center gap-2 font-medium">
                      <SwatchBook className="size-4" />
                      Playful tokens
                    </div>
                    Berry, lagoon, sunrise, custom radii, and display font are exposed to Tailwind.
                  </div>
                  <div className="rounded-2xl border border-white/12 bg-white/10 p-4">
                    <div className="mb-2 flex items-center gap-2 font-medium">
                      <Sparkles className="size-4" />
                      Reusable base
                    </div>
                    shadcn components inherit semantic background, card, accent, and ring tokens.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
          aria-label="Project structure"
        >
          {structureSections.map((section) => (
            <StructureCard
              key={section.title}
              title={section.title}
              description={section.description}
            />
          ))}
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14, ease: 'easeOut' }}
        >
          <Card className="border-peach/80 bg-white/88 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
          <CardHeader className="gap-2">
            <CardTitle className="font-display text-2xl text-slate-900">
              Starter notes
            </CardTitle>
            <CardDescription>
              The repo now has the baseline styling system expected by future
              feature issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
              TypeScript path aliases resolve <code>@/*</code> to
              <code className="ml-1">src/*</code>.
            </div>
            <div className="rounded-2xl bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
              Vite dev and preview remain configured for
              <code className="ml-1">0.0.0.0:8080</code>.
            </div>
            <div className="rounded-2xl bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
              Shared format helpers now output values like
              <span className="ml-1 font-medium">
                {formatCurrency(150)}, {formatHours(2.5)}, and {formatEnergy(72)}.
              </span>
            </div>
          </CardContent>
          <CardFooter className="justify-between gap-3 border-t border-peach/80 bg-peach/40">
            <p className="text-sm text-slate-600">
              Ready for data, engine, store, and motion-driven UI work.
            </p>
            <Button variant="outline" className="border-slate-300 bg-white/70">
              Continue building
            </Button>
          </CardFooter>
        </Card>
        </motion.div>
      </div>
    </main>
  )
}
