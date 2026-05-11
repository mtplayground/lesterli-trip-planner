import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the app shell smoke content', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /tailwind and shadcn are wired into the trip planner starter/i,
      })
    ).toBeInTheDocument()
  })
})
