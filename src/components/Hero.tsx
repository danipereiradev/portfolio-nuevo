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
      className='relative  bg-no-repeat bg-center bg-cover flex items-center justify-between overflow-hidden text-ink-dark   pb-14  md:pb-0 min-h-[100vh] md:min-h-[90vh]'
    >
      {hasBackground ? (
        <div
          style={{
            backgroundImage: 'url("/img/hero-bg-texture.avif")',
          }}
          className='bg-no-repeat bg-center bg-cover opacity-80 absolute w-full inset-0'
        ></div>
      ) : null}

      <div className='flex md:flex-row flex-col hero-container mx-auto md:justify-center items-center text-center container px-8'>
        <div className='md:w-1/2 mt-8 md:mt-0 z-10 flex flex-col gap-8'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900'>
            {title}
          </h1>
          <p className='text-xl md:text-2xl text-black font-bold'>
            {description}
          </p>
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
