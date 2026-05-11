import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Itinerary } from '@/engine'

import { MobileItineraryDrawer } from './mobile-itinerary-drawer'

const sampleItinerary: Itinerary = [
  {
    id: 'sunset-park',
    name: 'Sunset Park',
    category: 'outdoors',
    description: 'A scenic golden-hour stop.',
    timeHours: 2,
    costUsd: 0,
    energy: 12,
    score: 14,
  },
]

describe('MobileItineraryDrawer', () => {
  it('opens the itinerary drawer from the mobile trigger', () => {
    render(
      <MobileItineraryDrawer
        itinerary={sampleItinerary}
        onRemoveAttraction={vi.fn()}
        onFinishTrip={vi.fn()}
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: /open your day drawer/i })
    )

    expect(screen.getAllByText(/your day itinerary/i).length).toBeGreaterThan(0)
    expect(screen.getByText('Sunset Park')).toBeInTheDocument()
  })

  it('closes the drawer and dispatches finish', () => {
    const onFinishTrip = vi.fn()

    render(
      <MobileItineraryDrawer
        itinerary={sampleItinerary}
        onRemoveAttraction={vi.fn()}
        onFinishTrip={onFinishTrip}
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: /open your day drawer/i })
    )
    fireEvent.click(screen.getByRole('button', { name: /finish trip/i }))

    expect(onFinishTrip).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Sunset Park')).not.toBeInTheDocument()
  })
})
