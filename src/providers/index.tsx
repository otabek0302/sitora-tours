'use client';

import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: any;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
        <Toaster position="top-right" richColors />
      </NextIntlClientProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
        <Toaster position="top-right" richColors />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
