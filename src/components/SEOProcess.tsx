interface Step {
  number: string;
  title: string;
  description: string;
}

interface SEOProcessProps {
  title: string;
  steps: Step[];
}

const SEOProcess = ({ title, steps }: SEOProcessProps) => {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
        </div>

        <div className='max-w-4xl mx-auto'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='flex gap-4 md:gap-6 mb-8 md:mb-12 last:mb-0'
            >
              <div className='flex-shrink-0'>
                <div className='w-12 h-12 md:w-16 md:h-16 bg-accent text-white rounded-full flex items-center justify-center text-lg md:text-2xl font-bold'>
                  {step.number}
                </div>
              </div>
              <div className='flex-1'>
                <h3 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3'>
                  {step.title}
                </h3>
                <p className='text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed'>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOProcess;
