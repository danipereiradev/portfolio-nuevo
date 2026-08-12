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
      className='relative flex items-center justify-center overflow-hidden pt-[var(--site-header-h)] pb-14 min-h-[70vh] md:pb-0 md:min-h-[100svh]'
    >
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: "url('/img/web-design-charlesdeluvio.webp')" }}
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 bg-ink-dark/60'
        aria-hidden='true'
      />

      <div className='relative z-10 w-full mx-auto max-w-screen-2xl px-6'>
        <div className='max-w-3xl mx-auto text-center animate-fade-in'>
          <p className='text-accent font-mono text-sm md:text-base font-semibold tracking-tight mb-5'>
            pereiraweb.es — estudio web
          </p>

          <h1 className='text-4xl md:text-6xl lg:text-[4.25rem] font-extrabold text-white mb-5 leading-[1.05] tracking-tight'>
            {t('hero.title')}
          </h1>

          <p className='text-base md:text-xl text-white/85 mb-4 leading-relaxed mx-auto max-w-2xl'>
            {t('hero.subtitle')}
          </p>

          <p className='text-sm md:text-base text-white/65 mb-8 font-medium'>
            {t('hero.trustline')}
          </p>

          <div className='flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center items-stretch sm:items-center'>
            <Button
              onClick={handleWhatsAppClick}
              variant='primary'
              className='sm:min-w-[220px]'
            >
              <MessageCircle className='w-4 h-4 md:w-5 md:h-5' />
              {t('hero.cta.whatsapp')}
            </Button>

            <Button
              onClick={handleRequestProposal}
              variant='secondary'
              className='sm:min-w-[200px]'
            >
              {t('hero.cta.pricing')}
            </Button>

            <Button
              onClick={handleViewPortfolio}
              variant='ghost'
              className='sm:min-w-[160px] !bg-transparent !text-white !border-white/40 !shadow-none hover:!bg-white/10 hover:!shadow-none hover:!translate-x-0 hover:!translate-y-0'
            >
              {t('hero.cta.portfolio')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
