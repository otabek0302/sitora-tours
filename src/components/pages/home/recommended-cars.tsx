import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, Users, Car, Star } from 'lucide-react'
import { Button } from '@/components/ui'

const RecommendedCars = () => {
    const t = useTranslations('pages.home.recommended_cars')

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

    const cars = [
        {
            id: 1,
            name: 'BMW X5',
            type: 'Luxury SUV',
            capacity: 5,
            rating: 4.8,
            reviews: 124,
            price: 120,
            image: '/images/bmw-x5.jpg',
            features: ['GPS', 'Bluetooth', 'Air Conditioning'],
        },
        {
            id: 2,
            name: 'Mercedes E-Class',
            type: 'Sedan',
            capacity: 4,
            rating: 4.9,
            reviews: 98,
            price: 150,
            image: '/images/mercedes-e-class.jpg',
            features: ['Leather Seats', 'Sunroof', 'Premium Sound'],
        },
        {
            id: 3,
            name: 'Audi Q7',
            type: 'Premium SUV',
            capacity: 7,
            rating: 4.7,
            reviews: 156,
            price: 180,
            image: '/images/audi-q7.jpg',
            features: ['4WD', 'Third Row', 'Premium Package'],
        },
        {
            id: 4,
            name: 'Toyota Camry',
            type: 'Economy Sedan',
            capacity: 5,
            rating: 4.6,
            reviews: 203,
            price: 80,
            image: '/images/toyota-camry.jpg',
            features: ['Fuel Efficient', 'Reliable', 'Comfortable'],
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

                {/* Cars Slider */}
                <div className="relative">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container flex gap-6 py-4 pl-1">
                            {cars.map((car) => (
                                <div key={car.id} className="embla__slide w-full flex-shrink-0 lg:w-[calc(33.333%-16px)]">
                                    <div className="bg-card border-border group overflow-hidden rounded-xl border shadow-none transition-all duration-300 hover:shadow-sm">
                                        {/* Car Image with Overlay */}
                                        <div className="relative h-[250px] overflow-hidden">
                                            <Image src={car.image} alt={car.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {/* Car Type Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-sitora-primary/90 text-sitora-white rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm">{car.type}</span>
                                            </div>

                                            {/* Rating Badge */}
                                            <div className="absolute top-4 right-4">
                                                <div className="bg-sitora-white/90 flex items-center gap-1 rounded-full px-2 py-1 backdrop-blur-sm">
                                                    <Star className="text-sitora-gold-medium h-3 w-3 fill-current" />
                                                    <span className="text-sitora-text-subtitle text-xs font-semibold">{car.rating}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Car Info */}
                                        <div className="p-6">
                                            {/* Car Name */}
                                            <div className="mb-3">
                                                <h3 className="text-sitora-text-subtitle mb-1 text-xl font-bold">{car.name}</h3>
                                                <div className="text-sitora-body flex items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        <span>{car.capacity} seats</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Car className="h-4 w-4" />
                                                        <span>Auto</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Features List */}
                                            <div className="mb-6">
                                                <div className="flex flex-wrap gap-2">
                                                    {car.features.map((feature, index) => (
                                                        <span key={index} className="bg-sitora-primary-light text-sitora-primary rounded-md px-2 py-1 text-xs font-medium">
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Price and Book Button */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-sitora-primary text-2xl font-bold">${car.price}</span>
                                                    <span className="text-sitora-body text-sm font-normal">{t('per_day')}</span>
                                                </div>
                                                <Button variant="default" size="sm" className="bg-sitora-primary hover:bg-sitora-primary/90">
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

export default RecommendedCars
