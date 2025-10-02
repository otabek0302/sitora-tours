import { ReactNode } from 'react'
import './global.css'
import Script from 'next/script'

import { getMessages } from 'next-intl/server'
import { Providers } from '@/providers'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import CookieConsent from '@/components/ui/cookie-consent'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <head>
        {/* Google Site Verification */}
        <meta name='google-site-verification' content='j07f1HmJvncNCzLIv9aGfYmvv_AqSiImPnhkeRDpZus' />

        {/* Google Tag Manager */}
        <Script
          id='gtm-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXXXX');
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src='https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXXXX' height='0' width='0' style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>

        <Providers locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          <CookieConsent />
        </Providers>

        {/* Google Analytics */}
        <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' />
        <Script
          id='gtag-init'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </body>
    </html>
  )
}
