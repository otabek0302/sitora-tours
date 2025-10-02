'use client'

import { useTranslations } from 'next-intl'
import { FileText, CheckCircle, XCircle, CreditCard, Users, AlertTriangle } from 'lucide-react'

const TermsPage = () => {
  const t = useTranslations('pages.terms-conditions')

  const sections = [
    { key: 'section1', icon: FileText, hasContent: true },
    { key: 'section2', icon: CheckCircle, hasItems: true },
    { key: 'section3', icon: XCircle, hasItems: true, hasSubtitle: true },
    { key: 'section4', icon: CreditCard, hasItems: true },
    { key: 'section5', icon: Users, hasItems: true, hasIntro: true },
    { key: 'section6', icon: AlertTriangle, hasItems: true, hasIntro: true },
  ] as const

  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-4 sm:mb-6'>
          <h1 className='text-sitora-text-subtitle mb-2 text-xl leading-tight font-bold sm:mb-4 sm:text-2xl lg:text-3xl xl:text-4xl'>{t('heading')}</h1>
          <p className='text-sitora-body text-xs font-normal sm:text-sm lg:text-base'>{t('last_updated')}</p>
        </div>

        {/* Main Content Card */}
        <div className='bg-card border-border rounded-[20px] border p-4 shadow-none sm:rounded-[26px] sm:p-6 lg:rounded-[32px] lg:p-8 xl:p-10'>
          {/* Introduction */}
          <div className='mb-4 sm:mb-6'>
            <p className='text-sitora-body text-sm leading-relaxed sm:text-base'>{t('intro')}</p>
          </div>

          {/* Sections */}
          <div className='space-y-4 sm:space-y-6'>
            {sections.map(({ key, icon: Icon, hasContent, hasItems, hasSubtitle, hasIntro }) => (
              <div key={key} className='bg-card border-border rounded-[20px] border p-4 shadow-none sm:rounded-[26px] sm:p-6'>
                <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                  <div className='bg-sitora-primary-light flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl'>
                    <Icon className='text-sitora-primary h-4 w-4 sm:h-5 sm:w-5' />
                  </div>
                  <h2 className='text-sitora-text-subtitle text-base font-bold sm:text-lg lg:text-xl'>{t(`${key}.title`)}</h2>
                </div>
                <div className='text-sitora-body space-y-2 text-xs leading-relaxed sm:space-y-3 sm:text-sm'>
                  {/* Intro paragraph */}
                  {hasIntro && <p>{t(`${key}.intro`)}</p>}

                  {/* Content paragraphs */}
                  {hasContent && t.raw(`${key}.content`).map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}

                  {/* Subtitle */}
                  {hasSubtitle && (
                    <p>
                      <strong>{t(`${key}.subtitle`)}</strong>
                    </p>
                  )}

                  {/* Items list */}
                  {hasItems && (
                    <ul className='ml-4 list-disc space-y-1.5 sm:ml-6 sm:space-y-2'>
                      {t.raw(`${key}.items`).map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {/* Disclaimer */}
                  {t.has(`${key}.disclaimer`) && <p className='mt-2 sm:mt-3'>{t(`${key}.disclaimer`)}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className='bg-sitora-primary-light mt-4 rounded-[20px] p-4 shadow-none sm:mt-6 sm:rounded-[26px] sm:p-6'>
            <h3 className='text-sitora-text-subtitle mb-2 text-base font-bold sm:mb-3 sm:text-lg'>{t('contact.title')}</h3>
            <p className='text-sitora-body mb-3 text-xs leading-relaxed sm:mb-4 sm:text-sm'>{t('contact.intro')}</p>
            <div className='text-sitora-body space-y-1.5 text-xs sm:space-y-2 sm:text-sm'>
              <p>
                <span className='font-semibold'>{t('contact.email')}:</span>{' '}
                <a href='mailto:info@sitoratours.com' className='text-sitora-primary hover:underline'>
                  info@sitoratours.com
                </a>
              </p>
              <p>
                <span className='font-semibold'>{t('contact.phone')}:</span>{' '}
                <a href='tel:+998915589901' className='text-sitora-primary hover:underline'>
                  +998 91 558 99 01
                </a>
              </p>
              <p>
                <span className='font-semibold'>{t('contact.address')}:</span> Mir Said Baraka Street, 1, Tashkent, Uzbekistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermsPage
