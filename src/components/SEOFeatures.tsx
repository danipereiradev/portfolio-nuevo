import { Check } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface SEOFeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

const SEOFeatures = ({ title, subtitle, features }: SEOFeaturesProps) => {
  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
          {subtitle && (
            <p className='text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto'>
              {subtitle}
            </p>
          )}
        </div>

        <div className='max-w-5xl mx-auto grid md:grid-cols-2 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-white p-4 md:p-6 rounded-lg border border-gray-200'
            >
              <div className='flex items-start gap-3 md:gap-4'>
                <div className='flex-shrink-0'>
                  <Check className='w-5 h-5 md:w-6 md:h-6 text-accent' />
                </div>
                <div>
                  <h3 className='text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-sm md:text-base text-gray-600 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOFeatures;
