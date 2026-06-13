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
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>{title}</h2>
          {subtitle && (
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              {subtitle}
            </p>
          )}
        </div>

        <div className='max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className='bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300'
              >
                <div className='w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6'>
                  <Icon className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-2xl font-bold mb-4'>{reason.title}</h3>
                <p className='text-gray-300 leading-relaxed'>
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
