import React from 'react';
import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Footer from '@/components/layout/footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default HomePage;
