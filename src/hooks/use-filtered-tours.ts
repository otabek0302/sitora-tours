'use client'

import { useEffect, useState, useMemo } from 'react'
import { useFilters } from '@/contexts/filters-context'
import { fetchTours, type Tour, type ToursResponse } from '@/lib/api/tours'

export function useFilteredTours() {
  const { state } = useFilters()
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // Convert filter state to API parameters
  const apiParams = useMemo(() => {
    const params: any = {
      page: currentPage,
      limit: 12,
      sort: state.sortBy,
    }

    // Add filters based on selected service type
    if (state.selectedServiceType === 'tours') {
      if (state.selectedCategory) {
        params.category = state.selectedCategory
      }
      
      if (state.selectedDifficulty) {
        params.difficulty = state.selectedDifficulty
      }
      
      if (state.selectedTransport) {
        params.transport = state.selectedTransport
      }
      
      if (state.durationRange.min > 1 || state.durationRange.max < 30) {
        params.durationRange = [state.durationRange.min, state.durationRange.max]
      }
    }

    // Common filters
    if (state.selectedCity) {
      params.location = state.selectedCity
    }
    
    if (state.priceRange.min > 0 || state.priceRange.max < 10000) {
      params.priceRange = [state.priceRange.min, state.priceRange.max]
    }
    
    if (state.selectedRating) {
      params.rating = state.selectedRating
    }
    
    if (state.keywordSearch) {
      params.search = state.keywordSearch
    }

    return params
  }, [state, currentPage])

  // Fetch tours when filters change
  useEffect(() => {
    const loadTours = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetchTours(apiParams)
        setTours(response.docs)
        setTotalPages(response.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tours')
        setTours([])
      } finally {
        setLoading(false)
      }
    }

    loadTours()
  }, [apiParams])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [
    state.selectedCity,
    state.selectedCategory,
    state.selectedDifficulty,
    state.selectedTransport,
    state.priceRange,
    state.durationRange,
    state.selectedRating,
    state.keywordSearch,
  ])

  return {
    tours,
    loading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    hasResults: tours.length > 0,
  }
}
