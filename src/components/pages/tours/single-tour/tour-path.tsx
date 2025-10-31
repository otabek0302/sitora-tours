'use client'

import { useState } from 'react'
import { ChevronDown, Plane, Train, Bus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Tour } from '@/lib/schemas'

interface TourPathProps {
  tour: Tour
}

const getCityName = (city: number | { id: number; name?: string }): string => {
  if (typeof city === 'object' && city.name) {
    return city.name.toUpperCase()
  }
  return 'UNKNOWN'
}

const getTransportIcon = (transport?: string) => {
  if (!transport) return <Plane className='text-sitora-primary h-6 w-6' />

  const transportLower = transport.toLowerCase()

  if (transportLower.includes('train') || transportLower.includes('rail')) {
    return <Train className='text-sitora-primary h-6 w-6' />
  }

  if (transportLower.includes('bus') || transportLower.includes('coach')) {
    return <Bus className='text-sitora-primary h-6 w-6' />
  }

  return <Plane className='text-sitora-primary h-6 w-6' />
}

const TourPath = ({ tour }: TourPathProps) => {
  const t = useTranslations('pages.single_tour')
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null)

  if (!tour.locations || tour.locations.length === 0) {
    return null
  }

  return (
    <div className='mb-6'>
      <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('travel_path')}</h2>
      <div className='space-y-4'>
        {tour.locations.map((location, index) => {
          const fromCity = getCityName(location?.from as number | { id: number; name?: string })
          const toCity = getCityName(location?.to as number | { id: number; name?: string })
          const isExpanded = expandedLocation === location.id

          return (
            <div key={location.id || index} className='bg-card border-border rounded-[26px] border-2 p-6 shadow-none'>
              <div className='mb-4 flex items-start justify-between'>
                <div className='text-left'>
                  <h3 className='text-sitora-text-heading text-lg font-bold'>{fromCity}</h3>
                  {location.fromTime && <p className='text-sitora-body text-sm'>{location.fromTime}</p>}
                </div>
                <div className='text-right'>
                  <h3 className='text-sitora-text-heading text-lg font-bold'>{toCity}</h3>
                  {location.toTime && <p className='text-sitora-body text-sm'>{location.toTime}</p>}
                </div>
              </div>

              <div className='relative mb-4'>
                <div className='border-border relative border-t-2 border-dashed'>
                  <div className='bg-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform px-2'>{getTransportIcon(location.transport)}</div>
                </div>
              </div>

              {location.duration && (
                <div className='mb-4 text-center'>
                  <p className='text-sitora-text-body space-x-1 font-medium'>
                    {location.duration.includes(':') ? (
                      <>
                        <span>{location.duration.split(':')[0]}</span>
                        <span>{t('hours')}</span>
                        <span>{location.duration.split(':')[1]}</span>
                        <span>{t('minutes')}</span>
                      </>
                    ) : (
                      <>
                        <span>{location.duration}</span>
                        <span>{t('hours')}</span>
                      </>
                    )}
                  </p>
                </div>
              )}

              <div className='border-sitora-border border-t pt-4'>
                <button onClick={() => setExpandedLocation(isExpanded ? null : location.id || index.toString())} className='flex w-full items-center justify-between text-left'>
                  <span className='text-sitora-text-subtitle font-medium'>{t('more_details')}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className='bg-card mt-4 rounded-lg'>
                    <div className='space-y-2 text-sm'>
                      {location.transport && (
                        <p className='flex items-center justify-between gap-2'>
                          <span className='font-medium'>{t('transport')}:</span>
                          <span className='text-sitora-body'>{location.transport}</span>
                        </p>
                      )}
                      {location.fromTime && (
                        <p className='flex items-center justify-between gap-2'>
                          <span className='font-medium'>{t('departure_time')}:</span>
                          <span className='text-sitora-body'>{location.fromTime}</span>
                        </p>
                      )}
                      {location.toTime && (
                        <p className='flex items-center justify-between gap-2'>
                          <span className='font-medium'>{t('arrival_time')}:</span>
                          <span className='text-sitora-body'>{location.toTime}</span>
                        </p>
                      )}
                      {location.duration && (
                        <p className='flex items-center justify-between gap-2'>
                          <span className='font-medium'>{t('duration')}:</span>
                          <span className='text-sitora-body'>{location.duration}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TourPath
