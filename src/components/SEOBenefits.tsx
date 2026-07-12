import { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SEOBenefitsProps {
  title: string;
  benefits: Benefit[];
}

const SEOBenefits = ({ title, benefits }: SEOBenefitsProps) => {
  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto'>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className='bg-white p-6 md:p-8 rounded-xl border-2 border-ink-dark hover:border-accent shadow-[5px_5px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200'
              >
                <Icon className='w-7 h-7 md:w-8 md:h-8 text-accent mb-4 md:mb-6' />
                <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4'>
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
