import Button from './Button';
import TestimonialsBadge from './TestimonialsBadge';

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  backgroundUrl?: string;
  hasButton: boolean;
  hasBackground: boolean;
  hasReviewBadge: boolean;
}

const Hero = ({
  title,
  description,
  buttonText,
  buttonHref,
  backgroundUrl,
  hasButton,
  hasBackground,
  hasReviewBadge,
}: HeroProps) => {
  return (
    <section
      id='hero'
      style={{
        backgroundImage: `url(${hasBackground ? backgroundUrl : ''})`,
      }}
      className='page-hero-compact bg-cover bg-center bg-no-repeat text-ink-dark'
    >
      {hasBackground ? (
        <div
          style={{
            backgroundImage: 'url("/img/hero-bg-texture.avif")',
          }}
          className='absolute inset-0 w-full bg-cover bg-center bg-no-repeat opacity-70'
        ></div>
      ) : null}

      <div className='mx-auto flex w-[95%] max-w-5xl flex-col items-center text-center'>
        <div className='z-10 flex w-full flex-col items-center gap-page-gap'>
          <div className='page-title-block'>
            <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-ink-dark'>
              {title}
            </h1>
            <p className='text-xl md:text-2xl text-ink-dark font-bold'>
              {description}
            </p>
          </div>
          {hasReviewBadge ? <TestimonialsBadge /> : null}
          {hasButton ? (
            <Button className='mx-auto text-center' href={buttonHref}>
              {buttonText}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Hero;
