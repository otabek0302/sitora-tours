'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'

import { useTranslations, useLocale } from 'next-intl'
import { ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { Button } from '@/components/ui'
import { useCarsContext } from '@/lib/stores/cars'

const RecommendedCars = () => {
  const locale = useLocale()
  const t = useTranslations('pages.home.recommended_cars')
  const { recommendedCars, loading, error, fetchRecommendedCars, setLocale } = useCarsContext()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: 'keepSnaps',
  })

  useEffect(() => {
    setLocale(locale)
    fetchRecommendedCars(4)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (loading && recommendedCars.length === 0) {
    return (
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-8 text-center'>
            <div className='border-sitora-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
            <p className='text-sitora-body text-sm'>{t('loading')}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-8 text-center'>
            <h3 className='text-sitora-error mb-2 text-lg font-semibold'>{t('error')}</h3>
            <p className='text-sitora-body text-sm'>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (recommendedCars.length === 0) {
    return null
  }

  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header with Navigation */}
        <div className='mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <div className='text-center lg:text-left'>
            <h2 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>{t('heading')}</h2>
            <p className='text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0'>{t('subheading')}</p>
          </div>

          {/* Navigation Controls */}
          <div className='hidden lg:flex'>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='icon' onClick={scrollPrev} className='border-sitora-primary text-sitora-primary hover:bg-sitora-primary hover:text-sitora-white rounded-full'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button variant='default' size='icon' onClick={scrollNext} className='bg-sitora-primary text-sitora-white hover:bg-sitora-primary/90 rounded-full'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>

        {/* Cars Slider */}
        <div className='relative'>
          <div className='embla' ref={emblaRef}>
            <div className='embla__container flex gap-6 py-4 pl-1'>
              {recommendedCars.map(car => (
                <div key={car.id} className='embla__slide w-full flex-shrink-0 lg:w-[calc(33.333%-16px)]'>
                  <Link href={`/cars/${car.slug}`}>
                    <div className='bg-card border-border group overflow-hidden rounded-3xl border shadow-none transition-all duration-300 hover:shadow-sm'>
                      {/* Car Image */}
                      <div className='relative h-[250px] overflow-hidden'>
                        {car.image?.url ? (
                          <Image src={car.image.url} alt={car.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover transition-transform duration-500 group-hover:scale-110' />
                        ) : (
                          <div className='bg-sitora-primary-light flex h-full w-full items-center justify-center'>
                            <span className='text-sitora-primary text-sm font-medium'>No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Car Info */}
                      <div className='p-6'>
                        {/* Car Name */}
                        <div className='mb-3'>
                          <h3 className='text-sitora-text-subtitle mb-1 text-xl font-bold'>{car.name}</h3>
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
                          <Button variant='default' size='sm'>
                            {t('book_now')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className='mt-8 text-center'>
          <Button variant='default' size='lg' asChild>
            <Link href='/cars'>{t('view_all')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default RecommendedCars
