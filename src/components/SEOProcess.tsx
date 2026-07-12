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
    <section className='relative py-20 bg-white overflow-hidden'>
      <div className='container mx-auto px-6 relative z-10'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4'>
            {title}
          </h2>
        </div>

        <div className='max-w-3xl mx-auto'>
          {steps.map((step, index) => (
            <div key={index} className='relative flex gap-5 md:gap-8 pb-10 md:pb-14 last:pb-0'>
              {index !== steps.length - 1 && (
                <span
                  className='absolute left-[1.55rem] md:left-[2.05rem] top-12 md:top-16 bottom-0 w-1 bg-accent'
                  aria-hidden='true'
                />
              )}
              <div className='relative flex-shrink-0 z-10'>
                <div className='w-12 h-12 md:w-16 md:h-16 rounded-full bg-ink-dark text-white flex items-center justify-center text-lg md:text-2xl font-bold border-2 border-ink-dark shadow-[4px_4px_0_0_#14b8a6]'>
                  {step.number}
                </div>
              </div>
              <div className='flex-1 pt-1 md:pt-2'>
                <h3 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3'>
                  {step.title}
                </h3>
                      <p className='text-base md:text-lg lg:text-xl text-gray-700 font-medium leading-relaxed'>
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
