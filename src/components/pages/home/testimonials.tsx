import useEmblaCarousel from 'embla-carousel-react'
import TestimonialCard from '@/components/ui/testimonial-card'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui'
import { AddTestimonial } from '@/components/ui/add-testimonial'

const Testimonials = () => {
    const t = useTranslations('pages.home.testimonials')
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

    const testimonials = [
        {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            comment: 'Amazing tour experience! The guide was knowledgeable and the itinerary was perfectly planned. Highly recommend Sitora Tours for anyone visiting Uzbekistan.',
            rating: 5,
            createdAt: '2024-01-15',
            updatedAt: '2024-01-15',
        },
        {
            id: 2,
            first_name: 'Sarah',
            last_name: 'Johnson',
            comment: 'The cultural tour was incredible. We learned so much about Uzbek history and traditions. The local food was delicious and the accommodations were excellent.',
            rating: 5,
            createdAt: '2024-01-10',
            updatedAt: '2024-01-10',
        },
        {
            id: 3,
            first_name: 'Ahmed',
            last_name: 'Hassan',
            comment: 'Professional service from start to finish. The team made sure every detail was perfect. Will definitely book again for my next visit to Uzbekistan.',
            rating: 4,
            createdAt: '2024-01-05',
            updatedAt: '2024-01-05',
        },
        {
            id: 4,
            first_name: 'Maria',
            last_name: 'Garcia',
            comment: 'Outstanding customer service and beautiful destinations. The tour exceeded our expectations. Thank you for making our trip memorable!',
            rating: 5,
            createdAt: '2023-12-28',
            updatedAt: '2023-12-28',
        },
        {
            id: 5,
            first_name: 'David',
            last_name: 'Wilson',
            comment: 'Great value for money. The tour included everything we needed and more. The guide spoke excellent English and was very helpful throughout the journey.',
            rating: 5,
            createdAt: '2023-12-20',
            updatedAt: '2023-12-20',
        },
    ]

    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-8 text-center lg:text-left">
                    <h2 className="text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">{t('heading')}</h2>
                    <p className="text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0">{t('subheading')}</p>
                </div>

                {/* Testimonials Carousel */}
                {testimonials?.length > 0 && (
                    <div className="relative overflow-hidden">
                        <div className="embla" ref={emblaRef}>
                            <div className="embla__container flex py-4">
                                {testimonials?.map((review) => (
                                    <TestimonialCard key={review?.id} review={review} />
                                ))}
                            </div>
                        </div>
                        {/* Gradient overlays */}
                        <div className="from-sitora-white absolute top-0 left-0 h-full w-10 bg-gradient-to-r to-transparent md:w-20"></div>
                        <div className="from-sitora-white absolute top-0 right-0 h-full w-10 bg-gradient-to-l to-transparent md:w-20"></div>
                    </div>
                )}

                {/* Section Footer */}
                <div className="flex justify-center">
                    <div className="mt-8 text-center lg:text-left">
                        <p className="text-sitora-body sm:text-md mb-4 text-sm font-normal">{t('add_testimonial_text')}</p>
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button variant="default" size="default" onClick={() => setOpen(true)}>
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
