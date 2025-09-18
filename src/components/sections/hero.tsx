'use client';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');
  
  return (
    <section className="h-screen relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">

          {/* Main Content */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t('title')}
            <span className="block text-yellow-300">{t('titleHighlight')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

        </div>
      </div>
    </section>
  );
};

export default Hero;
