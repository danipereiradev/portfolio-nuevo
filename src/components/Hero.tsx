import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useContactModal } from '../contexts/ContactModalContext';
import {
  trackButtonClick,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import { DEFAULT_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../config/contact';
import Button from './Button';

const WHATSAPP_URL = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

const Hero = () => {
  const { t } = useLanguage();
  const { openModal } = useContactModal();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Hero', t('hero.cta.whatsapp'));
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  const handleRequestProposal = () => {
    trackButtonClick('Solicitar propuesta', 'Hero');
    openModal();
  };

  const handleViewPortfolio = () => {
    trackButtonClick('Ver trabajos', 'Hero');
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

        <p className='text-base md:text-xl lg:text-2xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto'>
          {t('hero.subtitle')}
        </p>

        <p className='text-sm md:text-base text-white/70 mb-8 font-medium'>
          {t('hero.trustline')}
        </p>

        <div className='flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center items-stretch'>
          <Button
            onClick={handleRequestProposal}
            variant='secondary'
            className='sm:min-w-[200px]'
          >
            {t('hero.cta.pricing')}
          </Button>

          <Button
            onClick={handleWhatsAppClick}
            variant='primary'
            className='sm:min-w-[220px] !bg-green-500 hover:!bg-green-600'
          >
            <MessageCircle className='w-4 h-4 md:w-5 md:h-5' />
            {t('hero.cta.whatsapp')}
          </Button>

          <Button
            onClick={handleViewPortfolio}
            variant='ghost'
            className='sm:min-w-[180px] !bg-transparent !text-white border border-white/40 hover:!bg-white/10'
          >
            {t('hero.cta.portfolio')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
