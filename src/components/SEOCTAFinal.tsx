import Button from './Button';

interface SEOCTAFinalProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
  className?: string;
}

const SEOCTAFinal = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
  className = '',
}: SEOCTAFinalProps) => {
  return (
    <section className={`relative py-20 overflow-hidden ${className}`.trim()}>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: "url('/img/cta-pereiraweb.webp')" }}
        aria-hidden='true'
      />
      <div className='absolute inset-0 bg-[#141414]/70' aria-hidden='true' />

      <div className='container mx-auto px-6 relative z-10'>
        <div className='   mx-auto text-center'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6'>
            {title}
          </h2>
          <p className='text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed'>
            {subtitle}
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button
              onClick={onButtonClick}
              variant='primary'
              className='text-sm md:text-base'
            >
              {buttonText}
            </Button>
            {secondaryButtonText && onSecondaryButtonClick && (
              <Button
                onClick={onSecondaryButtonClick}
                variant='secondary'
                className='text-sm md:text-base'
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOCTAFinal;
