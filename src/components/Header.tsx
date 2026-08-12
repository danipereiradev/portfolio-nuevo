import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackTuWebConIaClick } from '../utils/analytics';

interface HeaderProps {
  showNavMenu?: boolean;
}

const packLandingAnchors = [
  { href: '#incluye', label: 'Incluye' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#por-que', label: 'Por qué' },
  { href: '#portfolio', label: 'Trabajos' },
  { href: '#valoraciones', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
];

const navLinkClass =
  'relative font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent after:content-[""] after:absolute after:left-0 after:-bottom-1.5 after:h-[3px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full';

const mobileNavLinkClass =
  'block w-full text-left px-4 py-3 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200';

const Header = ({ showNavMenu }: HeaderProps) => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const isPackLanding = normalizedPath === '/web-profesional';
  const navEnabled = showNavMenu ?? !isPackLanding;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasTyped, setHasTyped] = useState(false);

  const fullText = 'pereiraweb .es';

  useEffect(() => {
    if (!hasTyped) {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
          setHasTyped(true);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [hasTyped]);

  const services = [
    {
      name: 'Web profesional a medida',
      path: '/web-profesional-a-medida',
      popular: true,
    },
    {
      name: 'Tiendas Online',
      path: '/tiendas-online',
    },
    {
      name: 'Mantenimiento Web',
      path: '/mantenimiento-web',
    },
  ];

  const brand = (
    <span
      className='text-xl md:text-2xl whitespace-nowrap font-extrabold flex items-center'
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <span className='text-accent font-mono text-2xl md:text-3xl'>&gt;</span>
      <span className='text-black font-mono tracking-tight ml-1'>
        {hasTyped ? 'pereiraweb' : typedText.split(' ')[0]}
      </span>
      <span className='text-accent font-mono font-normal'>
        {hasTyped
          ? ' .es'
          : typedText.includes(' .')
            ? ' ' + typedText.split(' ')[1]
            : ''}
      </span>
      <span className='text-accent font-mono text-xl md:text-2xl animate-pulse ml-0'>
        _
      </span>
    </span>
  );

  const scrollToAnchor = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className='fixed w-full max-w-full top-0 z-50 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]'>
        <div className='mx-auto w-full max-w-screen-2xl px-6 py-4'>
          <div className='flex items-center justify-between relative'>
            {isPackLanding || !navEnabled ? (
              <div className='flex items-center gap-1.5 md:gap-2 flex-shrink-0 md:min-w-[200px]'>
                {brand}
              </div>
            ) : (
              <a
                href='/'
                className='flex items-center gap-1.5 md:gap-2 flex-shrink-0 md:min-w-[280px] md:w-[280px]'
              >
                {brand}
              </a>
            )}

            {isPackLanding && (
              <nav className='hidden md:flex items-center space-x-5 lg:space-x-7 absolute left-1/2 -translate-x-1/2'>
                {packLandingAnchors.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToAnchor(item.href);
                    }}
                    className={navLinkClass}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}

            {navEnabled && (
              <nav className='hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2'>
                <a href='/' className={navLinkClass}>
                  Inicio
                </a>

                <div
                  className='relative'
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className={`${navLinkClass} flex items-center gap-1`}>
                    Servicios
                    <ChevronDown className='w-4 h-4' />
                  </button>

                  {isServicesOpen && (
                    <div className='absolute top-full left-0 pt-3 w-72 z-50'>
                      <div className='bg-white rounded-lg border-2 border-ink-dark shadow-[6px_6px_0_0_#1a1a1a] py-2'>
                        {services.map((service) => (
                          <a
                            key={service.path}
                            href={service.path}
                            className='group block px-4 py-3 hover:bg-accent transition-colors'
                            onClick={() => setIsServicesOpen(false)}
                          >
                            <div className='flex items-center justify-between'>
                              <span className='text-gray-900 group-hover:text-white font-bold text-sm transition-colors'>
                                {service.name}
                              </span>
                              {service.popular && (
                                <span className='bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold px-2 py-0.5 rotate-[-2deg]'>
                                  Popular
                                </span>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <a href='/sobre-el-estudio' className={navLinkClass}>
                  {t('nav.about')}
                </a>

                <a href='/contacto' className={navLinkClass}>
                  {t('nav.contact')}
                </a>

                <a href='/preguntas-frecuentes' className={navLinkClass}>
                  Preguntas
                </a>
              </nav>
            )}

            {isPackLanding && (
              <div className='md:hidden flex items-center justify-end'>
                <button
                  className='p-2'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                  {isMenuOpen ? (
                    <X className='w-6 h-6 text-black' />
                  ) : (
                    <Menu className='w-6 h-6 text-black' />
                  )}
                </button>
              </div>
            )}

            {isPackLanding && (
              <div className='hidden md:block md:min-w-[200px]' aria-hidden='true' />
            )}

            {navEnabled && (
              <>
                <div className='hidden md:flex items-center justify-end md:min-w-[280px] md:w-[280px]'>
                  <a
                    href='/ia'
                    onClick={() => trackTuWebConIaClick('header_nav')}
                    className='inline-flex items-center justify-center px-3 py-2 rounded-lg bg-accent hover:bg-accent-hover border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 text-white text-sm font-bold whitespace-nowrap leading-none'
                  >
                    Tu web con IA
                  </a>
                </div>

                <div className='md:hidden flex items-center gap-2'>
                  <a
                    href='/ia'
                    onClick={() => trackTuWebConIaClick('header_mobile_ia')}
                    className='inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-accent hover:bg-accent-hover border-2 border-ink-dark shadow-[2px_2px_0_0_#1a1a1a] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150 text-white text-xs font-bold leading-none'
                    aria-label='Tu web con IA'
                  >
                    IA
                  </a>
                  <button
                    className='p-2'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                  >
                    {isMenuOpen ? (
                      <X className='w-6 h-6 text-black' />
                    ) : (
                      <Menu className='w-6 h-6 text-black' />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {isPackLanding && isMenuOpen && (
            <nav className='md:hidden mt-4 pb-2 bg-white rounded-lg border-2 border-ink-dark shadow-[6px_6px_0_0_#1a1a1a] divide-y-2 divide-gray-100'>
              {packLandingAnchors.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToAnchor(item.href);
                  }}
                  className={mobileNavLinkClass}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {navEnabled && isMenuOpen && (
            <nav className='md:hidden mt-4 pb-2 bg-white rounded-lg border-2 border-ink-dark shadow-[6px_6px_0_0_#1a1a1a] divide-y-2 divide-gray-100'>
              <a href='/' className={mobileNavLinkClass}>
                Inicio
              </a>

              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className='flex items-center justify-between w-full px-4 py-3 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
                >
                  <span>Servicios</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isServicesOpen && (
                  <div className='bg-gray-50 border-t-2 border-gray-100'>
                    {services.map((service) => (
                      <a
                        key={service.path}
                        href={service.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                        className='group block px-6 py-2.5 text-sm hover:bg-accent transition-colors'
                      >
                        <div className='flex items-center justify-between'>
                          <span className='text-gray-600 group-hover:text-white font-semibold transition-colors'>
                            {service.name}
                          </span>
                          {service.popular && (
                            <span className='bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold px-2 py-0.5 rotate-[-2deg]'>
                              Popular
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href='/sobre-el-estudio' className={mobileNavLinkClass}>
                {t('nav.about')}
              </a>

              <a href='/contacto' className={mobileNavLinkClass}>
                {t('nav.contact')}
              </a>

              <a
                href='/preguntas-frecuentes'
                onClick={() => setIsMenuOpen(false)}
                className={mobileNavLinkClass}
              >
                Preguntas
              </a>

              <div className='px-4 py-3'>
                <a
                  href='/ia'
                  onClick={() => {
                    trackTuWebConIaClick('header_mobile');
                    setIsMenuOpen(false);
                  }}
                  className='flex w-full items-center justify-center px-3 py-3 rounded-lg bg-accent hover:bg-accent-hover border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 text-white text-sm font-bold uppercase'
                >
                  Tu web con IA
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
