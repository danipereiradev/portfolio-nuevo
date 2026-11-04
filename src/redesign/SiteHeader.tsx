import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SERVICES, SERVICES_PATH } from './services';
import { CONTACT_PATH, PORTFOLIO_PATH } from '../config/contact';
import { BLOG_PATH } from '../blog/posts';

export const Logo36 = ({ className = 'h-10 w-10' }: { className?: string }) => (
  <svg viewBox='0 0 512 512' aria-hidden='true' className={`${className} shrink-0 rounded-lg`}>
    <rect width='512' height='512' fill='#000' />
    <path d='M165 150 L367 239 L367 287 L165 377 L165 321 L304 263 L165 205 Z' fill='#e1f56e' />
  </svg>
);

const NAV = [
  { href: PORTFOLIO_PATH, label: 'Casos de éxito' },
  { href: BLOG_PATH, label: 'Blog' },
];

export default function SiteHeader({ hideNav = false }: { hideNav?: boolean }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number>();

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const enter = () => {
    window.clearTimeout(closeTimer.current);
    setSvcOpen(true);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setSvcOpen(false), 160);
  };

  return (
    <header
      className={`rd fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-[#0b0c0a]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className='mx-auto flex h-[var(--site-header-h)] max-w-[1320px] items-center justify-between gap-6 px-5 md:px-8'>
        <a href='/' className='flex items-center gap-3 outline-none' aria-label='36web, inicio'>
          <Logo36 className='h-[2.875rem] w-[2.875rem]' />
          <span className='text-[1.4375rem] font-extrabold tracking-tight text-white'>
            36WEB<span className='text-[#e1f56e]'>.</span>
          </span>
        </a>

        {hideNav ? null : (
          <>
            <nav className='hidden items-center gap-9 lg:flex' aria-label='Principal'>
              <div className='relative' onMouseEnter={enter} onMouseLeave={leave}>
                <button
                  type='button'
                  className='rd-navlink flex items-center gap-1.5'
                  aria-expanded={svcOpen}
                  onClick={() => setSvcOpen((v) => !v)}
                >
                  Servicios
                  <svg viewBox='0 0 12 12' className={`h-3 w-3 transition-transform ${svcOpen ? 'rotate-180' : ''}`} aria-hidden='true'>
                    <path d='M2 4l4 4 4-4' fill='none' stroke='currentColor' strokeWidth='1.6' />
                  </svg>
                </button>
                <div
                  className={`absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-5 transition-all duration-200 ${
                    svcOpen ? 'visible opacity-100' : 'invisible -translate-y-1 opacity-0'
                  }`}
                >
                  <div className='grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-[#121311] p-3 shadow-2xl'>
                    {SERVICES.map((s) => (
                      <a key={s.slug} href={s.href} className='group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/5'>
                        <span className='mt-0.5 font-mono text-xs text-[#e1f56e]'>{s.num}</span>
                        <span>
                          <span className='block text-sm font-semibold text-white'>{s.name}</span>
                          <span className='block text-xs leading-snug text-white/50'>{s.area}</span>
                        </span>
                        <span className='ml-auto text-white/30 transition-colors group-hover:text-[#e1f56e]'>↗</span>
                      </a>
                    ))}
                    <a href={SERVICES_PATH} className='col-span-2 mt-1 rounded-xl border border-white/10 p-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/70 hover:border-[#e1f56e] hover:text-[#e1f56e]'>
                      Todos los servicios ↗
                    </a>
                  </div>
                </div>
              </div>
              {NAV.map((l) => (
                <a key={l.href} href={l.href} className='rd-navlink'>
                  {l.label}
                </a>
              ))}
            </nav>

            <a href={CONTACT_PATH} className='rd-btn-outline hidden lg:inline-flex'>
              Hablemos <span aria-hidden='true'>↗</span>
            </a>

            <button
              type='button'
              className='flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden'
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className='relative block h-3 w-5'>
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </>
        )}
      </div>

      {open && !hideNav ? (
        <div className='h-[calc(100svh-var(--site-header-h))] overflow-y-auto bg-[#0b0c0a] px-5 pb-10 pt-4 lg:hidden'>
          <p className='rd-eyebrow mb-3'>Menú</p>
          {[{ href: '/', label: 'Inicio' }, ...NAV, { href: CONTACT_PATH, label: 'Contacto' }].map((l, i) => (
            <a key={l.href} href={l.href} className='flex items-baseline gap-4 border-b border-white/10 py-4 text-2xl font-extrabold uppercase text-white'>
              <span className='font-mono text-xs text-[#e1f56e]'>{String(i).padStart(2, '0')}</span>
              {l.label}
              <span className='ml-auto text-base text-white/40'>↗</span>
            </a>
          ))}
          <p className='rd-eyebrow mb-3 mt-8'>Servicios</p>
          {SERVICES.map((s) => (
            <a key={s.slug} href={s.href} className='flex items-baseline gap-4 border-b border-white/10 py-3 text-lg font-bold text-white'>
              <span className='font-mono text-xs text-[#e1f56e]'>{s.num}</span>
              {s.name}
              <span className='ml-auto text-sm text-white/40'>↗</span>
            </a>
          ))}
          <a href={CONTACT_PATH} className='rd-btn mt-8 w-full justify-center'>
            Hablemos ↗
          </a>
        </div>
      ) : null}
    </header>
  );
}
