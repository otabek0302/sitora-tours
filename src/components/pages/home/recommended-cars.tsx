'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, RecommendedCarsCard } from '@/components/ui'
import { usePagesContext } from '@/lib/stores/pages'

const RecommendedCars = () => {
  const t = useTranslations('pages.home.recommended_cars')
  const { getRecommendedCarsSection } = usePagesContext()
  const { cars = [] } = getRecommendedCarsSection() || {}

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: 'keepSnaps',
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (Array.isArray(cars) && cars.length === 0) {
    return null
  }

  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header with Navigation */}
        <div className='mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
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
            <div className='embla__container flex gap-4 py-4 pl-1'>{Array.isArray(cars) && cars.map((car: any) => <RecommendedCarsCard key={car.id} car={car} />)}</div>
          </div>
        </div>

        {/* Section Footer */}
        <div className='mt-6 text-center'>
          <Button variant='default' size='lg' asChild>
            <Link href='/cars'>{t('view_all')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default RecommendedCars
