import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Itinerary } from '@/engine'

import { YourDayPanel } from './your-day-panel'

const sampleItinerary: Itinerary = [
  {
    id: 'market-lunch',
    name: 'Market Lunch',
    category: 'food',
    description: 'A quick midday stop.',
    timeHours: 2,
    costUsd: 24,
    energy: 10,
    score: 12,
  },
  {
    id: 'museum-block',
    name: 'Museum Block',
    category: 'museum',
    description: 'An afternoon museum visit.',
    timeHours: 2.5,
    costUsd: 18,
    energy: 12,
    score: 15,
  },
]

describe('YourDayPanel', () => {
  it('shows the empty state and disables finish when nothing is selected', () => {
    render(
      <YourDayPanel
        itinerary={[]}
        onRemoveAttraction={vi.fn()}
        onFinishTrip={vi.fn()}
      />
    )

    expect(screen.getByText(/no picks yet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /finish trip/i })).toBeDisabled()
  })

  it('renders attractions in pick order and removes a selected stop', () => {
    const onRemoveAttraction = vi.fn()

    render(
      <YourDayPanel
        itinerary={sampleItinerary}
        onRemoveAttraction={onRemoveAttraction}
        onFinishTrip={vi.fn()}
      />
    )

    const headings = screen.getAllByText(/market lunch|museum block/i)

    expect(headings[0]).toHaveTextContent('Market Lunch')
    expect(headings[1]).toHaveTextContent('Museum Block')
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: /remove/i })[1])

    expect(onRemoveAttraction).toHaveBeenCalledWith('museum-block')
  })

  it('enables and dispatches the finish action when the itinerary has picks', () => {
    const onFinishTrip = vi.fn()

    render(
      <YourDayPanel
        itinerary={sampleItinerary}
        onRemoveAttraction={vi.fn()}
        onFinishTrip={onFinishTrip}
      />
    )

    const finishButton = screen.getByRole('button', { name: /finish trip/i })

    expect(finishButton).toBeEnabled()

    fireEvent.click(finishButton)

    expect(onFinishTrip).toHaveBeenCalledTimes(1)
  })

  it('updates from empty to populated state and enables finishing after picks are added', () => {
    const onFinishTrip = vi.fn()
    const { rerender } = render(
      <YourDayPanel
        itinerary={[]}
        onRemoveAttraction={vi.fn()}
        onFinishTrip={onFinishTrip}
      />
    )

    expect(screen.getByRole('button', { name: /finish trip/i })).toBeDisabled()
    expect(screen.queryByText('Market Lunch')).not.toBeInTheDocument()

    rerender(
      <YourDayPanel
        itinerary={sampleItinerary}
        onRemoveAttraction={vi.fn()}
        onFinishTrip={onFinishTrip}
      />
    )

    expect(screen.getByText('Market Lunch')).toBeInTheDocument()
    expect(screen.getByText('Museum Block')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /finish trip/i })).toBeEnabled()

    fireEvent.click(screen.getByRole('button', { name: /finish trip/i }))

    expect(onFinishTrip).toHaveBeenCalledTimes(1)
  })
})
