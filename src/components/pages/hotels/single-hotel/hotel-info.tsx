import { MapPin, Star } from 'lucide-react'
import { Hotel } from '@/lib/schemas'

interface HotelInfoProps {
  hotel: Hotel
}

const HotelInfo = ({ hotel }: HotelInfoProps) => {
  return (
    <div className='space-y-4'>
      {/* Hotel Name */}
      <h1 className='text-sitora-text-heading text-3xl font-bold sm:text-4xl lg:text-5xl'>{hotel.name || 'Unknown Hotel'}</h1>

      {/* Location and Rating */}
      <div className='flex flex-wrap items-center gap-4'>
        {/* Location */}
        <div className='flex items-center gap-2'>
          <MapPin className='text-sitora-primary h-5 w-5' />
          <span className='text-sitora-body text-base font-medium'>{hotel.city?.name || 'Unknown Location'}</span>
        </div>

        {/* Separator */}
        <div className='text-sitora-muted'>•</div>

        {/* Rating */}
        <div className='flex items-center gap-2'>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < parseInt(hotel.rating || '0') ? 'text-sitora-gold-medium fill-current' : 'text-sitora-text-muted'}`} />
          ))}
          <span className='text-sitora-text-subtitle text-base font-semibold'>{hotel.rating || '0'}/5</span>
        </div>
      </div>

      {/* Description */}
      {hotel.description && <p className='text-sitora-body max-w-4xl text-base leading-relaxed sm:text-lg'>{hotel.description || 'Unknown Description'}</p>}
    </div>
  )
}

export default HotelInfo
