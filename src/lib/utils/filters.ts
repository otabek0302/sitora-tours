import { TourFilters, CarFilters, Pagination } from '@/lib/schemas'

// Convert filters to URL search parameters for API calls using Payload CMS native query format
export function filtersToUrlParams(filters: Partial<TourFilters>, pagination: Pagination): URLSearchParams {
  const params = new URLSearchParams()

  // Pagination
  if (pagination.page && pagination.page > 1) params.set('page', pagination.page.toString())

  if (pagination.limit && pagination.limit !== 12) params.set('limit', pagination.limit.toString())

  // Category filters using Payload's 'in' operator
  if (filters.category && filters.category !== null) params.set('where[category][in]', filters.category.toString())

  // City filters using Payload's 'in' operator
  if (filters.cities && filters.cities.length > 0) params.set('where[cities][in]', filters.cities.join(','))

  // Price range filters using Payload's comparison operators
  if (filters.minPrice && filters.minPrice > 0) params.set('where[price][greater_than_equal]', filters.minPrice.toString())
  if (filters.maxPrice && filters.maxPrice < 999999) params.set('where[price][less_than_equal]', filters.maxPrice.toString())

  // Duration range filters using Payload's comparison operators
  if (filters.durationMin && filters.durationMin > 0) params.set('where[duration_days][greater_than_equal]', filters.durationMin.toString())
  if (filters.durationMax && filters.durationMax < 30) params.set('where[duration_days][less_than_equal]', filters.durationMax.toString())

  return params
}

// Validate filter values
export function validateFilters(filters: Partial<TourFilters>): boolean {
  const errors: string[] = []

  // Validate price range - only check if both values exist
  if (filters.minPrice !== undefined && filters.minPrice < 0) errors.push('Price minimum cannot be negative')
  if (filters.maxPrice !== undefined && filters.maxPrice < 0) errors.push('Price maximum cannot be negative')
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined && filters.minPrice > filters.maxPrice) errors.push('Price minimum cannot be greater than maximum')

  // Validate duration range - only check if both values exist
  if (filters.durationMin !== undefined && filters.durationMin < 0) errors.push('Duration minimum cannot be negative')
  if (filters.durationMax !== undefined && filters.durationMax < 0) errors.push('Duration maximum cannot be negative')
  if (filters.durationMin !== undefined && filters.durationMax !== undefined && filters.durationMin > filters.durationMax) errors.push('Duration minimum cannot be greater than maximum')

  // Validate arrays
  if (filters.cities !== undefined && !Array.isArray(filters.cities)) errors.push('Cities must be an array')

  return errors.length === 0
}

// Convert filters to URL parameters for Payload CMS
export function carsFiltersToUrlParams(filters: Partial<CarFilters>, pagination: Pagination): URLSearchParams {
  const params = new URLSearchParams()

  // Pagination
  if (pagination.page && pagination.page > 1) params.set('page', pagination.page.toString())

  if (pagination.limit && pagination.limit !== 12) params.set('limit', pagination.limit.toString())

  // Car type filter
  if (filters.type) params.set('where[type][equals]', filters.type.toString())

  // Brand filter
  if (filters.brand) params.set('where[brand][equals]', filters.brand.toString())

  // Price range filters
  if (filters.minPrice !== undefined && filters.minPrice > 0) params.set('where[price][greater_than_equal]', filters.minPrice.toString())
  if (filters.maxPrice !== undefined && filters.maxPrice < 10000) params.set('where[price][less_than_equal]', filters.maxPrice.toString())

  // Capacity range filters
  if (filters.minCapacity !== undefined && filters.minCapacity > 0) params.set('where[capacity][greater_than_equal]', filters.minCapacity.toString())
  if (filters.maxCapacity !== undefined && filters.maxCapacity < 10) params.set('where[capacity][less_than_equal]', filters.maxCapacity.toString())

  return params
}

// Validate car filters
export function validateCarsFilters(filters: Partial<CarFilters>): boolean {
  const errors: string[] = []

  // Validate price range
  if (filters.minPrice !== undefined && filters.minPrice < 0) errors.push('Minimum price cannot be negative')
  if (filters.maxPrice !== undefined && filters.maxPrice > 10000) errors.push('Maximum price cannot exceed 10000')
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined && filters.minPrice > filters.maxPrice) errors.push('Minimum price cannot be greater than maximum price')

  // Validate capacity range
  if (filters.minCapacity !== undefined && filters.minCapacity < 1) errors.push('Minimum capacity cannot be less than 1')
  if (filters.maxCapacity !== undefined && filters.maxCapacity > 10) errors.push('Maximum capacity cannot exceed 10')
  if (filters.minCapacity !== undefined && filters.maxCapacity !== undefined && filters.minCapacity > filters.maxCapacity) errors.push('Minimum capacity cannot be greater than maximum capacity')

  return errors.length === 0
}
