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
    <section className='page-section flex items-center justify-center'>
      <div className='container mx-auto flex flex-col items-center gap-page-gap'>
        <div className='page-title-block max-w-3xl text-center'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900'>
            {title}
          </h2>
        </div>

        <div className='mx-auto grid grid-cols-1 items-start gap-item-gap md:grid-cols-2'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={` rounded-lg overflow-hidden transition-all duration-200`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className='flex w-full items-center justify-between bg-gray-50 px-content-pad py-content-pad text-left transition-colors hover:bg-gray-50'
              >
                <h3 className='pr-title-gap text-lg font-bold text-gray-900 md:text-xl lg:text-2xl'>
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
                <div className='px-content-pad pb-content-pad'>
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
