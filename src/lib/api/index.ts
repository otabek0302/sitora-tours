// Export all API functions
export * from './tours'
export * from './cars'
export * from './categories'
export * from './cities'
export * from './hotels'
export * from './pages'
export * from './reviews'

// Generic fetch wrapper with error handling
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}
