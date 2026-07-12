import Button from './Button';

interface SEOLandingHeroProps {
  title: string;
  subtitle: string;
  description: string;
  trustLine?: string;
  ctaText: string;
  onCTAClick: () => void;
  secondaryCTAText?: string;
  secondaryCTAAction?: () => void;
  secondaryCTAIcon?: 'phone' | 'chevron-down';
  backgroundImage?: string;
}

const SEOLandingHero = ({
  title,
  subtitle,
  description,
  trustLine,
  ctaText,
  onCTAClick,
  secondaryCTAText,
  secondaryCTAAction,
  backgroundImage = '/img/hero-home.webp',
}: SEOLandingHeroProps) => {
  return (
    <section className='relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-20 pb-10'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className='absolute inset-0 bg-black/60'></div>
      </div>

      <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-12'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight'>
          {title}
        </h1>

        <h2 className='text-lg md:text-2xl lg:text-3xl font-semibold text-white/90 mb-6'>
          {subtitle}
        </h2>

        <p
          className={`text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed ${trustLine ? 'mb-4' : 'mb-8'}`}
        >
          {description}
        </p>

        {trustLine && (
          <p className='text-sm md:text-base text-accent mb-8 font-semibold'>
            {trustLine}
          </p>
        )}

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-12'>
          <Button
            onClick={onCTAClick}
            variant='primary'
            className='sm:min-w-[240px] !border-white !shadow-[5px_5px_0_0_rgba(255,255,255,0.35)] hover:!shadow-[2px_2px_0_0_rgba(255,255,255,0.35)]'
          >
            {ctaText}
          </Button>
          {secondaryCTAText && secondaryCTAAction && (
            <Button
              onClick={secondaryCTAAction}
              variant='secondary'
              className='sm:min-w-[240px]'
            >
              {secondaryCTAText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SEOLandingHero;
