'use client'

import { useEffect, useState, useMemo } from 'react'
import { useFilters } from '@/contexts/filters-context'
import { fetchCars, type Car, type CarsResponse } from '@/lib/api/cars'

export function useFilteredCars() {
  const { state } = useFilters()
  const [cars, setCars] = useState<Car[]>([])
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
    if (state.selectedServiceType === 'cars') {
      if (state.selectedCarType) {
        params.type = state.selectedCarType
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

  // Fetch cars when filters change
  useEffect(() => {
    const loadCars = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetchCars(apiParams)
        setCars(response.docs)
        setTotalPages(response.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cars')
        setCars([])
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, [apiParams])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [
    state.selectedCity,
    state.selectedCarType,
    state.priceRange,
    state.selectedRating,
    state.keywordSearch,
  ])

  return {
    cars,
    loading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    hasResults: cars.length > 0,
  }
}
