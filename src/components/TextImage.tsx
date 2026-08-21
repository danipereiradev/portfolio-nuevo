import type { ReactNode } from 'react';
import Button from './Button';

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
}

export const TextImage = ({
  label,
  title,
  paragraphs,
  imageSrc = '/img/web-design-charlesdeluvio.webp',
  imageAlt = 'Diseño y desarrollo web',
  imageLeft = false,
  buttonText = 'Saber más',
  buttonHref,
  hasButton = true,
}: TextImageProps) => {
  const rowClass = imageLeft
    ? 'lg:flex-row lg:text-start'
    : 'lg:flex-row-reverse lg:text-start';

  return (
    <section className='page-section'>
      <div
        className={`container mx-auto flex flex-col-reverse items-center gap-page-gap text-center ${rowClass}`}
      >
        <div className='page-title-block w-full items-center lg:w-1/2 lg:items-start'>
          <span className='text-md rounded-lg font-extrabold text-accent underline'>
            {label}
          </span>
          <h2 className='text-2xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            {title}
          </h2>
          {paragraphs.map((para, index) => (
            <p
              key={index}
              className='text-lg text-ink-dark md:text-xl lg:text-justify'
            >
              {para}
            </p>
          ))}
          {hasButton ? (
            <Button className='mt-text-gap lg:mx-0' href={buttonHref}>
              {buttonText}
            </Button>
          ) : null}
        </div>
        <div className='w-full shrink-0 lg:w-1/2'>
          <div className='group relative aspect-[4/3] w-full overflow-hidden rounded-lg'>
            <img
              className='absolute inset-0 h-full w-full object-cover'
              src={imageSrc}
              alt={imageAlt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
