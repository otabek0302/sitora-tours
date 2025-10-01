'use client'

import { Check, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Tour } from '@/lib/schemas'

interface TourServicesProps {
  tour: Tour
}

const TourServices = ({ tour }: TourServicesProps) => {
  const t = useTranslations('pages.single_tour')

  if (!tour.services) {
    return null
  }

  const { included, notIncluded } = tour.services

  return (
    <div className='mb-6'>
      <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('services')}</h2>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <div className='bg-card border-sitora-primary rounded-[26px] border p-6 shadow-none'>
          <h3 className='mb-4 flex items-center gap-2 text-lg font-bold text-green-600'>
            <Check className='h-5 w-5' />
            {t('price_includes')}:
          </h3>

          {included && included.length > 0 ? (
            <ul className='space-y-3'>
              {included.map((item, index) => (
                <li key={item.id || index} className='flex items-start gap-3'>
                  <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600'></div>
                  <span className='text-sitora-text-subtitle text-sm leading-relaxed'>{item.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-sitora-body text-sm'>{t('no_included_services')}</p>
          )}
        </div>

        <div className='bg-card border-sitora-primary rounded-[26px] border p-6 shadow-none'>
          <h3 className='mb-4 flex items-center gap-2 text-lg font-bold text-red-600'>
            <X className='h-5 w-5' />
            {t('price_not_includes')}:
          </h3>

          {notIncluded && notIncluded.length > 0 ? (
            <ul className='space-y-3'>
              {notIncluded.map((item, index) => (
                <li key={item.id || index} className='flex items-start gap-3'>
                  <div className='mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600'></div>
                  <span className='text-sitora-text-subtitle text-sm leading-relaxed'>{item.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-sitora-body text-sm'>{t('no_excluded_services')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TourServices
