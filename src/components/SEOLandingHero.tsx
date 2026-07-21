import { Phone, ChevronDown } from 'lucide-react';
import Button from './Button';
import GlowBackdrop from './decor/GlowBackdrop';
import FloatingPanel from './decor/FloatingPanel';

interface SEOLandingHeroProps {
  title: string;
  subtitle: string;
  description: string;
  trustLine?: string;
  kicker?: string;
  ctaText: string;
  onCTAClick: () => void;
  secondaryCTAText?: string;
  secondaryCTAAction?: () => void;
  secondaryCTAIcon?: 'phone' | 'chevron-down';
}

const SEOLandingHero = ({
  title,
  subtitle,
  description,
  trustLine,
  kicker = 'Estudio web · Madrid',
  ctaText,
  onCTAClick,
  secondaryCTAText,
  secondaryCTAAction,
  secondaryCTAIcon,
}: SEOLandingHeroProps) => {
  return (
    <section className='relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 pb-16'>
      <GlowBackdrop />

      <FloatingPanel
        variant='layout'
        tilt={-7}
        className='hidden lg:block absolute top-28 left-[6%] z-0'
      />
      <FloatingPanel
        variant='code'
        tilt={8}
        className='hidden lg:block absolute bottom-16 right-[6%] z-0'
      />

      <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-12 animate-fade-in'>
        <span className='inline-block bg-accent text-ink-dark text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 border-2 border-white/80 rotate-[-2deg] mb-6 shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]'>
          {kicker}
        </span>

        <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight'>
          {title}
        </h1>

        <h2 className='text-lg md:text-2xl lg:text-3xl font-semibold text-white/90 mb-4'>
          {subtitle}
        </h2>

        <p
          className={`text-base md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto ${trustLine ? 'mb-4' : 'mb-8'}`}
        >
          {description}
        </p>

        {trustLine && (
          <p className='text-sm md:text-base text-accent mb-8 font-semibold'>
            {trustLine}
          </p>
        )}

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-stretch'>
          <Button
            onClick={onCTAClick}
            variant='primary'
            className='sm:min-w-[240px] !shadow-[5px_5px_0_0_#0d9488] hover:!shadow-[2px_2px_0_0_#0d9488]'
          >
            {ctaText}
          </Button>
          {secondaryCTAText && secondaryCTAAction && (
            <Button
              onClick={secondaryCTAAction}
              variant='secondary'
              className='sm:min-w-[240px]'
            >
              {secondaryCTAIcon === 'phone' && <Phone className='w-4 h-4' />}
              {secondaryCTAText}
              {secondaryCTAIcon === 'chevron-down' && (
                <ChevronDown className='w-4 h-4' />
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SEOLandingHero;
