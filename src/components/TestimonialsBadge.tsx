import { useEffect, useId } from 'react';

const TRUSTINDEX_WIDGET_SRC =
  'https://cdn.trustindex.io/loader.js?76436bd81d2628826956c318673';

declare global {
  interface Window {
    renderTrustindexWidgets?: () => void;
  }
}

function TestimonialsBadge() {
  const generatedId = `ti-badge-${useId().replace(/:/g, '')}`;

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
      <div id={generatedId} data-src={TRUSTINDEX_WIDGET_SRC} />
      <div className='spacer'></div>
    </>
  );
}

export default TestimonialsBadge;
