import { type ReactNode, useEffect, useRef, useState } from 'react';
import Button from './Button';

import { ContactFormHero } from './ContactFormHero';
import TestimonialsBadge from './TestimonialsBadge';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HeroCtaList = ({
  items,
  className = 'mx-auto w-full list-disc pl-5 text-left md:mx-0',
}: {
  items: ReactNode[];
  className?: string;
}) => (
  <ul
    className={`space-y-3 text-lg marker:text-brand md:text-xl ${className}`}
  >
    {items.map((item, index) => (
      <li key={index} className='pl-1'>
        {item}
      </li>
    ))}
  </ul>
);

interface HeroCtaProps {
  label?: string;
  title: string;
  description?: ReactNode;
  buttonText?: string;
  buttonHref?: string;
  backgroundUrl?: string;
  videoUrl?: string;
  heroType?: 'form' | 'clean' | 'offer';
  hasButton: boolean;
  hasBackground: boolean;
  formTitle?: string;
  formDescription?: string;
  formSectionInfo?: string;
  formSubmitLabel?: string;
  hasReviewBadge: boolean;
  isTopHero?: boolean;
  highlights?: string[];
  formId?: string;
  animateEntrance?: boolean;
  labelNote?: ReactNode;
  offerContent?: ReactNode;
  buttonClassName?: string;
  belowDescription?: ReactNode;
  ctaContent?: ReactNode;
  grayscale?: boolean;
  overlay?: 'white' | 'black' | 'none';
}

const HeroCta = ({
  title,
  label,
  description,
  buttonText,
  buttonHref,
  backgroundUrl,
  videoUrl,
  heroType,
  hasButton,
  hasBackground,
  formTitle = '',
  formDescription = '',
  formSectionInfo = '',
  formSubmitLabel,
  hasReviewBadge,
  isTopHero = false,
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
  const overlayTone = overlay === 'none' ? undefined : overlay;
  const onVideo = Boolean(videoUrl) && overlayTone !== 'white';
  const onDark = (hasBackground && overlay === 'black') || onVideo;
  const copyTone = onDark ? 'text-white' : 'text-ink-dark';
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entered, setEntered] = useState(isTopHero);
  const [showVideo, setShowVideo] = useState(
    () => Boolean(videoUrl) && !prefersReducedMotion(),
  );

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

  useEffect(() => {
    if (!videoUrl) {
      setShowVideo(false);
      return undefined;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShowVideo(!media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', 'true');

    const tryPlay = () => {
      void video.play();
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', tryPlay);

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, [showVideo, videoUrl]);

  return (
    <section
      ref={sectionRef}
      id={isTopHero ? 'hero' : undefined}
      className={`${isTopHero ? 'page-hero' : 'page-section'} relative overflow-hidden ${copyTone} ${
        isTopHero ? '' : 'flex items-center'
      } ${
        hasBackground
          ? onDark
            ? 'bg-ink-dark'
            : 'bg-white'
          : 'bg-accent-light'
      } ${
        animateEntrance ? (entered ? 'hero-cta-enter' : 'hero-cta-pending') : ''
      }`}
    >
      {hasBackground && backgroundUrl ? (
        <img
          src={backgroundUrl}
          alt=''
          aria-hidden='true'
          fetchPriority={isTopHero ? 'high' : 'low'}
          loading={isTopHero ? 'eager' : 'lazy'}
          decoding='async'
          className={`pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center ${
            grayscale ? 'grayscale' : ''
          }`}
        />
      ) : null}
      {showVideo && videoUrl ? (
        <video
          ref={videoRef}
          key={videoUrl}
          className='pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center'
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
          poster={backgroundUrl}
          src={videoUrl}
          aria-hidden='true'
        />
      ) : null}
      {hasBackground && overlayTone ? (
        <>
          <div
            className={`absolute inset-0 z-[1] ${
              overlayTone === 'black' ? 'bg-black/60' : 'bg-white/70'
            }`}
            aria-hidden='true'
          />
          {overlayTone !== 'black' ? (
            <div
              style={{
                backgroundImage: 'url("/img/hero-bg-texture.avif")',
              }}
              className='pointer-events-none absolute inset-0 z-[2] w-full bg-cover bg-center bg-no-repeat opacity-20'
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
              <ul className='hero-cta-highlights grid w-full list-disc grid-cols-1 gap-item-gap pl-5 text-left marker:text-brand md:grid-cols-2'>
                {highlights.map((item) => (
                  <li
                    key={item}
                    className={`pl-1 text-base font-bold md:text-lg ${copyTone}`}
                  >
                    {item}
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
                submitLabel={formSubmitLabel}
                className={animateEntrance ? 'hero-cta-form' : undefined}
              />
            ) : heroType === 'offer' ? (
              offerContent
            ) : null
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default HeroCta;
