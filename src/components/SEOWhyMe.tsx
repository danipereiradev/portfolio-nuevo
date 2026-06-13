import { LucideIcon } from 'lucide-react';

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SEOWhyMeProps {
  title: string;
  subtitle?: string;
  reasons: Reason[];
}

const SEOWhyMe = ({ title, subtitle, reasons }: SEOWhyMeProps) => {
  return (
    <section className='py-20 bg-gradient-to-br from-gray-900 to-black text-white'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-4'>{title}</h2>
          {subtitle && (
            <p className='text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto'>
              {subtitle}
            </p>
          )}
        </div>

        <div className='max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className='bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 text-center'
              >
                <div className='w-12 h-12 md:w-16 md:h-16 bg-accent rounded-xl flex items-center justify-center mb-4 md:mb-6 mx-auto'>
                  <Icon className='w-6 h-6 md:w-8 md:h-8 text-white' />
                </div>
                <h3 className='text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4'>{reason.title}</h3>
                <p className='text-sm md:text-base text-gray-300 leading-relaxed'>
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SEOWhyMe;
