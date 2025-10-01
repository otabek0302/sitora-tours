'use client'

import { useTranslations } from 'next-intl'

const Statistics = () => {
  const t = useTranslations('pages.home.statistics')

  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Statistics Content */}
        <div className='grid grid-cols-4 gap-4'>
          <div className='border-border border-r pr-4 text-left last:border-r-0'>
            <div className='mb-4'>
              <span className='text-sitora-text-subtitle text-4xl font-bold lg:text-6xl'>5,368+</span>
            </div>
            <p className='text-sitora-body text-sm leading-relaxed font-normal lg:text-base'>{t('travelers')}</p>
          </div>
          <div className='border-border border-r pr-4 text-left last:border-r-0'>
            <div className='mb-4'>
              <span className='text-sitora-text-subtitle text-4xl font-bold lg:text-6xl'>+74</span>
            </div>
            <p className='text-sitora-body text-sm leading-relaxed font-normal lg:text-base'>{t('destinations')}</p>
          </div>
          <div className='border-border border-r pr-4 text-left last:border-r-0'>
            <div className='mb-4'>
              <span className='text-sitora-text-subtitle text-4xl font-bold lg:text-6xl'>12</span>
              <span className='text-sitora-text-subtitle ml-2 text-2xl font-bold lg:text-3xl'>{t('years')}</span>
            </div>
            <p className='text-sitora-body text-sm leading-relaxed font-normal lg:text-base'>{t('experience')}</p>
          </div>
          <div className='border-border border-r pr-4 text-left last:border-r-0'>
            <div className='mb-4'>
              <span className='text-sitora-text-subtitle text-4xl font-bold lg:text-6xl'>+100</span>
              <span className='text-sitora-text-subtitle ml-2 text-2xl font-bold lg:text-3xl'>{t('countries')}</span>
            </div>
            <p className='text-sitora-body text-sm leading-relaxed font-normal lg:text-base'>{t('countries_description')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics
