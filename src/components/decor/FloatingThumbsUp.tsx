import { ThumbsUp } from 'lucide-react';

interface FloatingThumbsUpProps {
  className?: string;
  tilt?: number;
  /** Ritmo de flotación para desfasar el par. */
  float?: 'slow' | 'slower';
  /** Escala visual del icono. */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Pulgar arriba decorativo para la sección de valoraciones.
 * Misma función que FloatingPanel / FloatingRobot: profundidad y movimiento,
 * sin imágenes pesadas. Visible también en móvil (peek desde los lados).
 */
const FloatingThumbsUp = ({
  className = '',
  tilt = -8,
  float = 'slow',
  size = 'md',
}: FloatingThumbsUpProps) => {
  const floatClass =
    float === 'slower' ? 'animate-float-slower' : 'animate-float-slow';

  const boxSize =
    size === 'lg'
      ? 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28'
      : size === 'sm'
        ? 'w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20'
        : 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24';

  const iconSize =
    size === 'lg'
      ? 'w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12'
      : size === 'sm'
        ? 'w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8'
        : 'w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10';

  return (
    <div
      className={`pointer-events-none select-none ${floatClass} motion-reduce:animate-none ${className}`}
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
      aria-hidden='true'
    >
      <div
        className={`${boxSize} rounded-2xl border-2 border-white/25 bg-white/[0.08] backdrop-blur-md shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)] flex items-center justify-center`}
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div className='rounded-xl bg-accent border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] p-2.5 sm:p-3'>
          <ThumbsUp
            className={`${iconSize} text-ink-dark fill-ink-dark/15`}
            strokeWidth={2.25}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingThumbsUp;
