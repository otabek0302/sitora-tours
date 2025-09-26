import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'

const Hero = () => {
    const t = useTranslations('pages.home.hero')

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Hero Card */}
                <div className="mb-8">
                    <div className="bg-card border-border group relative h-[400px] cursor-pointer overflow-hidden rounded-2xl border shadow-none transition-all duration-300 hover:shadow-sm lg:h-[500px]">
                        {/* Background Image */}
                        <Image src="/images/hero-main.jpg" alt="Discover Amazing Places" fill sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-2xl px-8 lg:px-12">
                                <h1 className="text-sitora-white mb-6 text-4xl leading-tight font-bold lg:text-6xl">{t('main_title')}</h1>
                                <p className="text-sitora-white mb-8 text-lg leading-relaxed opacity-90 lg:text-xl">{t('main_subtitle')}</p>
                                <Button size="lg" className="bg-sitora-primary hover:bg-sitora-primary/90 text-sitora-white group">
                                    {t('main_button')}
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two Cards Below Hero */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Left Card - Image Only */}
                    <div className="bg-card border-border group h-[300px] cursor-pointer overflow-hidden rounded-xl border shadow-none transition-all duration-300 hover:shadow-sm lg:h-[350px]">
                        <div className="flex h-full">
                            {/* Video/Image Section */}
                            <div className="relative h-full w-1/2">
                                <Image src="/images/testimonial-group.jpg" alt="Group Tour" fill sizes="50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-sitora-white/90 hover:bg-sitora-white rounded-full p-4 backdrop-blur-sm transition-colors duration-300">
                                        <Play className="text-sitora-primary h-6 w-6 fill-current" />
                                    </div>
                                </div>
                            </div>

                            {/* Text Content Section */}
                            <div className="flex w-1/2 flex-col justify-center p-6">
                                <blockquote className="text-sitora-body mb-4 text-sm leading-relaxed italic">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud"</blockquote>
                                <div className="space-y-1">
                                    <h4 className="text-sitora-text-subtitle text-base font-bold">Alex Adams</h4>
                                    <p className="text-sitora-body text-sm">Classic Group Tour</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Card - Testimonial/Video */}
                    <div className="bg-card border-border group h-[300px] cursor-pointer overflow-hidden rounded-xl border shadow-none transition-all duration-300 hover:shadow-sm lg:h-[350px]">
                        <div className="flex h-full">
                            {/* Video/Image Section */}
                            <div className="relative h-full w-1/2">
                                <Image src="/images/testimonial-group.jpg" alt="Group Tour" fill sizes="50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-sitora-white/90 hover:bg-sitora-white rounded-full p-4 backdrop-blur-sm transition-colors duration-300">
                                        <Play className="text-sitora-primary h-6 w-6 fill-current" />
                                    </div>
                                </div>
                            </div>

                            {/* Text Content Section */}
                            <div className="flex w-1/2 flex-col justify-center p-6">
                                <blockquote className="text-sitora-body mb-4 text-sm leading-relaxed italic">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud"</blockquote>
                                <div className="space-y-1">
                                    <h4 className="text-sitora-text-subtitle text-base font-bold">Alex Adams</h4>
                                    <p className="text-sitora-body text-sm">Classic Group Tour</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
