'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

// Filter types
export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface PriceRange {
  min: number
  max: number
}

export interface DurationRange {
  min: number
  max: number
}

export interface FilterState {
  // Location filters
  selectedCity: string | null
  selectedCountry: string | null
  
  // Service type filters
  selectedServiceType: string | null
  selectedCategory: string | null
  
  // Date filters
  dateRange: DateRange
  
  // Price filters
  priceRange: PriceRange
  
  // Duration filters
  durationRange: DurationRange
  
  // Search filters
  keywordSearch: string
  
  // Additional filters
  selectedRating: number | null
  selectedDifficulty: string | null
  selectedTransport: string | null
  selectedCarType: string | null
  
  // UI state
  isFiltersOpen: boolean
  sortBy: string
  viewMode: 'grid' | 'list'
}

// Action types
export type FilterAction =
  | { type: 'SET_SELECTED_CITY'; payload: string | null }
  | { type: 'SET_SELECTED_COUNTRY'; payload: string | null }
  | { type: 'SET_SELECTED_SERVICE_TYPE'; payload: string | null }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string | null }
  | { type: 'SET_DATE_RANGE'; payload: DateRange }
  | { type: 'SET_PRICE_RANGE'; payload: PriceRange }
  | { type: 'SET_DURATION_RANGE'; payload: DurationRange }
  | { type: 'SET_KEYWORD_SEARCH'; payload: string }
  | { type: 'SET_SELECTED_RATING'; payload: number | null }
  | { type: 'SET_SELECTED_DIFFICULTY'; payload: string | null }
  | { type: 'SET_SELECTED_TRANSPORT'; payload: string | null }
  | { type: 'SET_SELECTED_CAR_TYPE'; payload: string | null }
  | { type: 'SET_FILTERS_OPEN'; payload: boolean }
  | { type: 'SET_SORT_BY'; payload: string }
  | { type: 'SET_VIEW_MODE'; payload: 'grid' | 'list' }
  | { type: 'RESET_FILTERS' }
  | { type: 'RESET_ALL_FILTERS' }

// Initial state
const initialState: FilterState = {
  selectedCity: null,
  selectedCountry: null,
  selectedServiceType: null,
  selectedCategory: null,
  dateRange: { start: null, end: null },
  priceRange: { min: 0, max: 10000 },
  durationRange: { min: 1, max: 30 },
  keywordSearch: '',
  selectedRating: null,
  selectedDifficulty: null,
  selectedTransport: null,
  selectedCarType: null,
  isFiltersOpen: false,
  sortBy: 'createdAt',
  viewMode: 'grid',
}

// Reducer function
function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_SELECTED_CITY':
      return { ...state, selectedCity: action.payload }
    
    case 'SET_SELECTED_COUNTRY':
      return { ...state, selectedCountry: action.payload }
    
    case 'SET_SELECTED_SERVICE_TYPE':
      return { ...state, selectedServiceType: action.payload }
    
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload }
    
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload }
    
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload }
    
    case 'SET_DURATION_RANGE':
      return { ...state, durationRange: action.payload }
    
    case 'SET_KEYWORD_SEARCH':
      return { ...state, keywordSearch: action.payload }
    
    case 'SET_SELECTED_RATING':
      return { ...state, selectedRating: action.payload }
    
    case 'SET_SELECTED_DIFFICULTY':
      return { ...state, selectedDifficulty: action.payload }
    
    case 'SET_SELECTED_TRANSPORT':
      return { ...state, selectedTransport: action.payload }
    
    case 'SET_SELECTED_CAR_TYPE':
      return { ...state, selectedCarType: action.payload }
    
    case 'SET_FILTERS_OPEN':
      return { ...state, isFiltersOpen: action.payload }
    
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload }
    
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload }
    
    case 'RESET_FILTERS':
      return {
        ...state,
        selectedCity: null,
        selectedCountry: null,
        selectedServiceType: null,
        selectedCategory: null,
        dateRange: { start: null, end: null },
        priceRange: { min: 0, max: 10000 },
        durationRange: { min: 1, max: 30 },
        keywordSearch: '',
        selectedRating: null,
        selectedDifficulty: null,
        selectedTransport: null,
        selectedCarType: null,
      }
    
    case 'RESET_ALL_FILTERS':
      return initialState
    
    default:
      return state
  }
}

// Context type
interface FilterContextType {
  state: FilterState
  dispatch: React.Dispatch<FilterAction>
  
