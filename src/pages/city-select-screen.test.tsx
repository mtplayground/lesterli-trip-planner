import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CitySelectScreen } from './city-select-screen'

describe('CitySelectScreen', () => {
  it('renders the three themed city cards', () => {
    const onSelectCity = vi.fn()

    render(<CitySelectScreen onSelectCity={onSelectCity} />)

    expect(
      screen.getByRole('heading', {
        name: /choose your city and start building a one-day adventure/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /choose tokyo/i })).toBeVisible()
    expect(screen.getByRole('button', { name: /choose paris/i })).toBeVisible()
    expect(
      screen.getByRole('button', { name: /choose new york/i })
    ).toBeVisible()
  })

  it('dispatches the selected city when a card is clicked', () => {
    const onSelectCity = vi.fn()

    render(<CitySelectScreen onSelectCity={onSelectCity} />)

    fireEvent.click(screen.getByRole('button', { name: /choose paris/i }))

    expect(onSelectCity).toHaveBeenCalledWith('paris')
    expect(onSelectCity).toHaveBeenCalledTimes(1)
  })
})
