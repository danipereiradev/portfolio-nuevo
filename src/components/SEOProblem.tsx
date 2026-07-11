import { AlertCircle } from 'lucide-react';

interface Problem {
  text: string;
}

interface SEOProblemProps {
  title: string;
  subtitle: string;
  problems: Problem[];
}

const SEOProblem = ({ title, subtitle, problems }: SEOProblemProps) => {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
          <p className='text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto'>
            {subtitle}
          </p>
        </div>

        <div className='max-w-4xl mx-auto grid md:grid-cols-2 gap-6'>
          {problems.map((problem, index) => (
            <div
              key={index}
              className='flex gap-4 p-4 md:p-6 bg-gray-50 rounded-lg border border-gray-200'
            >
              <AlertCircle className='w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0 mt-1' />
              <p className='text-sm md:text-base text-gray-700 leading-relaxed'>{problem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOProblem;
