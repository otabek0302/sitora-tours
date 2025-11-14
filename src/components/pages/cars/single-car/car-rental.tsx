'use client'

import Link from 'next/link'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ApplyCar } from '@/components/ui'
import { Car } from '@/lib/schemas'

interface CarRentalProps {
  car: Car
}

const CarRental = ({ car }: CarRentalProps) => {
  const t = useTranslations('pages.cars.single')
  const [applyOpen, setApplyOpen] = useState(false)

  const renderPrice = (amount?: number | null, label?: string | null) => {
    if (!amount) return null
    return (
      <div className='flex items-baseline gap-2'>
        <span className='text-sitora-primary text-3xl font-bold'>${amount}</span>
        {label && <span className='text-sitora-body text-sm font-medium'>+ {label}</span>}
      </div>
    )
  }

  return (
    <Card className='border-border bg-card rounded-[26px] shadow-none'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-sitora-text-heading text-xl font-bold'>{t('pricing_and_booking')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Pricing Options */}
        <div className='space-y-4'>
          {/* Price per day in the city */}
          <div className='flex items-center justify-between'>
            <div className='flex items-start gap-3'>
              <div className='flex-1'>
                <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{car.pricing?.pricePerDayInCityLabel || t('price_per_day')}</h3>
                {renderPrice(car.pricing?.pricePerDayInCity || 0, car.pricing?.pricePerDayInCityLabel || t('price_per_day'))}
              </div>
            </div>
          </div>

          {/* Transfer: airport - hotel - airport */}
          {car.pricing?.transferAirportHotelAirport && (
            <div className='border-border flex items-center justify-between border-t pt-4'>
              <div className='flex items-start gap-3'>
                <div className='flex-1'>
                  <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{car.pricing?.transferAirportHotelAirportLabel || t('transfer_airport_hotel')}</h3>
                  {renderPrice(car.pricing.transferAirportHotelAirport, car.pricing?.transferAirportHotelAirportLabel || t('transfer_airport_hotel'))}
                </div>
              </div>
            </div>
          )}

          {/* Transfer: hotel - dinner - hotel */}
          {car.pricing?.transferHotelDinnerHotel && (
            <div className='border-border flex items-center justify-between border-t pt-4'>
              <div className='flex items-start gap-3'>
                <div className='flex-1'>
                  <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{car.pricing?.transferHotelDinnerHotelLabel || t('transfer_hotel_dinner')}</h3>
                  {renderPrice(car.pricing.transferHotelDinnerHotel, car.pricing?.transferHotelDinnerHotelLabel || t('transfer_hotel_dinner'))}
                </div>
              </div>
            </div>
          )}

          {/* On a long route (from 7 days) */}
          {car.pricing?.longRouteFrom7Days && (
            <div className='border-border flex items-center justify-between border-t pt-4'>
              <div className='flex items-start gap-3'>
                <div className='flex-1'>
                  <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{car.pricing?.longRouteFrom7DaysLabel || t('long_route_7days')}</h3>
                  {renderPrice(car.pricing.longRouteFrom7Days, car.pricing?.longRouteFrom7DaysLabel || t('long_route_7days'))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Book Button */}
        <div className='border-border space-y-3 border-t pt-4'>
          <Button variant='default' size='lg' onClick={() => setApplyOpen(true)} className='w-full rounded-xl shadow-none'>
            {t('book_now')}
          </Button>
          <Button variant='outline' size='lg' className='border-sitora-primary text-sitora-primary hover:bg-sitora-primary hover:text-sitora-white w-full rounded-xl shadow-none' asChild>
            <Link href='/contact-us'>{t('contact_us')}</Link>
          </Button>
        </div>
      </CardContent>

      {/* Apply Car Modal */}
      <ApplyCar open={applyOpen} setOpen={setApplyOpen} car={{ id: car.id, name: car.name, brand: car.brand, pricing: car.pricing?.pricePerDayInCity ? { pricePerDayInCity: car.pricing.pricePerDayInCity } : undefined }} />
    </Card>
  )
}

export default CarRental
