'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { sendTelegramMessage, formatDateRange, calculateDays } from '@/lib/utils/telegram'
import { FORM_STYLES } from '@/lib/constants/form-styles'

interface ApplyTourProps {
  open: boolean
  setOpen: (open: boolean) => void
  tour: {
    id: string | number
    name: string
    price?: number
    duration_days?: number
    duration_nights?: number
    booking_pricing?: Array<{
      id?: string
      dateStart?: string | null
      dateEnd?: string | null
      numberOfPersons?: number | null
      pricePerPerson?: number
    }>
  }
}

export const ApplyTour = ({ open, setOpen, tour }: ApplyTourProps) => {
  const t = useTranslations('pages.apply_tour')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    selectedDate: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => setFormData({ firstName: '', lastName: '', phone: '', email: '', selectedDate: '' })

  // Helper function to format booking option text
  const formatBookingOptionText = (booking: { dateStart?: string | null; dateEnd?: string | null; pricePerPerson?: number }) => {
    // Check if dates are valid
    const startDate = booking.dateStart ? new Date(booking.dateStart) : null
    const endDate = booking.dateEnd ? new Date(booking.dateEnd) : null
    const isValidStartDate = startDate && !isNaN(startDate.getTime())
    const isValidEndDate = endDate && !isNaN(endDate.getTime())

    // Format date range or use tour name
    let dateText: string
    if (isValidStartDate && isValidEndDate) {
      const startFormatted = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      const endFormatted = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      dateText = `${startFormatted} - ${endFormatted}`
    } else {
      // Show tour name if dates are invalid, truncate if too long
      const tourName = tour.name.length > 30 ? `${tour.name.substring(0, 30)}...` : tour.name
      dateText = tourName
    }

    const priceText = booking.pricePerPerson ? `$${booking.pricePerPerson.toLocaleString()}` : 'N/A'

    return { dateText, priceText, fullText: `${dateText} (${priceText})` }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      return toast.error(t('form.validation_error'))
    }

    if (tour.booking_pricing?.length && !formData.selectedDate) {
      return toast.error(t('form.select_date_error'))
    }

    setIsSubmitting(true)

    try {
      const selectedBooking = tour.booking_pricing?.find(b => b.id === formData.selectedDate)

      // Check if dates are valid
      const startDate = selectedBooking?.dateStart ? new Date(selectedBooking.dateStart) : null
      const endDate = selectedBooking?.dateEnd ? new Date(selectedBooking.dateEnd) : null
      const isValidStartDate = startDate && !isNaN(startDate.getTime())
      const isValidEndDate = endDate && !isNaN(endDate.getTime())
      const hasValidDates = isValidStartDate && isValidEndDate

      // Build date/person info
      let dateOrPersonInfo = ''
      if (hasValidDates && selectedBooking) {
        // If dates are available, send dates
        dateOrPersonInfo = `📅 *Tour Dates:* ${formatDateRange(selectedBooking.dateStart || '', selectedBooking.dateEnd || '')}`
      } else if (selectedBooking?.numberOfPersons && selectedBooking.numberOfPersons > 0) {
        // If dates not available, send number of persons
        dateOrPersonInfo = `👥 *Number of Persons:* ${selectedBooking.numberOfPersons}`
      } else {
        // Fallback
        dateOrPersonInfo = '📅 *Tour Dates:* Not specified'
      }

      const tourLength = hasValidDates && selectedBooking ? calculateDays(selectedBooking.dateStart || '', selectedBooking.dateEnd || '') : tour.duration_days || 'N/A'

      const message = `🎯 *New Tour Application*\n\n🏷️ *Tour:* ${tour.name}\n💰 *Price:* $${selectedBooking?.pricePerPerson?.toLocaleString() || tour.price?.toLocaleString() || 'N/A'} per person\n⏱️ *Duration:* ${tourLength} days${tour.duration_nights ? ` / ${tour.duration_nights} nights` : ''}\n${dateOrPersonInfo}\n\n👤 *Applicant Details*\n📝 First Name: ${formData.firstName}\n📝 Last Name: ${formData.lastName}\n📞 Phone: ${formData.phone}\n📧 Email: ${formData.email}\n\n⏰ *Applied at:* ${new Date().toLocaleString()}`

      await sendTelegramMessage(message)
      toast.success(t('form.success'))
      resetForm()
      setTimeout(() => setOpen(false), 1500)
    } catch (error) {
      console.error('Submit error:', error)
      toast.error(t('form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDialogChange = (open: boolean) => {
    setOpen(open)
    if (!open) resetForm()
  }

  const updateField = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, [field]: e.target.value }))

  const isFormValid = formData.firstName && formData.lastName && formData.phone && formData.email && (!tour.booking_pricing?.length || formData.selectedDate)

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className={FORM_STYLES.dialog}>
        <DialogHeader className='text-center'>
          <DialogTitle className={FORM_STYLES.dialogTitle}>{t('form.title')}</DialogTitle>
          <DialogDescription className={FORM_STYLES.dialogDescription}>
            {t('form.subtitle')}: <strong>{tour.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='firstName' className={FORM_STYLES.label}>
                {t('form.first_name')} *
              </Label>
              <Input id='firstName' value={formData.firstName} onChange={updateField('firstName')} placeholder={t('form.first_name_placeholder')} className={FORM_STYLES.input} required disabled={isSubmitting} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName' className={FORM_STYLES.label}>
                {t('form.last_name')} *
              </Label>
              <Input id='lastName' value={formData.lastName} onChange={updateField('lastName')} placeholder={t('form.last_name_placeholder')} className={FORM_STYLES.input} required disabled={isSubmitting} />
            </div>
          </div>

          {tour.booking_pricing && tour.booking_pricing.length > 0 && (
            <div className='space-y-2'>
              <Label htmlFor='tourDate' className={FORM_STYLES.label}>
                {t('form.tour_date')} *
              </Label>
              <Select value={formData.selectedDate} onValueChange={value => setFormData(prev => ({ ...prev, selectedDate: value }))} required>
                <SelectTrigger className={FORM_STYLES.select} disabled={isSubmitting}>
                  <SelectValue placeholder={t('form.select_tour_date')} />
                </SelectTrigger>
                <SelectContent className='w-full'>
                  {tour.booking_pricing?.map((booking, index) => {
                    const { fullText } = formatBookingOptionText(booking)

                    return (
                      <SelectItem key={booking.id || `booking-${index}`} value={booking.id || `booking-${index}`} title={fullText} className='w-full'>
                        {fullText}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className='space-y-2'>
            <Label htmlFor='phone' className={FORM_STYLES.label}>
              {t('form.phone')} *
            </Label>
            <Input id='phone' type='tel' value={formData.phone} onChange={updateField('phone')} placeholder={t('form.phone_placeholder')} className={FORM_STYLES.input} required disabled={isSubmitting} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email' className={FORM_STYLES.label}>
              {t('form.email')} *
            </Label>
            <Input id='email' type='email' value={formData.email} onChange={updateField('email')} placeholder={t('form.email_placeholder')} className={FORM_STYLES.input} required disabled={isSubmitting} />
          </div>

          <DialogFooter className='flex flex-col gap-3 pt-4 sm:flex-row sm:gap-3'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={isSubmitting} className={FORM_STYLES.cancelButton}>
              {t('form.cancel')}
            </Button>
            <Button type='submit' variant='default' size='default' disabled={isSubmitting || !isFormValid} className={FORM_STYLES.submitButton}>
              {isSubmitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  <span className='text-sm font-medium'>{t('form.submitting')}</span>
                </>
              ) : (
                <>
                  <Send className='mr-2 h-4 w-4' />
                  <span className='text-sm font-medium'>{t('form.submit')}</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
