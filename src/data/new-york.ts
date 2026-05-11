import type { Attraction } from '@/engine'

export const NEW_YORK_ATTRACTIONS = [
  {
    id: 'new-york-chelsea-market-crawl',
    name: 'Chelsea Market Crawl',
    category: 'food',
    description:
      'Eat your way through tacos, noodles, pastries, and specialty counters in one of Manhattan’s busiest food halls.',
    timeHours: 2,
    costUsd: 25,
    energy: 12,
    score: 13,
  },
  {
    id: 'new-york-katzs-delicatessen',
    name: "Katz's Delicatessen",
    category: 'food',
    description:
      'Commit to a classic pastrami-on-rye stop at one of New York’s most famous old-school deli institutions.',
    timeHours: 1.5,
    costUsd: 28,
    energy: 13,
    score: 13,
  },
  {
    id: 'new-york-the-met',
    name: 'The Met Fifth Avenue',
    category: 'museum',
    description:
      'Take on a heavyweight museum block with global masterpieces, period rooms, and marathon-scale art history galleries.',
    timeHours: 3,
    costUsd: 30,
    energy: 15,
    score: 19,
  },
  {
    id: 'new-york-moma',
    name: 'MoMA',
    category: 'museum',
    description:
      'Dive into modern and contemporary icons, design objects, and major special exhibitions in Midtown.',
    timeHours: 2.5,
    costUsd: 30,
    energy: 12,
    score: 16,
  },
  {
    id: 'new-york-central-park-highlights',
    name: 'Central Park Highlights',
    category: 'outdoors',
    description:
      'Roam the park’s signature paths, lawns, bridges, and viewpoints for a classic Manhattan reset between denser stops.',
    timeHours: 2,
    costUsd: 0,
    energy: 8,
    score: 11,
  },
  {
    id: 'new-york-high-line-walk',
    name: 'High Line Walk',
    category: 'outdoors',
    description:
      'Follow the elevated park route above the West Side for gardens, public art, and long city views.',
    timeHours: 1.5,
    costUsd: 0,
    energy: 7,
    score: 10,
  },
  {
    id: 'new-york-brooklyn-bridge-promenade',
    name: 'Brooklyn Bridge Promenade',
    category: 'outdoors',
    description:
      'Cross the historic bridge on foot for skyline shots, harbor views, and one of the city’s great urban walks.',
    timeHours: 2,
    costUsd: 0,
    energy: 9,
    score: 12,
  },
  {
    id: 'new-york-comedy-cellar-show',
    name: 'Comedy Cellar Show',
    category: 'nightlife',
    description:
      'Book a packed Greenwich Village club set with a low ticket price but real late-night energy and a drink minimum.',
    timeHours: 2.5,
    costUsd: 38,
    energy: 15,
    score: 16,
  },
  {
    id: 'new-york-village-vanguard-jazz-set',
    name: 'Village Vanguard Jazz Set',
    category: 'nightlife',
    description:
      'Catch a storied basement jazz room performance where ticketed admission and drinks combine for a premium night out.',
    timeHours: 2.5,
    costUsd: 45,
    energy: 16,
    score: 17,
  },
  {
    id: 'new-york-fifth-avenue-flagship-crawl',
    name: 'Fifth Avenue Flagship Crawl',
    category: 'shopping',
    description:
      'Browse luxury flagships, iconic storefronts, and high-traffic retail blocks in Manhattan’s biggest shopping corridor.',
    timeHours: 3,
    costUsd: 40,
    energy: 16,
    score: 16,
  },
  {
    id: 'new-york-soho-shopping-stroll',
    name: 'SoHo Shopping Stroll',
    category: 'shopping',
    description:
      'Move between cast-iron blocks filled with fashion labels, sneaker boutiques, and downtown style stores.',
    timeHours: 2.5,
    costUsd: 32,
    energy: 14,
    score: 15,
  },
  {
    id: 'new-york-macys-herald-square',
    name: "Macy's Herald Square Browse",
    category: 'shopping',
    description:
      'Work through one of New York’s most famous department stores for souvenirs, basics, and big-floor retail energy.',
    timeHours: 2,
    costUsd: 26,
    energy: 12,
    score: 13,
  },
] satisfies Attraction[]
