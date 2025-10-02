'use client'

import useEmblaCarousel from 'embla-carousel-react'
import TestimonialCard from '@/components/ui/testimonial-card'

import { useTranslations, useLocale } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui'
import { AddTestimonial } from '@/components/ui/add-testimonial'
import { useReviewsContext } from '@/lib/stores/reviews'
import { Review } from '@/payload-types'

const Testimonials = () => {
  const t = useTranslations('pages.home.testimonials')
  const locale = useLocale()
  const { reviews, fetchReviews, setLocale } = useReviewsContext()
  const [open, setOpen] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps',
  })

  const autoplay = useCallback(() => {
    if (!emblaApi) return

    const autoplayInterval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3000)

    return () => clearInterval(autoplayInterval)
  }, [emblaApi])

  useEffect(() => {
    const cleanup = autoplay()
    return cleanup
  }, [autoplay])

  // Fetch reviews on component mount
  useEffect(() => {
    setLocale(locale)
    fetchReviews()
  }, [locale, fetchReviews, setLocale])

  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mb-6 text-center lg:text-left'>
          <h2 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>{t('heading')}</h2>
          <p className='text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0'>{t('subheading')}</p>
        </div>

        {/* Testimonials Carousel */}
        {reviews?.length > 0 && (
          <div className='relative overflow-hidden'>
            <div className='embla' ref={emblaRef}>
              <div className='embla__container flex py-4'>
                {reviews?.slice(0, 10).map((review, index) => {
                  const uniqueKey = review?.id ? `review-${review.id}` : `review-index-${index}`
                  return <TestimonialCard key={uniqueKey} review={review as Review} />
                })}
              </div>
            </div>
            {/* Gradient overlays */}
            <div className='from-sitora-white absolute top-0 left-0 h-full w-10 bg-gradient-to-r to-transparent md:w-20'></div>
            <div className='from-sitora-white absolute top-0 right-0 h-full w-10 bg-gradient-to-l to-transparent md:w-20'></div>
          </div>
        )}

        {/* Section Footer */}
        <div className='flex justify-center'>
          <div className='mt-6 text-center lg:text-left'>
            <p className='text-sitora-body sm:text-md mb-4 text-sm font-normal'>{t('add_testimonial_text')}</p>
            <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <Button variant='default' size='lg' onClick={() => setOpen(true)}>
                {t('add_testimonial')}
              </Button>
            </div>
          </div>
          {/* Add Testimonial Modal */}
          <AddTestimonial open={open} setOpen={setOpen} />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
