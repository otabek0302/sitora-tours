'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ArrowRight, Play, Star, X } from 'lucide-react'
import { usePagesContext } from '@/lib/stores/pages'

const Hero = () => {
  const t = useTranslations('pages.home.hero')
  const { getHeroSection } = usePagesContext()
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string; subtitle: string } | null>(null)

  // Get hero section with destructuring
  const { title = t('main_title'), subtitle = t('main_subtitle'), button = t('main_button'), image, posts = [] } = getHeroSection() || {}

  const handleVideoClick = (videoUrl: string, reviewName: string, reviewComment: string) => {
    setSelectedVideo({ url: videoUrl, title: reviewName, subtitle: reviewComment })
    setIsVideoOpen(true)
  }

  const handleCloseDialog = () => {
    setIsVideoOpen(false)
    setTimeout(() => setSelectedVideo(null), 300) // Clear after animation
  }

  return (
    <section className='py-2'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Hero Card */}
        <div className='mb-6'>
          <div className='bg-card border-border group relative h-[400px] cursor-pointer overflow-hidden rounded-[32px] border shadow-none transition-all duration-300 hover:shadow-sm lg:h-[500px]'>
            {/* Background Image */}
            {typeof image === 'object' && image?.url ? (
              <Image src={image.url} alt={title} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw' className='object-cover transition-transform duration-700 group-hover:scale-105' priority quality={85} placeholder='blur' blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=' />
            ) : (
              <div className='bg-sitora-primary-light relative flex h-full w-full items-center justify-center'>
                <Image src='/images/home/home-hero.jpg' alt={title} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw' className='object-cover' priority quality={85} />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent' />

            {/* Content */}
            <div className='absolute inset-0 flex items-center'>
              <div className='max-w-2xl px-8 lg:px-12'>
                <h1 className='text-sitora-white mb-6 text-4xl leading-tight font-bold lg:text-6xl'>{title}</h1>
                <p className='text-sitora-white mb-8 text-lg leading-relaxed opacity-90 lg:text-xl'>{subtitle}</p>
                <Button size='lg' className='bg-sitora-primary hover:bg-sitora-primary/90 text-sitora-white group'>
                  <span className='text-sitora-white'>{button}</span>
                  <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Two Cards Below Hero - Dynamic from Reviews */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          {posts
            ?.filter(post => post.review && post.review !== null && post.video && post.video !== null)
            .slice(0, 2)
            .map((post, index) => {
              const review = typeof post.review === 'object' && post.review !== null ? post.review : null
              const reviewName = review ? `${review.first_name || ''} ${review.last_name || ''}`.trim() : 'Traveler'
              const reviewComment = review?.comment || 'Amazing experience!'
              const reviewRating = review?.rating || 5
              const reviewTour = typeof review?.tour === 'object' ? review.tour.name : 'Tour'
              const videoUrl = typeof post.video === 'object' && post.video !== null ? post.video.url : undefined

              return (
                <div key={post.id || index} onClick={() => videoUrl && handleVideoClick(videoUrl, reviewName, reviewComment)} className='bg-card border-border group h-[300px] cursor-pointer overflow-hidden rounded-[26px] border shadow-none transition-all duration-300 hover:shadow-sm lg:h-[350px]'>
                  <div className='flex h-full'>
                    {/* Video Section */}
                    <div className='border-border relative h-full w-1/2 overflow-hidden border-r'>
                      {videoUrl ? (
                        <video className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105' autoPlay muted loop playsInline>
                          <source src={videoUrl} type='video/mp4' />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className='bg-sitora-text-muted/10 flex h-full w-full items-center justify-center'>
                          <Play className='text-sitora-text-muted h-12 w-12' />
                        </div>
                      )}

                      {/* Play Button Overlay */}
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='bg-sitora-white/90 hover:bg-sitora-white rounded-full p-4 backdrop-blur-sm transition-all duration-300 group-hover:scale-110'>
                          <Play className='text-sitora-primary h-6 w-6 fill-current' />
                        </div>
                      </div>
                    </div>

                    {/* Review Content Section */}
                    <div className='flex w-1/2 flex-col justify-center p-6'>
                      <h4 className='text-sitora-text-subtitle mb-2 text-base font-bold'>{reviewName}</h4>
                      <p className='text-sitora-body line-clamp-3 text-sm leading-relaxed'>&quot;{reviewComment}&quot;</p>
                      <div className='mt-4 flex items-center justify-start gap-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < (reviewRating || 0) ? 'text-sitora-gold-medium fill-current' : 'text-sitora-muted dark:text-muted-foreground'}`} />
                        ))}
                      </div>
                      <p className='text-sitora-body mt-2 text-right text-sm leading-relaxed'>{reviewTour}</p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        {/* Video Dialog */}
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogContent className='border-border bg-card outline-none!important max-w-4xl overflow-hidden rounded-[32px!important] p-0 shadow-lg'>
            <DialogTitle className='sr-only'>{selectedVideo?.title}</DialogTitle>
            <div className='relative'>
              {/* Close Button */}
              <button onClick={handleCloseDialog} className='bg-sitora-white/90 hover:bg-sitora-white absolute top-4 right-4 z-50 cursor-pointer rounded-full p-2 backdrop-blur-sm transition-colors duration-300'>
                <X className='text-sitora-text-subtitle h-5 w-5' />
              </button>

              {/* Video Player */}
              {selectedVideo && (
                <div className='relative aspect-video w-full overflow-hidden rounded-[26px]'>
                  <video className='h-full w-full object-contain' controls autoPlay>
                    <source src={selectedVideo.url} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Review Info */}
              {selectedVideo && (
                <div className='bg-card border-border border-t p-6'>
                  <h3 className='text-sitora-text-subtitle mb-2 text-xl font-bold'>{selectedVideo.title}</h3>
                  <p className='text-sitora-body text-sm leading-relaxed'>&quot;{selectedVideo.subtitle}&quot;</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default Hero
