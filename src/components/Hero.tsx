import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContactModal } from '../contexts/ContactModalContext';
import { trackButtonClick } from '../utils/analytics';
import Button from './Button';

const Hero = () => {
  const { t } = useLanguage();
  const { openModal } = useContactModal();

  const handleRequestQuote = () => {
    trackButtonClick('Solicita presupuesto', 'Hero');
    openModal();
  };

  return (
    <section
      id='hero'
      className='relative h-[75vh] flex items-center justify-center overflow-hidden pt-20'
    >
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: 'url(/boitumelo-qniDxn6-qvY-unsplash.jpg)',
        }}
      >
        <div className='absolute inset-0 bg-black/60'></div>
      </div>

      <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-4'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight'>
          {t('hero.title')}
        </h1>

        <h2 className='text-lg md:text-2xl lg:text-3xl font-semibold text-white/90 mb-8'>
          {t('hero.subtitle')}
        </h2>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
          <Button onClick={handleRequestQuote} variant='primary'>
            {t('hero.cta.quote')}
          </Button>
        </div>

        <div className='animate-bounce'>
          <ArrowDown className='w-8 h-8 text-white mx-auto' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
