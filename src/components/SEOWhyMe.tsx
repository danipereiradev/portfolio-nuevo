import { LucideIcon } from 'lucide-react';
import GlowBackdrop from './decor/GlowBackdrop';

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
    <section className='relative py-20 text-white overflow-hidden'>
      <GlowBackdrop />

      <div className='container mx-auto px-6 relative z-10'>
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
                className='border border-white/15 p-6 md:p-8 rounded-lg hover:border-white/30 transition-colors duration-200 text-center'
              >
                <Icon className='w-7 h-7 md:w-8 md:h-8 text-accent mb-4 md:mb-6 mx-auto' />
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
