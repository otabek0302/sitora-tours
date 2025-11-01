'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Star, MapPin, ArrowRight, Tag } from 'lucide-react'
import { Tour } from '@/lib/schemas'
import { Button } from '@/components/ui/button'

interface ToursCardProps {
  tour: Tour
}

const ToursCard = ({ tour }: ToursCardProps) => {
  const t = useTranslations('pages.tours')

  return (
    <Card className='bg-card border-border h-full overflow-hidden rounded-[26px] border shadow-none'>
      <div className='flex h-full flex-col lg:flex-row'>
        {/* Tour Image */}
        <div className='relative h-48 overflow-hidden rounded-[26px] md:rounded-none lg:h-auto lg:w-1/3'>
          {tour.images && tour.images.length > 0 && tour.images[0]?.image ? (
            <Image src={tour.images[0].image.url} alt={tour.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover' />
          ) : (
            <div className='bg-sitora-primary-light flex h-full w-full items-center justify-center'>
              <span className='text-sitora-primary text-sm font-medium'>No Image</span>
            </div>
          )}

          {/* Tour Type Badge */}
          {tour.category?.name && (
            <div className='absolute top-4 left-4'>
              <span className='bg-sitora-primary/90 text-sitora-white rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm'>{tour.category.name}</span>
            </div>
          )}

          {/* Rating Badge */}
          {tour.rating && tour.rating > 0 && (
            <div className='absolute top-4 right-4'>
              <div className='bg-background/90 flex items-center gap-1 rounded-full px-2 py-1 backdrop-blur-sm'>
                <Star className='text-sitora-gold-medium h-3 w-3 fill-current' />
                <span className='text-sitora-text-subtitle text-xs font-semibold'>{tour.rating.toFixed(1)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tour Content */}
        <div className='flex flex-1 flex-col p-6'>
          <CardHeader className='mb-4 p-0'>
            {/* Fixed height for title - allows 2 lines with line-clamp */}
            <CardTitle className='text-sitora-text-subtitle mb-2 line-clamp-2 text-xl leading-tight font-bold md:min-h-[3.5rem]'>{tour.name}</CardTitle>
            {/* Fixed height for description - always shows 3 lines or empty space */}
            <div className='md:min-h-[4.5rem]'>{tour.description ? <p className='text-sitora-body line-clamp-3 text-sm leading-relaxed'>{tour.description}</p> : <div className='h-full' />}</div>
          </CardHeader>

          <CardContent className='flex flex-1 flex-col gap-4 p-0'>
            {/* Tour Details */}
            <div className='mb-4 space-y-2'>
              <div className='flex items-center gap-2'>
                <Clock className='text-sitora-primary h-4 w-4' />
                <span className='text-sitora-body text-sm font-medium'>
                  {tour.duration_days} {tour.duration_days !== 1 ? t('days') : t('day')}
                  {tour.duration_nights != null && Number(tour.duration_nights) > 0 && (
                    <>
                      {' / '}
                      {tour.duration_nights} {tour.duration_nights !== 1 ? t('nights') : t('night')}
                    </>
                  )}
                </span>
              </div>
              {tour.category?.name && (
                <div className='flex items-center gap-2'>
                  <Tag className='text-sitora-primary h-4 w-4' />
                  <span className='text-sitora-body text-sm font-medium'>{tour.category.name}</span>
                </div>
              )}
              {tour.cities && tour.cities.length > 0 && (
                <div className='flex items-start gap-1'>
                  <MapPin className='text-sitora-primary mt-1 h-4 w-4 flex-shrink-0 md:mt-0' />
                  <div className='flex flex-wrap items-center gap-1'>
                    {tour.cities.map((city: { id: string | number; name?: string }, index: number) => (
                      <span key={city.id} className='flex items-center gap-1'>
                        {city.name || ''}
                        {index < (tour.cities?.length || 0) - 1 && <span className='mx-1'>→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rating - Only show if rating exists and is greater than 0 */}
            {tour.rating && tour.rating > 0 ? (
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(tour.rating || 0) ? 'text-sitora-gold-medium fill-current' : 'text-sitora-text-muted'}`} />
                  ))}
                </div>
                <span className='text-sitora-body text-sm'>
                  {tour.rating.toFixed(1)} {t('rating')}
                </span>
              </div>
            ) : (
              // Empty space to maintain consistent layout when no rating
              <div className='h-6' />
            )}

            {/* Price and Book Button */}
            <div className='border-border flex items-center justify-between border-t pt-4'>
              <div className='flex flex-col'>
                <span className='text-sitora-primary text-2xl font-bold'>${tour.price || 0}</span>
                <span className='text-sitora-body text-sm font-normal'>{t('per_person')}</span>
              </div>
              <Button variant='default' size='sm' className='group shadow-none'>
                <Link href={`/tours/${tour.slug}`} className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
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

export default ToursCard
