import type { ReactNode } from 'react';

interface TextSectionProps {
  label?: string;
  title: string;
  paragraphs: ReactNode[];
  muted?: boolean;
  id?: string;
}

export const TextSection = ({
  label,
  title,
  paragraphs,
  muted = false,
  id,
}: TextSectionProps) => (
  <section
    id={id}
    className={`page-section ${muted ? 'bg-surface-muted' : ''} ${id ? 'scroll-mt-24' : ''}`}
  >
    <div className='container mx-auto'>
      <div className='page-title-block mx-auto max-w-5xl text-center'>
        {label ? (
          <span className='text-md rounded-lg font-extrabold text-accent underline'>
            {label}
          </span>
        ) : null}
        <h2 className='text-2xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
          {title}
        </h2>
        {paragraphs.map((para, index) => (
          <p key={index} className='text-lg text-ink-dark md:text-xl'>
            {para}
          </p>
        ))}
      </div>
    </div>
  </section>
);
