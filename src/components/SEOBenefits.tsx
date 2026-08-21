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

const SEOBenefits = ({ title, subtitle, benefits }: SEOBenefitsProps) => {
  return (
    <section className='page-section'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block text-center'>
          <h2 className='text-2xl font-bold text-gray-900 md:text-4xl lg:text-5xl'>
            {title}
          </h2>
          {subtitle && (
            <p className='mx-auto text-base text-gray-600 md:text-lg lg:text-xl'>
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`mx-auto grid w-full gap-page-gap md:grid-cols-2 ${
            benefits.length === 4 ? '' : 'lg:grid-cols-3'
          }`}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className='rounded-2xl border-2 border-ink-dark bg-white p-content-pad shadow-[5px_5px_0_0_#1a1a1a] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:border-accent hover:shadow-[2px_2px_0_0_#1a1a1a]'
              >
                <Icon className='mb-title-gap h-7 w-7 text-accent md:h-8 md:w-8' />
                <h3 className='mb-heading-gap text-lg font-bold text-gray-900 md:text-xl'>
                  {benefit.title}
                </h3>
                <p className='text-sm md:text-base text-gray-700 leading-relaxed'>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SEOBenefits;
