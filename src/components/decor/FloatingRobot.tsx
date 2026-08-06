interface FloatingRobotProps {
  className?: string;
  /** happy = sonriente; glitch = confundido / "se me ha roto" */
  variant?: 'happy' | 'glitch';
  tilt?: number;
  /** Ritmo de flotación para desfasar el par. */
  float?: 'slow' | 'slower';
}

/**
 * Robot decorativo CSS para el hero de /ia.
 * Misma función que FloatingPanel: profundidad y carácter, sin imágenes.
 */
const FloatingRobot = ({
  className = '',
  variant = 'happy',
  tilt = -6,
  float = 'slow',
}: FloatingRobotProps) => {
  const isGlitch = variant === 'glitch';
  const floatClass =
    float === 'slower' ? 'animate-float-slower' : 'animate-float-slow';

  return (
    <div
      className={`pointer-events-none select-none ${floatClass} motion-reduce:animate-none ${className}`}
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
      aria-hidden='true'
    >
      <div
        className='relative w-36 md:w-44'
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        {/* Antena */}
        <div className='mx-auto flex flex-col items-center mb-[-2px]'>
          <span
            className={`w-2.5 h-2.5 rounded-full border-2 border-ink-dark shadow-[2px_2px_0_0_#1a1a1a] ${
              isGlitch ? 'bg-yellow-300' : 'bg-accent'
            }`}
          />
          <span className='w-0.5 h-4 bg-white/50' />
        </div>

        {/* Cabeza */}
        <div
          className={`relative rounded-2xl border-2 border-white/20 bg-white/[0.08] backdrop-blur-md shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)] px-4 pt-4 pb-3 ${
            isGlitch ? 'rounded-tl-md' : ''
          }`}
        >
          {/* Ojos */}
          <div className='flex justify-center gap-4 mb-3'>
            <span
              className={`relative w-8 h-8 rounded-full border-2 border-ink-dark bg-white flex items-center justify-center shadow-[2px_2px_0_0_#1a1a1a] ${
                isGlitch ? 'rotate-[-12deg]' : ''
              }`}
            >
              <span
                className={`rounded-full bg-ink-dark ${
                  isGlitch ? 'w-2.5 h-3.5' : 'w-3 h-3'
                }`}
              />
            </span>
            <span
              className={`relative w-8 h-8 rounded-full border-2 border-ink-dark bg-white flex items-center justify-center shadow-[2px_2px_0_0_#1a1a1a] ${
                isGlitch ? 'rotate-[18deg] translate-y-0.5' : ''
              }`}
            >
              <span
                className={`rounded-full bg-ink-dark ${
                  isGlitch ? 'w-3.5 h-2' : 'w-3 h-3'
                }`}
              />
            </span>
          </div>

          {/* Boca / pantalla */}
          <div
            className={`mx-auto rounded-lg border border-white/15 bg-ink-dark/40 flex items-center justify-center ${
              isGlitch ? 'h-7 px-2' : 'h-6 w-16'
            }`}
          >
            {isGlitch ? (
              <span className='font-mono text-[9px] font-bold text-yellow-300 tracking-tight'>
                err_404?
              </span>
            ) : (
              <span className='block w-8 h-1.5 rounded-full border-2 border-b-0 border-accent' />
            )}
          </div>

          {/* Mejillas / detalles */}
          {!isGlitch && (
            <>
              <span className='absolute left-3 top-10 w-2 h-2 rounded-full bg-accent/40' />
              <span className='absolute right-3 top-10 w-2 h-2 rounded-full bg-accent/40' />
            </>
          )}
        </div>

        {/* Cuerpo */}
        <div className='mt-2 mx-auto w-[85%] rounded-xl border-2 border-white/15 bg-white/[0.06] backdrop-blur-md px-3 py-2.5 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.5)]'>
          <div className='flex items-center justify-center gap-1.5 mb-2'>
            <span
              className={`w-2 h-2 rounded-full ${
                isGlitch ? 'bg-red-400 animate-pulse' : 'bg-accent'
              }`}
            />
            <span className='w-2 h-2 rounded-full bg-white/25' />
            <span className='w-2 h-2 rounded-full bg-white/25' />
          </div>
          <div className='space-y-1'>
            <div
              className={`h-1.5 rounded ${
                isGlitch
                  ? 'w-full bg-yellow-300/40'
                  : 'w-3/4 mx-auto bg-white/20'
              }`}
            />
            <div
              className={`h-1.5 rounded ${
                isGlitch ? 'w-2/3 bg-white/15' : 'w-1/2 mx-auto bg-white/10'
              }`}
            />
          </div>
        </div>

        {/* Brazos */}
        <span
          className={`absolute top-[52%] -left-3 w-3 h-10 rounded-full border-2 border-white/20 bg-white/[0.08] ${
            isGlitch ? 'rotate-[-35deg]' : 'rotate-[-20deg]'
          }`}
        />
        <span
          className={`absolute top-[52%] -right-3 w-3 h-10 rounded-full border-2 border-white/20 bg-white/[0.08] ${
            isGlitch ? 'rotate-[40deg]' : 'rotate-[20deg]'
          }`}
        />

        {/* Badge flotante */}
        <span
          className={`absolute -bottom-2 ${
            isGlitch ? '-left-2' : '-right-2'
          } inline-block bg-accent text-ink-dark text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 border-2 border-white/80 rotate-[-3deg] shadow-[2px_2px_0_0_rgba(255,255,255,0.35)]`}
        >
          {isGlitch ? '¿Minutos?' : 'IA'}
        </span>
      </div>
    </div>
  );
};

export default FloatingRobot;
