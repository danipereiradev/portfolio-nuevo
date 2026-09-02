import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Espera a que el chunk de la página monte el ancla (rutas lazy). */
const HASH_RETRY_MS = 50;
const HASH_MAX_ATTEMPTS = 40;
/** Trustindex, imágenes y fuentes siguen moviendo el layout tras el primer salto. */
const HASH_SETTLE_MS = 2000;

const isOffTarget = (el: HTMLElement) => {
  const header = document.querySelector('header');
  const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
  const gap = el.getBoundingClientRect().top - headerBottom;
  return gap < 4 || gap > 32;
};

const scrollToId = (el: HTMLElement) => {
  if (!isOffTarget(el)) return;
  el.scrollIntoView({ behavior: 'auto', block: 'start' });
};

export const useScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let findId = 0;
    let settleTimer = 0;
    let userTookOver = false;
    let resizeObserver: ResizeObserver | undefined;

    const stopTracking = () => {
      window.clearInterval(findId);
      window.clearTimeout(settleTimer);
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };

    const onUserIntent = () => {
      userTookOver = true;
      stopTracking();
    };

    const followLayout = (el: HTMLElement) => {
      const realign = () => {
        if (userTookOver) return;
        scrollToId(el);
      };

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(realign);
        resizeObserver.observe(el);
      }

      settleTimer = window.setTimeout(() => {
        if (!userTookOver) realign();
        stopTracking();
      }, HASH_SETTLE_MS);
    };

    const scrollToHash = () => {
      stopTracking();
      userTookOver = false;
      const id = hash.replace('#', '');
      if (!id) return;

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        scrollToId(el);
        followLayout(el);
        return true;
      };

      if (tryScroll()) return;

      let attempts = 0;
      findId = window.setInterval(() => {
        attempts += 1;
        if (tryScroll() || attempts > HASH_MAX_ATTEMPTS) {
          window.clearInterval(findId);
        }
      }, HASH_RETRY_MS);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    window.addEventListener('wheel', onUserIntent, { passive: true });
    window.addEventListener('touchstart', onUserIntent, { passive: true });
    window.addEventListener('pointerdown', onUserIntent, { passive: true });
    window.addEventListener('keydown', onUserIntent);

    return () => {
      stopTracking();
      window.removeEventListener('hashchange', scrollToHash);
      window.removeEventListener('wheel', onUserIntent);
      window.removeEventListener('touchstart', onUserIntent);
      window.removeEventListener('pointerdown', onUserIntent);
      window.removeEventListener('keydown', onUserIntent);
    };
  }, [pathname, hash]);
};
