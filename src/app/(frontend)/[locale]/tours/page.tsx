'use client'

import ToursSidebar from '@/components/pages/tours/tours-sidebar'
import ToursContent from '@/components/pages/tours/tours-content'

import { Pagination } from '@/components/ui'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'

const ToursPage = () => {
    const t = useTranslations('pages.tours')
    const [tours, setTours] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
    const [durationRange, setDurationRange] = useState<[number, number]>([0, 100])

    const filteredTours = useMemo(() => {
        return tours.filter((tour: any) => {
            return selectedCategories.includes(tour.category.toString())
        })
    }, [tours, selectedCategories])

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col-reverse gap-6 sm:gap-8 lg:flex-row">
                    <div className="order-2 lg:order-1 lg:w-1/4">
                        <ToursSidebar categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} priceRange={priceRange} setPriceRange={setPriceRange} durationRange={durationRange} setDurationRange={setDurationRange} />
                    </div>

                    <div className="order-1 lg:order-2 lg:w-3/4">
                        <ToursContent tours={filteredTours} />
                        <Pagination />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ToursPage
