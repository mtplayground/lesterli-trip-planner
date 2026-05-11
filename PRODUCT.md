# Product Snapshot

## What this project is

Trip Planner is a static React + TypeScript single-page game where the player
builds a one-day itinerary in a chosen city while staying within time, budget,
and energy limits.

## What it does now

- Lets the player choose `Tokyo`, `Paris`, or `New York`
- Presents a city-specific attraction board with category filters
- Tracks an itinerary against hard limits:
  - `12 hours`
  - `$150`
  - `100 energy`
- Applies live bonuses and penalties as the itinerary changes
- Finishes with a score reveal, trip-style classification, and itinerary recap
- Supports desktop and mobile play, including a mobile `Your Day` drawer

## Core gameplay features

- Attractions span `food`, `museum`, `outdoors`, `nightlife`, and `shopping`
- Live modifier system currently includes:
  - `Balanced Mix` bonus
  - `Three-Course Crawl` food bonus
  - `All-Nighter` nightlife penalty
  - `Category Overload` penalty
- Final trip styles currently include:
  - `Foodie Marathon`
  - `Culture Vulture`
  - `Night Owl`
  - `Balanced Explorer`
  - `Outdoor Adventurer`
  - `Shopaholic`

## Architecture decisions

- `src/data`: static city datasets and the city registry
- `src/engine`: pure gameplay logic for limits, modifiers, scoring, and styles
- `src/store`: Zustand game state and derived selectors
- `src/components`: reusable UI pieces, including HUD, grid, panels, and finish screen
- `src/pages`: phase-level screen composition

The main rule is: keep game logic pure in `src/engine` and keep UI/state
composition out of that layer.

## UI and UX conventions

- Phase-driven flow: `city-select` -> `playing` -> `finished`
- Tailwind + shadcn/ui primitives for UI structure
- Framer Motion for transitions, with reduced-motion handling in place
- Accessibility is part of the contract:
  - keyboard-reachable actions
  - labeled progress bars and modifier regions
  - visible focus treatment

## Quality and deployment state

- Vitest + React Testing Library cover core components and engine behavior
- Playwright covers smoke, happy-path, and edge-case flows
- Production output is a Vite static build under `dist/`
- Deployment target is self-hosted static serving behind nginx, Caddy, or any host with SPA fallback to `index.html`
