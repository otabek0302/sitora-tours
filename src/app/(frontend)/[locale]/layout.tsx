import { ReactNode } from 'react';
import './global.css';

import { getMessages } from 'next-intl/server';
import { Providers } from '@/providers';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
