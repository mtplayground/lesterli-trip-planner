import { beforeEach, describe, expect, it } from 'vitest'

import { getCity } from '@/data'

import {
  initialGameState,
  selectAvailableAttractions,
  selectModifiers,
  selectScore,
  selectSelectedCity,
  selectTotals,
  selectTripStyle,
  useGameStore,
} from './game-store'

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.setState(initialGameState)
  })

  it('selects a city and enters the playing phase', () => {
    useGameStore.getState().selectCity('tokyo')

    const state = useGameStore.getState()

    expect(state.phase).toBe('playing')
    expect(state.selectedCityId).toBe('tokyo')
    expect(state.itinerary).toEqual([])
    expect(selectSelectedCity(state)?.name).toBe('Tokyo')
  })

  it('adds and removes valid attractions from the selected city', () => {
    const tokyo = getCity('tokyo')

    expect(tokyo).toBeDefined()

    useGameStore.getState().selectCity('tokyo')
    useGameStore.getState().addAttraction(tokyo!.attractions[0])
    useGameStore.getState().addAttraction(tokyo!.attractions[1])

    let state = useGameStore.getState()

    expect(state.itinerary.map((attraction) => attraction.id)).toEqual([
      tokyo!.attractions[0].id,
      tokyo!.attractions[1].id,
    ])

    useGameStore.getState().removeAttraction(tokyo!.attractions[0].id)
    state = useGameStore.getState()

    expect(state.itinerary.map((attraction) => attraction.id)).toEqual([
      tokyo!.attractions[1].id,
    ])
  })

  it('ignores additions that are duplicates, from another city, or over limits', () => {
    const tokyo = getCity('tokyo')
    const paris = getCity('paris')

    expect(tokyo).toBeDefined()
    expect(paris).toBeDefined()

    useGameStore.getState().selectCity('tokyo')

    useGameStore.getState().addAttraction(tokyo!.attractions[0])
    useGameStore.getState().addAttraction(tokyo!.attractions[0])
    useGameStore.getState().addAttraction(paris!.attractions[0])

    const overLimitStops = [
      tokyo!.attractions.find(
        (attraction) => attraction.id === 'tokyo-akihabara-electric-town'
      )!,
      tokyo!.attractions.find(
        (attraction) => attraction.id === 'tokyo-golden-gai'
      )!,
      tokyo!.attractions.find(
        (attraction) => attraction.id === 'tokyo-ginza-stroll'
      )!,
      tokyo!.attractions.find(
        (attraction) => attraction.id === 'tokyo-omoide-yokocho'
      )!,
    ]

    overLimitStops.forEach((attraction) => {
      useGameStore.getState().addAttraction(attraction)
    })

    const state = useGameStore.getState()

    expect(state.itinerary.map((attraction) => attraction.id)).toEqual([
      tokyo!.attractions[0].id,
      'tokyo-akihabara-electric-town',
      'tokyo-golden-gai',
      'tokyo-ginza-stroll',
    ])
  })

  it('finishes a trip and exposes derived selectors', () => {
    const tokyo = getCity('tokyo')

    expect(tokyo).toBeDefined()

    useGameStore.getState().selectCity('tokyo')

    const selectedAttractions = [
      tokyo!.attractions.find(
        (attraction) => attraction.id === 'tokyo-tsukiji-outer-market'
      )!,
      tokyo!.attractions.find(
        (attraction) => attraction.id === 'tokyo-kahaku'
      )!,
      tokyo!.attractions.find(
        (attraction) => attraction.id === 'tokyo-shinjuku-gyoen'
      )!,
      tokyo!.attractions.find(
        (attraction) => attraction.id === 'tokyo-nakamise-street'
      )!,
    ]

    selectedAttractions.forEach((attraction) => {
      useGameStore.getState().addAttraction(attraction)
    })

    useGameStore.getState().finishTrip()

    const state = useGameStore.getState()

    expect(state.phase).toBe('finished')
    expect(selectAvailableAttractions(state)).toHaveLength(
      tokyo!.attractions.length
    )
    expect(selectTotals(state)).toEqual({
      timeHours: 8,
      costUsd: 53,
      energy: 42,
    })
    expect(selectModifiers(state)).toEqual([
      {
        id: 'balanced-mix-bonus',
        label: 'Balanced Mix',
        kind: 'bonus',
        delta: 12,
        description:
          'Pick attractions from at least four different categories to earn a variety bonus.',
      },
    ])
    expect(selectScore(state)).toBe(67)
    expect(selectTripStyle(state)).toBe('Balanced Explorer')
  })

  it('restarts back to the initial state', () => {
    useGameStore.getState().selectCity('new-york')
    useGameStore.getState().finishTrip()
    useGameStore.getState().restart()

    expect(useGameStore.getState()).toMatchObject(initialGameState)
  })
})
