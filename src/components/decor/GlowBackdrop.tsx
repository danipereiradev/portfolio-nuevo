interface GlowBackdropProps {
  className?: string;
}

/**
 * Fondo sólido para secciones internas.
 */
const GlowBackdrop = ({ className = '' }: GlowBackdropProps) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-white ${className}`}
      aria-hidden='true'
    />
  );
};

export default GlowBackdrop;
