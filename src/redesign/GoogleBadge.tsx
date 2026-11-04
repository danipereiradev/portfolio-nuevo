import TestimonialsBadge from '../components/TestimonialsBadge';

// Sello de reseñas de Google: usa el widget real de Trustindex (components/TestimonialsBadge).
export default function GoogleBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`rd-trustindex ${className}`}>
      <TestimonialsBadge />
    </div>
  );
}
