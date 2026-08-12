interface GlowBackdropProps {
  className?: string;
}

/**
 * Fondo oscuro sencillo para secciones internas.
 * Sin blobs animados ni grid “SaaS”: menos look de plantilla IA.
 */
const GlowBackdrop = ({ className = '' }: GlowBackdropProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className='absolute inset-0 bg-ink-dark' />
      <div
        className='absolute inset-0 opacity-[0.35]'
        style={{
          backgroundImage: "url('/img/cta-background.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className='absolute inset-0 bg-ink-dark/75' />
    </div>
  );
};

export default GlowBackdrop;
