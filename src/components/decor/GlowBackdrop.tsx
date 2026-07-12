interface GlowBackdropProps {
  className?: string;
}

/**
 * Fondo inmersivo reutilizable: degradado profundo + resplandores + grid
 * sutil, construido solo con CSS (sin imágenes ni librerías 3D). Pensado
 * para secciones oscuras (hero, CTA final, "por qué elegirnos") donde
 * queremos sensación de profundidad sin penalizar el rendimiento.
 */
const GlowBackdrop = ({ className = '' }: GlowBackdropProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className='absolute inset-0 bg-gradient-to-br from-[#0a0f0e] via-ink-dark to-[#062421]' />

      <div className='absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_25%_15%,rgba(20,184,166,0.30),transparent_60%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(20,184,166,0.18),transparent_60%)]' />

      <div
        className='absolute inset-0 opacity-[0.08]'
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className='absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-accent/25 blur-3xl animate-blob motion-reduce:animate-none' />
      <div
        className='absolute bottom-[-6rem] left-[-4rem] w-[360px] h-[360px] rounded-full bg-accent/15 blur-3xl animate-blob motion-reduce:animate-none'
        style={{ animationDelay: '2.5s' }}
      />
    </div>
  );
};

export default GlowBackdrop;
