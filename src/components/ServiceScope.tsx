import { Check } from 'lucide-react';

interface ServiceScopeProps {
  audienceLabel?: string;
  audienceText: string;
  workTitle?: string;
  workItems: string[];
  resultsTitle?: string;
  resultItems: string[];
}

/**
 * Bloque "Para quién es / Qué trabajamos / Qué obtienes" para las páginas de
 * servicio. Sustituye a los antiguos SEOProblem + SEOBenefits + SEOFeatures
 * (demasiadas cards idénticas con icono repetido) por una estructura más
 * editorial y sobria, con un único icono de apoyo por columna.
 */
const ServiceScope = ({
  audienceLabel = 'Para quién es',
  audienceText,
  workTitle = 'Qué trabajamos',
  workItems,
  resultsTitle = 'Qué obtienes',
  resultItems,
}: ServiceScopeProps) => {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-6'>
        <div className='max-w-3xl mx-auto mb-16 bg-gray-50 border-2 border-ink-dark rounded-xl p-8 md:p-10 shadow-[6px_6px_0_0_#1a1a1a]'>
          <span className='text-xs font-bold uppercase tracking-wide text-accent'>
            {audienceLabel}
          </span>
          <p className='text-lg md:text-xl text-gray-800 font-medium leading-relaxed mt-3'>
            {audienceText}
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto'>
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-5'>
              {workTitle}
            </h3>
            <ul className='space-y-3'>
              {workItems.map((item, index) => (
                <li key={index} className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <span className='text-base text-gray-700'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-5'>
              {resultsTitle}
            </h3>
            <ul className='space-y-3'>
              {resultItems.map((item, index) => (
                <li key={index} className='flex items-start gap-3'>
                  <span className='w-2 h-2 rounded-full bg-ink-dark flex-shrink-0 mt-2' />
                  <span className='text-base text-gray-700'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceScope;
