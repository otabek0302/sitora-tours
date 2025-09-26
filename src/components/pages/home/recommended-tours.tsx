import useEmblaCarousel from 'embla-carousel-react'

import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, Clock, Car, User, Star } from 'lucide-react'
import { Button } from '@/components/ui'

const RecommendedTours = () => {
    const t = useTranslations('pages.home.recommended_tours')

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false,
        dragFree: true,
        containScroll: 'keepSnaps',
    })

    const tours = [
        {
            id: 1,
            title: t('tours.bukhara.title'),
            duration: t('tours.bukhara.duration'),
            transport: t('tours.bukhara.transport'),
            type: t('tours.bukhara.type'),
            rating: 4,
            reviews: 584,
            price: '$235.00',
            image: '/images/bukhara-tour.jpg',
        },
        {
            id: 2,
            title: t('tours.khiva.title'),
            duration: t('tours.khiva.duration'),
            transport: t('tours.khiva.transport'),
            type: t('tours.khiva.type'),
            rating: 4,
            reviews: 584,
            price: '$305.00',
            image: '/images/khiva-tour.jpg',
        },
        {
            id: 3,
            title: t('tours.samarkand.title'),
            duration: t('tours.samarkand.duration'),
            transport: t('tours.samarkand.transport'),
            type: t('tours.samarkand.type'),
            rating: 4,
            reviews: 584,
            price: '$535.00',
            image: '/images/samarkand-tour.jpg',
        },
        {
            id: 4,
            title: t('tours.tajikistan.title'),
            duration: t('tours.tajikistan.duration'),
            transport: t('tours.tajikistan.transport'),
            type: t('tours.tajikistan.type'),
            rating: 4,
            reviews: 584,
            price: '$35.00',
            image: '/images/tajikistan-tour.jpg',
        },
    ]

    const scrollPrev = () => {
        if (emblaApi) emblaApi.scrollPrev()
    }

    const scrollNext = () => {
        if (emblaApi) emblaApi.scrollNext()
    }

    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="text-center lg:text-left">
                        <h2 className="text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">{t('heading')}</h2>
                        <p className="text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0">{t('subheading')}</p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <Button variant="outline" size="icon" rounded={true} onClick={scrollPrev}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="default" size="icon" rounded={true} onClick={scrollNext}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Tours Slider */}
                <div className="relative">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container flex gap-6 py-4">
                            {tours.map((tour) => (
                                <div key={tour.id} className="embla__slide w-full flex-shrink-0 lg:w-[calc(33.333%-16px)]">
                                    <div className="bg-card border-border group overflow-hidden rounded-xl border shadow-none transition-all duration-300 hover:shadow-sm">
                                        {/* Tour Image */}
                                        <div className="relative h-48 w-full">
                                            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${tour.image})` }} />
                                        </div>

                                        {/* Tour Details */}
                                        <div className="p-6">
                                            <h3 className="text-sitora-text-subtitle mb-4 text-lg font-semibold">{tour.title}</h3>

                                            {/* Tour Info */}
                                            <div className="mb-4 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="text-sitora-body h-4 w-4" />
                                                    <span className="text-sitora-body text-sm font-medium">{tour.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Car className="text-sitora-body h-4 w-4" />
                                                    <span className="text-sitora-body text-sm font-medium">{tour.transport}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="text-sitora-body h-4 w-4" />
                                                    <span className="text-sitora-body text-sm font-medium">{tour.type}</span>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="mb-4 flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-4 w-4 ${i < tour.rating ? 'text-sitora-gold-medium fill-current' : 'text-gray-300'}`} />
                                                    ))}
                                                </div>
                                                <span className="text-sitora-body text-sm font-medium">
                                                    {tour.reviews} {t('reviews')}
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between">
                                                <p className="flex items-center gap-2">
                                                    <span className="text-sitora-primary text-lg font-semibold">{tour.price}</span>
                                                    <span className="text-sitora-body text-xs font-normal">{t('per_person')}</span>
                                                </p>
                                                <Button variant="default" size="sm">
                                                    {t('book_now')}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
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
