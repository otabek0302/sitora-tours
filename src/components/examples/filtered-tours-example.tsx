'use client'

import React from 'react'
import { useFilters } from '@/contexts/filters-context'
import { useFilteredTours } from '@/hooks/use-filtered-tours'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function FilteredToursExample() {
  const {
    state,
    setKeywordSearch,
    setSelectedCategory,
    setPriceRange,
    setSelectedCity,
    resetFilters,
    hasActiveFilters,
    activeFiltersCount,
  } = useFilters()

  const {
    tours,
    loading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    hasResults,
  } = useFilteredTours()

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Filter Tours</h3>
          
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <Input
              type="text"
              placeholder="Search tours..."
              value={state.keywordSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
            />
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <Input
              type="text"
              placeholder="Enter city..."
              value={state.selectedCity || ''}
              onChange={(e) => setSelectedCity(e.target.value || null)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={state.selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full p-2 border border-border rounded-md"
            >
              <option value="">All Categories</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="luxury">Luxury</option>
              <option value="nature">Nature</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min Price"
                value={state.priceRange.min}
                onChange={(e) => setPriceRange({
                  ...state.priceRange,
                  min: Number(e.target.value) || 0
                })}
              />
              <Input
                type="number"
                placeholder="Max Price"
                value={state.priceRange.max}
                onChange={(e) => setPriceRange({
                  ...state.priceRange,
                  max: Number(e.target.value) || 10000
                })}
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex gap-2">
            <Button
              onClick={resetFilters}
              variant="outline"
              disabled={!hasActiveFilters}
            >
              Reset Filters
            </Button>
            {hasActiveFilters && (
              <span className="text-sm text-sitora-body">
                {activeFiltersCount} filter(s) active
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Tours ({tours.length})
          </h3>
          {loading && <span className="text-sm text-sitora-body">Loading...</span>}
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            Error: {error}
          </div>
        )}

        {!loading && !hasResults && !error && (
          <div className="text-center py-8 text-sitora-body">
            No tours found. Try adjusting your filters.
          </div>
        )}

        {hasResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tours.map((tour) => (
              <Card key={tour.id} className="p-4">
                <h4 className="font-semibold mb-2">{tour.title}</h4>
                <p className="text-sm text-sitora-body mb-2">{tour.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sitora-primary font-semibold">
                    ${tour.price}
                  </span>
                  <span className="text-sm text-sitora-body">
                    {tour.rating} ⭐ ({tour.reviews} reviews)
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
