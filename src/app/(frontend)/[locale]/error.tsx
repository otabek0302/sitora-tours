'use client'

import Link from 'next/link'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('pages.error')

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className='container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12'>
      <div className='text-center'>
        {/* Error Icon */}
        <div className='mb-6 flex justify-center'>
          <div className='bg-sitora-primary-light flex h-20 w-20 items-center justify-center rounded-full'>
            <AlertCircle className='text-sitora-primary h-10 w-10' />
          </div>
        </div>

        {/* Error Message */}
        <h1 className='text-sitora-heading mb-4 text-3xl font-bold sm:text-4xl'>{t('title')}</h1>
        <p className='text-sitora-body mb-2 text-lg'>{error.message || t('description')}</p>

        {error.digest && <p className='text-sitora-muted mb-8 text-sm'>Error ID: {error.digest}</p>}

        {/* Action Buttons */}
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button onClick={reset} className='bg-sitora-primary hover:bg-sitora-primary-dark text-sitora-white flex items-center gap-2'>
            <RefreshCw className='h-4 w-4' />
            {t('try_again')}
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant='outline' className='border-sitora-primary text-sitora-primary hover:bg-sitora-primary-light flex items-center gap-2'>
            <Home className='h-4 w-4' />
            {t('go_home')}
          </Button>
        </div>

        {/* Additional Help */}
        <div className='mt-12'>
          <p className='text-sitora-muted text-sm'>
            {t('contact_text')}{' '}
            <Link href='/contact-us' className='text-sitora-primary hover:underline'>
              {t('contact_link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
