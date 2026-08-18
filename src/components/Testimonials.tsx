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
      className='flex flex-col gap-8 py-8 md:py-24 lg:py-0 px-4 md:min-h-[100vh]'
    >
      <div className='mx-auto text-center flex flex-col gap-8 md:max-w-[75%] pb-24'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900'>
          Esto es lo que dicen nuestros clientes
        </h2>
        <p className='text-xl md:text-2xl text-black'>
          Valoraciones verificadas sacadas de nuestro perfil de google
        </p>
      </div>
      <div className='pt-24' data-src={TRUSTINDEX_WIDGET_SRC} />
    </section>
  );
}

export default Testimonials;
