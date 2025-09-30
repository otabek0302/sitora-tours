'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send } from 'lucide-react'

const ContactForm = () => {
  const t = useTranslations('pages.contact_us')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-sitora-text-subtitle mb-2 text-2xl font-bold'>{t('contact_us')}</h2>
        <p className='text-sitora-body text-sm'>{t('contact_us')}</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Full Name and Email Row */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='fullName' className='text-sitora-text-subtitle text-sm font-semibold'>
              {t('full_name')} *
            </Label>
            <Input id='fullName' name='fullName' type='text' placeholder={t('full_name_placeholder')} value={formData.fullName} onChange={handleInputChange} required className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-11 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email' className='text-sitora-text-subtitle text-sm font-semibold'>
              {t('email_address')} *
            </Label>
            <Input id='email' name='email' type='email' placeholder={t('email_placeholder')} value={formData.email} onChange={handleInputChange} required className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-11 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' />
          </div>
        </div>

        {/* Phone Number */}
        <div className='space-y-2'>
          <Label htmlFor='phone' className='text-sitora-text-subtitle text-sm font-semibold'>
            {t('phone_number')}
          </Label>
          <Input id='phone' name='phone' type='tel' placeholder={t('phone_placeholder')} value={formData.phone} onChange={handleInputChange} className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-11 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' />
        </div>

        {/* Subject */}
        <div className='space-y-2'>
          <Label htmlFor='subject' className='text-sitora-text-subtitle text-sm font-semibold'>
            {t('subject')} *
          </Label>
          <Input id='subject' name='subject' type='text' placeholder={t('subject_placeholder')} value={formData.subject} onChange={handleInputChange} required className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-11 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' />
        </div>

        {/* Message */}
        <div className='space-y-2'>
          <Label htmlFor='message' className='text-sitora-text-subtitle text-sm font-semibold'>
            {t('message')} *
          </Label>
          <Textarea id='message' name='message' placeholder={t('message_placeholder')} value={formData.message} onChange={handleInputChange} required rows={5} className='border-border focus:border-sitora-primary focus:ring-sitora-primary resize-none rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' />
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <Button type='submit' className='bg-sitora-primary hover:bg-sitora-primary/90 text-sitora-white px-6 py-3 text-sm font-semibold'>
            <Send className='mr-2 h-4 w-4' />
            {t('send_message')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
