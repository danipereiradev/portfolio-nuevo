import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      className='fixed bottom-6 right-6 z-40 rounded-full bg-brand-light p-4 text-accent shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:bg-brand md:left-1/2 md:right-auto md:-translate-x-1/2'
      aria-label='Volver arriba'
    >
      <ArrowUp className='h-6 w-6' aria-hidden='true' />
    </button>
  );
};

export default BackToTopButton;
