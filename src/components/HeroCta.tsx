import type { ReactNode } from 'react';
import Button from './Button';

import { ContactFormHero } from './ContactFormHero';
import ReactPlayer from 'react-player';
import TestimonialsBadge from './TestimonialsBadge';

interface HeroCtaProps {
  label?: string;
  title: string;
  description: ReactNode;
  buttonText?: string;
  buttonHref?: string;
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
  showProjectType?: boolean;
  highlights?: string[];
  formId?: string;
  breadcrumb?: ReactNode;
}

const HeroCta = ({
  title,
  label,
  description,
  buttonText,
  buttonHref,
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
  showProjectType = false,
  highlights,
  formId,
  breadcrumb,
}: HeroCtaProps) => {
  const TitleTag = isTopHero ? 'h1' : 'h2';

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
        hasBackground ? 'bg-no-repeat bg-center bg-cover' : 'bg-accent-light'
      }`}
    >
      {hasBackground ? (
        <div
          style={{
            background: 'white',
          }}
          className='absolute inset-0 w-full bg-cover bg-center bg-no-repeat opacity-70'
        ></div>
      ) : null}

      <div className='container relative z-30 mx-auto flex flex-col items-center gap-3 md:gap-4'>
        {breadcrumb}
        <div
          className={`flex w-full flex-col items-center gap-page-gap text-center md:flex-row md:justify-center ${heroType === 'clean' ? '' : 'md:text-start'}`}
        >
          <div
            className={`flex w-full min-w-0 flex-col items-center gap-page-gap md:items-start ${
              heroType === 'clean' ? '' : 'md:w-1/2'
            }`}
          >
            <div className='page-title-block'>
              <span className='text-md uppercase rounded-lg font-extrabold text-accent underline'>
                {label}
              </span>
              <TitleTag className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
                {title}
              </TitleTag>
              <p className='text-xl md:text-2xl text-ink-dark md:text-justify'>
                {description}
              </p>
            </div>
            {highlights && highlights.length > 0 ? (
              <ul className='grid w-full grid-cols-1 gap-item-gap text-left md:grid-cols-2'>
                {highlights.map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-3 text-base font-bold text-ink-dark md:text-lg'
                  >
                    <span className='mt-2 h-1 w-10 shrink-0 bg-brand' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {hasReviewBadge ? <TestimonialsBadge /> : null}
            {hasButton ? (
              <Button
                className='mx-auto md:mx-0 place-self-start m-0'
                href={buttonHref}
              >
                {buttonText}
              </Button>
            ) : null}
          </div>
          {heroType !== 'clean' ? (
            heroType === 'form' ? (
              <ContactFormHero
                id={formId}
                title={formTitle}
                description={formDescription}
                page={formSectionInfo}
                showProjectType={showProjectType}
              />
            ) : (
              <div className='flex justify-end items-center md:w-1/2 z-10 '>
                <ReactPlayer width={450} controls src={videoUrl} />
              </div>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default HeroCta;
