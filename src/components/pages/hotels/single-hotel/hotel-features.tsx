import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Hotel } from '@/lib/schemas'

interface HotelFeaturesProps {
  hotel: Hotel
}

const HotelFeatures = ({ hotel }: HotelFeaturesProps) => {
  if (!hotel.features || hotel.features.length === 0) {
    return null
  }

  return (
    <Card className='border-border bg-card rounded-[26px] shadow-none'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-sitora-text-heading text-xl font-bold'>Hotel Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {hotel.features.map((feature, index) => (
            <div key={feature.id || index} className='flex items-center gap-3'>
              <span className='text-sitora-primary text-lg font-bold'>—</span>
              <span className='text-sitora-body text-base'>{feature.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default HotelFeatures
