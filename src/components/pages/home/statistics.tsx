import { useTranslations } from 'next-intl'
import React from 'react'

const Statistics = () => {
  const t = useTranslations('pages.home.statistics')

  const stats = [
    {
      number: '5,368+',
      description: t('travelers'),
    },
    {
      number: '74+',
      description: t('destinations'),
    },
    {
      number: '12',
      suffix: t('years'),
      description: t('experience'),
    },
    {
      number: '100',
      suffix: t('countries'),
      description: t('countries_description'),
    },
  ]

  return (
    <section className='py-12 lg:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Statistics Content */}
        <div className='grid grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <div key={index} className='border-border border-r pr-4 text-left last:border-r-0'>
              <div className='mb-4'>
                <span className='text-sitora-text-subtitle text-4xl font-bold lg:text-6xl'>{stat.number}</span>
                {stat.suffix && <span className='text-sitora-text-subtitle ml-2 text-2xl font-bold lg:text-3xl'>{stat.suffix}</span>}
              </div>
              <p className='text-sitora-body text-sm leading-relaxed font-normal lg:text-base'>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics
