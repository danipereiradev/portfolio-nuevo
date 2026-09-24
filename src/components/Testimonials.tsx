import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RevealOnScroll from './RevealOnScroll';
import VideoTestimonial from './VideoTestimonial';
import { isAdsLandingPath } from '../config/contact';

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
  const { pathname } = useLocation();
  const lockOutbound = isAdsLandingPath(pathname);

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
        <RevealOnScroll className='page-title-block mx-auto max-w-5xl text-center'>
          <span className='text-md uppercase rounded-lg font-extrabold text-accent underline'>
            Opiniones de clientes
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            Nuestros clientes están contentos con cómo lo hacemos
          </h2>
          <p className='text-xl md:text-2xl text-ink-dark'>
            Estas son valoraciones sacadas de nuestro perfil oficial de Google
            con certificación Trustindex.
          </p>
        </RevealOnScroll>
        {hasVideo ? (
          <div className='flex flex-col items-center gap-page-gap lg:grid lg:grid-cols-4 lg:items-center lg:gap-8'>
            <div className='min-w-0 w-full lg:col-span-3'>
              <div
                className={lockOutbound ? 'pointer-events-none select-none' : undefined}
                ref={(node) => {
                  if (node) node.inert = lockOutbound;
                }}
              >
                <div data-src={TRUSTINDEX_WIDGET_SRC} />
              </div>
            </div>
            <RevealOnScroll className='w-full lg:col-span-1' delayMs={90}>
              <VideoTestimonial className='lg:mx-0 lg:max-w-none' />
            </RevealOnScroll>
          </div>
        ) : (
          <div
            className={lockOutbound ? 'pointer-events-none select-none' : undefined}
            ref={(node) => {
              if (node) node.inert = lockOutbound;
            }}
          >
            <div data-src={TRUSTINDEX_WIDGET_SRC} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Testimonials;
