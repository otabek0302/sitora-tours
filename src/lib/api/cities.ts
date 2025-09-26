import { 
  CitySchema, 
  CitiesResponseSchema, 
  CitySearchParamsSchema,
  type City, 
  type CitiesResponse, 
  type CitySearchParams 
} from '@/lib/schemas'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Fetch cities with validation
export async function fetchCities(params: Partial<CitySearchParams> = {}): Promise<CitiesResponse> {
  try {
    // Validate search params
    const validatedParams = CitySearchParamsSchema.parse(params)
    
    // Build query string
    const searchParams = new URLSearchParams()
    Object.entries(validatedParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })

    const response = await fetch(`${API_BASE_URL}/cities?${searchParams.toString()}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate response with Zod
    return CitiesResponseSchema.parse(data)
  } catch (error) {
    console.error('Error fetching cities:', error)
    throw error
  }
}

// Fetch single city by ID
export async function fetchCityById(id: number): Promise<City> {
  try {
    const response = await fetch(`${API_BASE_URL}/cities/${id}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch city: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate response with Zod
    return CitySchema.parse(data)
  } catch (error) {
    console.error('Error fetching city:', error)
    throw error
  }
}

// Fetch featured cities
export async function fetchFeaturedCities(limit: number = 4): Promise<City[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/cities?isFeatured=true&limit=${limit}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch featured cities: ${response.statusText}`)
    }

    const data = await response.json()
    const validatedResponse = CitiesResponseSchema.parse(data)
    
    return validatedResponse.docs
  } catch (error) {
    console.error('Error fetching featured cities:', error)
    throw error
  }
}

// Search cities
export async function searchCities(query: string, filters: Partial<CitySearchParams> = {}): Promise<CitiesResponse> {
  try {
    const searchParams = {
      ...filters,
      search: query,
    }
    
    return await fetchCities(searchParams)
  } catch (error) {
    console.error('Error searching cities:', error)
    throw error
  }
}

// Get countries
export async function getCountries(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/cities/countries`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate that it's an array of strings
    const countries = Array.isArray(data) ? data : data.countries || []
    return countries.filter((country: any) => typeof country === 'string')
  } catch (error) {
    console.error('Error fetching countries:', error)
    return []
  }
}
