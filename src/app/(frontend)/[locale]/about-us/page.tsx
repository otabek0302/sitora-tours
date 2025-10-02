'use client'

import AboutHero from '@/components/pages/about-us/about-hero'
import AboutCta from '@/components/pages/about-us/about-cta'
import RecommendedCities from '@/components/pages/home/recommended-cities'
import RecommendedCars from '@/components/pages/home/recommended-cars'
import RecommendedTours from '@/components/pages/home/recommended-tours'

const AboutUsPage = () => {
  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='space-y-6'>
          {/* Hero Section */}
          <AboutHero />

          {/* Recommended Cities Section */}
          <RecommendedCities />

          {/* Recommended Cars Section */}
          <RecommendedCars />

          {/* Recommended Tours Section */}
          <RecommendedTours />

          {/* CTA Section */}
          <AboutCta />
        </div>
      </div>
    </section>
  )
}

export default AboutUsPage
