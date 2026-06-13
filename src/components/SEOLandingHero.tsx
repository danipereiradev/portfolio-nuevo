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

      <div className='relative z-10 text-center max-w-4xl mx-auto p-4'>
        <h1 className='text-5xl md:text-7xl font-bold text-white mb-4 leading-tight'>
          {title}
        </h1>

        <h2 className='text-2xl md:text-3xl font-semibold text-white/90 mb-8'>
          {subtitle}
        </h2>

        <p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed'>
          {description}
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
          <Button onClick={onCTAClick} variant='primary'>
            {ctaText}
            <ArrowRight className='w-5 h-5' />
          </Button>
          {secondaryCTAText && secondaryCTAAction && (
            <Button onClick={secondaryCTAAction} variant='secondary'>
              {secondaryCTAText}
              <Phone className='w-5 h-5' />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SEOLandingHero;
