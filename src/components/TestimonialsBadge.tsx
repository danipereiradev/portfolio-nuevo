import { useEffect } from 'react';

const TRUSTINDEX_WIDGET_SRC =
  'https://cdn.trustindex.io/loader.js?fcef0d1791cb395e7c263690105';

declare global {
  interface Window {
    renderTrustindexWidgets?: () => void;
  }
}

interface TestimonialsProps {
  id?: string;
}

function TestimonialsBadge({ id = 'testimonials' }: TestimonialsProps) {
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
    <>
      <div id={id} data-src={TRUSTINDEX_WIDGET_SRC} className='w-1/3' />
      <div className='spacer'></div>
    </>
  );
}

export default TestimonialsBadge;
