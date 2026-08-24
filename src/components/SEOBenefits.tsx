import type { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
}

interface SEOBenefitsProps {
  title: string;
  subtitle?: ReactNode;
  benefits: Benefit[];
}

const SEOBenefits = ({ title, subtitle, benefits }: SEOBenefitsProps) => (
  <section className='page-section'>
    <div className='container mx-auto flex flex-col gap-page-gap'>
      <div className='page-title-block mx-auto max-w-5xl text-center'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
          {title}
        </h2>
        {subtitle && (
          <p className='text-xl md:text-2xl text-ink-dark'>{subtitle}</p>
        )}
      </div>

      <div
        className={`mx-auto grid w-full gap-page-gap md:grid-cols-2 ${
          benefits.length === 4 ? '' : 'lg:grid-cols-3'
        }`}
      >
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className='rounded-lg border-2 border-ink-dark bg-white p-content-pad'
            >
              <Icon className='mb-title-gap h-7 w-7 text-accent md:h-8 md:w-8' />
              <h3 className='mb-heading-gap text-xl font-bold text-ink-dark md:text-2xl'>
                {benefit.title}
              </h3>
              <p className='text-base leading-relaxed text-ink-dark md:text-lg'>
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default SEOBenefits;
