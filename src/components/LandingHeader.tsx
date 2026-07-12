import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import { ADS_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../config/contact';

const WHATSAPP_URL = buildWhatsAppUrl(ADS_WHATSAPP_MESSAGE);

const navLinks = [
  { label: 'Trabajos', id: 'portfolio' },
  { label: 'Qué incluye', id: 'incluye' },
  { label: 'Valoraciones', id: 'valoraciones' },
  { label: 'Presupuesto', id: 'precios' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contacto', id: 'contacto' },
];

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick('LandingHeader', 'Pedir presupuesto');
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  return (
    <header className='fixed w-full max-w-full top-0 z-50 bg-white border-b-2 border-ink-dark'>
      <div className='mx-auto w-full max-w-screen-2xl px-6 py-4 flex items-center justify-between'>
        <a href='/' className='flex items-center gap-1.5 flex-shrink-0'>
          <span
            className='text-xl md:text-2xl whitespace-nowrap font-extrabold flex items-center'
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className='text-accent font-mono text-2xl md:text-3xl'>
              &gt;
            </span>
            <span className='text-black font-mono tracking-tight ml-1'>
              pereiraweb
            </span>
            <span className='text-accent font-mono font-normal'>.es</span>
          </span>
        </a>

        <nav className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className='relative font-bold text-sm uppercase text-black transition-colors duration-200 hover:text-accent after:content-[""] after:absolute after:left-0 after:-bottom-1.5 after:h-[3px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full'
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className='flex items-center gap-2 md:gap-4'>
          <button
            className='md:hidden p-2'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Abrir menú'
          >
            {isMenuOpen ? (
              <X className='w-6 h-6 text-black' />
            ) : (
              <Menu className='w-6 h-6 text-black' />
            )}
          </button>

          {/* CTA destacado del header: visible con texto en escritorio */}
          <button
            onClick={handleWhatsApp}
            className='hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 text-white font-bold text-sm'
          >
            <MessageCircle className='w-4 h-4' />
            Escríbenos por WhatsApp
          </button>

          {/* Versión compacta solo icono para móvil */}
          <button
            onClick={handleWhatsApp}
            className='md:hidden p-2 rounded-lg bg-accent hover:bg-accent-hover border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            aria-label='Escríbenos por WhatsApp'
          >
            <MessageCircle className='w-5 h-5 text-white' />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className='md:hidden bg-white border-t-2 border-ink-dark px-6 py-4 flex flex-col gap-1'>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className='text-left font-bold text-sm uppercase text-black py-2 hover:text-accent transition-colors'
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default LandingHeader;
