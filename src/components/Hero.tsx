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
import GlowBackdrop from './decor/GlowBackdrop';
import FloatingPanel from './decor/FloatingPanel';

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
      className='relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-[5.625rem] md:pt-[6.5rem] pb-16'
    >
      <GlowBackdrop />

      <FloatingPanel
        variant='code'
        tilt={-8}
        className='hidden lg:block absolute top-28 left-[6%] z-0'
      />
      <FloatingPanel
        variant='layout'
        tilt={7}
        className='hidden lg:block absolute bottom-16 right-[6%] z-0'
      />

      <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-12 animate-fade-in'>
        <span className='inline-block bg-accent text-ink-dark text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 border-2 border-white/80 rotate-[-2deg] mb-6 shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]'>
          Estudio web · Madrid
        </span>

        <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 leading-[1.05] tracking-tight'>
          {t('hero.title')}
        </h1>

        <p className='text-base md:text-xl lg:text-2xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto'>
          {t('hero.subtitle')}
        </p>

        <p className='text-sm md:text-base text-accent mb-8 font-semibold'>
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
            className='sm:min-w-[220px] !shadow-[5px_5px_0_0_#0d9488] hover:!shadow-[2px_2px_0_0_#0d9488]'
          >
            <MessageCircle className='w-4 h-4 md:w-5 md:h-5' />
            {t('hero.cta.whatsapp')}
          </Button>

          <Button
            onClick={handleViewPortfolio}
            variant='ghost'
            className='sm:min-w-[180px] !bg-transparent !text-white !border-white/50 !shadow-[5px_5px_0_0_rgba(255,255,255,0.3)] hover:!bg-white/10 hover:!shadow-[2px_2px_0_0_rgba(255,255,255,0.3)]'
          >
            {t('hero.cta.portfolio')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
