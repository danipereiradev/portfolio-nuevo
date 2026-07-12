interface FloatingPanelProps {
  className?: string;
  variant?: 'layout' | 'code' | 'profile' | 'chat' | 'contact';
  tilt?: number;
}

/**
 * Panel abstracto flotante (look "ventana de navegador / editor de código")
 * construido solo con CSS, sin librerías 3D ni imágenes. Se usa como
 * elemento decorativo en heros para dar sensación de profundidad e
 * identidad de estudio digital, sin afectar a la legibilidad ni al
 * rendimiento. Las variantes permiten adaptar el contenido del panel a la
 * temática de cada página (equipo, conversación, ficha de contacto...).
 */
const FloatingPanel = ({
  className = '',
  variant = 'layout',
  tilt = -6,
}: FloatingPanelProps) => {
  return (
    <div
      className={`pointer-events-none select-none animate-float-slow motion-reduce:animate-none ${className}`}
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
    >
      <div
        className='w-56 md:w-64 rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden'
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div className='flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/[0.04]'>
          <span className='w-2 h-2 rounded-full bg-red-400/70' />
          <span className='w-2 h-2 rounded-full bg-yellow-400/70' />
          <span className='w-2 h-2 rounded-full bg-accent/80' />
        </div>

        {variant === 'layout' && (
          <div className='p-3 space-y-2'>
            <div className='h-2.5 w-2/3 rounded bg-white/25' />
            <div className='h-2 w-full rounded bg-white/10' />
            <div className='h-2 w-5/6 rounded bg-white/10' />
            <div className='grid grid-cols-3 gap-1.5 pt-1'>
              <div className='h-8 rounded bg-accent/25 border border-accent/40' />
              <div className='h-8 rounded bg-white/10' />
              <div className='h-8 rounded bg-white/10' />
            </div>
          </div>
        )}

        {variant === 'code' && (
          <div className='p-3 space-y-1.5 font-mono text-[10px] leading-relaxed'>
            <div className='flex gap-2'>
              <span className='text-accent/70'>01</span>
              <span className='h-2 w-1/2 rounded bg-white/20' />
            </div>
            <div className='flex gap-2'>
              <span className='text-accent/70'>02</span>
              <span className='h-2 w-2/3 rounded bg-white/10 ml-3' />
            </div>
            <div className='flex gap-2'>
              <span className='text-accent/70'>03</span>
              <span className='h-2 w-1/3 rounded bg-accent/30 ml-3' />
            </div>
            <div className='flex gap-2'>
              <span className='text-accent/70'>04</span>
              <span className='h-2 w-2/5 rounded bg-white/10' />
            </div>
          </div>
        )}

        {variant === 'profile' && (
          <div className='p-3 space-y-2.5'>
            <div className='flex items-center gap-2.5'>
              <div className='w-8 h-8 rounded-full bg-accent/25 border border-accent/50 flex-shrink-0' />
              <div className='space-y-1.5 flex-1'>
                <div className='h-2 w-4/5 rounded bg-white/25' />
                <div className='h-1.5 w-1/2 rounded bg-white/10' />
              </div>
            </div>
            <div className='h-1.5 w-full rounded bg-white/10' />
            <div className='h-1.5 w-3/4 rounded bg-white/10' />
            <span className='inline-flex items-center h-5 px-2 rounded-full bg-accent/15 border border-accent/40 text-[8px] font-semibold text-accent/90 tracking-wide'>
              +12 AÑOS
            </span>
          </div>
        )}

        {variant === 'chat' && (
          <div className='p-3 space-y-1.5'>
            <div className='flex justify-start'>
              <div className='max-w-[75%] rounded-lg rounded-tl-none bg-white/10 px-2.5 py-1.5 space-y-1'>
                <div className='h-1.5 w-20 rounded bg-white/25' />
                <div className='h-1.5 w-14 rounded bg-white/15' />
              </div>
            </div>
            <div className='flex justify-end'>
              <div className='max-w-[70%] rounded-lg rounded-tr-none bg-accent/25 border border-accent/40 px-2.5 py-1.5'>
                <div className='h-1.5 w-16 rounded bg-accent/60' />
              </div>
            </div>
            <div className='flex justify-start'>
              <div className='max-w-[55%] rounded-lg rounded-tl-none bg-white/10 px-2.5 py-1.5'>
                <div className='h-1.5 w-10 rounded bg-white/20' />
              </div>
            </div>
          </div>
        )}

        {variant === 'contact' && (
          <div className='p-3 space-y-2.5'>
            <div className='flex items-center gap-2.5'>
              <div className='w-5 h-5 rounded bg-accent/25 border border-accent/50 flex-shrink-0' />
              <div className='h-2 w-2/3 rounded bg-white/20' />
            </div>
            <div className='flex items-center gap-2.5'>
              <div className='w-5 h-5 rounded bg-accent/25 border border-accent/50 flex-shrink-0' />
              <div className='h-2 w-1/2 rounded bg-white/15' />
            </div>
            <div className='flex items-center gap-2.5'>
              <div className='w-5 h-5 rounded bg-accent/25 border border-accent/50 flex-shrink-0' />
              <div className='h-2 w-3/4 rounded bg-white/10' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingPanel;
