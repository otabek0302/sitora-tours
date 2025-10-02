import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui'
import { Phone, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'

const AboutHero = () => {
  const t = useTranslations('pages.about_us')

  return (
    <div className='flex flex-col gap-4 lg:flex-row'>
      {/* About Hero Right Side */}
      <div className='border-border flex flex-1 flex-col justify-center space-y-4 rounded-[32px] border p-6 shadow-none sm:p-8 lg:p-12'>
        <h2 className='text-sitora-text-subtitle text-center text-2xl font-bold sm:text-3xl sm:text-right lg:text-4xl'>{t('hero_title')}</h2>
        <p className='text-sitora-body text-justify text-sm leading-relaxed font-normal lg:text-base'>{t('hero_description')}</p>
        <p className='text-sitora-body text-justify text-sm leading-relaxed font-normal lg:text-base'>{t('hero_description')}</p>
        <div className='flex flex-col gap-2 sm:flex-row'>
          <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
            <Link href='mailto:info@sitoratours.com' className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
              <Mail className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
              <span className='text-sitora-primary group-hover:text-sitora-white block'>info@sitoratours.com</span>
            </Link>
          </Button>
          <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
            <Link href='tel:+998915589901' className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
              <Phone className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
              <span className='text-sitora-primary group-hover:text-sitora-white block'>+998 91 558 99 01</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* About Hero Left Side */}
      <div className='flex flex-1 flex-col gap-4 rounded-[32px]'>
        <div className='border-border relative overflow-hidden rounded-[32px] border p-4 shadow-none lg:h-72'>
          <div className='border-border relative h-full w-full overflow-hidden rounded-[26px] border'>
            <Image src='/images/about-us/about-hero.jpg' fill alt='About Hero' className='object-cover' priority quality={85} sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw' />
          </div>
        </div>
        <div className='border-border grid grid-cols-2 gap-3 rounded-[32px] border p-3 shadow-none sm:gap-4 sm:p-4 lg:h-72'>
          <div className='border-border bg-muted flex flex-col justify-center rounded-[26px] border p-3 shadow-none sm:p-4'>
            <h3 className='text-sitora-text-subtitle text-2xl font-bold sm:text-3xl lg:text-4xl'>5,368+</h3>
            <p className='text-sitora-body text-xs leading-relaxed font-normal sm:text-sm lg:text-base'>{t('happy_travelers')}</p>
          </div>
          <div className='border-border bg-muted flex flex-col justify-center rounded-[26px] border p-3 shadow-none sm:p-4'>
            <h3 className='text-sitora-text-subtitle text-2xl font-bold sm:text-3xl lg:text-4xl'>+100</h3>
            <p className='text-sitora-body text-xs leading-relaxed font-normal sm:text-sm lg:text-base'>{t('destinations')}</p>
          </div>
          <div className='border-border bg-muted flex flex-col justify-center rounded-[26px] border p-3 shadow-none sm:p-4'>
            <h3 className='text-sitora-text-subtitle text-2xl font-bold sm:text-3xl lg:text-4xl'>10+</h3>
            <p className='text-sitora-body text-xs leading-relaxed font-normal sm:text-sm lg:text-base'>{t('years_experience')}</p>
          </div>
          <div className='border-border bg-muted flex flex-col justify-center rounded-[26px] border p-3 shadow-none sm:p-4'>
            <h3 className='text-sitora-text-subtitle text-2xl font-bold sm:text-3xl lg:text-4xl'>120+</h3>
            <p className='text-sitora-body text-xs leading-relaxed font-normal sm:text-sm lg:text-base'>{t('packages')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutHero
