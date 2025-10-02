'use client'

import { useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useReviewsContext } from '@/lib/stores/reviews'
import { truncateText } from '@/lib/utils/formatting'
import { formatDate } from '@/lib/utils/formatting'

interface TourReviewsProps {
  tour: {
    id?: number | string
    slug?: string | null
  }
}

const TourReviews = ({ tour }: TourReviewsProps) => {
  const t = useTranslations('pages.single_tour')
  const locale = useLocale()
  const { reviews, loading, error, fetchReviews, setLocale } = useReviewsContext()

  // Extract stable tour ID
  const tourId = typeof tour.id === 'string' ? parseInt(tour.id) : tour.id

  useEffect(() => {
    setLocale(locale)
    if (tourId) {
      fetchReviews(tourId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId, locale])

  if (loading || error || reviews.length === 0) {
    return null
  }

  return (
    <div className='mb-6'>
      <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('reviews')}</h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {reviews.slice(0, 6).map((review, index) => (
          <div key={review.id || index} className='bg-card border-sitora-primary rounded-[26px] border p-6 shadow-none'>
            <div className='mb-4 flex items-start gap-4'>
              <div className='flex-1'>
                <h4 className='text-sitora-primary text-base font-bold'>
                  {review.first_name} {review.last_name}
                </h4>
                <p className='text-sitora-primary/70 text-sm'>{review.createdAt ? formatDate(review.createdAt) : ''}</p>
              </div>
            </div>
            <p className='text-sitora-body text-sm leading-relaxed'>{truncateText(review.comment, 120)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TourReviews
