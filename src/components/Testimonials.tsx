import { useEffect } from 'react';

const TRUSTINDEX_WIDGET_SRC =
  'https://cdn.trustindex.io/loader.js?07adb3e7960a3043bb66acee792';

declare global {
  interface Window {
    renderTrustindexWidgets?: () => void;
  }
}

interface TestimonialsProps {
  id?: string;
}

function Testimonials({ id = 'testimonials' }: TestimonialsProps) {
  useEffect(() => {
    let cancelled = false;
    let intervalId = 0;

    const tryRender = () => {
      if (cancelled) return true;
      if (typeof window.renderTrustindexWidgets !== 'function') return false;
      window.renderTrustindexWidgets();
      return true;
    };

    if (!tryRender()) {
      intervalId = window.setInterval(() => {
        if (tryRender()) window.clearInterval(intervalId);
      }, 50);
    }

    return () => {
      cancelled = true;
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      id={id}
      className=' bg-gray-50 text-gray-900 flex items-center md:h-[100vh] text-center md:text-start gap-8 py-24 px-4 md:px-0 md:py-0'
    >
      <div className='container mx-auto px-6'>
        <div className='mb-12 text-center md:mb-16'>
          <h2 className='mb-4 text-2xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl'>
            Esto es lo que dicen nuestros clientes
          </h2>
          <p className='mx-auto text-base text-gray-600 md:text-xl'>
            Valoraciones verificadas sacadas de nuestro perfil de google
          </p>
        </div>
        <div data-src={TRUSTINDEX_WIDGET_SRC} />
      </div>
    </section>
  );
}

export default Testimonials;
