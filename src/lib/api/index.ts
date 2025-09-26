// Export all API functions
export * from './tours'
export * from './cities'
export * from './cars'
export * from './reviews'

// Common API utilities
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Generic API error handler
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public statusText: string,
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

// Generic fetch wrapper with error handling
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        })

        if (!response.ok) {
            throw new ApiError(`API request failed: ${response.statusText}`, response.status, response.statusText)
        }

        const data = await response.json()
        return data
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        }

        console.error('API request error:', error)
        throw new ApiError('Network error occurred', 0, 'Network Error')
    }
}

// Retry mechanism for failed requests
export async function apiRequestWithRetry<T>(endpoint: string, options: RequestInit = {}, maxRetries: number = 3): Promise<T> {
    let lastError: Error

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await apiRequest<T>(endpoint, options)
        } catch (error) {
            lastError = error as Error

            if (attempt === maxRetries) {
                throw lastError
            }

            // Wait before retrying (exponential backoff)
            const delay = Math.pow(2, attempt - 1) * 1000
            await new Promise((resolve) => setTimeout(resolve, delay))
        }
    }

    throw lastError!
}
