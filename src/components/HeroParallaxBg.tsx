import { useEffect, useRef } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HERO_NUBES_URL = '/video/hero-nubes.jpg';

/** Fondo más alto que el contenedor; se mueve más lento que el scroll. */
export const HeroParallaxBg = ({
  src,
  fetchPriority = 'low',
}: {
  src: string;
  fetchPriority?: 'high' | 'low';
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const root = img?.parentElement;
    if (!img || !root || prefersReducedMotion()) return undefined;

    let ticking = false;
    const update = () => {
      ticking = false;
      const offset = Math.round(root.getBoundingClientRect().top * 0.35);
      img.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=''
      aria-hidden='true'
      fetchPriority={fetchPriority}
      loading={fetchPriority === 'high' ? 'eager' : 'lazy'}
      decoding='async'
      className='pointer-events-none absolute inset-x-0 top-0 z-0 h-[135%] w-full object-cover object-center'
    />
  );
};
