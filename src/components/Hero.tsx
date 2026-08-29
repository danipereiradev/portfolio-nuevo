import { ReactNode, useEffect, useState } from 'react';
import Button from './Button';
import TestimonialsBadge from './TestimonialsBadge';

interface HeroProps {
  title: string;
  description?: ReactNode;
  buttonText?: string;
  buttonHref?: string;
  backgroundUrl?: string;
  videoUrl?: string;
  overlay?: 'white' | 'black';
  titleOnly?: boolean;
  hasButton: boolean;
  hasBackground: boolean;
  hasReviewBadge: boolean;
  grayscale?: boolean;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Hero = ({
  title,
  description,
  buttonText,
  buttonHref,
  backgroundUrl,
  videoUrl,
  overlay,
  titleOnly = false,
  hasButton,
  hasBackground,
  hasReviewBadge,
  grayscale = false,
}: HeroProps) => {
  const [showVideo, setShowVideo] = useState(
    () => Boolean(videoUrl) && !prefersReducedMotion(),
  );
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    setVideoReady(false);

    if (!videoUrl) {
      setShowVideo(false);
      return undefined;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setShowVideo(!media.matches);
      setVideoReady(false);
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [videoUrl]);

  const overlayTone = overlay ?? (videoUrl ? 'white' : undefined);

  return (
    <section
      id='hero'
      style={{
        backgroundImage: `url(${hasBackground ? backgroundUrl : ''})`,
      }}
      className={`page-hero-compact bg-cover bg-center bg-no-repeat text-ink-dark ${
        videoUrl ? 'min-h-dvh' : ''
      }`}
    >
      {showVideo && videoUrl ? (
        <video
          key={videoUrl}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${
            grayscale ? 'grayscale' : ''
          } ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
          poster={backgroundUrl}
          src={videoUrl}
          aria-hidden='true'
          onCanPlay={() => setVideoReady(true)}
        />
      ) : null}

      {overlayTone === 'black' ? (
        <div className='absolute inset-0 z-[1] bg-black/60' aria-hidden='true' />
      ) : null}
      {overlayTone === 'white' ? (
        <div className='absolute inset-0 z-[1] bg-white/70' aria-hidden='true' />
      ) : null}

      {hasBackground && !titleOnly && !showVideo ? (
        <div
          style={{
            backgroundImage: 'url("/img/hero-bg-texture.avif")',
          }}
          className='pointer-events-none absolute inset-0 z-[2] w-full bg-cover bg-center bg-no-repeat opacity-20'
          aria-hidden='true'
        />
      ) : null}

      <div className='relative z-10 mx-auto flex w-[95%] max-w-5xl flex-col items-center text-center'>
        <div className='hero-cta-enter hero-cta-enter--from-top flex w-full flex-col items-center gap-page-gap'>
          {titleOnly ? (
            <h1 className='whitespace-nowrap text-[clamp(0.7rem,2.2vw,1.35rem)] font-bold tracking-[0.28em] text-white'>
              {title}
            </h1>
          ) : (
            <div className='page-title-block md:max-w-4xl'>
              <h1
                className={`hero-cta-title text-5xl md:text-6xl lg:text-7xl font-extrabold ${
                  overlayTone === 'black' ? 'text-white' : 'text-ink-dark'
                }`}
              >
                {title}
              </h1>
              <span
                className='hero-cta-underline mx-auto h-1 w-16 bg-brand'
                aria-hidden='true'
              />
              {description ? (
                <p
                  className={`hero-cta-desc text-xl md:text-2xl md:max-w-2xl md:mx-auto ${
                    overlayTone === 'black' ? 'text-white' : 'text-ink-dark'
                  }`}
                >
                  {description}
                </p>
              ) : null}
            </div>
          )}
          {!titleOnly && hasReviewBadge ? (
            <div className='hero-cta-badge'>
              <TestimonialsBadge />
            </div>
          ) : null}
          {!titleOnly && hasButton && buttonText ? (
            <div className='hero-cta-badge'>
              <Button className='mx-auto text-center' href={buttonHref}>
                {buttonText}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Hero;
