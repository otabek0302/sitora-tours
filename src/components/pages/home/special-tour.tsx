'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { Clock, Star } from 'lucide-react'
import { Button, ApplyTour } from '@/components/ui'
import { usePagesContext } from '@/lib/stores/pages'

const SpecialTour = () => {
  const t = useTranslations('pages.home.special-tour')
  const { getSpecialOffersSection } = usePagesContext()
  const section = getSpecialOffersSection()
  const tour = section && typeof section.tours === 'object' && section.tours && 'slug' in section.tours ? section.tours : null
  const [applyOpen, setApplyOpen] = useState(false)

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setApplyOpen(true)
  }

  if (!tour) {
    return null
  }

  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mb-6'>
          <div className='text-center lg:text-left'>
            <h2 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>{t('heading')}</h2>
            <p className='text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0'>{t('subheading')}</p>
          </div>
        </div>

        {/* Special Tour Display */}
        <div className='bg-card border-border group relative h-[420px] overflow-hidden rounded-[32px] border shadow-none transition-all duration-300 hover:shadow-sm lg:h-[540px]'>
          <Link href={`/tours/${tour?.slug}`}>
            {/* Background Image */}
            {tour?.images?.[0]?.image?.url ? (
              <Image src={tour.images[0].image.url} alt={tour?.name || ''} fill className='object-cover transition-transform duration-700 group-hover:scale-105' sizes='100vw' priority />
            ) : (
              <div className='bg-sitora-primary-light flex h-full w-full items-center justify-center'>
                <span className='text-sitora-primary text-sm font-medium'>{t('no_image')}</span>
              </div>
            )}
          </Link>

          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

          {/* Content Overlay */}
          <div className='absolute right-0 bottom-0 left-0 p-6 lg:p-8'>
            <div className=''>
              <Link href={`/tours/${tour?.slug}`}>
                <h3 className='text-sitora-white hover:text-sitora-primary mb-3 text-xl font-bold transition-colors lg:text-2xl'>{tour?.name || ''}</h3>
              </Link>
              <p className='text-sitora-white/90 mb-4 line-clamp-2 text-sm leading-relaxed lg:text-base'>{tour?.description || ''}</p>

              {/* Tour Info */}
              <div className='mb-6 flex flex-wrap items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <Clock className='text-sitora-white h-4 w-4' />
                  <span className='text-sitora-white text-sm'>
                    {tour.duration_days} {tour.duration_days !== 1 ? t('days') : t('day')}
                    {tour.duration_nights != null && Number(tour.duration_nights) > 0 && (
                      <>
                        {' / '}
                        {tour.duration_nights} {tour.duration_nights !== 1 ? t('nights') : t('night')}
                      </>
                    )}
                  </span>
                </div>

                <div className='flex items-center gap-1'>
                  <Star className='text-sitora-gold-medium h-4 w-4 fill-current' />
                  <span className='text-sitora-white text-sm font-medium'>{tour.rating?.toFixed(1)}</span>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <span className='text-sitora-white text-lg font-semibold lg:text-xl'>${tour.price?.toLocaleString()}</span>
                  <span className='text-sitora-white/70 ml-2 text-sm'>{t('per_person')}</span>
                </div>
                <Button variant='default' size='sm' onClick={handleBookNow}>
                  {t('bookNow')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Tour Modal */}
        <ApplyTour open={applyOpen} setOpen={setApplyOpen} tour={tour} />
      </div>
    </section>
  )
}

export default SpecialTour
