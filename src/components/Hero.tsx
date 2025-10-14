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
          backgroundImage:
            'url(https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-black/40'></div>
      </div>

      {/* Animated Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/80 to-green-500/80 overflow-hidden'>
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
          <div className='absolute top-0 right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
          <div className='absolute bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
        </div>
      </div>

      <div className='relative z-10 text-center px-6 max-w-4xl mx-auto'>
        <div className='flex justify-center mb-6'>
          <Code2 className='w-16 h-16 text-green-400 animate-pulse' />
        </div>

        <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
          {t('hero.title')}
          <span className='block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent'>
            {t('hero.subtitle')}
          </span>
        </h1>

        <p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed'>
          {t('hero.description')}
          <span className='block mt-2'>
            <Zap className='inline w-6 h-6 text-yellow-400 mr-2' />
            {t('hero.features')}
          </span>
        </p>

        {/* Badges de Urgencia/Valor */}
        <div className='hidden md:flex flex-wrap gap-2 justify-center mb-8'>
          <span className='bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1'>
            <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                clipRule='evenodd'
              />
            </svg>
            Respuesta en 24h
          </span>
          <span className='bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1'>
            <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z'
                clipRule='evenodd'
              />
            </svg>
            Desde €350
          </span>
          <span className='bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1'>
            <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
            4.8/5 valoración
          </span>
          <span className='bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 border border-white/30'>
            <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
            100% Garantía
          </span>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
          <button
            onClick={scrollToContact}
            className='bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg'
          >
            {t('hero.cta.quote')}
          </button>
          <button
            onClick={() => {
              trackButtonClick('Ver Portfolio', 'Hero');
              document
                .getElementById('portfolio')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className='border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200'
          >
            {t('hero.cta.portfolio')}
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
