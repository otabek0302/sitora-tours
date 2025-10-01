'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePagesContext } from '@/lib/stores/pages'
import { PageLoading, PageError } from '@/components/ui'
import Hero from '@/components/pages/home/hero'
import Statistics from '@/components/pages/home/statistics'
import SpecialTour from '@/components/pages/home/special-tour'
import Services from '@/components/pages/home/services'
import RecommendedCars from '@/components/pages/home/recommended-cars'
import RecommendedCities from '@/components/pages/home/recommended-cities'
import RecommendedTours from '@/components/pages/home/recommended-tours'
import Testimonials from '@/components/pages/home/testimonials'
import Faq from '@/components/pages/home/faq'

const HomePage = () => {
  const locale = useLocale()
  const { fetchPages, setLocale, loading, error, pages } = usePagesContext()

  useEffect(() => {
    setLocale(locale)
    fetchPages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  // Show loading if data hasn't been fetched yet
  if (loading || !pages) return <PageLoading />
  if (error) return <PageError message={error} />

  return (
    <main>
      <Hero />
      <Statistics />
      <SpecialTour />
      <Services />
      <RecommendedCars />
      <RecommendedCities />
      <RecommendedTours />
      <Testimonials />
      <Faq />
    </main>
  )
}

export default HomePage
