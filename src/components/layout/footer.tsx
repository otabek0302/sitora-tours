"use client";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;