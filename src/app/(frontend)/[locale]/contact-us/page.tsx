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
        <div className='mb-6 flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between'>
          <h1 className='text-sitora-text-subtitle text-xl leading-tight font-bold sm:text-2xl lg:text-3xl xl:text-4xl'>{t('heading')}</h1>
          <p className='text-sitora-body text-xs font-normal sm:text-sm lg:text-base'>{t('subheading')}</p>
        </div>

        {/* Main Content Card */}
        <Card className='bg-card border-border rounded-[20px] border p-4 shadow-none sm:rounded-[26px] sm:p-6 lg:rounded-[32px] lg:p-10 xl:p-12'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8'>
            {/* Left Side - Contact Form */}
            <div className='order-2 lg:order-1'>
              <ContactForm />
            </div>

            {/* Right Side - Contact Details */}
            <div className='border-border order-1 rounded-[20px] border p-4 shadow-none sm:rounded-[26px] sm:p-6 lg:order-2 lg:p-8 xl:p-12'>
              <ContactDetails />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default ContactUsPage
