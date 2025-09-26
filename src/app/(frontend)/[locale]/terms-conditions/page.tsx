'use client'
import { useTranslations } from 'next-intl'

const TermsPage = () => {
    const t = useTranslations('pages.terms-conditions')

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">{t('heading')}</h1>
                <p className="text-sitora-body sm:text-md text-sm font-normal">{t('subheading')}</p>
            </div>
        </section>
    )
}

export default TermsPage
