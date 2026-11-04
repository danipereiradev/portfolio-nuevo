import { GOOGLE_REVIEWS_URL, allTestimonials } from '../data/testimonials';

// Sello de reseñas de Google para los hero. Enlaza a las reseñas reales.
const initials = allTestimonials
  .filter((t) => t.source === 'google')
  .slice(0, 4)
  .map((t) => t.name.trim()[0]?.toUpperCase() ?? '');

export default function GoogleBadge({ className = '' }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target='_blank'
      rel='noopener noreferrer'
      className={`group inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-3 pr-5 transition-colors hover:border-[#e1f56e]/60 ${className}`}
      aria-label='Ver las reseñas de 36web en Google'
    >
      <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white'>
        <svg viewBox='0 0 48 48' className='h-6 w-6' aria-hidden='true'>
          <path fill='#FFC107' d='M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z' />
          <path fill='#FF3D00' d='M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z' />
          <path fill='#4CAF50' d='M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z' />
          <path fill='#1976D2' d='M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z' />
        </svg>
      </span>
      <span className='flex flex-col'>
        <span className='flex items-center gap-2'>
          <span className='text-sm tracking-[0.12em] text-[#fbbc04]' aria-hidden='true'>
            ★★★★★
          </span>
          <span className='text-sm font-extrabold text-[#ffffff]'>5 estrellas</span>
        </span>
        <span className='mt-0.5 text-xs text-[#ffffff]/60 group-hover:text-[#ffffff]/80'>Reseñas reales de clientes en Google</span>
      </span>
      <span className='ml-1 hidden -space-x-2 sm:flex' aria-hidden='true'>
        {initials.map((l, i) => (
          <span
            key={i}
            className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0e0e0c] bg-[#e1f56e] text-xs font-black text-[#0b0c0a]'
          >
            {l}
          </span>
        ))}
      </span>
    </a>
  );
}
