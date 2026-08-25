import type { ReactNode } from 'react';
import RevealOnScroll from './RevealOnScroll';

interface Step {
  number: string;
  title: string;
  description: ReactNode;
}

interface SEOProcessProps {
  title: string;
  subtitle?: ReactNode;
  steps: Step[];
  imageSrc?: string;
  imageAlt?: string;
  stagger?: boolean;
}

const SEOProcess = ({
  title,
  subtitle,
  steps,
  imageSrc = '/img/theme-photos-CGpifH3FjOA-unsplash.jpg',
  imageAlt = 'Proceso de trabajo de 36web',
  stagger = true,
}: SEOProcessProps) => {
  return (
    <section className='page-section relative overflow-hidden bg-surface-muted'>
      <div className='container relative z-10 mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-5xl text-center'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            {title}
          </h2>
          {subtitle ? (
            <p className='text-xl md:text-2xl text-ink-dark'>{subtitle}</p>
          ) : null}
        </div>

        <div className='flex flex-col items-center justify-center gap-page-gap md:flex-row'>
          {stagger ? (
            <RevealOnScroll className='group aspect-[4/3] w-full overflow-hidden rounded-lg md:w-1/2'>
              <img
                className='h-full w-full object-cover'
                src={imageSrc}
                alt={imageAlt}
              />
            </RevealOnScroll>
          ) : (
            <div className='group aspect-[4/3] w-full overflow-hidden rounded-lg md:w-1/2'>
              <img
                className='h-full w-full object-cover'
                src={imageSrc}
                alt={imageAlt}
              />
            </div>
          )}
          <div className='mx-auto md:w-1/2'>
            {steps.map((step, index) => {
              const row = (
                <div className='relative flex gap-content-gap pb-page-gap last:pb-0'>
                  {index !== steps.length - 1 && (
                    <span
                      className='absolute left-[1.55rem] md:left-[2.05rem] top-12 md:top-16 bottom-0 w-1 bg-accent'
                      aria-hidden='true'
                    />
                  )}
                  <div className='relative flex-shrink-0 z-10'>
                    <div className='process-step-num w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#141414] text-white flex items-center justify-center text-lg md:text-2xl font-bold '>
                      {step.number}
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h3 className='mb-heading-gap text-lg font-bold text-ink-dark md:text-xl lg:text-2xl'>
                      {step.title}
                    </h3>
                    <p className='text-base md:text-lg lg:text-xl text-ink-dark font-medium leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                </div>
              );

              return stagger ? (
                <RevealOnScroll key={step.number} delayMs={index * 130}>
                  {row}
                </RevealOnScroll>
              ) : (
                <div key={step.number}>{row}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOProcess;
