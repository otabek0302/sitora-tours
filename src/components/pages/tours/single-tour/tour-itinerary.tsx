'use client'

import { useTranslations } from 'next-intl'
import { Tour } from '@/lib/schemas'

interface TourItineraryProps {
  tour: Tour
}

const TourItinerary = ({ tour }: TourItineraryProps) => {
  const t = useTranslations('pages.single_tour')

  if (!tour.itinerary || tour.itinerary.length === 0) {
    return null
  }

  return (
    <div className='mb-6'>
      <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('itinerary')}</h2>

      <div className='relative'>
        <div className='border-sitora-primary absolute top-6 bottom-6 left-6 w-px border-l-2 border-dotted'></div>

        <div className='space-y-8'>
          {tour.itinerary.map((item, index) => (
            <div key={item.id || index} className='relative flex items-start gap-6'>
              <div className='relative z-10 flex-shrink-0'>
                <div className='bg-sitora-primary flex h-12 w-12 items-center justify-center rounded-full'>
                  <span className='text-sitora-white text-sm font-bold'>{index + 1}</span>
                </div>
              </div>

              <div className='flex-1 pt-1'>
                <h3 className='text-sitora-text-subtitle mb-3 text-lg font-bold'>{item.day}</h3>

                {item.activities && item.activities.length > 0 && (
                  <ul className='space-y-2'>
                    {item.activities.map((activity, activityIndex) => (
                      <li key={activity.id || activityIndex} className='flex items-start gap-3'>
                        <div className='bg-sitora-text-subtitle mt-2 h-2 w-2 flex-shrink-0 rounded-full'></div>
                        <span className='text-sitora-text-subtitle text-sm leading-relaxed'>{activity.activity}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TourItinerary
