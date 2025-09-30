'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Tour } from '@/lib/schemas'

interface TourAccommodationProps {
  tour: Tour
}

const getCityName = (city: any): string => {
  if (typeof city === 'object' && city.name) {
    return city.name.toUpperCase()
  }
  return 'UNKNOWN'
}

const TourAccommodation = ({ tour }: TourAccommodationProps) => {
  const t = useTranslations('pages.single_tour')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  if (!tour.accommodation || tour.accommodation.length === 0) {
    return null
  }

  return (
    <div className='mb-8'>
      <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('accommodation')}</h2>

      <div className='space-y-2'>
        {tour.accommodation.map((item, index) => {
          const cityName = getCityName(item.city)
          const isExpanded = expandedItem === item.id

          return (
            <div key={item.id || index} className='bg-card border-sitora-primary relative rounded-3xl border p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span className='text-sitora-text-subtitle text-base font-bold'>{cityName}</span>
                </div>

                {item.hotel && item.hotel.length > 0 && (
                  <button onClick={() => setExpandedItem(isExpanded ? null : item.id || index.toString())} className='text-sitora-primary hover:text-sitora-primary/90 transition-colors'>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              {isExpanded && item.hotel && item.hotel.length > 0 && (
                <div className='border-sitora-border mt-4 border-t pt-4'>
                  <div className='space-y-3'>
                    {item.hotel.map((hotel: any, hotelIndex) => {
                      if (typeof hotel === 'number') return null
                      return (
                        <div key={hotelIndex} className='bg-card rounded-lg p-3'>
                          <h4 className='text-sitora-text-subtitle mb-2 font-semibold'>{hotel.name}</h4>
                          {hotel.description && <p className='text-sitora-body mb-2 text-sm'>{hotel.description}</p>}
                          <div className='space-y-1 text-sm'>
                            {hotel.address && (
                              <p className='text-sitora-body'>
                                <span className='font-medium'>{t('address')}:</span> {hotel.address}
                              </p>
                            )}
                            {hotel.phone && (
                              <p className='text-sitora-body'>
                                <span className='font-medium'>{t('phone')}:</span> {hotel.phone}
                              </p>
                            )}
                            {hotel.rating && (
                              <p className='text-sitora-body'>
                                <span className='font-medium'>{t('rating')}:</span> {hotel.rating} {t('stars')}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TourAccommodation
