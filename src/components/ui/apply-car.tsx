'use client'

import { useState } from 'react'
import { Send, Loader2, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Button, Input, Label, Calendar, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { sendTelegramMessage } from '@/lib/utils/telegram'
import { FORM_STYLES } from '@/lib/constants/form-styles'

interface ApplyCarProps {
  open: boolean
  setOpen: (open: boolean) => void
  car: {
    id: string | number
    name: string
    brand?: string
    model?: string
    price?: number
  }
}

export const ApplyCar = ({ open, setOpen, car }: ApplyCarProps) => {
  const t = useTranslations('pages.apply_car')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  })

  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', phone: '', email: '' })
    setSelectedDate(undefined)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim() || !formData.email.trim() || !selectedDate) {
      return toast.error(t('form.validation_error'))
    }

    setIsSubmitting(true)

    try {
      const message = `🚗 *New Car Rental Request*\n\n🚙 *Car:* ${car.name}\n${car.brand ? `🏷️ *Brand:* ${car.brand}\n` : ''}${car.model ? `📋 *Model:* ${car.model}\n` : ''}💰 *Price:* $${car.price?.toLocaleString() || 'N/A'} per day\n📅 *Rental Date:* ${format(selectedDate, 'PPP')}\n\n👤 *Customer Details*\n📝 First Name: ${formData.firstName}\n📝 Last Name: ${formData.lastName}\n📞 Phone: ${formData.phone}\n📧 Email: ${formData.email}\n\n⏰ *Applied at:* ${new Date().toLocaleString()}`

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

  const isFormValid = formData.firstName && formData.lastName && formData.phone && formData.email && selectedDate

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className={FORM_STYLES.dialog}>
        <DialogHeader className='text-center'>
          <DialogTitle className={FORM_STYLES.dialogTitle}>{t('form.title')}</DialogTitle>
          <DialogDescription className={FORM_STYLES.dialogDescription}>
            {t('form.subtitle')}: <strong>{car.name}</strong>
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

          <div className='space-y-2'>
            <Label className={FORM_STYLES.label}>{t('form.rental_date')} *</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant='outline' className={cn(FORM_STYLES.calendar.trigger, !selectedDate && 'text-muted-foreground')} disabled={isSubmitting}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {selectedDate ? format(selectedDate, 'PPP') : <span>{t('form.select_date')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-4' align='center'>
                <Calendar
                  mode='single'
                  selected={selectedDate}
                  onSelect={date => {
                    setSelectedDate(date)
                    setIsCalendarOpen(false)
                  }}
                  disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  fixedWeeks
                  showOutsideDays
                  initialFocus
                  classNames={{ day_button: FORM_STYLES.calendar.dayButton, selected: FORM_STYLES.calendar.selected, day: 'w-full', month: 'w-full', table: 'w-full' }}
                />
              </PopoverContent>
            </Popover>
          </div>

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
