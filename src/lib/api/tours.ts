import { 
  TourSchema, 
  ToursResponseSchema, 
  TourSearchParamsSchema,
  type Tour, 
  type ToursResponse, 
  type TourSearchParams 
} from '@/lib/schemas'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Fetch tours with validation
export async function fetchTours(params: Partial<TourSearchParams> = {}): Promise<ToursResponse> {
  try {
    // Validate search params
    const validatedParams = TourSearchParamsSchema.parse(params)
    
    // Build query string
    const searchParams = new URLSearchParams()
    Object.entries(validatedParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })

    const response = await fetch(`${API_BASE_URL}/tours?${searchParams.toString()}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tours: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate response with Zod
    return ToursResponseSchema.parse(data)
  } catch (error) {
    console.error('Error fetching tours:', error)
    throw error
  }
}

// Fetch single tour by ID
export async function fetchTourById(id: number): Promise<Tour> {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/${id}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tour: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate response with Zod
    return TourSchema.parse(data)
  } catch (error) {
    console.error('Error fetching tour:', error)
    throw error
  }
}

// Fetch featured tours
export async function fetchFeaturedTours(limit: number = 6): Promise<Tour[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/tours?isFeatured=true&limit=${limit}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch featured tours: ${response.statusText}`)
    }

    const data = await response.json()
    const validatedResponse = ToursResponseSchema.parse(data)
    
    return validatedResponse.docs
  } catch (error) {
    console.error('Error fetching featured tours:', error)
    throw error
  }
}

// Search tours
export async function searchTours(query: string, filters: Partial<TourSearchParams> = {}): Promise<ToursResponse> {
  try {
    const searchParams = {
      ...filters,
      search: query,
    }
    
    return await fetchTours(searchParams)
  } catch (error) {
    console.error('Error searching tours:', error)
    throw error
  }
}

// Get tour categories
export async function getTourCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/categories`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tour categories: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate that it's an array of strings
    const categories = Array.isArray(data) ? data : data.categories || []
    return categories.filter((cat: any) => typeof cat === 'string')
  } catch (error) {
    console.error('Error fetching tour categories:', error)
    return []
  }
}

// Get tour difficulties
export async function getTourDifficulties(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/tours/difficulties`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tour difficulties: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate that it's an array of strings
    const difficulties = Array.isArray(data) ? data : data.difficulties || []
    return difficulties.filter((diff: any) => typeof diff === 'string')
  } catch (error) {
    console.error('Error fetching tour difficulties:', error)
    return []
  }
}
