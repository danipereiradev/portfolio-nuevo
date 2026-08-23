import { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SEOBenefitsProps {
  title: string;
  subtitle?: string;
  benefits: Benefit[];
}

const SEOBenefits = ({ title, subtitle, benefits }: SEOBenefitsProps) => (
  <section className='page-section'>
    <div className='container mx-auto flex flex-col gap-page-gap'>
      <div className='page-title-block mx-auto max-w-5xl text-center'>
        <h2 className='text-2xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
          {title}
        </h2>
        {subtitle && (
          <p className='text-lg text-ink-dark md:text-xl'>{subtitle}</p>
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
              <h3 className='mb-heading-gap text-lg font-bold text-ink-dark md:text-xl'>
                {benefit.title}
              </h3>
              <p className='text-base leading-relaxed text-ink-medium md:text-lg'>
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
