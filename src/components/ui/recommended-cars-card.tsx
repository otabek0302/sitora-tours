'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Car } from '@/lib/schemas'
import { Button, ApplyCar } from '@/components/ui'
import { Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const RecommendedCarsCard = ({ car }: { car: Car }) => {
  const t = useTranslations('pages.home.recommended_cars')
  const [applyOpen, setApplyOpen] = useState(false)

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setApplyOpen(true)
  }

  return (
    <div key={car.id} className='embla__slide w-full flex-shrink-0 lg:w-[calc(33.333%-16px)]'>
      <div className='bg-card border-border group overflow-hidden rounded-[26px] border shadow-none transition-all duration-300 hover:shadow-sm'>
        {/* Car Image */}
        <Link href={`/cars/${car.slug}`}>
          <div className='relative h-[250px] overflow-hidden'>
            {car.image?.url ? (
              <Image src={car.image.url} alt={car.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover transition-transform duration-500 group-hover:scale-110' />
            ) : (
              <div className='bg-sitora-primary-light flex h-full w-full items-center justify-center'>
                <span className='text-sitora-primary text-sm font-medium'>{t('no_image')}</span>
              </div>
            )}
          </div>
        </Link>

        {/* Car Info */}
        <div className='p-6'>
          {/* Car Name */}
          <div className='mb-3'>
            <Link href={`/cars/${car.slug}`}>
              <h3 className='text-sitora-text-subtitle hover:text-sitora-primary mb-1 text-xl font-bold transition-colors'>{car.name}</h3>
            </Link>
            <div className='text-sitora-body flex items-center gap-4 text-sm'>
              <span className='text-sitora-primary font-medium'>{car.type}</span>
              <span>•</span>
              <div className='flex items-center gap-1'>
                <Users className='text-sitora-primary h-4 w-4' />
                <span>
                  {car.capacity} {t('seats')}
                </span>
              </div>
            </div>
          </div>

          {/* Price and Book Button */}
          <div className='border-sitora-border flex items-center justify-between border-t pt-4'>
            <div className='flex flex-col'>
              <span className='text-sitora-primary text-2xl font-bold'>${car.price}</span>
              <span className='text-sitora-body text-sm font-normal'>{t('per_day')}</span>
            </div>
            <Button variant='default' size='sm' onClick={handleBookNow}>
              {t('book_now')}
            </Button>
          </div>
        </div>
      </div>

      {/* Apply Car Modal */}
      <ApplyCar open={applyOpen} setOpen={setApplyOpen} car={car} />
    </div>
  )
}
