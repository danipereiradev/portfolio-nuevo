import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Espera a que el chunk de la página monte el ancla (rutas lazy). */
const HASH_RETRY_MS = 50;
const HASH_MAX_ATTEMPTS = 40;

export const useScrollToHash = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let intervalId = 0;

    const scrollToHash = () => {
      window.clearInterval(intervalId);
      const id = window.location.hash.replace('#', '');
      if (!id) return;

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        el.scrollIntoView({ behavior: 'smooth' });
        return true;
      };

      if (tryScroll()) return;

      let attempts = 0;
      intervalId = window.setInterval(() => {
        attempts += 1;
        if (tryScroll() || attempts > HASH_MAX_ATTEMPTS) {
          window.clearInterval(intervalId);
        }
      }, HASH_RETRY_MS);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [pathname]);
};
