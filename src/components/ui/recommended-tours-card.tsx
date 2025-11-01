'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Tour } from '@/lib/schemas'
import { Button, ApplyTour } from '@/components/ui'
import { Clock, Tag, MapPin, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const RecommendedToursCard = ({ tour }: { tour: Tour }) => {
  const t = useTranslations('pages.home.recommended_tours')
  const [applyOpen, setApplyOpen] = useState(false)

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setApplyOpen(true)
  }

  return (
    <div key={tour.id} className='embla__slide w-full flex-shrink-0 lg:w-[calc(33.333%-16px)]'>
      <div className='bg-card border-border group flex h-full flex-col overflow-hidden rounded-[26px] border shadow-none transition-all duration-300 hover:shadow-sm'>
        {/* Tour Image */}
        <Link href={`/tours/${tour.slug}`}>
          <div className='relative h-48 w-full overflow-hidden'>
            {tour.images?.[0]?.image?.url ? (
              <Image src={tour.images?.[0]?.image?.url} alt={tour.name} fill className='object-cover transition-transform duration-500 group-hover:scale-105' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
            ) : (
              <div className='bg-sitora-primary-light flex h-full w-full items-center justify-center'>
                <span className='text-sitora-primary text-sm font-medium'>{t('no_image')}</span>
              </div>
            )}
          </div>
        </Link>

        {/* Tour Details */}
        <div className='flex h-full flex-col p-6'>
          <Link href={`/tours/${tour.slug}`}>
            {/* Fixed height for title - allows 2 lines */}
            <h3 className='text-sitora-text-subtitle hover:text-sitora-primary mb-4 line-clamp-2 min-h-[3.5rem] text-lg leading-tight font-semibold transition-colors'>{tour?.name || ''}</h3>
          </Link>

          {/* Tour Info */}
          <div className='mb-4 space-y-2'>
            <div className='flex items-center gap-2'>
              <Clock className='text-sitora-primary h-4 w-4' />
              <span className='text-sitora-body text-sm font-medium'>
                {tour.duration_days} {tour.duration_days !== 1 ? t('days') : t('day')}
                {tour.duration_nights != null && Number(tour.duration_nights) > 0 && (
                  <>
                    {' / '}
                    {tour.duration_nights} {tour.duration_nights !== 1 ? t('nights') : t('night')}
                  </>
                )}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Tag className='text-sitora-primary h-4 w-4' />
              <span className='text-sitora-body text-sm font-medium'>{tour.category?.name || ''}</span>
            </div>
            <div className='flex items-start gap-1'>
              <MapPin className='text-sitora-primary mt-0.5 h-4 w-4 flex-shrink-0 md:mt-0' />
              <div className='flex flex-wrap items-center gap-1'>
                {tour.cities &&
                  tour.cities.map((city: { id: string | number; name?: string }, index: number) => (
                    <span key={city.id} className='flex items-center gap-1'>
                      {city.name || ''}
                      {index < (tour.cities?.length || 0) - 1 && <span className='mx-1'>→</span>}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          {/* Rating - Only show if rating exists and is greater than 0 */}
          {tour.rating && tour.rating > 0 ? (
            <div className='mb-4 flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(tour?.rating || 0) ? 'text-sitora-gold-medium fill-current' : 'text-sitora-text-muted'}`} />
                ))}
              </div>
              <span className='text-sitora-body text-sm font-medium'>{tour?.rating.toFixed(1)}</span>
            </div>
          ) : (
            // Empty space to maintain consistent layout when no rating
            <div className='mb-4 h-6' />
          )}

          {/* Price */}
          <div className='flex items-center justify-between'>
            <p className='flex items-center gap-2'>
              <span className='text-sitora-primary text-lg font-semibold'>${tour?.price?.toLocaleString() || ''}</span>
              <span className='text-sitora-body text-xs font-normal'>{t('per_person')}</span>
            </p>
            <Button variant='default' size='sm' onClick={handleBookNow}>
              {t('book_now')}
            </Button>
          </div>
        </div>

        {/* Apply Tour Modal */}
        <ApplyTour open={applyOpen} setOpen={setApplyOpen} tour={tour} />
      </div>
    </div>
  )
}
