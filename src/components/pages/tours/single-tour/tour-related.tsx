'use client'

import Link from 'next/link'
import Image from 'next/image'

import { Star, Clock, MapPin, Tag } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useToursContext } from '@/lib/stores/tours'

interface TourRelatedProps {
  tour: {
    id?: number | string
    category?: number | { id: string | number; name?: string; slug?: string }
  }
}

const TourRelated = ({ tour }: TourRelatedProps) => {
  const t = useTranslations('pages.single_tour')
  const locale = useLocale()
  const { relatedTours, fetchRelatedTours } = useToursContext()

  // Extract stable IDs for dependencies
  const tourId = typeof tour.id === 'string' ? parseInt(tour.id) : tour.id
  const categoryId = typeof tour.category === 'object' ? tour.category?.id : tour.category
  const numericCategoryId = typeof categoryId === 'string' ? parseInt(categoryId) : categoryId

  useEffect(() => {
    if (!numericCategoryId || !tourId || relatedTours.length > 0) {
      return
    }

    fetchRelatedTours(tourId, numericCategoryId, 6, locale)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId, categoryId])

  if (relatedTours.length === 0) {
    return null
  }

  return (
    <div className='mb-6'>
      <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('related_tours')}</h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {relatedTours.map(relatedTour => (
          <div key={relatedTour.id} className='bg-card border-border group overflow-hidden rounded-[26px] border shadow-none transition-all duration-300 hover:shadow-sm'>
            <Link href={`/tours/${relatedTour.slug}`}>
              {/* Tour Image */}
              <div className='relative h-48 w-full overflow-hidden rounded-[26px] md:rounded-none'>
                <Image src={relatedTour.images?.[0]?.image?.url || ''} alt={relatedTour.name || 'Tour'} fill className='object-cover transition-transform duration-500 group-hover:scale-105' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
              </div>

              {/* Tour Details */}
              <div className='p-6'>
                <h4 className='text-sitora-text-subtitle mb-4 line-clamp-2 text-lg font-semibold'>{relatedTour.name}</h4>

                {/* Tour Info */}
                <div className='mb-4 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Clock className='text-sitora-primary h-4 w-4' />
                    <span>
                      {relatedTour.duration_days} {relatedTour.duration_days !== 1 ? t('days') : t('day')}
                      {relatedTour.duration_nights != null && Number(relatedTour.duration_nights) > 0 && (
                        <>
                          {' / '}
                          {relatedTour.duration_nights} {relatedTour.duration_nights !== 1 ? t('nights') : t('night')}
                        </>
                      )}
                    </span>
                  </div>
                  {relatedTour.category?.name && (
                    <div className='flex items-center gap-2'>
                      <Tag className='text-sitora-primary h-4 w-4' />
                      <span className='text-sitora-body text-sm font-medium'>{relatedTour.category.name}</span>
                    </div>
                  )}
                  {relatedTour.cities && relatedTour.cities.length > 0 && (
                    <div className='flex items-start gap-1'>
                      <MapPin className='text-sitora-primary mt-1 h-4 w-4 flex-shrink-0 md:mt-0' />
                      <div className='flex flex-wrap items-center gap-1'>
                        {relatedTour.cities.map((city: { id: string | number; name?: string }, index: number) => (
                          <span key={city.id} className='flex items-center gap-1'>
                            {city.name || ''}
                            {index < (relatedTour.cities?.length || 0) - 1 && <span className='mx-1'>→</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rating */}
                {relatedTour?.rating && Number(relatedTour?.rating) > 0 ? (
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(relatedTour?.rating || 0) ? 'text-sitora-gold-medium fill-current' : 'text-sitora-text-muted'}`} />
                      ))}
                    </div>
                    <span className='text-sitora-body text-sm'>
                      {relatedTour?.rating?.toFixed(1)} {t('rating')}
                    </span>
                  </div>
                ) : (
                  // Empty space to maintain consistent layout when no rating
                  <div className='h-6' />
                )}

                {/* Price */}
                <div className='flex items-center justify-between'>
                  <p className='flex items-center gap-2'>
                    <span className='text-sitora-primary text-lg font-semibold'>${relatedTour.price?.toLocaleString()}</span>
                    <span className='text-sitora-body text-xs font-normal'>{t('per_person')}</span>
                  </p>
                  <Button variant='default' size='sm'>
                    {t('book_now')}
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TourRelated
