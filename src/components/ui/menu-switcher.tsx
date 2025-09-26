'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HamburgerButton } from './hamburger-button'
import { usePathname } from 'next/navigation'
import { Mail, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'

const menu = {
    open: {
        width: '270px',
        height: '420px',
        top: '-12px',
        right: '-12px',
        transition: { duration: 0.75, type: 'tween' as const, ease: [0.76, 0, 0.24, 1] as const },
    },
    closed: {
        width: '20px',
        height: '20px',
        top: '10px',
        right: '10px',
        transition: {
            duration: 0.75,
            delay: 0,
            type: 'tween' as const,
            ease: [0.76, 0, 0.24, 1] as const,
        },
    },
}

export const MenuSwitcher = () => {
    const t = useTranslations('navigation')
    const [open, setOpen] = useState(false)
    const [containerOpen, setContainerOpen] = useState(false)
    const [decorVisible, setDecorVisible] = useState(false)

    const pathname = usePathname()

    useEffect(() => {
        if (open) {
            setContainerOpen(true)
            setDecorVisible(true)
        }
    }, [open])

    return (
        <div className="relative md:hidden">
            <HamburgerButton active={open} setActive={setOpen} />

            <motion.div className={`absolute z-10 overflow-hidden rounded-xl ${decorVisible ? 'bg-sitora-white border-border border shadow-lg backdrop-blur-md' : 'bg-transparent'}`} variants={menu} animate={containerOpen ? 'open' : 'closed'} initial="closed" onAnimationComplete={(definition) => (!containerOpen ? setDecorVisible(false) : null)}>
                <AnimatePresence mode="wait" onExitComplete={() => (!open ? setContainerOpen(false) : null)}>
                    {open && (
                        <motion.div key="menu-content" initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.3 }} className="space-y-2 px-2 py-14">
                            <motion.p className={`bg-sitora-primary-light block border-l-2 px-2 py-2 ${pathname == '/en' ? 'border-sitora-primary' : 'border-border'}`}>
                                <Link href="/" onClick={() => setOpen(false)} className="text-sitora-body text-md hover:text-sitora-primary-dark rounded-md leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium">
                                    <span className="block">{t('home')}</span>
                                </Link>
                            </motion.p>
                            <motion.p className={`block border-l-2 px-2 py-2 ${pathname == '/about' ? 'border-sitora-primary' : 'border-border'}`}>
                                <Link href="/about-us" onClick={() => setOpen(false)} className="text-sitora-body text-md hover:text-sitora-primary-dark rounded-md leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium">
                                    <span className="block">{t('about')}</span>
                                </Link>
                            </motion.p>
                            <motion.p className={`block border-l-2 px-2 py-2 ${pathname == '/tours' ? 'border-sitora-primary' : 'border-border'}`}>
                                <Link href="/tours" onClick={() => setOpen(false)} className="text-sitora-body text-md hover:text-sitora-primary-dark rounded-md leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium">
                                    <span className="block">{t('tours')}</span>
                                </Link>
                            </motion.p>
                            <motion.p className={`block border-l-2 px-2 py-2 ${pathname == '/cities' ? 'border-sitora-primary' : 'border-border'}`}>
                                <Link href="/cities" onClick={() => setOpen(false)} className="text-sitora-body text-md hover:text-sitora-primary-dark rounded-md leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium">
                                    <span className="block">{t('cities')}</span>
                                </Link>
                            </motion.p>
                            <motion.p className={`block border-l-2 px-2 py-2 ${pathname == '/hotels' ? 'border-sitora-primary' : 'border-border'}`}>
                                <Link href="/hotels" onClick={() => setOpen(false)} className="text-sitora-body text-md hover:text-sitora-primary-dark rounded-md leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium">
                                    <span className="block">{t('hotels')}</span>
                                </Link>
                            </motion.p>
                            <motion.p className={`block border-l-2 px-2 py-2 ${pathname == '/cars' ? 'border-sitora-primary' : 'border-border'}`}>
                                <Link href="/cars" onClick={() => setOpen(false)} className="text-sitora-body text-md hover:text-sitora-primary-dark rounded-md leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium">
                                    <span className="block">{t('cars')}</span>
                                </Link>
                            </motion.p>
                            <motion.p className="border-sitora-primary bg-sitora-primary-light border-x-2 px-2 py-2">
                                <Link href="mailto:info@sitoratours.com" onClick={() => setOpen(false)} className="text-sitora-body text-md flex items-center justify-center gap-2 leading-tight font-normal">
                                    <Mail className="text-sitora-primary h-4 w-4" />
                                    <span className="text-sitora-primary block">info@sitoratours.com</span>
                                </Link>
                            </motion.p>
                            <motion.p className="border-sitora-primary bg-sitora-primary-light border-x-2 px-2 py-2">
                                <Link href="tel:+998901234567" onClick={() => setOpen(false)} className="text-sitora-body text-md flex items-center justify-center gap-2 leading-tight font-normal">
                                    <Phone className="text-sitora-primary h-4 w-4" />
                                    <span className="text-sitora-primary block">+998901234567</span>
                                </Link>
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
