'use client'

import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'

import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, RecommendedToursCard } from '@/components/ui'
import { usePagesContext } from '@/lib/stores/pages'

// Tour slider component
const TourSlider = ({ tours, heading, subheading, viewAllLink, viewAllText }: { tours: any[]; heading: string; subheading?: string; viewAllLink: string; viewAllText: string }) => {
  const t = useTranslations('pages.home.recommended_tours')
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

  if (!Array.isArray(tours) || tours.length === 0) {
    return null
  }

  const validTours = tours.filter(tour => typeof tour !== 'number' && tour !== null && tour !== undefined)

  if (validTours.length === 0) {
    return null
  }

  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mb-6 flex items-center justify-between'>
          <div className='text-center lg:text-left'>
            <h2 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>{heading}</h2>
            {subheading && <p className='text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0'>{subheading}</p>}
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
            <div className='embla__container flex gap-4 py-4'>
              {validTours.map(tour => (
                <RecommendedToursCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className='mt-6 text-center'>
          <Button variant='default' size='lg' asChild>
            <Link href={viewAllLink}>{viewAllText}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const RecommendedTours = () => {
  const t = useTranslations('pages.home.recommended_tours')
  const tNav = useTranslations('navigation')
  const { getRecommendedLocalToursSection, getRecommendedAbroadToursSection } = usePagesContext()

  // Get tours from separate sections
  const localSection = getRecommendedLocalToursSection()
  const abroadSection = getRecommendedAbroadToursSection()

  const localTours = localSection?.tours ? (Array.isArray(localSection.tours) ? localSection.tours : [localSection.tours]).filter((tour: any) => typeof tour !== 'number' && tour !== null && tour !== undefined) : []
  const abroadTours = abroadSection?.tours ? (Array.isArray(abroadSection.tours) ? abroadSection.tours : [abroadSection.tours]).filter((tour: any) => typeof tour !== 'number' && tour !== null && tour !== undefined) : []

  return (
    <>
      {/* Local Tours Section */}
      {localTours.length > 0 && <TourSlider tours={localTours} heading={tNav('local_tours')} subheading={t('subheading')} viewAllLink='/local-tours' viewAllText={t('view_all')} />}

      {/* Abroad Tours Section */}
      {abroadTours.length > 0 && <TourSlider tours={abroadTours} heading={tNav('abroad_tours')} subheading={t('subheading')} viewAllLink='/abroad-tours' viewAllText={t('view_all')} />}
    </>
  )
}

export default RecommendedTours
