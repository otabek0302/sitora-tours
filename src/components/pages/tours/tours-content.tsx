import ToursCard from './tours-card'

import { useTranslations } from 'next-intl'
import { Tour } from '@/lib/schemas'

interface ToursContentProps {
    tours: Tour[]
    loading: boolean
    error: string | null
    hasResults: boolean
}

const ToursContent = ({ tours, loading, error, hasResults }: ToursContentProps) => {
    const t = useTranslations('pages.tours')

    if (loading) {
        return (
            <div className="py-8 text-center sm:py-12">
                <div className="border-sitora-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                <p className="text-sitora-body text-sm sm:text-base">Loading tours...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-8 text-center sm:py-12">
                <h3 className="mb-2 text-lg font-semibold text-red-500 sm:mb-3 sm:text-xl">Error loading tours</h3>
                <p className="text-sitora-body text-sm sm:text-base">{error}</p>
            </div>
        )
    }

    if (!hasResults) {
        return (
            <div className="py-8 text-center sm:py-12">
                <h3 className="text-sitora-text-subtitle mb-2 text-lg font-semibold sm:mb-3 sm:text-xl">{t('no_tours')}</h3>
                <p className="text-sitora-body text-sm sm:text-base">{t('try_adjusting_filters')}</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 sm:gap-6">
            {tours.map((tour) => (
                <ToursCard key={tour.id} tour={tour} />
            ))}
        </div>
    )
}

export default ToursContent
