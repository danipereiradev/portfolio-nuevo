import { useEffect, useId } from 'react';
import { scheduleTrustindex } from '../utils/trustindex';

function TestimonialsBadge() {
  const generatedId = `ti-badge-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    scheduleTrustindex();
  }, []);

  return (
    <div
      className='pointer-events-none select-none'
      ref={(node) => {
        if (node) node.inert = true;
      }}
    >
      <div
        id={generatedId}
        data-src='https://cdn.trustindex.io/loader.js?76436bd81d2628826956c318673'
        className='min-h-[4.5rem]'
      />
    </div>
  );
}

export default TestimonialsBadge;
