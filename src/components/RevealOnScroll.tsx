import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Retraso extra al aparecer (útil para escalonar tarjetas). */
  delayMs?: number;
}

/**
 * Anima la entrada de un bloque cuando entra en el viewport.
 * Respeta prefers-reduced-motion.
 */
const RevealOnScroll = ({
  children,
  className = '',
  delayMs = 0,
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delayMs
    ? { transitionDelay: `${delayMs}ms` }
    : undefined;

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
