'use client'

import { useTranslations } from 'next-intl'
import ContactForm from '@/components/pages/contact-us/contact-form'
import ContactDetails from '@/components/pages/contact-us/contact-details'
import { Card } from '@/components/ui/card'

const ContactUsPage = () => {
  const t = useTranslations('pages.contact_us')

  return (
    <section className='min-h-screen py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Page Header */}
        <div className='mb-6 flex items-center justify-between border-b'>
          <h1 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>{t('heading')}</h1>
          <p className='text-sitora-body sm:text-md text-sm font-normal'>{t('subheading')}</p>
        </div>

        {/* Main Content Card */}
        <Card className='bg-card border-border rounded-[32px] border p-12 shadow-none'>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            {/* Left Side - Contact Form */}
            <div className='order-2 lg:order-1'>
              <ContactForm />
            </div>

            {/* Right Side - Contact Details */}
            <div className='border-border order-1 rounded-[26px] border p-12 shadow-none lg:order-2'>
              <ContactDetails />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default ContactUsPage
