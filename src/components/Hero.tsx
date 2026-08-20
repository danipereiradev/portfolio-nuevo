import Button from './Button';
import TestimonialsBadge from './TestimonialsBadge';

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  backgroundUrl?: string;
  hasButton: boolean;
  hasBackground: boolean;
  hasReviewBadge: boolean;
}

const Hero = ({
  title,
  description,
  buttonText,
  backgroundUrl,
  hasButton,
  hasBackground,
  hasReviewBadge,
}: HeroProps) => {
  console.log(backgroundUrl);
  return (
    <section
      id='hero'
      style={{
        backgroundImage: `url(${hasBackground ? backgroundUrl : ''})`,
      }}
      className='page-hero bg-no-repeat bg-center bg-cover text-ink-dark'
    >
      {hasBackground ? (
        <div
          style={{
            backgroundImage: 'url("/img/hero-bg-texture.avif")',
          }}
          className='bg-no-repeat bg-center bg-cover opacity-80 absolute w-full inset-0'
        ></div>
      ) : null}

      <div className='container mx-auto flex flex-col items-center text-center md:flex-row md:justify-center'>
        <div className='z-10 flex flex-col gap-page-gap md:w-1/2'>
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
            <Button className='mx-auto md:mx-0 text-center place-self-center'>
              {buttonText}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Hero;
