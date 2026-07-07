import { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackWhatsAppClick } from '../utils/analytics';

const WHATSAPP_URL =
  'https://wa.me/34644669828?text=Hola,%20quiero%20pedir%20presupuesto%20para%20mi%20web';

const navLinks = [
  { label: 'Precio', id: 'precios' },
  { label: 'Qué incluye', id: 'incluye' },
  { label: 'Trabajos', id: 'portfolio' },
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
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className='fixed w-full max-w-full top-0 z-50 bg-white shadow-lg'>
      <div className='mx-auto w-full max-w-screen-2xl px-6 py-4 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-1.5 flex-shrink-0'>
          <span
            className='text-xl md:text-2xl whitespace-nowrap font-extrabold flex items-center'
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className='text-accent font-mono text-2xl md:text-3xl'>
              &gt;
            </span>
            <span className='text-black font-mono tracking-tight ml-1'>
              danipereiraweb
            </span>
            <span className='text-accent font-mono font-normal'>.es</span>
          </span>
        </Link>

        <nav className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className='font-bold text-sm uppercase text-black transition-colors duration-200 hover:text-accent'
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
            className='hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white font-bold text-sm'
          >
            <MessageCircle className='w-4 h-4' />
            Pedir presupuesto
          </button>

          {/* Versión compacta solo icono para móvil */}
          <button
            onClick={handleWhatsApp}
            className='md:hidden p-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors duration-200'
            aria-label='Pedir presupuesto por WhatsApp'
          >
            <MessageCircle className='w-5 h-5 text-white' />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className='md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1'>
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
