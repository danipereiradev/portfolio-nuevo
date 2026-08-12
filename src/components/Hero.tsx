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
      className='relative min-h-[min(92vh,820px)] flex items-end md:items-center overflow-hidden pt-24 pb-14 md:pb-20'
    >
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: "url('/img/hero-home.webp')" }}
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 bg-gradient-to-r from-ink-dark via-ink-dark/92 to-ink-dark/55 md:to-ink-dark/40'
        aria-hidden='true'
      />
      <div
        className='absolute inset-0 bg-gradient-to-t from-ink-dark via-transparent to-ink-dark/40'
        aria-hidden='true'
      />

      <div className='relative z-10 w-full mx-auto max-w-screen-2xl px-6'>
        <div className='grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-10 lg:gap-14 items-end lg:items-center'>
          <div className='max-w-2xl animate-fade-in'>
            <p className='text-accent font-mono text-sm md:text-base font-semibold tracking-tight mb-5'>
              pereiraweb.es — estudio web
            </p>

            <h1 className='text-4xl md:text-6xl lg:text-[4.25rem] font-extrabold text-white mb-5 leading-[1.05] tracking-tight'>
              {t('hero.title')}
            </h1>

            <p className='text-base md:text-xl text-white/85 mb-4 leading-relaxed max-w-xl'>
              {t('hero.subtitle')}
            </p>

            <p className='text-sm md:text-base text-white/65 mb-8 font-medium'>
              {t('hero.trustline')}
            </p>

            <div className='flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 items-stretch sm:items-center'>
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

          <div className='hidden lg:flex justify-end'>
            <figure className='relative w-full max-w-md'>
              <img
                src='/img/portfolio/dani-pensando.png'
                alt='Dani Pereira, desarrollador web'
                width={640}
                height={640}
                className='w-full aspect-square object-cover border-2 border-white/20 grayscale'
                loading='eager'
                decoding='async'
              />
              <figcaption className='mt-3 text-sm text-white/60 font-medium'>
                Dani Pereira — quien hace las webs
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
