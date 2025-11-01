'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Car } from '@/lib/schemas'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Users, Fuel, Settings, ArrowRight } from 'lucide-react'

interface CarsCardProps {
  car: Car
}

const CarsCard = ({ car }: CarsCardProps) => {
  const t = useTranslations('pages.cars')
  const tSingle = useTranslations('pages.cars.single')
  return (
    <Card className='bg-card border-border overflow-hidden rounded-[26px] border shadow-none'>
      <div className='flex flex-col lg:flex-row'>
        {/* Car Image */}
        <div className='border-border relative h-72 w-full overflow-hidden rounded-[26px] border sm:h-80 lg:w-1/3'>
          {car.image ? (
            <Image src={car.image.url} alt={car.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover' />
          ) : (
            <div className='bg-sitora-primary-light flex h-full w-full items-center justify-center'>
              <span className='text-sitora-primary text-sm font-medium'>No Image</span>
            </div>
          )}

          {/* Car Type Badge */}
          <div className='absolute top-4 left-4'>
            <span className='bg-sitora-primary/90 text-sitora-white rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm'>{car.type}</span>
          </div>

          {/* Rating Badge */}
          <div className='absolute top-4 right-4'>
            <div className='bg-background/90 flex items-center gap-1 rounded-full px-2 py-1 backdrop-blur-sm'>
              <Star className='text-sitora-gold-medium h-3 w-3 fill-current' />
              <span className='text-sitora-text-subtitle text-xs font-semibold'>4.5</span>
            </div>
          </div>
        </div>

        {/* Car Content */}
        <div className='flex-1 p-6'>
          <CardHeader className='mb-4 p-0'>
            <CardTitle className='text-sitora-text-subtitle mb-2 text-xl font-bold'>{car.name}</CardTitle>
            {car.brand && <p className='text-sitora-body text-sm leading-relaxed'>{car.brand}</p>}
          </CardHeader>

          <CardContent className='space-y-4 p-0'>
            {/* Car Details */}
            <div className='text-sitora-body flex flex-wrap gap-4 text-sm'>
              <div className='flex items-center gap-1'>
                <Users className='h-4 w-4' />
                <span>{car.capacity || '5'} passengers</span>
              </div>
              <div className='flex items-center gap-1'>
                <Fuel className='h-4 w-4' />
                <span>{car.type || 'Petrol'}</span>
              </div>
            </div>

            {/* Rating and Reviews */}
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-sitora-gold-medium fill-current' : 'text-sitora-muted dark:text-muted-foreground'}`} />
                ))}
              </div>
              <span className='text-sitora-body text-sm'>4.5 {t('rating')}</span>
            </div>

            {/* Price and Book Button */}
            <div className='border-border border-t pt-4'>
              {/* Mobile/Tablet: Show only per day price */}
              <div className='flex items-center justify-between lg:hidden'>
                <div className='flex flex-col'>
                  <span className='text-sitora-primary text-2xl font-bold'>${car.pricing?.pricePerDayInCity || 0}</span>
                  <span className='text-sitora-body text-sm font-normal'>{t('per_day')}</span>
                </div>
                <div className='flex items-center justify-end'>
                  <Button variant='default' size='sm' className='group shadow-none'>
                    <Link href={`/cars/${car.slug}`} className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
                      <span className='text-sitora-white group-hover:text-sitora-primary block'>{t('see_details')}</span>
                      <ArrowRight className='text-sitora-white group-hover:text-sitora-primary h-4 w-4' />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Desktop: Show all pricing options */}
              <div className='hidden lg:block'>
                <div className='mb-4 space-y-3'>
                  {/* Price per day */}
                  <div className='flex items-center justify-between'>
                    <span className='text-sitora-body text-xs font-medium'>{t('per_day')}</span>
                    <span className='text-sitora-primary text-2xl font-bold'>${car.pricing?.pricePerDayInCity || 0}</span>
                  </div>

                  {/* Transfer: airport - hotel - airport */}
                  {car.pricing?.transferAirportHotelAirport && (
                    <div className='border-border flex items-center justify-between border-t pt-3'>
                      <span className='text-sitora-body text-xs font-medium'>{tSingle('transfer_airport_hotel')}</span>
                      <span className='text-sitora-primary text-xl font-bold'>${car.pricing.transferAirportHotelAirport}</span>
                    </div>
                  )}

                  {/* Transfer: hotel - dinner - hotel */}
                  {car.pricing?.transferHotelDinnerHotel && (
                    <div className='border-border flex items-center justify-between border-t pt-3'>
                      <span className='text-sitora-body text-xs font-medium'>{tSingle('transfer_hotel_dinner')}</span>
                      <span className='text-sitora-primary text-xl font-bold'>${car.pricing.transferHotelDinnerHotel}</span>
                    </div>
                  )}

                  {/* On a long route (from 7 days) */}
                  {car.pricing?.longRouteFrom7Days && (
                    <div className='border-border flex items-center justify-between border-t pt-3'>
                      <span className='text-sitora-body text-xs font-medium'>{tSingle('long_route_7days')}</span>
                      <span className='text-sitora-primary text-xl font-bold'>${car.pricing.longRouteFrom7Days}</span>
                    </div>
                  )}
                </div>

                <Button variant='default' size='sm' className='group w-full shadow-none'>
                  <Link href={`/cars/${car.slug}`} className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
                    <span className='text-sitora-white group-hover:text-sitora-primary block'>{t('see_details')}</span>
                    <ArrowRight className='text-sitora-white group-hover:text-sitora-primary h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}

export default CarsCard
