import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { Itinerary, Modifier } from '@/engine'

import { FinishScreen } from './finish-screen'

const sampleItinerary: Itinerary = [
  {
    id: 'breakfast',
    name: 'Breakfast Market',
    category: 'food',
    description: 'A strong breakfast opener.',
    timeHours: 1.5,
    costUsd: 18,
    energy: 8,
    score: 10,
  },
  {
    id: 'museum',
    name: 'City Museum',
    category: 'museum',
    description: 'A midday culture stop.',
    timeHours: 2.5,
    costUsd: 20,
    energy: 11,
    score: 16,
  },
]

const sampleModifiers: Modifier[] = [
  {
    id: 'balanced-mix-bonus',
    label: 'Balanced Mix',
    kind: 'bonus',
    delta: 12,
    description:
      'Pick attractions from at least four different categories to earn a variety bonus.',
  },
  {
    id: 'all-nightlife-penalty',
    label: 'All-Nighter',
    kind: 'penalty',
    delta: -10,
    description:
      'A nightlife-only plan loses points for lacking daytime balance.',
  },
]

describe('FinishScreen', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the score breakdown, itinerary recap, and reveals the final score', () => {
    render(
      <FinishScreen
        cityName="Tokyo"
        itinerary={sampleItinerary}
        modifiers={sampleModifiers}
        score={28}
        tripStyle="Balanced Explorer"
        onPlayAgain={vi.fn()}
      />
    )

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText('Tokyo')).toBeInTheDocument()
    expect(screen.getByText('Balanced Explorer')).toBeInTheDocument()
    expect(
      screen.getByText(
        'You built a well-rounded route with smart variety across the whole city.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Breakfast Market')).toBeInTheDocument()
    expect(screen.getByText('City Museum')).toBeInTheDocument()
    expect(screen.getByText('Base score')).toBeInTheDocument()
    expect(screen.getAllByText('+12')).toHaveLength(2)
    expect(screen.getAllByText('-10')).toHaveLength(2)
    expect(screen.getAllByText('28').length).toBeGreaterThan(0)
    expect(screen.getByText('26 + 12 - 10 = 28')).toBeInTheDocument()
  })

  it('dispatches the play again action', () => {
    const onPlayAgain = vi.fn()

    render(
      <FinishScreen
        cityName="Paris"
        itinerary={sampleItinerary}
        modifiers={[]}
        score={26}
        tripStyle="Culture Vulture"
        onPlayAgain={onPlayAgain}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /play again/i }))

    expect(onPlayAgain).toHaveBeenCalledTimes(1)
  })
})
