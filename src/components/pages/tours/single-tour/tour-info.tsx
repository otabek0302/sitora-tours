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
              {tour.duration_days} {t('days')} / {tour.duration_nights} {t('nights')}
            </span>
          )}
          {tour.category?.name && (
            <>
              <span className='text-sitora-body text-sm font-medium'>|</span>
              <span className='font-semibold italic'>{tour.category.name}</span>
            </>
          )}
          {cities && (
            <>
              <span className='text-sitora-body text-sm font-medium'>|</span>
              <span className='italic'>{cities}</span>
            </>
          )}
          {tour.rating && tour.rating > 0 && (
            <>
              <span className='text-sitora-body text-sm font-medium'>|</span>
              <span className='flex items-center gap-1'>
                <Star className='text-sitora-gold-medium h-4 w-4 fill-current' /> {tour.rating.toFixed(1)}
              </span>
            </>
          )}
        </div>
        {tour.description && <p className='text-sitora-body text-sm leading-tight font-normal'>{tour.description}</p>}
      </div>
    </div>
  )
}

export default TourInfo
