import { useState, useEffect } from 'react'
import { Star, Send, Loader2 } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'
import { Textarea } from './textarea'
import { Label } from './label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Skeleton } from './skeleton'

import { toast } from 'sonner'
import { useTranslations, useLocale } from 'next-intl'
import { useToursContext } from '@/lib/stores/tours'
import { useReviewsContext } from '@/lib/stores/reviews'

export const AddTestimonial = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const t = useTranslations('pages.home.testimonials')
  const locale = useLocale()
  const { tours, fetchTours, setLocale: setToursLocale, loading: toursLoading } = useToursContext()
  const { addReview } = useReviewsContext()

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    rating: 0,
    comment: '',
    tour: 0,
  })

  // Fetch tours when dialog opens
  useEffect(() => {
    if (open) {
      setToursLocale(locale)
      fetchTours()
    }
  }, [open, locale, fetchTours, setToursLocale])

  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!data.first_name || !data.last_name || !data.rating || !data.comment || !data.tour) {
      toast.error('Please fill all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      const reviewData = {
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        rating: Number(data.rating),
        comment: data.comment.trim(),
        tour: Number(data.tour),
      }

      const success = await addReview(reviewData)

      if (success) {
        toast.success(t('form.success'))
        setData({
          first_name: '',
          last_name: '',
          rating: 0,
          comment: '',
          tour: 0,
        })
        setTimeout(() => {
          setOpen(false)
        }, 1500)
      } else {
        toast.error(t('form.error'))
      }
    } catch (error) {
      console.error('Submit error:', error)
      const errorMessage = error instanceof Error ? error.message : t('form.error')
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRatingClick = (rating: number) => {
    setData(prev => ({ ...prev, rating }))
  }

  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating)
  }

  const handleRatingLeave = () => {
    setHoveredRating(0)
  }

  const handleDialogChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      setData({
        first_name: '',
        last_name: '',
        rating: 0,
        comment: '',
        tour: 0,
      })
      setHoveredRating(0)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className='bg-sitora-white border-border mx-auto my-4 max-h-[90vh] w-[96%] overflow-y-auto rounded-[16px!important] border p-8 shadow-sm sm:max-w-lg'>
        <DialogHeader className='text-center'>
          <DialogTitle className='text-sitora-text-subtitle text-2xl font-semibold'>{t('form.title')}</DialogTitle>
          <DialogDescription className='text-sitora-body text-sm leading-tight font-normal'>{t('form.subtitle')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='first_name' className='text-sitora-text-subtitle text-sm font-medium'>
              {t('form.name')} *
            </Label>
            <Input id='first_name' value={data.first_name} onChange={e => setData(prev => ({ ...prev, first_name: e.target.value }))} placeholder={t('form.namePlaceholder')} className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' required disabled={isSubmitting} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='last_name' className='text-sitora-text-subtitle text-sm font-medium'>
              {t('form.lastName')} *
            </Label>
            <Input id='last_name' value={data.last_name} onChange={e => setData(prev => ({ ...prev, last_name: e.target.value }))} placeholder={t('form.lastNamePlaceholder')} className='border-border focus:border-sitora-primary focus:ring-sitora-primary/20 h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' required disabled={isSubmitting} />
          </div>

          <div className='space-y-2'>
            <Label className='text-sitora-text-subtitle text-sm font-medium'>{t('form.tour')} *</Label>
            {toursLoading ? (
              <Skeleton className='h-10 w-full rounded-md' />
            ) : (
              <Select value={data.tour === 0 ? '' : data.tour.toString()} onValueChange={value => setData(prev => ({ ...prev, tour: Number(value) }))} disabled={isSubmitting}>
                <SelectTrigger className='border-border focus:border-sitora-primary h-10 w-full rounded-md shadow-none'>
                  <SelectValue placeholder={t('form.selectTour')} />
                </SelectTrigger>
                <SelectContent>
                  {tours.map(tour => (
                    <SelectItem key={tour.id} value={tour.id.toString()}>
                      {tour.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className='space-y-2'>
            <Label className='text-sitora-text-subtitle text-sm font-medium'>{t('form.rating')} *</Label>
            <div className='flex items-center gap-2'>
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} type='button' onClick={() => handleRatingClick(star)} onMouseEnter={() => handleRatingHover(star)} onMouseLeave={handleRatingLeave} className='transition-all duration-200 hover:scale-110 disabled:opacity-50' disabled={isSubmitting}>
                  <Star className={`h-8 w-8 ${star <= (hoveredRating || data.rating) ? 'text-sitora-gold-medium fill-current' : 'text-sitora-warning'}`} />
                </button>
              ))}
              <span className='text-sitora-body ml-3 text-sm font-medium'>{data.rating > 0 && `${data.rating} ${t('form.outOf5')}`}</span>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='comment' className='text-sitora-text-subtitle text-sm font-medium'>
              {t('form.comment')} *
            </Label>
            <Textarea id='comment' value={data.comment} onChange={e => setData(prev => ({ ...prev, comment: e.target.value }))} placeholder={t('form.commentPlaceholder')} className={`border-border focus:border-sitora-primary focus:ring-sitora-primary/20 min-h-[100px] resize-none rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0 sm:min-h-[120px] ${data.comment.length >= 500 ? 'border-sitora-error' : ''}`} required disabled={isSubmitting} maxLength={500} />
            <p className={`text-xs ${data.comment.length >= 500 ? 'text-sitora-error' : 'text-sitora-body'}`}>
              {data.comment.length}/500 {t('form.characters')}
            </p>
          </div>

          <DialogFooter className='flex flex-col gap-3 pt-4 sm:flex-row sm:gap-3'>
            <Button type='button' variant='outline' onClick={() => setOpen(false)} disabled={isSubmitting} className='border-sitora-primary text-sitora-primary hover:bg-sitora-primary hover:text-sitora-white rounded-lg'>
              {t('form.cancel')}
            </Button>
            <Button type='submit' variant='default' size='default' disabled={isSubmitting || !data.first_name || !data.last_name || !data.rating || !data.comment || !data.tour || data.comment.length > 500} className='bg-sitora-primary text-sitora-white hover:bg-sitora-primary-dark rounded-lg py-2.5'>
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
