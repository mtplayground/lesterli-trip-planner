import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Attraction, Itinerary } from '@/engine'

import { AttractionGrid } from './attraction-grid'

const sampleAttractions: Attraction[] = [
  {
    id: 'food-1',
    name: 'Market Lunch',
    category: 'food',
    description: 'A quick lunch stop.',
    timeHours: 2,
    costUsd: 24,
    energy: 10,
    score: 12,
  },
  {
    id: 'museum-1',
    name: 'Modern Gallery',
    category: 'museum',
    description: 'A compact gallery visit.',
    timeHours: 2.5,
    costUsd: 18,
    energy: 12,
    score: 15,
  },
  {
    id: 'nightlife-1',
    name: 'Rooftop Bar',
    category: 'nightlife',
    description: 'A high-energy night stop.',
    timeHours: 2.5,
    costUsd: 38,
    energy: 18,
    score: 16,
  },
]

describe('AttractionGrid', () => {
  it('renders the city board and full attraction set', () => {
    const onAddAttraction = vi.fn()

    render(
      <AttractionGrid
        cityName="Tokyo"
        attractions={sampleAttractions}
        itinerary={[]}
        onAddAttraction={onAddAttraction}
      />
    )

    expect(
      screen.getByRole('heading', { name: /tokyo attraction board/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Market Lunch')).toBeInTheDocument()
    expect(screen.getByText('Modern Gallery')).toBeInTheDocument()
    expect(screen.getByText('Rooftop Bar')).toBeInTheDocument()
  })

  it('filters the grid by category chips', () => {
    render(
      <AttractionGrid
        cityName="Tokyo"
        attractions={sampleAttractions}
        itinerary={[]}
        onAddAttraction={vi.fn()}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /^food$/i }))

    expect(screen.getByText('Market Lunch')).toBeInTheDocument()
    expect(screen.queryByText('Modern Gallery')).not.toBeInTheDocument()
    expect(screen.queryByText('Rooftop Bar')).not.toBeInTheDocument()
  })

  it('shows an empty state when the active filter has no attractions', () => {
    render(
      <AttractionGrid
        cityName="Paris"
        attractions={sampleAttractions.filter(
          (attraction) => attraction.category !== 'shopping'
        )}
        itinerary={[]}
        onAddAttraction={vi.fn()}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /^shopping$/i }))

    expect(
      screen.getByText(/no attractions match this filter/i)
    ).toBeInTheDocument()
  })

  it('shows the disabled-state banner when every visible attraction is unavailable', () => {
    const blockingItinerary: Itinerary = [
      {
        id: 'long-day',
        name: 'Long Day',
        category: 'outdoors',
        description: 'Consumes nearly all remaining time and budget.',
        timeHours: 11,
        costUsd: 140,
        energy: 95,
        score: 20,
      },
    ]

    render(
      <AttractionGrid
        cityName="New York"
        attractions={sampleAttractions}
        itinerary={blockingItinerary}
        onAddAttraction={vi.fn()}
      />
    )

    expect(
      screen.getByText(/everything in this view is currently unavailable/i)
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: /unavailable/i })
    ).toHaveLength(sampleAttractions.length)
  })
})
