import type { ReactNode } from 'react';

interface TextSectionProps {
  label?: string;
  title: string;
  paragraphs: ReactNode[];
  muted?: boolean;
}

export const TextSection = ({
  label,
  title,
  paragraphs,
  muted = false,
}: TextSectionProps) => (
  <section className={`page-section ${muted ? 'bg-surface-muted' : ''}`}>
    <div className='container mx-auto'>
      <div className='page-title-block mx-auto max-w-3xl text-center lg:text-start'>
        {label ? (
          <span className='text-md rounded-lg font-extrabold text-accent underline'>
            {label}
          </span>
        ) : null}
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
      </div>
    </div>
  </section>
);
