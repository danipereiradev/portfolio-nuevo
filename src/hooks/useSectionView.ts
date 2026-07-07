import { useEffect, useRef } from 'react';

/**
 * Dispara `onView` una única vez cuando la sección referenciada entra en el viewport.
 * Útil para eventos tipo view_pricing / view_portfolio en Google Analytics.
 */
export const useSectionView = <T extends HTMLElement = HTMLElement>(
  onView: () => void,
) => {
  const ref = useRef<T | null>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFired.current) {
            hasFired.current = true;
            onView();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};
