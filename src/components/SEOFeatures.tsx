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
    <section className='py-20 bg-gray-50     flex items-center'>
      <div className='container mx-auto'>
        <div className='mx-auto mb-12 max-w-5xl text-center md:mb-16'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-4'>
            {title}
          </h2>
          {subtitle && (
            <p className='text-base md:text-lg lg:text-xl text-black mx-auto'>
              {subtitle}
            </p>
          )}
        </div>

        <div className='   mx-auto grid md:grid-cols-3 gap-5'>
          {features.map((feature, index) => (
            <div key={index} className='p-4 md:p-6 rounded-lg bg-[#141414]'>
              <div className='flex items-center gap-3 md:gap-4 p-8 justify-center '>
                <div>
                  <h3 className='text-center text-base md:text-xl uppercase lg:text-2xl font-bold text-neutral-300 mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-center text-sm md:text-base text-neutral-300 '>
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
