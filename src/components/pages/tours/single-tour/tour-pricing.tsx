'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, DollarSign, Users, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ApplyTour } from '@/components/ui'
import { Tour } from '@/lib/schemas'

interface TourPricingProps {
  tour: Tour
}

const TourPricing = ({ tour }: TourPricingProps) => {
  const t = useTranslations('pages.single_tour')
  const [applyOpen, setApplyOpen] = useState(false)

  if (!tour.booking_pricing || tour.booking_pricing.length === 0) {
    return (
      <div className='mb-6'>
        <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('prices')}</h2>
        <div className='bg-card border-sitora-border rounded-[26px] border p-6 text-center shadow-none'>
          <DollarSign className='text-sitora-body mx-auto mb-4 h-12 w-12' />
          <p className='text-sitora-body text-sm font-normal'>{t('no_pricing_available')}</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return '0'
    return price.toLocaleString()
  }

  return (
    <div className='mb-6'>
      <h2 className='text-sitora-text-subtitle mb-6 text-lg leading-normal font-bold md:text-2xl'>{t('prices')}</h2>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {/* Pricing Information */}
        <div className='bg-card border-sitora-primary rounded-[26px] border p-6 shadow-none'>
          <h3 className='text-sitora-primary mb-4 flex items-center gap-2 text-lg font-bold'>
            <DollarSign className='h-5 w-5' />
            {t('departure_dates')}
          </h3>

          <div className='space-y-4'>
            {tour.booking_pricing.map((pricing, index) => (
              <div key={pricing.id || index} className='border-sitora-border rounded-2xl border p-4'>
                <div className='mb-3 flex items-center gap-2'>
                  <Calendar className='text-sitora-gold-medium h-4 w-4' />
                  <span className='text-sitora-text-subtitle text-sm font-semibold'>
                    {formatDate(pricing.dateStart)} - {formatDate(pricing.dateEnd)}
                  </span>
                </div>

                <div className='space-y-2'>
                  {pricing.pricePerPerson && (
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <Users className='text-sitora-gold-medium h-4 w-4' />
                        <span className='text-sitora-body text-sm'>{t('per_person')}</span>
                      </div>
                      <span className='text-sitora-primary text-xl font-bold'>${formatPrice(pricing.pricePerPerson)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Actions */}
        <div className='bg-card border-sitora-primary rounded-[26px] border p-6 shadow-none'>
          <h3 className='text-sitora-primary mb-4 flex items-center gap-2 text-lg font-bold'>
            <Clock className='h-5 w-5' />
            {t('book_now')}
          </h3>

          <div className='space-y-4'>
            <div className='bg-sitora-primary-light rounded-2xl p-4'>
              <h4 className='text-sitora-primary mb-2 font-semibold'>{t('starting_price')}</h4>
              <div className='flex items-center justify-between'>
                <span className='text-sitora-primary text-sm'>
                  {tour.duration_days} {t('days')} / {tour.duration_nights} {t('nights')}
                </span>
                <span className='text-sitora-primary text-2xl font-bold'>${tour.price?.toLocaleString() || '0'}</span>
              </div>
              <p className='text-sitora-primary mt-2 text-xs'>{t('per_person')}</p>
            </div>

            <div className='space-y-3'>
              <Button variant='default' size='lg' onClick={() => setApplyOpen(true)} className='w-full rounded-2xl shadow-none'>
                {t('book_now')}
              </Button>

              <Button variant='outline' size='lg' className='border-sitora-primary text-sitora-primary hover:bg-sitora-primary hover:text-sitora-white w-full rounded-2xl shadow-none' asChild>
                <Link href='/contact-us'>{t('contact_us')}</Link>
              </Button>
            </div>

            <div className='bg-card border-sitora-border rounded-2xl border p-4'>
              <h4 className='text-sitora-text-subtitle mb-2 font-semibold'>{t('important_notes')}:</h4>
              <ul className='text-sitora-body space-y-1 text-sm'>
                <li>• {t('prices_per_person')}</li>
                <li>• {t('prices_may_vary')}</li>
                <li>• {t('group_discounts_available')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Tour Modal */}
      <ApplyTour open={applyOpen} setOpen={setApplyOpen} tour={tour} />
    </div>
  )
}

export default TourPricing
