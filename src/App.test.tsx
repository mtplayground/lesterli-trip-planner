import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { initialGameState, useGameStore } from '@/store'

import App from './App'

describe('App', () => {
  it('renders the app shell smoke content', () => {
    useGameStore.setState(initialGameState)

    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /choose your city and start building a one-day adventure/i,
      })
    ).toBeInTheDocument()
  })
})
