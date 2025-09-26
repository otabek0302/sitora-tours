import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'
import Image from 'next/image'

const RecommendedCities = () => {
    const t = useTranslations('pages.home.recommended_cities')

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        containScroll: 'keepSnaps',
    })

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const cities = [
        {
            id: 1,
            title: 'Melbourne',
            description: 'An amazing journey',
            image: '/images/melbourne.jpg',
        },
        {
            id: 2,
            title: 'Paris',
            description: 'A Paris Adventure',
            image: '/images/paris.jpg',
        },
        {
            id: 3,
            title: 'London',
            description: 'London eye adventure',
            image: '/images/london.jpg',
        },
        {
            id: 4,
            title: 'Columbia',
            description: 'Amazing streets',
            image: '/images/columbia.jpg',
        },
    ]

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header with Navigation */}
                <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="text-center lg:text-left">
                        <h2 className="text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">{t('heading')}</h2>
                        <p className="text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0">{t('subheading')}</p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="hidden lg:flex">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={scrollPrev} className="border-sitora-primary text-sitora-primary hover:bg-sitora-primary hover:text-sitora-white rounded-full">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="default" size="icon" onClick={scrollNext} className="bg-sitora-primary text-sitora-white hover:bg-sitora-primary/90 rounded-full">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Cities Slider */}
                <div className="relative">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container flex gap-6 py-4 pl-1">
                            {cities.map((city) => (
                                <div key={city.id} className="embla__slide w-full flex-shrink-0 lg:w-[calc(25%-18px)]">
                                    <div className="bg-card border-border group relative h-[300px] cursor-pointer overflow-hidden rounded-xl border shadow-none transition-all duration-300 hover:shadow-sm lg:h-[480px]">
                                        {/* City Image */}
                                        <Image src={city.image} alt={city.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Content */}
                                        <div className="text-sitora-white absolute right-0 bottom-0 left-0 p-6">
                                            <h3 className="mb-2 text-xl font-bold">{city.title}</h3>
                                            <p className="text-sm font-normal opacity-90">{city.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section Footer */}
                <div className="mt-8 text-center">
                    <Button variant="default" size="lg">
                        {t('view_all')}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default RecommendedCities
