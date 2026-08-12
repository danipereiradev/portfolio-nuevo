import Button from './Button';
import GlowBackdrop from './decor/GlowBackdrop';

interface SEOCTAFinalProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
  /** Fondo de imagen opcional (con overlay oscuro). */
  backgroundImage?: string;
  className?: string;
}

const SEOCTAFinal = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
  backgroundImage,
  className = '',
}: SEOCTAFinalProps) => {
  return (
    <section
      className={`relative py-20 overflow-hidden ${className}`.trim()}
    >
      {backgroundImage ? (
        <>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url('${backgroundImage}')` }}
            aria-hidden='true'
          />
          <div className='absolute inset-0 bg-ink-dark/85' aria-hidden='true' />
        </>
      ) : (
        <GlowBackdrop />
      )}

      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
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
              className='!bg-accent !text-white !border-white hover:!bg-accent-hover text-sm md:text-base !shadow-[5px_5px_0_0_rgba(255,255,255,0.3)] hover:!shadow-[2px_2px_0_0_rgba(255,255,255,0.3)]'
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
