import type { ReactNode } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import Button from './Button';

interface SEOLandingHeroProps {
  title: ReactNode;
  subtitle: string;
  description: string;
  trustLine?: string;
  kicker?: string;
  ctaText: string;
  onCTAClick: () => void;
  secondaryCTAText?: string;
  secondaryCTAAction?: () => void;
  secondaryCTAIcon?: 'phone' | 'chevron-down';
  /** Texto breve bajo los CTAs (ej. bullets de confianza). */
  ctaFootnote?: string;
  /** Fondo de imagen. Por defecto hero-home. */
  backgroundImage?: string;
}

const SEOLandingHero = ({
  title,
  subtitle,
  description,
  trustLine,
  kicker,
  ctaText,
  onCTAClick,
  secondaryCTAText,
  secondaryCTAAction,
  secondaryCTAIcon,
  ctaFootnote,
  backgroundImage = '/img/hero-home.webp',
}: SEOLandingHeroProps) => {
  return (
    <section className='relative min-h-[min(88vh,760px)] flex items-center justify-center overflow-hidden pt-24 pb-14 md:pb-20'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        aria-hidden='true'
      />
      <div className='absolute inset-0 bg-ink-dark/80' aria-hidden='true' />

      <div className='relative z-10 w-full mx-auto max-w-screen-2xl px-6'>
        <div className='max-w-3xl mx-auto text-center animate-fade-in'>
          {kicker && (
            <p className='text-accent font-mono text-sm md:text-base font-semibold tracking-tight mb-5'>
              {kicker}
            </p>
          )}

          <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-[1.08] tracking-tight'>
            {title}
          </h1>

          <h2 className='text-lg md:text-2xl font-semibold text-white/90 mb-4'>
            {subtitle}
          </h2>

          <p
            className={`text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto ${trustLine ? 'mb-3' : 'mb-8'}`}
          >
            {description}
          </p>

          {trustLine && (
            <p className='text-sm md:text-base text-white/60 mb-8 font-medium'>
              {trustLine}
            </p>
          )}

          <div className='flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center'>
            <Button
              onClick={onCTAClick}
              variant='primary'
              className='sm:min-w-[220px]'
            >
              {ctaText}
            </Button>
            {secondaryCTAText && secondaryCTAAction && (
              <Button
                onClick={secondaryCTAAction}
                variant='secondary'
                className='sm:min-w-[200px]'
              >
                {secondaryCTAIcon === 'phone' && <Phone className='w-4 h-4' />}
                {secondaryCTAText}
                {secondaryCTAIcon === 'chevron-down' && (
                  <ChevronDown className='w-4 h-4' />
                )}
              </Button>
            )}
          </div>

          {ctaFootnote && (
            <p className='mt-6 text-sm text-white/65 font-medium'>
              {ctaFootnote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SEOLandingHero;
