import React from 'react'
import { Tour } from '@/lib/schemas'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Car, User, Star, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ToursCardProps {
    tour: Tour
}

const ToursCard = ({ tour }: ToursCardProps) => {
    return (
        <Card className="bg-sitora-white border border-border/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <div className="flex flex-col lg:flex-row">
                {/* Tour Image */}
                <div className="relative h-48 lg:h-64 lg:w-1/3 overflow-hidden">
                    {tour.image ? (
                        <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-sitora-primary-light flex items-center justify-center">
                            <span className="text-sitora-primary text-sm font-medium">No Image</span>
                        </div>
                    )}
                    
                    {/* Tour Type Badge */}
                    {tour.type && (
                        <div className="absolute top-4 left-4">
                            <span className="bg-sitora-primary/90 backdrop-blur-sm text-sitora-white px-3 py-1 rounded-full text-xs font-semibold">
                                {tour.type}
                            </span>
                        </div>
                    )}

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                        <div className="bg-sitora-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                            <Star className="h-3 w-3 text-sitora-gold-medium fill-current" />
                            <span className="text-sitora-text-subtitle text-xs font-semibold">{tour.rating}</span>
                        </div>
                    </div>
                </div>

                {/* Tour Content */}
                <div className="flex-1 p-6">
                    <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-sitora-text-subtitle text-xl font-bold mb-2">
                            {tour.title}
                        </CardTitle>
                        {tour.description && (
                            <p className="text-sitora-body text-sm leading-relaxed line-clamp-2">
                                {tour.description}
                            </p>
                        )}
                    </CardHeader>

                    <CardContent className="p-0 space-y-4">
                        {/* Tour Details */}
                        <div className="flex flex-wrap gap-4 text-sitora-body text-sm">
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Car className="h-4 w-4" />
                                <span>{tour.transport}</span>
                            </div>
                            {tour.location?.city && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{tour.location.city}</span>
                                </div>
                            )}
                        </div>

                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < Math.floor(tour.rating)
                                                ? 'text-sitora-gold-medium fill-current'
                                                : 'text-sitora-warning'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sitora-body text-sm">
                                {tour.rating} ({tour.reviews} reviews)
                            </span>
                        </div>

                        {/* Price and Book Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/20">
                            <div className="flex flex-col">
                                <span className="text-sitora-primary text-2xl font-bold">${tour.price}</span>
                                <span className="text-sitora-body text-sm font-normal">per person</span>
                            </div>
                            <Button asChild className="bg-sitora-primary hover:bg-sitora-primary/90">
                                <Link href={`/tours/${tour.id}`}>
                                    Book Now
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}

export default ToursCard
