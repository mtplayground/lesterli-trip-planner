import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TripStyleBadge } from './trip-style-badge'

describe('TripStyleBadge', () => {
  it('renders the label and flavor text for a trip style', () => {
    render(<TripStyleBadge tripStyle="Night Owl" />)

    expect(screen.getByText('Trip style')).toBeInTheDocument()
    expect(screen.getByText('Night Owl')).toBeInTheDocument()
    expect(
      screen.getByText(
        'You optimized for after-dark energy, bright lights, and a late finish.'
      )
    ).toBeInTheDocument()
  })
})
