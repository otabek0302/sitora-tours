import { 
  ReviewSchema, 
  ReviewsResponseSchema, 
  ReviewSubmissionSchema,
  ReviewSearchParamsSchema,
  type Review, 
  type ReviewsResponse, 
  type ReviewSubmission,
  type ReviewSearchParams 
} from '@/lib/schemas'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Fetch reviews with validation
export async function fetchReviews(params: Partial<ReviewSearchParams> = {}): Promise<ReviewsResponse> {
  try {
    // Validate search params
    const validatedParams = ReviewSearchParamsSchema.parse(params)
    
    // Build query string
    const searchParams = new URLSearchParams()
    Object.entries(validatedParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })

    const response = await fetch(`${API_BASE_URL}/reviews?${searchParams.toString()}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate response with Zod
    return ReviewsResponseSchema.parse(data)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }
}

// Submit a new review
export async function submitReview(reviewData: ReviewSubmission): Promise<Review> {
  try {
    // Validate submission data
    const validatedData = ReviewSubmissionSchema.parse(reviewData)
    
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to submit review: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate response with Zod
    return ReviewSchema.parse(data)
  } catch (error) {
    console.error('Error submitting review:', error)
    throw error
  }
}

// Fetch reviews for a specific tour
export async function fetchTourReviews(tourId: number, limit: number = 10): Promise<Review[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews?tour_id=${tourId}&isApproved=true&limit=${limit}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tour reviews: ${response.statusText}`)
    }

    const data = await response.json()
    const validatedResponse = ReviewsResponseSchema.parse(data)
    
    return validatedResponse.docs
  } catch (error) {
    console.error('Error fetching tour reviews:', error)
    throw error
  }
}

// Fetch reviews for a specific car
export async function fetchCarReviews(carId: number, limit: number = 10): Promise<Review[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews?car_id=${carId}&isApproved=true&limit=${limit}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch car reviews: ${response.statusText}`)
    }

    const data = await response.json()
    const validatedResponse = ReviewsResponseSchema.parse(data)
    
    return validatedResponse.docs
  } catch (error) {
    console.error('Error fetching car reviews:', error)
    throw error
  }
}

// Fetch featured reviews
export async function fetchFeaturedReviews(limit: number = 6): Promise<Review[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews?isApproved=true&isActive=true&limit=${limit}&sort=-rating`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch featured reviews: ${response.statusText}`)
    }

    const data = await response.json()
    const validatedResponse = ReviewsResponseSchema.parse(data)
    
    return validatedResponse.docs
  } catch (error) {
    console.error('Error fetching featured reviews:', error)
    throw error
  }
}

// Get average rating for a tour
export async function getTourAverageRating(tourId: number): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/average-rating?tour_id=${tourId}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tour average rating: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate that it's a number
    const rating = typeof data.rating === 'number' ? data.rating : 0
    return Math.round(rating * 10) / 10 // Round to 1 decimal place
  } catch (error) {
    console.error('Error fetching tour average rating:', error)
    return 0
  }
}

// Get average rating for a car
export async function getCarAverageRating(carId: number): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/average-rating?car_id=${carId}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch car average rating: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate that it's a number
    const rating = typeof data.rating === 'number' ? data.rating : 0
    return Math.round(rating * 10) / 10 // Round to 1 decimal place
  } catch (error) {
    console.error('Error fetching car average rating:', error)
    return 0
  }
}
