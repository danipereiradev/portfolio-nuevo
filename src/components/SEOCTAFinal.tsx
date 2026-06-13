import { ArrowRight } from 'lucide-react';
import Button from './Button';

interface SEOCTAFinalProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
}

const SEOCTAFinal = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}: SEOCTAFinalProps) => {
  return (
    <section className='relative py-20 overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: 'url(/mohammad-rahmani-8qEB0fTe9Vw-unsplash.jpg)',
        }}
      >
        <div className='absolute inset-0 bg-black/75'></div>
      </div>

      {/* Content */}
      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            {title}
          </h2>
          <p className='text-xl text-white/90 mb-8 leading-relaxed'>
            {subtitle}
          </p>
          <div className='flex justify-center'>
            <Button
              onClick={onButtonClick}
              variant='primary'
              className='!bg-accent !text-white hover:!bg-accent-hover'
            >
              {buttonText}
              <ArrowRight className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOCTAFinal;
