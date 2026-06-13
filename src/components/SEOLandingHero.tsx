import { ArrowRight, Phone } from 'lucide-react';
import Button from './Button';

interface SEOLandingHeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onCTAClick: () => void;
  secondaryCTAText?: string;
  secondaryCTAAction?: () => void;
  backgroundImage?: string;
}

const SEOLandingHero = ({
  title,
  subtitle,
  description,
  ctaText,
  onCTAClick,
  secondaryCTAText,
  secondaryCTAAction,
  backgroundImage = '/boitumelo-qniDxn6-qvY-unsplash.jpg',
}: SEOLandingHeroProps) => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className='absolute inset-0 bg-black/60'></div>
      </div>

      <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-4'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight'>
          {title}
        </h1>

        <h2 className='text-lg md:text-2xl lg:text-3xl font-semibold text-white/90 mb-6'>
          {subtitle}
        </h2>

        <p className='text-base md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed'>
          {description}
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-12'>
          <Button
            onClick={onCTAClick}
            variant='primary'
            className='sm:min-w-[240px]'
          >
            {ctaText}
            <ArrowRight className='w-4 h-4 md:w-5 md:h-5' />
          </Button>
          {secondaryCTAText && secondaryCTAAction && (
            <Button
              onClick={secondaryCTAAction}
              variant='secondary'
              className='sm:min-w-[240px]'
            >
              {secondaryCTAText}
              <Phone className='w-4 h-4 md:w-5 md:h-5' />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SEOLandingHero;
