'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'
import Image from 'next/image'
import { useCitiesContext } from '@/lib/stores/cities'

const RecommendedCities = () => {
  const locale = useLocale()
  const t = useTranslations('pages.home.recommended_cities')
  const { recommendedCities, loading, error, fetchRecommendedCities, setLocale } = useCitiesContext()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: 'keepSnaps',
  })

  useEffect(() => {
    setLocale(locale)
    fetchRecommendedCities(4)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (loading && recommendedCities.length === 0) {
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

  if (recommendedCities.length === 0) {
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

        {/* Cities Slider */}
        <div className='relative'>
          <div className='embla' ref={emblaRef}>
            <div className='embla__container flex gap-6 py-4 pl-1'>
              {recommendedCities.map(city => (
                <div key={city.id} className='embla__slide w-full flex-shrink-0 lg:w-[calc(25%-18px)]'>
                  <Link href={`/cities/${city.slug}`}>
                    <div className='bg-card border-border group relative h-[300px] cursor-pointer overflow-hidden rounded-3xl border shadow-none transition-all duration-300 hover:shadow-sm lg:h-[480px]'>
                      {/* City Image */}
                      {city.image?.url ? (
                        <Image src={city.image.url} alt={city.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw' className='object-cover transition-transform duration-300 group-hover:scale-105' />
                      ) : (
                        <div className='bg-sitora-primary-light flex h-full w-full items-center justify-center'>
                          <span className='text-sitora-primary text-sm font-medium'>No Image</span>
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

                      {/* Content */}
                      <div className='text-sitora-white absolute right-0 bottom-0 left-0 p-6'>
                        <h3 className='mb-2 text-xl font-bold'>{city.name}</h3>
                        {city.description && <p className='text-sm font-normal opacity-90'>{city.description}</p>}
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
            <Link href='/cities'>{t('view_all')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default RecommendedCities
