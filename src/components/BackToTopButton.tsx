import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { isAdsLandingPath } from '../config/contact';

const BackToTopButton = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const isAdsLanding = isAdsLandingPath(pathname);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollThreshold = window.innerHeight * 0.15;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type='button'
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className={`fixed bottom-6 left-6 z-40 rounded-full p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:left-1/2 md:right-auto md:-translate-x-1/2 ${
        isAdsLanding
          ? 'bg-accent text-white hover:bg-accent-hover'
          : 'bg-brand-light text-accent hover:bg-brand'
      }`}
      aria-label='Volver arriba'
    >
      <ArrowUp className='h-6 w-6' aria-hidden='true' />
    </button>
  );
};

export default BackToTopButton;
