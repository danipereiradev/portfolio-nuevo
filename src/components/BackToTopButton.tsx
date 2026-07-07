import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollThreshold = window.innerHeight * 0.15;
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-20 right-6 md:bottom-6 bg-accent hover:bg-accent-hover text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 z-40 transform hover:scale-110'
          aria-label='Volver arriba'
        >
          <ArrowUp className='w-6 h-6' />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
