import Button from './Button';

import { ContactFormHero } from './ContactFormHero';
import ReactPlayer from 'react-player';
import TestimonialsBadge from './TestimonialsBadge';

interface HeroCtaProps {
  title: string;
  description: string;
  buttonText: string;
  backgroundUrl?: string;
  heroType?: 'form' | 'video' | 'clean';
  videoUrl?: string;
  hasButton: boolean;
  hasBackground: boolean;
  formTitle: string;
  formDescription: string;
  formSectionInfo: string;
  hasReviewBadge: boolean;
  isTopHero: boolean;
}

const HeroCta = ({
  title,
  description,
  buttonText,
  backgroundUrl,
  heroType,
  videoUrl,
  hasButton,
  hasBackground,
  formTitle,
  formDescription,
  formSectionInfo,
  hasReviewBadge,
  isTopHero,
}: HeroCtaProps) => {
  console.log(backgroundUrl);
  return (
    <section
      id='hero'
      style={{
        backgroundImage: `url(${hasBackground ? backgroundUrl : ''})`,
      }}
      className={`${isTopHero ? 'md:pt-12' : ''} relative bg-no-repeat bg-center bg-cover flex items-center justify-between overflow-hidden text-ink-dark`}
    >
      {hasBackground ? (
        <div
          style={{
            backgroundImage: 'url("/img/hero-bg-texture.avif")',
          }}
          className='bg-no-repeat bg-center bg-cover opacity-80 absolute w-full inset-0'
        ></div>
      ) : null}

      <div
        className={`flex md:flex-row flex-col hero-container mx-auto md:justify-center items-center text-center ${heroType === 'clean' ? '' : 'md:text-start'} container px-8 md:h-[100vh] text-center md:text-start gap-8  py-8 md:py-0 md:px-8 z-30`}
      >
        <div className='md:w-1/2 flex flex-col items-center md:items-start gap-4'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900'>
            {title}
          </h2>
          <p className='text-lg md:text-xl text-black md:text-justify'>
            {description}
          </p>
          {hasReviewBadge ? <TestimonialsBadge /> : null}
          {hasButton ? (
            <Button className='mx-auto md:mx-0 place-self-start m-0'>
              {buttonText}
            </Button>
          ) : null}
        </div>
        {heroType !== 'clean' ? (
          heroType === 'form' ? (
            <ContactFormHero
              title={formTitle}
              description={formDescription}
              page={formSectionInfo}
            />
          ) : (
            <div className='flex justify-end items-center md:w-1/2 z-10 '>
              <ReactPlayer width={450} controls src={videoUrl} />
            </div>
          )
        ) : null}
      </div>
    </section>
  );
};

export default HeroCta;
