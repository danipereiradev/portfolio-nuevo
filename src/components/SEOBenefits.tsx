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

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className='bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center'
              >
                <div className='w-12 h-12 md:w-16 md:h-16 bg-white border-2 border-black rounded-xl flex items-center justify-center text-black mb-4 md:mb-6 mx-auto'>
                  <Icon className='w-6 h-6 md:w-8 md:h-8' />
                </div>
                <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4'>
                  {benefit.title}
                </h3>
                <p className='text-sm md:text-base text-gray-600 leading-relaxed'>
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
