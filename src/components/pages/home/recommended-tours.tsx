'use client'

import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'

import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, RecommendedToursCard } from '@/components/ui'
import { usePagesContext } from '@/lib/stores/pages'

const RecommendedTours = () => {
  const t = useTranslations('pages.home.recommended_tours')
  const { getRecommendedToursSection } = usePagesContext()
  const { tours = [] } = getRecommendedToursSection() || {}

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: 'keepSnaps',
  })

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext()
  }

  if (Array.isArray(tours) && tours.length === 0) {
    return null
  }

  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mb-6 flex items-center justify-between'>
          <div className='text-center lg:text-left'>
            <h2 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>{t('heading')}</h2>
            <p className='text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0'>{t('subheading')}</p>
          </div>

          {/* Navigation Controls */}
          <div className='hidden items-center gap-2 lg:flex'>
            <Button variant='outline' size='icon' rounded={true} onClick={scrollPrev}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button variant='default' size='icon' rounded={true} onClick={scrollNext}>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Tours Slider */}
        <div className='relative'>
          <div className='embla' ref={emblaRef}>
            <div className='embla__container flex gap-4 py-4'>{Array.isArray(tours) && tours.filter(tour => typeof tour !== 'number' && tour !== null).map(tour => <RecommendedToursCard key={tour.id} tour={tour} />)}</div>
          </div>
        </div>

        {/* Section Footer */}
        <div className='mt-6 text-center'>
          <Button variant='default' size='lg' asChild>
            <Link href='/tours'>{t('view_all')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default RecommendedTours
