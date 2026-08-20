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
    <section id={id} className='page-section'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            Esto es lo que dicen nuestros clientes
          </h2>
          <p className='text-xl md:text-2xl text-ink-dark'>
            Valoraciones verificadas sacadas de nuestro perfil de google
          </p>
        </div>
        <div data-src={TRUSTINDEX_WIDGET_SRC} />
      </div>
    </section>
  );
}

export default Testimonials;
