'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

const NotFound = () => {
  const t = useTranslations('pages.not-found')

  return (
    <div className='flex h-screen flex-col items-center justify-center text-center'>
      <h1 className='text-6xl font-bold'>{t('title')}</h1>
      <p className='mt-4 text-2xl'>{t('description')}</p>
      <Link href='/' className='mt-6 text-blue-600 hover:underline'>
        {t('button')}
      </Link>
    </div>
  )
}

export default NotFound
