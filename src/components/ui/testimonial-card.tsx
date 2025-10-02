import { Star } from 'lucide-react'
import { Card, CardContent } from './card'
import { Review } from '@/payload-types'

const TestimonialCard = ({ review }: { review: Review }) => {
  const displayComment = review?.comment ? (review.comment.length > 150 ? `${review.comment.slice(0, 150)}...` : review.comment) : ''
  const tourName = typeof review?.tour === 'object' && review.tour?.name ? review.tour.name : ''

  return (
    <div className='embla__slide mr-3 w-[85%] flex-shrink-0 sm:mr-4 sm:w-[45%] lg:mr-6 lg:w-[30%]'>
      <Card className='group bg-card border-border h-full min-h-[280px] rounded-xl border p-4 shadow-none transition-shadow duration-200 hover:shadow-sm sm:min-h-[300px] sm:p-5 lg:p-6'>
        <CardContent className='flex h-full flex-col justify-between space-y-3 p-0 sm:space-y-4'>
          {/* Comment */}
          <p className='text-sitora-text-subtitle line-clamp-4 text-xs leading-relaxed font-medium sm:text-sm'>&quot;{displayComment}&quot;</p>

          {/* Tour Name */}
          {tourName && <p className='text-sitora-body line-clamp-1 text-xs font-normal italic sm:text-sm'>{tourName}</p>}

          <div className='space-y-3'>
            {/* Star Rating */}
            <div className='flex items-center justify-start gap-0.5 sm:gap-1'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 sm:h-5 sm:w-5 ${i < (review?.rating || 0) ? 'text-sitora-gold-medium fill-current' : 'text-sitora-muted dark:text-muted-foreground'}`} />
              ))}
            </div>

            {/* Divider */}
            <div className='border-sitora-border border-t pt-3' />

            {/* Name */}
            <h4 className='text-sitora-text-subtitle text-sm font-bold sm:text-base'>
              {review?.first_name} {review?.last_name}
            </h4>

            {/* Date */}
            <p className='text-sitora-body text-xs font-normal'>
              {review?.createdAt
                ? new Date(review.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : ''}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TestimonialCard
