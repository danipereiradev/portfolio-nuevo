import React from 'react';
import { ArrowDown, Code2, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackButtonClick } from '../utils/analytics';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    trackButtonClick('Solicitar Presupuesto', 'Hero');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id='hero'
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: 'url(/boitumelo-qniDxn6-qvY-unsplash.jpg)',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-black/60'></div>
      </div>

      <div className='relative z-10 text-center max-w-4xl mx-auto'>
        <h1 className='text-5xl md:text-7xl font-bold text-white mb-4 leading-tight'>
          {t('hero.title')}
        </h1>

        <h2 className='text-2xl md:text-3xl font-semibold text-white/90 mb-8'>
          {t('hero.subtitle')}
        </h2>

        <p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed'>
          {t('hero.description')}
          <span className='block mt-2'>
            <Zap className='inline w-6 h-6 text-ink-light mr-2' />
            {t('hero.features')}
          </span>
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
          <button
            onClick={scrollToContact}
            className='bg-white text-ink-dark px-8 py-4 rounded-full font-semibold text-lg hover:bg-ink-light transform hover:scale-105 transition-all duration-200 shadow-lg'
          >
            {t('hero.cta.quote')}
          </button>
        </div>

        <div className='animate-bounce'>
          <ArrowDown className='w-8 h-8 text-white mx-auto' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
