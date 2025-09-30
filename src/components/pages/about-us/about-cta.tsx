import Link from 'next/link'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'

const AboutCta = () => {
  const t = useTranslations('pages.about_us')
  return (
    <div className='bg-sitora-primary-light relative z-10 flex flex-col items-center justify-center rounded-4xl p-12'>
      <h3 className='text-sitora-text-subtitle mb-6 text-center text-2xl font-bold lg:text-4xl'>{t('cta_title')}</h3>
      <p className='text-sitora-body mx-auto mb-8 max-w-2xl text-center text-base leading-relaxed lg:text-lg'>{t('cta_description')}</p>

      <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
        <div className='flex gap-2'>
          <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
            <Link href='mailto:info@sitoratours.com' className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
              <span className='text-sitora-primary group-hover:text-sitora-white block'>{t('cta_button_1')}</span>
              <ArrowRight className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
            </Link>
          </Button>
          <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
            <Link href='tel:+998901234567' className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
              <span className='text-sitora-primary group-hover:text-sitora-white block'>{t('cta_button_2')}</span>
              <ArrowRight className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AboutCta
