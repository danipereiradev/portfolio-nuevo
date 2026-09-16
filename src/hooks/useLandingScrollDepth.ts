import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isAdsLandingPath } from '../config/contact';
import { trackScrollDepth } from '../utils/analytics';

const DEPTHS = [50, 75, 90] as const;

export const useLandingScrollDepth = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAdsLandingPath(pathname)) return undefined;

    const seen = new Set<number>();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = Math.round((window.scrollY / scrollable) * 100);
      for (const depth of DEPTHS) {
        if (percent >= depth && !seen.has(depth)) {
          seen.add(depth);
          trackScrollDepth(depth);
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    measure();

    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);
};
