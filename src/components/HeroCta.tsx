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
  isTopHero?: boolean;
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
  isTopHero = false,
}: HeroCtaProps) => {
  console.log(backgroundUrl);
  return (
    <section
      id={isTopHero ? 'hero' : undefined}
      style={
        hasBackground && backgroundUrl
          ? { backgroundImage: `url(${backgroundUrl})` }
          : undefined
      }
      className={`${isTopHero ? 'page-hero' : 'page-section'} relative overflow-hidden text-ink-dark ${
        isTopHero ? '' : 'flex items-center'
      } ${
        hasBackground
          ? 'bg-no-repeat bg-center bg-cover'
          : 'bg-accent-light'
      }`}
    >
      {hasBackground ? (
        <div
          style={{
            backgroundImage: 'url("/img/hero-bg-texture.avif")',
          }}
          className='absolute inset-0 w-full bg-cover bg-center bg-no-repeat opacity-80'
        ></div>
      ) : null}

      <div
        className={`container relative z-30 mx-auto flex flex-col items-center gap-page-gap text-center md:flex-row md:justify-center ${heroType === 'clean' ? '' : 'md:text-start'}`}
      >
        <div className='flex w-full min-w-0 flex-col items-center gap-page-gap md:w-1/2 md:items-start'>
          <div className='page-title-block'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
              {title}
            </h2>
            <p className='text-lg md:text-xl text-ink-dark md:text-justify'>
              {description}
            </p>
          </div>
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
