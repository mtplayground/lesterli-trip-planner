import { create } from 'zustand'
import type { StateCreator } from 'zustand'

import { getCity, type City, type CityId } from '@/data'
import {
  canAdd,
  classifyTripStyle,
  modifiersOf,
  scoreItinerary,
  totalsOf,
  type Attraction,
  type Itinerary,
} from '@/engine'

export const GAME_PHASES = ['city-select', 'playing', 'finished'] as const

export type GamePhase = (typeof GAME_PHASES)[number]

export interface GameState {
  selectedCityId: CityId | null
  itinerary: Itinerary
  phase: GamePhase
}

export interface GameActions {
  selectCity: (cityId: CityId) => void
  addAttraction: (attraction: Attraction) => void
  removeAttraction: (attractionId: Attraction['id']) => void
  finishTrip: () => void
  restart: () => void
}

export type GameStore = GameState & GameActions

export const initialGameState: GameState = {
  selectedCityId: null,
  itinerary: [],
  phase: 'city-select',
}

const createGameState: StateCreator<GameStore> = (set, get) => ({
  ...initialGameState,
  selectCity: (cityId) => {
    if (!getCity(cityId)) {
      return
    }

    set({
      selectedCityId: cityId,
      itinerary: [],
      phase: 'playing',
    })
  },
  addAttraction: (attraction) => {
    const { itinerary, phase, selectedCityId } = get()

    if (phase !== 'playing' || !selectedCityId) {
      return
    }

    const selectedCity = getCity(selectedCityId)

    if (!selectedCity) {
      return
    }

    const attractionExists = selectedCity.attractions.some(
      (cityAttraction) => cityAttraction.id === attraction.id
    )

    if (!attractionExists) {
      return
    }

    const alreadyAdded = itinerary.some(
      (plannedAttraction) => plannedAttraction.id === attraction.id
    )

    if (alreadyAdded || !canAdd(itinerary, attraction).ok) {
      return
    }

    set({
      itinerary: [...itinerary, attraction],
    })
  },
  removeAttraction: (attractionId) => {
    const { itinerary } = get()

    set({
      itinerary: itinerary.filter(
        (attraction) => attraction.id !== attractionId
      ),
    })
  },
  finishTrip: () => {
    const { phase, selectedCityId } = get()

    if (phase !== 'playing' || !selectedCityId) {
      return
    }

    set({
      phase: 'finished',
    })
  },
  restart: () => {
    set(initialGameState)
  },
})

export const useGameStore = create<GameStore>()(createGameState)

export function selectSelectedCity(state: GameState): City | undefined {
  return state.selectedCityId ? getCity(state.selectedCityId) : undefined
}

export function selectTotals(state: GameState) {
  return totalsOf(state.itinerary)
}

export function selectModifiers(state: GameState) {
  return modifiersOf(state.itinerary)
}

export function selectScore(state: GameState) {
  return scoreItinerary(state.itinerary)
}

export function selectTripStyle(state: GameState) {
  return classifyTripStyle(state.itinerary)
}

export function selectAvailableAttractions(state: GameState) {
  return selectSelectedCity(state)?.attractions ?? []
}
