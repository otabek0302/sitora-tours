import { Star } from 'lucide-react'
import { Card, CardHeader, CardContent, CardFooter } from './card'
import { Review } from '@/payload-types'

const TestimonialCard = ({ review }: { review: Review }) => {
  const displayComment = review?.comment ? (review.comment.length > 180 ? `${review.comment.slice(0, 180)}...` : review.comment) : ''
  const tourName = typeof review?.tour === 'object' && review.tour?.name ? review.tour.name : ''

  return (
    <div className='embla__slide mr-6 min-h-72 w-1/3 flex-shrink-0'>
      <Card className='group bg-card border-border h-full rounded-xl border p-6 shadow-none transition-shadow duration-200 hover:shadow-sm'>
        <CardContent className='space-y-3 p-0'>
          {/* Comment */}
          <p className='text-sitora-text-subtitle text-sm leading-relaxed font-semibold uppercase'>&quot;{displayComment}&quot;</p>

          {/* Tour Name */}
          {tourName && <p className='text-sitora-body text-xs font-normal'>{tourName}</p>}

          {/* Star Rating */}
          <div className='flex items-center justify-start gap-1'>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < (review?.rating || 0) ? 'text-sitora-gold-medium fill-current' : 'text-gray-300'}`} />
            ))}
          </div>

          {/* Divider */}
          <div className='border-sitora-border border-t pt-4' />

          {/* Name */}
          <h4 className='text-sitora-text-subtitle text-base font-bold'>
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
        </CardContent>
      </Card>
    </div>
  )
}

export default TestimonialCard
