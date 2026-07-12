import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOFAQProps {
  title: string;
  faqs: FAQItem[];
}

const SEOFAQ = ({ title, faqs }: SEOFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
        </div>

        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                openIndex === index
                  ? 'border-accent shadow-[4px_4px_0_0_#0d9488]'
                  : 'border-ink-dark shadow-[4px_4px_0_0_#1a1a1a]'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full px-4 py-4 md:px-6 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors'
              >
                <h3 className='text-sm md:text-base lg:text-lg font-bold text-gray-900 pr-3 md:pr-4'>
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
                        <p className='text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed'>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOFAQ;
