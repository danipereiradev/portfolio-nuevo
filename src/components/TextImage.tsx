import type { ReactNode } from 'react';
import Button from './Button';
import RevealOnScroll from './RevealOnScroll';

interface TextImageProps {
  label: string;
  title: string;
  paragraphs: ReactNode[];
  imageSrc?: string;
  imageAlt?: string;
  imageLeft?: boolean;
  buttonText?: string;
  buttonHref?: string;
  hasButton?: boolean;
  className?: string;
  headingAs?: 'h1' | 'h2';
}

export const TextImage = ({
  label,
  title,
  paragraphs,
  imageSrc = '/img/sections/servicio-web.webp',
  imageAlt = 'Diseño y desarrollo web',
  imageLeft = false,
  buttonText = 'Saber más',
  buttonHref,
  hasButton = true,
  className = '',
  headingAs = 'h2',
}: TextImageProps) => {
  const Heading = headingAs;
  const rowClass = imageLeft
    ? 'lg:flex-row lg:text-start'
    : 'lg:flex-row-reverse lg:text-start';

  return (
    <section className={`page-section ${className}`.trim()}>
      <div
        className={`container mx-auto flex flex-col-reverse items-center gap-page-gap text-center ${rowClass}`}
      >
        <RevealOnScroll className='page-title-block page-title-block--plain w-full items-center lg:w-1/2 lg:items-start'>
          <span className='text-md uppercase rounded-lg font-extrabold text-accent underline'>
            {label}
          </span>
          <Heading className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            {title}
          </Heading>
          {paragraphs.map((para, index) => (
            <p
              key={index}
              className='text-xl md:text-2xl text-ink-dark lg:text-justify'
            >
              {para}
            </p>
          ))}
          {hasButton ? (
            <Button className='mt-text-gap lg:mx-0' href={buttonHref}>
              {buttonText}
            </Button>
          ) : null}
        </RevealOnScroll>
        <RevealOnScroll className='w-full shrink-0 lg:w-1/2' delayMs={120}>
          <div className='relative aspect-[4/3] w-full overflow-hidden rounded-lg'>
            <img
              className='absolute inset-0 h-full w-full object-cover'
              src={imageSrc}
              alt={imageAlt}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
