'use client'

import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Tour } from '@/lib/schemas'

interface TourInfoProps {
  tour: Tour
}

const TourInfo = ({ tour }: TourInfoProps) => {
  const t = useTranslations('pages.single_tour')

  const cities = tour.cities
    ?.map(c => c.name)
    .filter(Boolean)
    .join(', ')

  return (
    <div className='mb-6'>
      <div className='mb-4'>
        {tour.name && <h1 className='text-sitora-text-heading mb-2 text-lg leading-normal font-bold md:text-3xl'>{tour.name}</h1>}
        <div className='text-sitora-body mb-2 flex flex-wrap items-center gap-4 text-sm font-medium'>
          {tour.duration_days && (
            <span className='font-semibold lowercase italic'>
              {tour.duration_days} {tour.duration_days !== 1 ? t('days') : t('day')}
              {tour.duration_nights != null && Number(tour.duration_nights) > 0 && (
                <>
                  {' / '}
                  {tour.duration_nights} {tour.duration_nights !== 1 ? t('nights') : t('night')}
                </>
              )}
            </span>
          )}
          {tour.category?.name && (
            <>
              <span className='text-sitora-body text-sm font-medium'>|</span>
              <span className='font-semibold italic'>{tour.category.name}</span>
            </>
          )}
          {cities && (
            <div className='flex flex-wrap items-center gap-1'>
              <p className='flex items-center gap-1'>
                <span className='text-sitora-body text-sm font-medium'>|</span>
                <span className='italic'>{cities}</span>
              </p>
            </div>
          )}
          {tour?.rating && Number(tour?.rating) > 0 ? (
            <div className='flex items-center gap-1'>
              <span className='text-sitora-body text-sm font-medium'>|</span>
              <span className='flex items-center gap-1'>
                <Star className='text-sitora-gold-medium h-4 w-4 fill-current' /> {tour?.rating?.toFixed(1)}
              </span>
            </div>
          ) : (
            // Empty space to maintain consistent layout when no rating
            <div className='h-6' />
          )}
        </div>
        {tour.description && <p className='text-sitora-body text-sm leading-tight font-normal'>{tour.description}</p>}
      </div>
    </div>
  )
}

export default TourInfo
