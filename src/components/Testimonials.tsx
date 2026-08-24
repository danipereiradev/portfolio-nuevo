import { useEffect } from 'react';
import VideoTestimonial from './VideoTestimonial';

const TRUSTINDEX_WIDGET_SRC =
  'https://cdn.trustindex.io/loader.js?7268074797d8717b3c668cae8f6';

declare global {
  interface Window {
    renderTrustindexWidgets?: () => void;
  }
}

interface TestimonialsProps {
  id?: string;
  hasVideo?: boolean;
}

function Testimonials({
  id = 'testimonials',
  hasVideo = false,
}: TestimonialsProps) {
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
        <div className='page-title-block mx-auto max-w-5xl text-center'>
          <span className='text-md rounded-lg font-extrabold text-accent underline'>
            9 proyectos. 9 reseñas de 5 estrellas
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            Nuestros clientes están contentos con cómo lo hacemos
          </h2>
          <p className='text-xl md:text-2xl text-ink-dark'>
            Estas son valoraciones sacadas de nuestro perfil oficial de Google
            con certificación Trustindex.
          </p>
        </div>
        {hasVideo ? <VideoTestimonial /> : null}
        <div data-src={TRUSTINDEX_WIDGET_SRC} />
      </div>
    </section>
  );
}

export default Testimonials;
