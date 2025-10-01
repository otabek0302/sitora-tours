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
      <div className='border-border flex flex-1 flex-col justify-center space-y-4 rounded-[32px] border p-12 shadow-none'>
        <h2 className='text-sitora-text-subtitle text-right text-4xl font-bold xl:text-4xl'>{t('hero_title')}</h2>
        <p className='text-sitora-body text-justify text-sm leading-relaxed font-normal lg:text-base'>{t('hero_description')}</p>
        <p className='text-sitora-body text-justify text-sm leading-relaxed font-normal lg:text-base'>{t('hero_description')}</p>
        <div className='flex gap-2'>
          <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
            <Link href='mailto:info@sitoratours.com' className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
              <Mail className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
              <span className='text-sitora-primary group-hover:text-sitora-white block'>info@sitoratours.com</span>
            </Link>
          </Button>
          <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
            <Link href='tel:+998901234567' className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
              <Phone className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
              <span className='text-sitora-primary group-hover:text-sitora-white block'>+998901234567</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* About Hero Left Side */}
      <div className='flex flex-1 flex-col gap-4 rounded-[32px]'>
        <div className='border-border relative rounded-[32px] border p-4 shadow-none lg:h-72'>
          <Image src='/images/about-us/about-hero.png' fill alt='About Hero' className='object-cover' />
        </div>
        <div className='border-border grid grid-cols-2 gap-4 rounded-[32px] border p-4 shadow-none lg:h-72'>
          <div className='border-border bg-muted flex flex-col justify-center rounded-[26px] border p-4 shadow-none'>
            <h3 className='text-sitora-text-subtitle text-4xl font-bold'>5,368+</h3>
            <p className='text-sitora-body text-sm leading-relaxed font-normal lg:text-base'>{t('happy_travelers')}</p>
          </div>
          <div className='border-border bg-muted flex flex-col justify-center rounded-[26px] border p-4 shadow-none'>
            <h3 className='text-sitora-text-subtitle text-4xl font-bold'>+100</h3>
            <p className='text-sitora-body text-sm leading-relaxed font-normal lg:text-base'>{t('destinations')}</p>
          </div>
          <div className='border-border bg-muted flex flex-col justify-center rounded-[26px] border p-4 shadow-none'>
            <h3 className='text-sitora-text-subtitle text-4xl font-bold'>10+</h3>
            <p className='text-sitora-body text-sm leading-relaxed font-normal lg:text-base'>{t('years_experience')}</p>
          </div>
          <div className='border-border bg-muted flex flex-col justify-center rounded-[26px] border p-4 shadow-none'>
            <h3 className='text-sitora-text-subtitle text-4xl font-bold'>120+</h3>
            <p className='text-sitora-body text-sm leading-relaxed font-normal lg:text-base'>{t('packages')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutHero
