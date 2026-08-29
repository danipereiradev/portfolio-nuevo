import { type ReactNode, useEffect, useRef, useState } from 'react';
import Button from './Button';

import { ContactFormHero } from './ContactFormHero';
import ReactPlayer from 'react-player';
import TestimonialsBadge from './TestimonialsBadge';

interface HeroCtaProps {
  label?: string;
  title: string;
  description?: ReactNode;
  buttonText?: string;
  buttonHref?: string;
  backgroundUrl?: string;
  heroType?: 'form' | 'video' | 'clean' | 'offer';
  videoUrl?: string;
  hasButton: boolean;
  hasBackground: boolean;
  formTitle?: string;
  formDescription?: string;
  formSectionInfo?: string;
  hasReviewBadge: boolean;
  isTopHero?: boolean;
  showProjectType?: boolean;
  showEmail?: boolean;
  projectTypes?: readonly string[];
  highlights?: string[];
  formId?: string;
  animateEntrance?: boolean;
  labelNote?: ReactNode;
  offerContent?: ReactNode;
  buttonClassName?: string;
  belowDescription?: ReactNode;
  ctaContent?: ReactNode;
  grayscale?: boolean;
  overlay?: 'white' | 'black';
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
  formTitle = '',
  formDescription = '',
  formSectionInfo = '',
  hasReviewBadge,
  isTopHero = false,
  showProjectType = false,
  showEmail = false,
  projectTypes,
  highlights,
  formId,
  animateEntrance = true,
  labelNote,
  offerContent,
  buttonClassName = '',
  belowDescription,
  ctaContent,
  grayscale = false,
  overlay = 'white',
}: HeroCtaProps) => {
  const TitleTag = isTopHero ? 'h1' : 'h2';
  const isClean = heroType === 'clean';
  const onDark = hasBackground && overlay === 'black';
  const copyTone = onDark ? 'text-white' : 'text-ink-dark';
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(isTopHero);

  useEffect(() => {
    if (!animateEntrance) return undefined;

    if (
      isTopHero ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setEntered(true);
      return undefined;
    }

    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        observer.disconnect();
      },
      { threshold: 0.28, rootMargin: '0px 0px -48px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animateEntrance, isTopHero]);

  return (
    <section
      ref={sectionRef}
      id={isTopHero ? 'hero' : undefined}
      className={`${isTopHero ? 'page-hero' : 'page-section'} relative overflow-hidden ${copyTone} ${
        isTopHero ? '' : 'flex items-center'
      } ${hasBackground ? '' : 'bg-accent-light'} ${
        animateEntrance ? (entered ? 'hero-cta-enter' : 'hero-cta-pending') : ''
      }`}
    >
      {hasBackground && backgroundUrl ? (
        <img
          src={backgroundUrl}
          alt=''
          aria-hidden='true'
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${
            grayscale ? 'grayscale' : ''
          }`}
        />
      ) : null}
      {hasBackground ? (
        <>
          <div
            className={`absolute inset-0 ${onDark ? 'bg-black/60' : 'bg-white/70'}`}
            aria-hidden='true'
          />
          {!onDark ? (
            <div
              style={{
                backgroundImage: 'url("/img/hero-bg-texture.avif")',
              }}
              className='absolute inset-0 w-full bg-cover bg-center bg-no-repeat opacity-20'
              aria-hidden='true'
            />
          ) : null}
        </>
      ) : null}

      <div className='container relative z-30 mx-auto flex flex-col items-center gap-3 md:gap-4'>
        <div
          className={`flex w-full flex-col items-center gap-page-gap text-center md:justify-center ${
            isClean ? '' : 'md:flex-row md:text-start'
          }`}
        >
          <div
            className={`hero-cta-copy flex w-full min-w-0 flex-col items-center gap-page-gap ${
              isClean ? '' : 'md:items-start md:w-1/2'
            }`}
          >
            <div
              className={`page-title-block w-full items-center ${
                isClean ? '' : 'md:items-start'
              }`}
            >
              {label ? (
                <span
                  className={`hero-cta-label text-md uppercase rounded-lg font-extrabold ${
                    onDark
                      ? 'text-ink-light'
                      : 'text-accent underline'
                  }`}
                >
                  {label}
                </span>
              ) : null}
              {labelNote ? (
                <span className={`hero-cta-label text-lg font-extrabold ${copyTone}`}>
                  {labelNote}
                </span>
              ) : null}
              <TitleTag className={`hero-cta-title text-3xl md:text-4xl lg:text-5xl font-extrabold ${copyTone}`}>
                {title}
              </TitleTag>
              {animateEntrance ? (
                <span
                  className={`hero-cta-underline h-1 w-16 bg-brand mx-auto ${
                    isClean ? '' : 'md:mx-0'
                  }`}
                  aria-hidden='true'
                />
              ) : null}
              {description ? (
                <div
                  className={`hero-cta-desc text-xl md:text-2xl text-center ${copyTone} ${
                    isClean ? 'max-w-3xl' : 'md:text-justify'
                  }`}
                >
                  {description}
                </div>
              ) : null}
            </div>
            {belowDescription}
            {highlights && highlights.length > 0 ? (
              <ul className='hero-cta-highlights grid w-full grid-cols-1 gap-item-gap text-left md:grid-cols-2'>
                {highlights.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3 text-base font-bold md:text-lg ${copyTone}`}
                  >
                    <span className='mt-2 h-1 w-10 shrink-0 bg-brand' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {hasReviewBadge ? (
              <div className='hero-cta-badge'>
                <TestimonialsBadge />
              </div>
            ) : null}
            {ctaContent ? (
              <div className='hero-cta-badge w-full'>{ctaContent}</div>
            ) : hasButton ? (
              <Button
                className={`hero-cta-badge m-0 ${
                  isClean ? 'mx-auto' : 'mx-auto md:mx-0 place-self-start'
                } ${buttonClassName}`.trim()}
                href={buttonHref}
              >
                {buttonText}
              </Button>
            ) : null}
          </div>
          {!isClean ? (
            heroType === 'form' ? (
              <ContactFormHero
                id={formId}
                title={formTitle}
                description={formDescription}
                page={formSectionInfo}
                showProjectType={showProjectType}
                showEmail={showEmail}
                projectTypes={projectTypes}
                className={animateEntrance ? 'hero-cta-form' : undefined}
              />
            ) : heroType === 'offer' ? (
              offerContent
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
