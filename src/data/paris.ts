import type { Attraction } from '@/engine'

export const PARIS_ATTRACTIONS = [
  {
    id: 'paris-rue-cler-market-lunch',
    name: 'Rue Cler Market Lunch',
    category: 'food',
    description:
      'Build a picnic from cheese shops, bakeries, and produce stalls along one of Paris’s best-known market streets.',
    timeHours: 1.5,
    costUsd: 22,
    energy: 10,
    score: 12,
  },
  {
    id: 'paris-marche-des-enfants-rouges',
    name: 'Marché des Enfants Rouges',
    category: 'food',
    description:
      'Grab a casual lunch from Paris’s oldest covered market, where global food counters sit beside classic produce stands.',
    timeHours: 2,
    costUsd: 24,
    energy: 12,
    score: 13,
  },
  {
    id: 'paris-louvre-museum',
    name: 'Louvre Museum',
    category: 'museum',
    description:
      'Spend a major cultural block with world-famous masterworks, monumental galleries, and the museum’s vast palace interiors.',
    timeHours: 3,
    costUsd: 25,
    energy: 15,
    score: 19,
  },
  {
    id: 'paris-musee-dorsay',
    name: "Musée d'Orsay",
    category: 'museum',
    description:
      'Tour the former railway station’s celebrated Impressionist and post-Impressionist collection on the Left Bank.',
    timeHours: 2.5,
    costUsd: 18,
    energy: 12,
    score: 16,
  },
  {
    id: 'paris-jardin-du-luxembourg',
    name: 'Jardin du Luxembourg',
    category: 'outdoors',
    description:
      'Slow down with a garden walk past fountains, clipped lawns, sculptures, and classic Parisian green-chair views.',
    timeHours: 1.5,
    costUsd: 0,
    energy: 6,
    score: 10,
  },
  {
    id: 'paris-seine-riverside-walk',
    name: 'Seine Riverside Walk',
    category: 'outdoors',
    description:
      'Follow the river quays for postcard views, bridges, booksellers, and a long scenic stretch through central Paris.',
    timeHours: 2,
    costUsd: 0,
    energy: 8,
    score: 11,
  },
  {
    id: 'paris-tuileries-garden-stroll',
    name: 'Tuileries Garden Stroll',
    category: 'outdoors',
    description:
      'Take a polished promenade through formal gardens, sculpture-lined paths, and the historic axis between the Louvre and Place de la Concorde.',
    timeHours: 1.5,
    costUsd: 0,
    energy: 6,
    score: 9,
  },
  {
    id: 'paris-moulin-rouge-feerie',
    name: 'Moulin Rouge Féerie Show',
    category: 'nightlife',
    description:
      'Commit to Paris’s most famous cabaret for a high-cost, high-drama evening of choreography, spectacle, and late-night glamour.',
    timeHours: 3,
    costUsd: 140,
    energy: 22,
    score: 22,
  },
  {
    id: 'paris-duc-des-lombards-jazz-set',
    name: 'Duc des Lombards Jazz Set',
    category: 'nightlife',
    description:
      'Catch a live jazz session and drinks at one of the capital’s best-known club rooms in the historic center.',
    timeHours: 2.5,
    costUsd: 45,
    energy: 16,
    score: 16,
  },
  {
    id: 'paris-galeries-lafayette-haussmann',
    name: 'Galeries Lafayette Haussmann',
    category: 'shopping',
    description:
      'Browse Paris’s landmark department store for fashion, beauty, gourmet finds, and the grand glass-domed interior.',
    timeHours: 2.5,
    costUsd: 38,
    energy: 14,
    score: 15,
  },
  {
    id: 'paris-le-marais-boutique-crawl',
    name: 'Le Marais Boutique Crawl',
    category: 'shopping',
    description:
      'Wander a dense run of designer labels, concept stores, cosmetics, and side-street shopping in one of Paris’s most stylish districts.',
    timeHours: 3,
    costUsd: 34,
    energy: 15,
    score: 16,
  },
  {
    id: 'paris-saint-ouen-flea-market',
    name: 'Saint-Ouen Flea Market',
    category: 'shopping',
    description:
      'Hunt through the giant antiques market north of the city for vintage decor, collectibles, and one-off finds.',
    timeHours: 3,
    costUsd: 30,
    energy: 17,
    score: 17,
  },
] satisfies Attraction[]
