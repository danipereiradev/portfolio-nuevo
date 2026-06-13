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
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center'
              >
                <div className='w-16 h-16 bg-white border-2 border-black rounded-xl flex items-center justify-center text-black mb-6 mx-auto'>
                  <Icon className='w-8 h-8' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  {benefit.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
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
