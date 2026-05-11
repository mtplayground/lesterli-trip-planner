import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { Attraction } from '@/engine'

import { AttractionCard } from './attraction-card'

const sampleAttraction: Attraction = {
  id: 'sample-market',
  name: 'Sample Market',
  category: 'food',
  description: 'A quick market stop with snacks and a short queue.',
  timeHours: 1.5,
  costUsd: 24,
  energy: 10,
  score: 14,
}

describe('AttractionCard', () => {
  it('renders the attraction details and calls onAdd when enabled', () => {
    const onAdd = vi.fn()

    render(<AttractionCard attraction={sampleAttraction} onAdd={onAdd} />)

    expect(
      screen.getByRole('heading', { name: /sample market/i })
    ).toBeInTheDocument()
    expect(screen.getByText('1.5 hours')).toBeInTheDocument()
    expect(screen.getByText('$24')).toBeInTheDocument()
    expect(screen.getByText('10 energy points')).toBeInTheDocument()
    expect(screen.getByText('14')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /^add$/i }))

    expect(onAdd).toHaveBeenCalledWith(sampleAttraction)
    expect(onAdd).toHaveBeenCalledTimes(1)
  })

  it('shows the selected cue and disables the action when already selected', () => {
    render(<AttractionCard attraction={sampleAttraction} selected />)

    expect(screen.getAllByText(/selected/i)).toHaveLength(2)
    expect(screen.getByRole('button', { name: /selected/i })).toBeDisabled()
  })

  it('shows the disabled reason when the attraction cannot be added', () => {
    const onAdd = vi.fn()

    render(
      <AttractionCard
        attraction={sampleAttraction}
        onAdd={onAdd}
        canAddResult={{
          ok: false,
          reason: 'Would exceed the 12-hour limit',
        }}
      />
    )

    expect(screen.getByRole('button', { name: /unavailable/i })).toBeDisabled()
    expect(
      screen.getByLabelText(
        /cannot add attraction: would exceed the 12-hour limit/i
      )
    ).toHaveAttribute('title', 'Would exceed the 12-hour limit')

    fireEvent.click(screen.getByRole('button', { name: /unavailable/i }))

    expect(onAdd).not.toHaveBeenCalled()
  })
})
