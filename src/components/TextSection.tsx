import type { ReactNode } from 'react';
import RevealOnScroll from './RevealOnScroll';

interface TextSectionProps {
  label?: string;
  title: string;
  paragraphs: ReactNode[];
  muted?: boolean;
  /** Sobre foto/hero: texto blanco y sin fondo de sección. */
  onMedia?: boolean;
  className?: string;
  id?: string;
}

export const TextSection = ({
  label,
  title,
  paragraphs,
  muted = false,
  onMedia = false,
  className = '',
  id,
}: TextSectionProps) => {
  const copy = onMedia ? 'text-white' : 'text-ink-dark';

  return (
    <section
      id={id}
      className={`page-section relative z-10 ${
        onMedia ? '' : muted ? 'bg-surface-muted' : ''
      } ${className}`.trim()}
    >
      <div className='container mx-auto'>
        <RevealOnScroll className='page-title-block mx-auto max-w-5xl text-center'>
          {label ? (
            <span className='text-md rounded-lg font-extrabold text-accent underline'>
              {label}
            </span>
          ) : null}
          <h2
            className={`text-3xl font-extrabold md:text-4xl lg:text-5xl ${copy}`}
          >
            {title}
          </h2>
          {paragraphs.map((para, index) => (
            <p key={index} className={`text-xl md:text-2xl ${copy}`}>
              {para}
            </p>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
};
