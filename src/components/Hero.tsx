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
}

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
}: HeroProps) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!videoUrl) return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShowVideo(!media.matches);
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
          className='pointer-events-none absolute inset-0 h-full w-full object-cover'
          autoPlay
          muted
          loop
          playsInline
          preload='metadata'
          poster={backgroundUrl}
          aria-hidden='true'
        >
          <source src={videoUrl} type='video/mp4' />
        </video>
      ) : null}

      {overlayTone === 'black' ? (
        <div className='absolute inset-0 bg-black/60' aria-hidden='true' />
      ) : null}
      {overlayTone === 'white' ? (
        <div className='absolute inset-0 bg-white/55' aria-hidden='true' />
      ) : null}

      {hasBackground && !titleOnly ? (
        <div
          style={{
            backgroundImage: 'url("/img/hero-bg-texture.avif")',
          }}
          className='absolute inset-0 w-full bg-cover bg-center bg-no-repeat opacity-20'
        ></div>
      ) : null}

      <div className='relative z-10 mx-auto flex w-[95%] max-w-5xl flex-col items-center text-center'>
        <div className='flex w-full flex-col items-center gap-page-gap'>
          {titleOnly ? (
            <h1 className='whitespace-nowrap text-[clamp(0.7rem,2.2vw,1.35rem)] font-bold tracking-[0.28em] text-white'>
              {title}
            </h1>
          ) : (
            <div className='page-title-block md:max-w-4xl'>
              <h1
                className={`text-5xl md:text-6xl lg:text-7xl font-extrabold ${
                  overlayTone === 'black' ? 'text-white' : 'text-ink-dark'
                }`}
              >
                {title}
              </h1>
              {description ? (
                <p
                  className={`text-xl md:text-2xl md:max-w-2xl md:mx-auto ${
                    overlayTone === 'black' ? 'text-white' : 'text-ink-dark'
                  }`}
                >
                  {description}
                </p>
              ) : null}
            </div>
          )}
          {!titleOnly && hasReviewBadge ? <TestimonialsBadge /> : null}
          {!titleOnly && hasButton && buttonText ? (
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
