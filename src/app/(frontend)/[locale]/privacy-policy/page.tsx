'use client'

import { useTranslations } from 'next-intl'
import { Shield, Lock, Eye, UserCheck, Bell, Trash2 } from 'lucide-react'

const PrivacyPolicyPage = () => {
  const t = useTranslations('pages.privacy_policy')

  const sections = [
    { key: 'section1', icon: Shield },
    { key: 'section2', icon: Eye },
    { key: 'section3', icon: UserCheck },
    { key: 'section4', icon: Lock },
    { key: 'section5', icon: Bell },
    { key: 'section6', icon: Trash2 },
  ] as const

  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>{t('heading')}</h1>
          <p className='text-sitora-body sm:text-md text-sm font-normal'>{t('last_updated')}</p>
        </div>

        {/* Main Content Card */}
        <div className='bg-card border-border rounded-[32px] border p-6 shadow-none sm:p-8 lg:p-10'>
          {/* Introduction */}
          <div className='mb-6'>
            <p className='text-sitora-body text-base leading-relaxed'>{t('intro')}</p>
          </div>

          {/* Sections */}
          <div className='space-y-6'>
            {sections.map(({ key, icon: Icon }) => (
              <div key={key} className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
                <div className='mb-4 flex items-center gap-3'>
                  <div className='bg-sitora-primary-light flex h-10 w-10 items-center justify-center rounded-2xl'>
                    <Icon className='text-sitora-primary h-5 w-5' />
                  </div>
                  <h2 className='text-sitora-text-subtitle text-xl font-bold'>{t(`${key}.title`)}</h2>
                </div>
                <div className='text-sitora-body space-y-3 text-sm leading-relaxed'>
                  <p>{t(`${key}.intro`)}</p>
                  <ul className='ml-6 list-disc space-y-2'>
                    {t.raw(`${key}.items`).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  {t.has(`${key}.disclaimer`) && <p className='mt-3'>{t(`${key}.disclaimer`)}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className='bg-sitora-primary-light mt-6 rounded-[26px] p-6 shadow-none'>
            <h3 className='text-sitora-text-subtitle mb-3 text-lg font-bold'>{t('contact.title')}</h3>
            <p className='text-sitora-body mb-4 text-sm leading-relaxed'>{t('contact.intro')}</p>
            <div className='text-sitora-body space-y-2 text-sm'>
              <p>
                <span className='font-semibold'>{t('contact.email')}:</span>{' '}
                <a href='mailto:privacy@sitoratours.com' className='text-sitora-primary hover:underline'>
                  privacy@sitoratours.com
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

export default PrivacyPolicyPage
