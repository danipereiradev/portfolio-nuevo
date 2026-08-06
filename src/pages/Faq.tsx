import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import GlowBackdrop from '../components/decor/GlowBackdrop';
import SEOCTAFinal from '../components/SEOCTAFinal';
import { useContactModal } from '../contexts/ContactModalContext';
import { allFaqItems, faqCategories } from '../data/faqPage';

const Faq = () => {
  usePageMeta('/preguntas-frecuentes');
  const { openModal } = useContactModal();
  const [openKey, setOpenKey] = useState<string | null>(null);

  useJsonLd('jsonld-faq-page', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });

  const toggleFaq = (key: string) => {
    setOpenKey((current) => (current === key ? null : key));
  };

  return (
    <>
      <section className='relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 pb-16'>
        <GlowBackdrop />
        <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-4'>
          <span className='inline-block bg-accent text-ink-dark text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 border-2 border-white/80 rotate-[-2deg] mb-6 shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]'>
            Preguntas frecuentes
          </span>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight'>
            Resolvemos tus dudas antes de empezar
          </h1>
          <p className='text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto'>
            Precios, plazos, revisiones, hosting, SEO, tiendas online y más.
            Si no encuentras tu respuesta, escríbenos.
          </p>
        </div>
      </section>

      <section className='py-12 md:py-16 bg-white border-b-2 border-ink-dark/10'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-wrap justify-center gap-2 md:gap-3 max-w-5xl mx-auto'>
            {faqCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className='text-sm md:text-base font-semibold text-gray-800 bg-gray-50 border-2 border-ink-dark px-3 py-2 rounded-lg shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {faqCategories.map((category, categoryIndex) => {
        const isAccent = categoryIndex % 2 === 1;

        return (
          <section
            key={category.id}
            id={category.id}
            className={`scroll-mt-28 py-14 md:py-20 ${
              isAccent ? 'bg-accent' : 'bg-white'
            }`}
          >
            <div className='container mx-auto px-6'>
              <h2
                className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8 md:mb-10 text-center ${
                  isAccent ? 'text-ink-dark' : 'text-gray-900'
                }`}
              >
                {category.title}
              </h2>
              <div className='max-w-3xl mx-auto space-y-3'>
                {category.faqs.map((faq, index) => {
                  const key = `${category.id}-${index}`;
                  const isOpen = openKey === key;

                  return (
                    <div
                      key={key}
                      className={`bg-white rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                        isOpen
                          ? 'border-ink-dark shadow-[4px_4px_0_0_#0d9488]'
                          : isAccent
                            ? 'border-ink-dark shadow-[4px_4px_0_0_rgba(26,26,26,0.35)]'
                            : 'border-ink-dark shadow-[4px_4px_0_0_#1a1a1a]'
                      }`}
                    >
                      <button
                        type='button'
                        onClick={() => toggleFaq(key)}
                        className='w-full px-4 py-4 md:px-6 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors'
                        aria-expanded={isOpen}
                      >
                        <h3 className='text-sm md:text-base lg:text-lg font-bold text-gray-900 pr-3 md:pr-4'>
                          {faq.question}
                        </h3>
                        <ChevronDown
                          className={`w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className='px-4 pb-4 md:px-6 md:pb-5'>
                          <p className='text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed'>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <SEOCTAFinal
        title='¿No está tu pregunta aquí?'
        subtitle='Cuéntanos tu caso y te respondemos con claridad: alcance, plazos y siguiente paso.'
        buttonText='Contactar'
        onButtonClick={() => openModal()}
      />
    </>
  );
};

export default Faq;
