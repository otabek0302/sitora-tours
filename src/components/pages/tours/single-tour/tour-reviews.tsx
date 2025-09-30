'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  tour: number | any
  slug?: string | null
  slugLock?: boolean | null
  updatedAt: string
  createdAt: string
}

interface TourReviewsProps {
  tour: {
    id?: number | string
    slug?: string | null
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const truncateText = (text: string, maxLength: number = 120): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const TourReviews = ({ tour }: TourReviewsProps) => {
  const t = useTranslations('pages.single_tour')
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [fetched, setFetched] = useState(false)

  // Extract stable tour ID
  const tourId = typeof tour.id === 'string' ? parseInt(tour.id) : tour.id

  useEffect(() => {
    // Only fetch once per tour
    if (fetched || !tourId) {
      return
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?where[tour][equals]=${tourId}&limit=6&sort=-createdAt`)

        if (response.ok) {
          const data = await response.json()
          setReviews(data.docs || [])
        } else {
          setReviews([])
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setReviews([])
      } finally {
        setLoading(false)
        setFetched(true)
      }
    }

    fetchReviews()
  }, [tourId, fetched])

  if (loading) {
    return (
      <div className='mb-8'>
        <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('reviews')}</h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3].map(i => (
            <div key={i} className='bg-card border-sitora-border animate-pulse rounded-3xl border p-6'>
              <div className='mb-4 flex items-start gap-4'>
                <div className='bg-sitora-border h-12 w-12 flex-shrink-0 rounded-full' />
                <div className='flex-1 space-y-2'>
                  <div className='bg-sitora-border h-4 w-24 rounded' />
                  <div className='bg-sitora-border h-3 w-32 rounded' />
                </div>
              </div>
              <div className='space-y-2'>
                <div className='bg-sitora-border h-3 w-full rounded' />
                <div className='bg-sitora-border h-3 w-4/5 rounded' />
                <div className='bg-sitora-border h-3 w-3/4 rounded' />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (reviews.length === 0) {
    return null
  }

  return (
    <div className='mb-8'>
      <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('reviews')}</h2>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {reviews.map((review, index) => (
          <div key={review.id || index} className='bg-card border-sitora-primary rounded-3xl border p-6'>
            <div className='mb-4 flex items-start gap-4'>
              <div className='flex-1'>
                <h4 className='text-sitora-primary text-base font-bold'>{review.name}</h4>
                <p className='text-sitora-primary/70 text-sm'>{formatDate(review.createdAt)}</p>
              </div>
            </div>
            <p className='text-sitora-body text-sm leading-relaxed'>{truncateText(review.comment)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TourReviews
