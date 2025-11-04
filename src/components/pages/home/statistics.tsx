'use client'

import { usePagesContext } from '@/lib/stores/pages'

const Statistics = () => {
  const { getStatsSection } = usePagesContext()
  const statsSection = getStatsSection()
  const statistics = statsSection?.statistics || []

  // Don't render if no statistics
  if (!statistics || statistics.length === 0) {
    return null
  }

  return (
    <section className='py-6 lg:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Statistics Content */}
        <div className={`grid gap-4 md:gap-6 ${statistics.length === 1 ? 'grid-cols-1' : statistics.length === 2 ? 'grid-cols-2' : statistics.length === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
          {statistics.map((stat, index) => (
            <div key={stat.id || index} className={`border-border text-center md:border-r md:pr-4 md:text-left ${index === statistics.length - 1 ? 'md:border-r-0' : ''}`}>
              <div className='mb-2 md:mb-4'>
                <span className='text-sitora-text-subtitle text-3xl font-bold sm:text-4xl lg:text-6xl'>{stat.number?.toLocaleString() || '0'}</span>
              </div>
              <p className='text-sitora-body text-xs leading-relaxed font-normal sm:text-sm lg:text-base'>{stat.text || ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics
