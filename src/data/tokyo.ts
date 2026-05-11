import type { Attraction } from '@/engine'

export const TOKYO_ATTRACTIONS = [
  {
    id: 'tokyo-tsukiji-outer-market',
    name: 'Tsukiji Outer Market',
    category: 'food',
    description:
      'Graze across sushi counters, tamagoyaki stalls, and seafood vendors in Tokyo’s legendary market district.',
    timeHours: 2,
    costUsd: 28,
    energy: 14,
    score: 15,
  },
  {
    id: 'tokyo-ramen-street',
    name: 'Tokyo Ramen Street',
    category: 'food',
    description:
      'Sample one of Tokyo Station’s famous ramen shops for a fast but high-reward noodle stop.',
    timeHours: 1.5,
    costUsd: 18,
    energy: 12,
    score: 12,
  },
  {
    id: 'tokyo-teamlab-planets',
    name: 'teamLab Planets TOKYO',
    category: 'museum',
    description:
      'Walk through immersive digital art rooms with mirrored water, projected flowers, and interactive light installations.',
    timeHours: 2,
    costUsd: 27,
    energy: 11,
    score: 18,
  },
  {
    id: 'tokyo-kahaku',
    name: 'National Museum of Nature and Science',
    category: 'museum',
    description:
      'Explore Japanese natural history, dinosaurs, and science exhibits inside Ueno Park’s major museum complex.',
    timeHours: 2.5,
    costUsd: 5,
    energy: 10,
    score: 15,
  },
  {
    id: 'tokyo-meiji-jingu',
    name: 'Meiji Jingu',
    category: 'outdoors',
    description:
      'Stroll the forested shrine approach and temple grounds for a calm break from central Tokyo’s crowds.',
    timeHours: 1.5,
    costUsd: 0,
    energy: 8,
    score: 11,
  },
  {
    id: 'tokyo-shinjuku-gyoen',
    name: 'Shinjuku Gyoen National Garden',
    category: 'outdoors',
    description:
      'Wander through Japanese, French, and English-style garden zones in one of Tokyo’s premier green spaces.',
    timeHours: 2,
    costUsd: 4,
    energy: 9,
    score: 13,
  },
  {
    id: 'tokyo-ueno-park',
    name: 'Ueno Park Walk',
    category: 'outdoors',
    description:
      'Take a relaxed urban park loop past ponds, temple grounds, and public art in one of Tokyo’s best-known open spaces.',
    timeHours: 1.5,
    costUsd: 0,
    energy: 7,
    score: 10,
  },
  {
    id: 'tokyo-omoide-yokocho',
    name: 'Omoide Yokocho',
    category: 'nightlife',
    description:
      'Duck into a lantern-lit alley packed with tiny yakitori counters, beer, and old-school Shinjuku atmosphere.',
    timeHours: 2,
    costUsd: 30,
    energy: 17,
    score: 15,
  },
  {
    id: 'tokyo-golden-gai',
    name: 'Shinjuku Golden Gai',
    category: 'nightlife',
    description:
      'Hop between intimate micro-bars in one of Tokyo’s most iconic late-night drinking neighborhoods.',
    timeHours: 2.5,
    costUsd: 38,
    energy: 20,
    score: 17,
  },
  {
    id: 'tokyo-akihabara-electric-town',
    name: 'Akihabara Electric Town',
    category: 'shopping',
    description:
      'Browse anime, gaming, electronics, and hobby stores across Tokyo’s most famous otaku shopping district.',
    timeHours: 3,
    costUsd: 35,
    energy: 18,
    score: 17,
  },
  {
    id: 'tokyo-ginza-stroll',
    name: 'Ginza Shopping Stroll',
    category: 'shopping',
    description:
      'Window-shop luxury flagships, department stores, and polished side streets in Tokyo’s upscale retail center.',
    timeHours: 2.5,
    costUsd: 42,
    energy: 14,
    score: 15,
  },
  {
    id: 'tokyo-nakamise-street',
    name: 'Nakamise Shopping Street',
    category: 'shopping',
    description:
      'Pick up traditional sweets and souvenirs along the historic approach to Senso-ji in Asakusa.',
    timeHours: 1.5,
    costUsd: 16,
    energy: 9,
    score: 12,
  },
] satisfies Attraction[]
