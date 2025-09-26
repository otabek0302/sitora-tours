import useEmblaCarousel from 'embla-carousel-react'

import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'

const SpecialTour = () => {
    const t = useTranslations('pages.home.special-tour')
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
            title: t('tours.astana.title'),
            description: t('tours.astana.description'),
            image: '/images/astana-city.jpg',
            price: '$299',
        },
        {
            id: 2,
            title: t('tours.samarkand.title'),
            description: t('tours.samarkand.description'),
            image: '/images/samarkand-city.jpg',
            price: '$199',
        },
        {
            id: 3,
            title: t('tours.bukhara.title'),
            description: t('tours.bukhara.description'),
            image: '/images/bukhara-city.jpg',
            price: '$249',
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

                {/* Special Tour Slider */}
                <div className="relative">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container flex py-2">
                            {tours.map((tour) => (
                                <div key={tour.id} className="embla__slide w-full flex-shrink-0">
                                    <div className="bg-card border-border relative h-[420px] overflow-hidden rounded-[32px] border lg:h-[540px]">
                                        {/* Background Image */}
                                        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${tour.image})` }} />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Content Overlay */}
                                        <div className="absolute right-0 bottom-0 left-0 p-6 lg:p-8">
                                            <div className="">
                                                <h3 className="text-sitora-white mb-3 text-xl font-bold lg:text-2xl">{tour.title}</h3>
                                                <p className="text-sitora-white/90 mb-6 text-sm leading-relaxed lg:text-base">{tour.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sitora-white text-lg font-semibold lg:text-xl">{tour.price}</span>
                                                    <Button variant="default" size="default">
                                                        {t('bookNow')}
                                                    </Button>
                                                </div>
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

export default SpecialTour
