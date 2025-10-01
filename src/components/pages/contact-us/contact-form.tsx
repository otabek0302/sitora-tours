'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { sendTelegramMessage } from '@/lib/utils/telegram'

const ContactForm = () => {
  const t = useTranslations('pages.contact_us')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Format message for Telegram
      const message = `
🆕 *New Contact Form Submission*

👤 *Name:* ${formData.fullName}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone || 'Not provided'}
📋 *Subject:* ${formData.subject}

💬 *Message:*
${formData.message}

⏰ *Submitted:* ${new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}
      `.trim()

      // Send to Telegram
      await sendTelegramMessage(message)

      // Success
      setSubmitStatus('success')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')

      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-sitora-text-subtitle mb-2 text-2xl font-bold'>{t('contact_us')}</h2>
        <p className='text-sitora-body text-sm'>{t('contact_description')}</p>
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
        <div className='flex flex-col gap-3'>
          <div className='flex justify-end'>
            <Button type='submit' size='lg' disabled={isSubmitting} className='bg-sitora-primary hover:bg-sitora-primary/90 text-sitora-white px-6 py-3 text-sm font-semibold disabled:opacity-50'>
              {isSubmitting ? (
                <>
                  <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                  {t('sending')}
                </>
              ) : (
                <>
                  <Send className='mr-2 h-4 w-4' />
                  {t('send_message')}
                </>
              )}
            </Button>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className='bg-sitora-success/10 border-sitora-success flex items-center gap-2 rounded-lg border p-3'>
              <CheckCircle className='text-sitora-success h-5 w-5 flex-shrink-0' />
              <p className='text-sitora-success text-sm font-medium'>{t('success_message')}</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className='bg-sitora-error/10 border-sitora-error flex items-center gap-2 rounded-lg border p-3'>
              <AlertCircle className='text-sitora-error h-5 w-5 flex-shrink-0' />
              <p className='text-sitora-error text-sm font-medium'>{t('error_message')}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default ContactForm
