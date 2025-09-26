import ToursCard from './tours-card'

import { useTranslations } from 'next-intl'

const ToursContent = ({ tours }: { tours: any[] }) => {
    const t = useTranslations('pages.tours')
    return (
        <div>
            {tours.length > 0 ? (
                <div className="grid gap-4 sm:gap-6">
                    {tours.map((tour: any) => (
                        <ToursCard key={tour.id} tour={tour} />
                    ))}
                </div>
            ) : (
                <div className="py-8 text-center sm:py-12">
                    <h3 className="text-copy mb-2 text-lg font-semibold sm:mb-3 sm:text-xl">{t('no_tours')}</h3>
                    <p className="text-copy-light text-sm sm:text-base">{t('try_adjusting_filters')}</p>
                </div>
            )}
        </div>
    )
}

export default ToursContent
