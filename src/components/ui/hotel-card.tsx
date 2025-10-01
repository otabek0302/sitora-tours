'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Star, Phone, ArrowRight, MapPinCheck } from 'lucide-react'
import { Hotel } from '@/lib/schemas'
import { Button } from '@/components/ui/button'

interface HotelCardProps {
  hotel: Hotel
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const t = useTranslations('pages.hotels')
  return (
    <Card className='bg-card border-border overflow-hidden rounded-[26px] border shadow-none'>
      <div className='flex flex-col lg:flex-row'>
        {/* Hotel Image */}
        <div className='border-border relative overflow-hidden border-l lg:w-1/3'>
          {hotel.image?.url ? (
            <Image src={hotel.image.url as string} alt={hotel.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover' />
          ) : (
            <div className='bg-sitora-primary-light flex h-full w-full items-center justify-center'>
              <span className='text-sitora-primary text-sm font-medium'>No Image</span>
            </div>
          )}
        </div>

        {/* Hotel Content */}
        <div className='flex-1 p-6'>
          <CardHeader className='mb-4 p-0'>
            {hotel.name && <CardTitle className='text-sitora-text-subtitle mb-2 text-xl font-bold'>{hotel.name || 'Unknown Hotel'}</CardTitle>}
            {hotel.description && <p className='text-sitora-body line-clamp-3 text-sm leading-relaxed'>{hotel.description || 'Unknown Description'}</p>}
          </CardHeader>

          <CardContent className='flex flex-col gap-4 p-0'>
            {/* Hotel Details */}
            <div className='text-sitora-body space-y-2 text-sm'>
              {/* City */}
              {hotel.city && (
                <div className='flex items-center gap-2'>
                  <MapPinCheck className='text-sitora-primary h-4 w-4 flex-shrink-0' />
                  <span className='font-medium'>{hotel.city?.name || 'Unknown City'}</span>
                </div>
              )}
              {hotel.address && (
                <div className='flex items-start gap-2'>
                  <MapPin className='text-sitora-primary h-4 w-4 flex-shrink-0' />
                  <span className='leading-relaxed'>{hotel.address || 'Unknown Address'}</span>
                </div>
              )}
              {hotel.phone && (
                <div className='flex items-center gap-2'>
                  <Phone className='text-sitora-primary h-4 w-4' />
                  <span>{hotel.phone || 'Unknown Phone'}</span>
                </div>
              )}
            </div>

            {/* Star Rating */}
            {hotel.rating && (
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < parseInt(hotel.rating || '0') ? 'text-sitora-gold-medium fill-current' : 'text-sitora-text-muted'}`} />
                  ))}
                </div>
                <span className='text-sitora-body text-sm'>
                  {hotel.rating}.0 {t('rating_suffix')}
                </span>
              </div>
            )}

            {/* Book Button */}
            <div className='border-border flex items-center justify-end border-t pt-4'>
              <Button variant='default' size='sm' className='group shadow-none'>
                <Link href={`/hotels/${hotel.slug}`} className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
                  <span className='text-sitora-white group-hover:text-sitora-primary block'>{t('see_details')}</span>
                  <ArrowRight className='text-sitora-white group-hover:text-sitora-primary h-4 w-4' />
                </Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}

export default HotelCard
