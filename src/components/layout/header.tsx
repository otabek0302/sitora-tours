'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useTranslations } from 'next-intl'
import { logo } from '@/assets'
import { LanguageSwitcher, MenuSwitcher, ThemeSwitcher } from '../ui'

const Header = () => {
  const t = useTranslations('navigation')

  return (
    <header className='bg-card border-border sticky top-0 z-50 border-b'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between py-3 sm:py-4'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <div className='xs:h-8 xs:w-24 relative h-7 w-20 sm:h-9 sm:w-28 md:h-10 md:w-32'>
              <Image src={logo} fill alt='Sitora Tours' className='object-contain' sizes='(max-width: 475px) 80px, (max-width: 640px) 96px, (max-width: 768px) 112px, 128px' />
            </div>
          </div>

          {/* Navigation - Hidden on mobile/tablet, shown on desktop */}
          <nav className='hidden flex-1 items-center justify-center space-x-4 lg:flex xl:space-x-6'>
            <Link href='/' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md px-2 py-2 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium xl:px-3'>
              <span className='block'>{t('home')}</span>
            </Link>
            <Link href='/about-us' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md px-2 py-2 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium xl:px-3'>
              <span className='block'>{t('about')}</span>
            </Link>
            <Link href='/tours' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md px-2 py-2 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium xl:px-3'>
              <span className='block'>{t('tours')}</span>
            </Link>
            <Link href='/local-tours' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md px-2 py-2 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium xl:px-3'>
              <span className='block'>{t('local_tours')}</span>
            </Link>
            <Link href='/abroad-tours' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md px-2 py-2 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium xl:px-3'>
              <span className='block'>{t('abroad_tours')}</span>
            </Link>
            <Link href='/cities' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md px-2 py-2 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium xl:px-3'>
              <span className='block'>{t('cities')}</span>
            </Link>
            <Link href='/hotels' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md px-2 py-2 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium xl:px-3'>
              <span className='block'>{t('hotels')}</span>
            </Link>
            <Link href='/cars' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md px-2 py-2 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium xl:px-3'>
              <span className='block'>{t('cars')}</span>
            </Link>
            <Link href='/contact-us' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md px-2 py-2 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium xl:px-3'>
              <span className='block'>{t('contact')}</span>
            </Link>
          </nav>

          {/* Controls */}
          <div className='flex items-center gap-1 sm:gap-2'>
            <div className='flex gap-1 sm:gap-2'>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            <MenuSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
