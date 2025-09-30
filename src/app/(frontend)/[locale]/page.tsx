'use client'

import Faq from '@/components/pages/home/faq'
import Hero from '@/components/pages/home/hero'
import RecommendedCities from '@/components/pages/home/recommended-cities'
import RecommendedCars from '@/components/pages/home/recommended-cars'
import RecommendedTours from '@/components/pages/home/recommended-tours'
import Services from '@/components/pages/home/services'
import SpecialTour from '@/components/pages/home/special-tour'
import Statistics from '@/components/pages/home/statistics'
import Testimonials from '@/components/pages/home/testimonials'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <RecommendedCars />
      <RecommendedCities />
      <RecommendedTours />
      <Services />
      <SpecialTour />
      <Statistics />
      <Testimonials />
      <Faq />
    </main>
  )
}

export default HomePage
