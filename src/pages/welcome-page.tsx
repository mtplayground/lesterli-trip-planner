import { StructureCard } from '@/components'

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
    <main className="app-shell">
      <div className="app-shell__content">
        <section className="hero">
          <p className="hero__eyebrow">Issue #1 foundation</p>
          <h1>Trip Planner starts here.</h1>
          <p>
            The repository now runs on Vite, React, and TypeScript with the core
            project directories in place for the game engine, data model, state
            store, and screen composition work that follows.
          </p>
          <div className="hero__meta" aria-label="Starter stack">
            <span>Vite 8</span>
            <span>React 19</span>
            <span>TypeScript 6</span>
          </div>
        </section>

        <section className="structure" aria-label="Project structure">
          {structureSections.map((section) => (
            <StructureCard
              key={section.title}
              title={section.title}
              description={section.description}
            />
          ))}
        </section>

        <section className="notes" aria-label="Starter notes">
          <h2>Starter notes</h2>
          <ul>
            <li>TypeScript path alias `@/*` resolves to `src/*`.</li>
            <li>Vite dev and preview servers are configured for `0.0.0.0:8080`.</li>
            <li>The initial screen is intentionally minimal so later issues can layer in the game flow cleanly.</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
