import Button from './Button';

import { ContactFormHero } from './ContactFormHero';
import ReactPlayer from 'react-player';

interface HeroProps {
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
}

const Hero = ({
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
}: HeroProps) => {
  console.log(backgroundUrl);
  return (
    <section
      id='hero'
      style={{
        backgroundImage: `url(${hasBackground ? backgroundUrl : ''})`,
      }}
      className='relative  bg-no-repeat bg-center bg-cover flex items-center justify-between overflow-hidden text-ink-dark pt-[var(--site-header-h)] pb-14  md:pb-0 md:min-h-[700px]'
    >
      {hasBackground ? (
        <div
          style={{
            backgroundImage: 'url("public/img/hero-bg-texture.avif")',
          }}
          className='bg-no-repeat bg-center bg-cover opacity-70 absolute w-full inset-0'
        ></div>
      ) : null}

      <div
        className={`flex md:flex-row flex-col hero-container mx-auto md:justify-center items-center text-center ${heroType === 'clean' ? '' : 'md:text-start'} container px-8`}
      >
        <div className='mt-12 md:mt-0 md:w-1/2 z-10 p-4 my-8'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6'>
            {title}
          </h1>
          <p className='text-xl md:text-2xl text-black font-bold'>
            {description}
          </p>
          {hasButton ? (
            <Button
              className={`mx-auto mt-4 md:mx-0 text-center ${heroType === 'clean' ? 'place-self-center' : ''}`}
            >
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

export default Hero;
