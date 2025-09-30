'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'

import { useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { ChevronLeft, ChevronRight, Clock, MapPin, Star, Tag } from 'lucide-react'
import { Button } from '@/components/ui'
import { useToursContext } from '@/lib/stores/tours'

const RecommendedTours = () => {
  const t = useTranslations('pages.home.recommended_tours')
  const locale = useLocale()
  const { recommendedTours, loading, error, fetchRecommendedTours, setLocale } = useToursContext()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    containScroll: 'keepSnaps',
  })

  useEffect(() => {
    setLocale(locale)
    fetchRecommendedTours(6)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext()
  }

  if (loading && recommendedTours.length === 0) {
    return (
      <section className='py-12 lg:py-16'>
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
      <section className='py-12 lg:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-8 text-center'>
            <h3 className='text-sitora-error mb-2 text-lg font-semibold'>{t('error')}</h3>
            <p className='text-sitora-body text-sm'>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (recommendedTours.length === 0) {
    return null
  }

  return (
    <section className='py-12 lg:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mb-8 flex items-center justify-between'>
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
            <div className='embla__container flex gap-6 py-4'>
              {recommendedTours.map(tour => (
                <div key={tour.id} className='embla__slide w-full flex-shrink-0 lg:w-[calc(33.333%-16px)]'>
                  <Link href={`/tours/${tour.slug}`}>
                    <div className='bg-card border-border group overflow-hidden rounded-3xl border shadow-none transition-all duration-300 hover:shadow-sm'>
                      {/* Tour Image */}
                      <div className='relative h-48 w-full overflow-hidden'>
                        <Image src={tour.images?.[0]?.image?.url || ''} alt={tour.name} fill className='object-cover transition-transform duration-500 group-hover:scale-105' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
                      </div>

                      {/* Tour Details */}
                      <div className='p-6'>
                        <h3 className='text-sitora-text-subtitle mb-4 line-clamp-2 text-lg font-semibold'>{tour.name}</h3>

                        {/* Tour Info */}
                        <div className='mb-4 space-y-2'>
                          <div className='flex items-center gap-2'>
                            <Clock className='text-sitora-primary h-4 w-4' />
                            <span className='text-sitora-body text-sm font-medium'>
                              {tour.duration_days}
                              {tour.duration_days > 1 ? t('days') : t('day')}
                            </span>
                            <span className='text-sitora-body text-sm font-medium'>/</span>
                            <span className='text-sitora-body text-sm font-medium'>
                              {tour.duration_nights}
                              {tour.duration_nights > 1 ? t('nights') : t('night')}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Tag className='text-sitora-primary h-4 w-4' />
                            <span className='text-sitora-body text-sm font-medium'>{tour.category?.name}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <MapPin className='text-sitora-primary h-4 w-4' />
                            {tour.cities &&
                              tour.cities.map((city: any, index: number) => (
                                <span key={city.id} className='text-sitora-body text-sm font-medium'>
                                  {city.name} {tour.cities && tour.cities.length > 1 && index < tour.cities.length - 1 ? '→' : ''}
                                </span>
                              ))}
                          </div>
                        </div>
                        {/* Rating */}
                        {tour.rating && tour.rating > 0 && (
                          <div className='mb-4 flex items-center gap-2'>
                            <div className='flex items-center gap-1'>
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < Math.floor(tour.rating || 0) ? 'text-sitora-gold-medium fill-current' : 'text-sitora-text-muted'}`} />
                              ))}
                            </div>
                            <span className='text-sitora-body text-sm font-medium'>{tour.rating.toFixed(1)}</span>
                          </div>
                        )}

                        {/* Price */}
                        <div className='flex items-center justify-between'>
                          <p className='flex items-center gap-2'>
                            <span className='text-sitora-primary text-lg font-semibold'>${tour.price.toLocaleString()}</span>
                            <span className='text-sitora-body text-xs font-normal'>{t('per_person')}</span>
                          </p>
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
      </div>
    </section>
  )
}

export default RecommendedTours
