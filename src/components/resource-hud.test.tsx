import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ResourceHUD } from './resource-hud'

describe('ResourceHUD', () => {
  it('renders current resource values and limits', () => {
    render(
      <ResourceHUD
        totals={{
          timeHours: 4.5,
          costUsd: 64,
          energy: 28,
        }}
      />
    )

    expect(screen.getByLabelText(/resource hud/i)).toBeInTheDocument()
    expect(screen.getByText('4.5 hours')).toBeInTheDocument()
    expect(screen.getByText('$64')).toBeInTheDocument()
    expect(screen.getByText('28 energy points')).toBeInTheDocument()
    expect(screen.getByText('Limit 12 hours')).toBeInTheDocument()
    expect(screen.getByText('Limit $150')).toBeInTheDocument()
    expect(screen.getByText('Limit 100 energy points')).toBeInTheDocument()
  })

  it('shows warning and danger states at the configured thresholds', () => {
    render(
      <ResourceHUD
        totals={{
          timeHours: 9.6,
          costUsd: 150,
          energy: 42,
        }}
      />
    )

    const timeSection = screen.getByLabelText(/time resource/i)
    const costSection = screen.getByLabelText(/cost resource/i)
    const energySection = screen.getByLabelText(/energy resource/i)

    expect(within(timeSection).getByText('Warning')).toBeInTheDocument()
    expect(within(costSection).getByText('Limit reached')).toBeInTheDocument()
    expect(within(energySection).getByText('Healthy')).toBeInTheDocument()
  })
})
