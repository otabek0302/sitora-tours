import { ReactNode } from 'react'
import './global.css'

import { getMessages } from 'next-intl/server'
import { Providers } from '@/providers'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

type Props = {
    children: ReactNode
    params: { locale: string }
}

export default async function Layout({ children, params }: Props) {
    const { locale } = await params
    const messages = await getMessages({ locale })

    return (
        <html lang={locale}>
            <body>
                <Providers locale={locale} messages={messages}>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
