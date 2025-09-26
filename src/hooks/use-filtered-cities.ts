'use client'

import { useEffect, useState, useMemo } from 'react'
import { useFilters } from '@/contexts/filters-context'
import { fetchCities, type City, type CitiesResponse } from '@/lib/api/cities'

export function useFilteredCities() {
  const { state } = useFilters()
  const [cities, setCities] = useState<City[]>([])
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
    if (state.selectedServiceType === 'cities') {
      if (state.selectedCountry) {
        params.country = state.selectedCountry
      }
    }

    // Common filters
    if (state.keywordSearch) {
      params.search = state.keywordSearch
    }

    return params
  }, [state, currentPage])

  // Fetch cities when filters change
  useEffect(() => {
    const loadCities = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetchCities(apiParams)
        setCities(response.docs)
        setTotalPages(response.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cities')
        setCities([])
      } finally {
        setLoading(false)
      }
    }

    loadCities()
  }, [apiParams])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [
    state.selectedCountry,
    state.keywordSearch,
  ])

  return {
    cities,
    loading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    hasResults: cities.length > 0,
  }
}
