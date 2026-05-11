import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Modifier } from '@/engine'

import { ModifiersPanel } from './modifiers-panel'

describe('ModifiersPanel', () => {
  it('renders the empty state when there are no active modifiers', () => {
    render(<ModifiersPanel modifiers={[]} />)

    expect(screen.getByText(/no live modifiers/i)).toBeInTheDocument()
    expect(
      screen.getByText(/mix categories or lean into a theme/i)
    ).toBeInTheDocument()
  })

  it('renders active bonuses and penalties with deltas and descriptions', () => {
    const modifiers: Modifier[] = [
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

    render(<ModifiersPanel modifiers={modifiers} />)

    expect(screen.getByText('Balanced Mix')).toBeInTheDocument()
    expect(screen.getByText('All-Nighter')).toBeInTheDocument()
    expect(screen.getByText('+12')).toBeInTheDocument()
    expect(screen.getByText('-10')).toBeInTheDocument()
    expect(
      screen.getByText(
        /pick attractions from at least four different categories/i
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(/nightlife-only plan loses points/i)
    ).toBeInTheDocument()
  })
})
