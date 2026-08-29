import type { ReactNode } from 'react';
import RevealOnScroll from './RevealOnScroll';

type IncludeItem = {
  title: string;
  description: ReactNode;
};

export const ServiceIncludes = ({
  title,
  intro,
  items,
  stagger = true,
}: {
  title: string;
  intro: ReactNode;
  items: IncludeItem[];
  stagger?: boolean;
}) => (
  <section className='page-section bg-surface-muted'>
    <div className='container mx-auto flex flex-col gap-page-gap'>
      <div className='page-title-block mx-auto max-w-5xl text-center'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
          {title}
        </h2>
        <p className='text-xl md:text-2xl text-ink-dark'>{intro}</p>
      </div>
      <div className='grid items-stretch gap-page-gap md:grid-cols-2 lg:grid-cols-3'>
        {items.map((item, index) => {
          const card = (
            <article className='flex h-full flex-col rounded-lg border-2 border-ink-dark bg-white p-content-pad'>
              <h3 className='mb-heading-gap text-xl font-bold text-ink-dark md:text-2xl'>
                {item.title}
              </h3>
              <p className='text-base leading-relaxed text-ink-dark md:text-lg'>
                {item.description}
              </p>
            </article>
          );

          if (!stagger) {
            return (
              <div key={item.title} className='h-full'>
                {card}
              </div>
            );
          }

          return (
            <RevealOnScroll
              key={item.title}
              className='h-full'
              delayMs={index * 90}
            >
              {card}
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  </section>
);
