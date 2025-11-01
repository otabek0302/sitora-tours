'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Car } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { ApplyCar } from '@/components/ui'

interface CarRentalProps {
  car: Car
}

const CarRental = ({ car }: CarRentalProps) => {
  const t = useTranslations('pages.cars.single')
  const [applyOpen, setApplyOpen] = useState(false)

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
                <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('price_per_day')}</h3>
                <p className='text-sitora-primary text-3xl font-bold'>${car.pricing?.pricePerDayInCity || 0}</p>
              </div>
            </div>
          </div>

          {/* Transfer: airport - hotel - airport */}
          {car.pricing?.transferAirportHotelAirport && (
            <div className='border-border flex items-center justify-between border-t pt-4'>
              <div className='flex items-start gap-3'>
                <div className='flex-1'>
                  <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('transfer_airport_hotel')}</h3>
                  <p className='text-sitora-primary text-2xl font-bold'>${car.pricing.transferAirportHotelAirport}</p>
                </div>
              </div>
            </div>
          )}

          {/* Transfer: hotel - dinner - hotel */}
          {car.pricing?.transferHotelDinnerHotel && (
            <div className='border-border flex items-center justify-between border-t pt-4'>
              <div className='flex items-start gap-3'>
                <div className='flex-1'>
                  <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('transfer_hotel_dinner')}</h3>
                  <p className='text-sitora-primary text-2xl font-bold'>${car.pricing.transferHotelDinnerHotel}</p>
                </div>
              </div>
            </div>
          )}

          {/* On a long route (from 7 days) */}
          {car.pricing?.longRouteFrom7Days && (
            <div className='border-border flex items-center justify-between border-t pt-4'>
              <div className='flex items-start gap-3'>
                <div className='flex-1'>
                  <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('long_route_7days')}</h3>
                  <p className='text-sitora-primary text-2xl font-bold'>${car.pricing.longRouteFrom7Days}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Book Button */}
        <div className='border-border border-t pt-4'>
          <Button size='lg' onClick={() => setApplyOpen(true)} className='bg-sitora-primary hover:bg-sitora-primary/90 hover:text-sitora-white text-sitora-white w-full text-base'>
            {t('book_button')}
          </Button>
        </div>
      </CardContent>

      {/* Apply Car Modal */}
      <ApplyCar
        open={applyOpen}
        setOpen={setApplyOpen}
        car={{
          id: car.id,
          name: car.name,
          brand: car.brand,
          pricing: car.pricing?.pricePerDayInCity ? { pricePerDayInCity: car.pricing.pricePerDayInCity } : undefined,
        }}
      />
    </Card>
  )
}

export default CarRental
