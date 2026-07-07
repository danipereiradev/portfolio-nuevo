import { MessageCircle, Tag, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackButtonClick, trackWhatsAppClick } from '../utils/analytics';
import { DEFAULT_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../config/contact';
import Button from './Button';

const WHATSAPP_URL = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Hero', t('hero.cta.whatsapp'));
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  const handleViewPricing = () => {
    trackButtonClick('Ver precios', 'Hero');
    scrollToSection('pricing');
  };

  const handleViewPortfolio = () => {
    trackButtonClick('Ver trabajos reales', 'Hero');
    scrollToSection('portfolio');
  };

  return (
    <section
      id='hero'
      className='relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-20 pb-10'
    >
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: 'url(/img/hero-home.webp)',
        }}
      >
        <div className='absolute inset-0 bg-black/60'></div>
      </div>

      <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-12'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight'>
          {t('hero.title')}
        </h1>

        <p className='text-base md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto'>
          {t('hero.subtitle')}
        </p>

        <div className='flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center items-stretch'>
          <Button
            onClick={handleWhatsAppClick}
            variant='primary'
            className='sm:min-w-[240px] !bg-green-500 hover:!bg-green-600'
          >
            <MessageCircle className='w-4 h-4 md:w-5 md:h-5' />
            {t('hero.cta.whatsapp')}
          </Button>

          <Button
            onClick={handleViewPricing}
            variant='secondary'
            className='sm:min-w-[180px]'
          >
            <Tag className='w-4 h-4 md:w-5 md:h-5' />
            {t('hero.cta.pricing')}
          </Button>

          <Button
            onClick={handleViewPortfolio}
            variant='ghost'
            className='sm:min-w-[180px] !bg-white/10 !text-white hover:!bg-white/20 backdrop-blur-sm'
          >
            <Briefcase className='w-4 h-4 md:w-5 md:h-5' />
            {t('hero.cta.portfolio')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
