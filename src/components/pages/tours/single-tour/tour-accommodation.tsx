'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Tour } from '@/lib/schemas'

interface TourAccommodationProps {
  tour: Tour
}

const getCityName = (city: number | { id: string | number; name?: string } | undefined): string => {
  if (typeof city === 'object' && city?.name) {
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
    <div className='mb-6'>
      <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('accommodation')}</h2>

      <div className='space-y-4'>
        {tour.accommodation.map((item, index) => {
          const cityName = getCityName(item.city)
          const isExpanded = expandedItem === (item.id ?? index.toString())

          return (
            <div key={item.id || index} className='bg-card border-border relative rounded-[18px] border p-4 shadow-none'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span className='text-sitora-text-subtitle text-base font-bold'>{cityName}</span>
                </div>

                {item.hotel && item.hotel.length > 0 && (
                  <button onClick={() => setExpandedItem(isExpanded ? null : item.id || index.toString())} className='text-sitora-text-body hover:text-sitora-primary/90 transition-colors'>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              {isExpanded && item.hotel && item.hotel.length > 0 && (
                <div className='border-sitora-border mt-4 border-t pt-4'>
                  <div className='space-y-3'>
                    {item.hotel.map((hotel: number | { id: string | number; name?: string; description?: string; address?: string; phone?: string; rating?: string; website?: string; email?: string; slug?: string }, hotelIndex) => {
                      if (typeof hotel === 'number') return null
                      return (
                        <div key={hotelIndex} className='bg-card border-border rounded-lg border p-4'>
                          <h4 className='text-sitora-text-subtitle mb-2 text-lg font-semibold'>{hotel.name}</h4>
                          {hotel.description && <p className='text-sitora-body mb-3 text-sm leading-relaxed'>{hotel.description}</p>}
                          <div className='space-y-2 text-sm'>
                            {hotel.address && (
                              <p className='text-sitora-body'>
                                <span className='text-sitora-text-subtitle font-medium'>{t('address')}:</span> <span className='ml-1'>{hotel.address}</span>
                              </p>
                            )}
                            {hotel.phone && (
                              <p className='text-sitora-body'>
                                <span className='text-sitora-text-subtitle font-medium'>{t('phone')}:</span> <span className='ml-1'>{hotel.phone}</span>
                              </p>
                            )}
                            {(hotel.website || hotel.email) && (
                              <p className='text-sitora-body'>
                                <span className='text-sitora-text-subtitle font-medium'>{hotel.website && hotel.email ? t('website_email') : hotel.website ? t('website') : t('email')}:</span>{' '}
                                {hotel.website && (
                                  <a href={hotel.website.startsWith('http') ? hotel.website : `https://${hotel.website}`} target='_blank' rel='noopener noreferrer' className='text-sitora-primary hover:text-sitora-primary-dark ml-1 underline'>
                                    {hotel.website}
                                  </a>
                                )}
                                {hotel.website && hotel.email && ' / '}
                                {hotel.email && (
                                  <a href={`mailto:${hotel.email}`} className='text-sitora-primary hover:text-sitora-primary-dark ml-1 underline'>
                                    {hotel.email}
                                  </a>
                                )}
                              </p>
                            )}
                            {hotel.rating && (
                              <p className='text-sitora-body'>
                                <span className='text-sitora-text-subtitle font-medium'>{t('rating')}:</span>{' '}
                                <span className='ml-1'>
                                  {hotel.rating} {t('stars')}
                                </span>
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
