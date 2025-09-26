import Link from 'next/link'

import { useTranslations } from 'next-intl'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui'

const Faq = () => {
    const t = useTranslations('pages.home.faq')

    const faq_items = [
        {
            id: 'booking',
            question: t('questions.booking.question'),
            answer: t('questions.booking.answer'),
        },
        {
            id: 'cancellation',
            question: t('questions.cancellation.question'),
            answer: t('questions.cancellation.answer'),
        },
        {
            id: 'payment',
            question: t('questions.payment.question'),
            answer: t('questions.payment.answer'),
        },
        {
            id: 'group-size',
            question: t('questions.groupSize.question'),
            answer: t('questions.groupSize.answer'),
        },
        {
            id: 'what-to-bring',
            question: t('questions.whatToBring.question'),
            answer: t('questions.whatToBring.answer'),
        },
        {
            id: 'weather',
            question: t('questions.weather.question'),
            answer: t('questions.weather.answer'),
        },
        {
            id: 'safety',
            question: t('questions.safety.question'),
            answer: t('questions.safety.answer'),
        },
        {
            id: 'customization',
            question: t('questions.customization.question'),
            answer: t('questions.customization.answer'),
        },
    ]

    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-card border-border rounded-xl border p-6 shadow-none transition-all duration-300 hover:shadow-sm sm:p-8 lg:p-10">
                    {/* Section Header */}
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">{t('heading')}</h2>
                        <p className="text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0">{t('subheading')}</p>
                    </div>

                    {/* FAQ Accordion */}
                    <Accordion type="single" collapsible className="space-y-2">
                        {faq_items.map((item, index) => (
                            <AccordionItem key={item.id} value={item.id} className="bg-card border-border cursor-pointer rounded-lg border shadow-none transition-all duration-300 hover:shadow-sm">
                                <AccordionTrigger className="text-sitora-text-subtitle sm:text-md hover:text-sitora-primary px-4 py-4 text-sm font-semibold hover:no-underline sm:px-6">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-sitora-body sm:text-md px-4 pb-4 text-sm leading-relaxed font-normal sm:px-6">{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* Section Footer */}
                    <div className="flex justify-center">
                        <div className="mt-8 text-center lg:text-left">
                            <p className="text-sitora-body sm:text-md mb-4 space-y-2 text-sm font-normal">
                                <span>{t('contact_text_1')}</span>
                                <span>{t('contact_text_2')}</span>
                            </p>
                            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link href="mailto:info@sitoratours.com" className="bg-sitora-primary text-sitora-white hover:text-sitora-primary sm:text-md border-sitora-primary inline-flex h-9 items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-transparent">
                                    {t('contact_button')}
                                </Link>
                                <Link href="tel:+998901234567" className="border-sitora-primary-light text-sitora-primary sm:text-md hover:bg-sitora-primary hover:text-sitora-white inline-flex h-9 items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200">
                                    {t('call_button')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faq