  // Helper functions
  setSelectedCity: (city: string | null) => void
  setSelectedCountry: (country: string | null) => void
  setSelectedServiceType: (serviceType: string | null) => void
  setSelectedCategory: (category: string | null) => void
  setDateRange: (dateRange: DateRange) => void
  setPriceRange: (priceRange: PriceRange) => void
  setDurationRange: (durationRange: DurationRange) => void
  setKeywordSearch: (keyword: string) => void
  setSelectedRating: (rating: number | null) => void
  setSelectedDifficulty: (difficulty: string | null) => void
  setSelectedTransport: (transport: string | null) => void
  setSelectedCarType: (carType: string | null) => void
  setFiltersOpen: (isOpen: boolean) => void
  setSortBy: (sortBy: string) => void
  setViewMode: (viewMode: 'grid' | 'list') => void
  resetFilters: () => void
  resetAllFilters: () => void
  
  // Computed values
  hasActiveFilters: boolean
  activeFiltersCount: number
}

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Provider component
export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filterReducer, initialState)

  // Helper functions
  const setSelectedCity = (city: string | null) => {
    dispatch({ type: 'SET_SELECTED_CITY', payload: city })
  }

  const setSelectedCountry = (country: string | null) => {
    dispatch({ type: 'SET_SELECTED_COUNTRY', payload: country })
  }

  const setSelectedServiceType = (serviceType: string | null) => {
    dispatch({ type: 'SET_SELECTED_SERVICE_TYPE', payload: serviceType })
  }

  const setSelectedCategory = (category: string | null) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category })
  }

  const setDateRange = (dateRange: DateRange) => {
    dispatch({ type: 'SET_DATE_RANGE', payload: dateRange })
  }

  const setPriceRange = (priceRange: PriceRange) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: priceRange })
  }

  const setDurationRange = (durationRange: DurationRange) => {
    dispatch({ type: 'SET_DURATION_RANGE', payload: durationRange })
  }

  const setKeywordSearch = (keyword: string) => {
    dispatch({ type: 'SET_KEYWORD_SEARCH', payload: keyword })
  }

  const setSelectedRating = (rating: number | null) => {
    dispatch({ type: 'SET_SELECTED_RATING', payload: rating })
  }

  const setSelectedDifficulty = (difficulty: string | null) => {
    dispatch({ type: 'SET_SELECTED_DIFFICULTY', payload: difficulty })
  }

  const setSelectedTransport = (transport: string | null) => {
    dispatch({ type: 'SET_SELECTED_TRANSPORT', payload: transport })
  }

  const setSelectedCarType = (carType: string | null) => {
    dispatch({ type: 'SET_SELECTED_CAR_TYPE', payload: carType })
  }

  const setFiltersOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_FILTERS_OPEN', payload: isOpen })
  }

  const setSortBy = (sortBy: string) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy })
  }

  const setViewMode = (viewMode: 'grid' | 'list') => {
    dispatch({ type: 'SET_VIEW_MODE', payload: viewMode })
  }

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }

  const resetAllFilters = () => {
    dispatch({ type: 'RESET_ALL_FILTERS' })
  }

  // Computed values
  const hasActiveFilters = Boolean(
    state.selectedCity ||
    state.selectedCountry ||
    state.selectedServiceType ||
    state.selectedCategory ||
    state.dateRange.start ||
    state.dateRange.end ||
    state.priceRange.min > 0 ||
    state.priceRange.max < 10000 ||
    state.durationRange.min > 1 ||
    state.durationRange.max < 30 ||
    state.keywordSearch ||
    state.selectedRating ||
    state.selectedDifficulty ||
    state.selectedTransport ||
    state.selectedCarType
  )

  const activeFiltersCount = [
    state.selectedCity,
    state.selectedCountry,
    state.selectedServiceType,
    state.selectedCategory,
    state.dateRange.start,
    state.dateRange.end,
    state.priceRange.min > 0,
    state.priceRange.max < 10000,
    state.durationRange.min > 1,
    state.durationRange.max < 30,
    state.keywordSearch,
    state.selectedRating,
    state.selectedDifficulty,
    state.selectedTransport,
    state.selectedCarType,
  ].filter(Boolean).length

  const value: FilterContextType = {
    state,
    dispatch,
    setSelectedCity,
    setSelectedCountry,
    setSelectedServiceType,
    setSelectedCategory,
    setDateRange,
    setPriceRange,
    setDurationRange,
    setKeywordSearch,
    setSelectedRating,
    setSelectedDifficulty,
    setSelectedTransport,
    setSelectedCarType,
    setFiltersOpen,
    setSortBy,
    setViewMode,
    resetFilters,
    resetAllFilters,
    hasActiveFilters,
    activeFiltersCount,
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

// Custom hook to use the filter context
export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}
