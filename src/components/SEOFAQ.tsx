import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from './Button';

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOFAQProps {
  title: string;
  faqs: FAQItem[];
  onFaqOpen?: (question: string) => void;
}

const SEOFAQ = ({ title, faqs, onFaqOpen }: SEOFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    const nextIndex = openIndex === index ? null : index;
    if (nextIndex !== null) {
      onFaqOpen?.(faqs[index].question);
    }
    setOpenIndex(nextIndex);
  };

  return (
    <section className='md:min-h-[100vh] gap-8 py-24 px-4 md:py-0 md:px-8 flex items-center justify-center'>
      <div className='flex flex-col justify-center items-center gap-8'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900'>
            {title}
          </h2>
        </div>

        <div className='mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={` rounded-lg overflow-hidden transition-all duration-200`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full bg-gray-50 px-4 py-4 md:px-6 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors'
              >
                <h3 className='text-lg md:xl lg:text-2xl font-bold text-gray-900 pr-3 md:pr-4'>
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className='px-4 pb-4 md:px-6 md:pb-5'>
                  <p className='text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed'>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button>¿Mas preguntas?</Button>
      </div>
    </section>
  );
};

export default SEOFAQ;
