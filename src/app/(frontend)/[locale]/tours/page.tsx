'use client'

import ToursSidebar from '@/components/pages/tours/tours-sidebar'
import ToursContent from '@/components/pages/tours/tours-content'
import ToursPagination from '@/components/ui/tours-pagination'
import { useTranslations } from 'next-intl'
import { useFilteredTours } from '@/hooks/use-filtered-tours'
import { useEffect, useState } from 'react'
import { getTourCategories } from '@/lib/api/tours'

const ToursPage = () => {
    const t = useTranslations('pages.tours')
    const { tours, loading, error, totalPages, currentPage, setCurrentPage, hasResults } = useFilteredTours()
    const [categories, setCategories] = useState<string[]>([])

    // Load tour categories on component mount
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesData = await getTourCategories()
                setCategories(categoriesData)
            } catch (err) {
                console.error('Failed to load tour categories:', err)
            }
        }

        loadCategories()
    }, [])

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col-reverse gap-6 sm:gap-8 lg:flex-row">
                    <div className="order-2 lg:order-1 lg:w-1/4">
                        <ToursSidebar categories={categories} />
                    </div>

                    <div className="order-1 lg:order-2 lg:w-3/4">
                        <ToursContent tours={tours} loading={loading} error={error} hasResults={hasResults} />
                        {totalPages > 1 && (
                            <div className="mt-8">
                                <ToursPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ToursPage
