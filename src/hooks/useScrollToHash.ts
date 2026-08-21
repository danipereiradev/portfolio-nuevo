import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToHash = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace('#', '');
      if (!id) return;
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const timeoutId = setTimeout(scrollToHash, 80);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [pathname]);
};
