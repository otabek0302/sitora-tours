import { CarSchema, CarsResponseSchema, CarSearchParamsSchema, type Car, type CarsResponse, type CarSearchParams } from '@/lib/schemas'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Fetch cars with validation
export async function fetchCars(params: Partial<CarSearchParams> = {}): Promise<CarsResponse> {
    try {
        // Validate search params
        const validatedParams = CarSearchParamsSchema.parse(params)

        // Build query string
        const searchParams = new URLSearchParams()
        Object.entries(validatedParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString())
            }
        })

        const response = await fetch(`${API_BASE_URL}/cars?${searchParams.toString()}`)

        if (!response.ok) {
            throw new Error(`Failed to fetch cars: ${response.statusText}`)
        }

        const data = await response.json()

        // Validate response with Zod
        return CarsResponseSchema.parse(data)
    } catch (error) {
        console.error('Error fetching cars:', error)
        throw error
    }
}

// Fetch single car by ID
export async function fetchCarById(id: number): Promise<Car> {
    try {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`)

        if (!response.ok) {
            throw new Error(`Failed to fetch car: ${response.statusText}`)
        }

        const data = await response.json()

        // Validate response with Zod
        return CarSchema.parse(data)
    } catch (error) {
        console.error('Error fetching car:', error)
        throw error
    }
}

// Fetch featured cars
export async function fetchFeaturedCars(limit: number = 4): Promise<Car[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/cars?isFeatured=true&limit=${limit}`)

        if (!response.ok) {
            throw new Error(`Failed to fetch featured cars: ${response.statusText}`)
        }

        const data = await response.json()
        const validatedResponse = CarsResponseSchema.parse(data)

        return validatedResponse.docs
    } catch (error) {
        console.error('Error fetching featured cars:', error)
        throw error
    }
}

// Search cars
export async function searchCars(query: string, filters: Partial<CarSearchParams> = {}): Promise<CarsResponse> {
    try {
        const searchParams = {
            ...filters,
            search: query,
        }

        return await fetchCars(searchParams)
    } catch (error) {
        console.error('Error searching cars:', error)
        throw error
    }
}

// Get car types
export async function getCarTypes(): Promise<string[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/cars/types`)

        if (!response.ok) {
            throw new Error(`Failed to fetch car types: ${response.statusText}`)
        }

        const data = await response.json()

        // Validate that it's an array of strings
        const types = Array.isArray(data) ? data : data.types || []
        return types.filter((type: any) => typeof type === 'string')
    } catch (error) {
        console.error('Error fetching car types:', error)
        return []
    }
}

// Get car brands
export async function getCarBrands(): Promise<string[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/cars/brands`)

        if (!response.ok) {
            throw new Error(`Failed to fetch car brands: ${response.statusText}`)
        }

        const data = await response.json()

        // Validate that it's an array of strings
        const brands = Array.isArray(data) ? data : data.brands || []
        return brands.filter((brand: any) => typeof brand === 'string')
    } catch (error) {
        console.error('Error fetching car brands:', error)
        return []
    }
}
