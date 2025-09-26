import { Star } from 'lucide-react'
import { Card, CardHeader, CardContent, CardFooter } from './card'
import { Review } from '@/payload-types'

const TestimonialCard = ({ review }: { review: Review }) => {
    return (
        <div className="embla__slide mr-6 min-h-72 w-1/3 flex-shrink-0">
            <Card className="group bg-card border-border h-full rounded-xl border p-4 shadow-none transition-shadow duration-200 hover:shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sitora-text-subtitle text-sm font-semibold">
                            {review?.first_name} {review?.last_name}
                        </h4>
                    </div>
                    <p className="text-sitora-body text-xs font-normal">{new Date(review?.createdAt).toLocaleDateString()}</p>
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-sitora-body text-sm leading-relaxed">&quot;{review?.comment.slice(0, 180)}...&quot;</p>
                </CardContent>
                <CardFooter className="pt-0">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-sitora-gold-medium fill-current' : 'text-gray-300'}`} />
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default TestimonialCard
