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
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
        </div>

        <div className='max-w-4xl mx-auto'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='flex gap-6 mb-12 last:mb-0'
            >
              <div className='flex-shrink-0'>
                <div className='w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold'>
                  {step.number}
                </div>
              </div>
              <div className='flex-1'>
                <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                  {step.title}
                </h3>
                <p className='text-gray-600 leading-relaxed text-lg'>
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
