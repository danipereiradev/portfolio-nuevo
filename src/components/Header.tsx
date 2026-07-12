import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import { buildWhatsAppUrl, getWhatsAppMessageForPath } from '../config/contact';

interface HeaderProps {
  showNavMenu?: boolean;
}

const Header = ({ showNavMenu = true }: HeaderProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasTyped, setHasTyped] = useState(false);

  const headerWhatsAppUrl = buildWhatsAppUrl(
    getWhatsAppMessageForPath(location.pathname),
  );

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Header');
    trackGoogleAdsWhatsAppConversion(headerWhatsAppUrl);
  };

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
      name: 'Web para Autónomos y Pymes',
      path: '/web-autonomos-pymes',
    },
    {
      name: 'Tiendas Online',
      path: '/tiendas-online',
      popular: true,
    },
    {
      name: 'Mantenimiento Web',
      path: '/mantenimiento-web',
    },
  ];

  return (
    <>
      <header className='fixed w-full max-w-full top-0 z-50 bg-white border-b-2 border-ink-dark'>
        <div className='mx-auto w-full max-w-screen-2xl px-6 py-4'>
          <div className='flex items-center justify-between relative'>
            <a
              href='/'
              className='flex items-center gap-1.5 md:gap-2 flex-shrink-0 md:min-w-[280px] md:w-[280px]'
            >
              <span
                className='text-xl md:text-2xl whitespace-nowrap font-extrabold flex items-center'
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className='text-accent font-mono text-2xl md:text-3xl'>
                  &gt;
                </span>
                <span className='text-black font-mono tracking-tight ml-1'>
                  {hasTyped ? 'pereiraweb' : typedText.split(' ')[0]}
                </span>
                <span className='text-accent font-mono font-normal'>
                  {hasTyped ? ' .es' : (typedText.includes(' .') ? ' ' + typedText.split(' ')[1] : '')}
                </span>
                <span className='text-accent font-mono text-xl md:text-2xl animate-pulse ml-0'>
                  _
                </span>
              </span>
            </a>

            {showNavMenu && (
              <nav className='hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2'>
                <a
                  href='/'
                  className='relative font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent after:content-[""] after:absolute after:left-0 after:-bottom-1.5 after:h-[3px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full'
                >
                  Inicio
                </a>

                <div
                  className='relative'
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className='relative font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent flex items-center gap-1 after:content-[""] after:absolute after:left-0 after:-bottom-1.5 after:h-[3px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full'>
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
                        <div className='border-t-2 border-ink-dark mt-2 pt-2'>
                          <a
                            href='/#pricing'
                            onClick={() => setIsServicesOpen(false)}
                            className='block w-full text-left px-4 py-2 text-gray-600 hover:bg-accent hover:text-white text-sm font-bold transition-colors'
                          >
                            Ver todos los servicios →
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href='/#portfolio'
                  className='relative font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent after:content-[""] after:absolute after:left-0 after:-bottom-1.5 after:h-[3px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full'
                >
                  {t('nav.portfolio')}
                </a>

                <a
                  href='/#proceso'
                  className='relative font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent after:content-[""] after:absolute after:left-0 after:-bottom-1.5 after:h-[3px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full'
                >
                  Proceso
                </a>

                <a
                  href='/sobre-el-estudio'
                  className='relative font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent after:content-[""] after:absolute after:left-0 after:-bottom-1.5 after:h-[3px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full'
                >
                  {t('nav.about')}
                </a>

                <a
                  href='/contacto'
                  className='relative font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent after:content-[""] after:absolute after:left-0 after:-bottom-1.5 after:h-[3px] after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full'
                >
                  {t('nav.contact')}
                </a>
              </nav>
            )}

            <div className='flex items-center gap-2 md:gap-4'>
              {showNavMenu && (
                <button
                  className='md:hidden p-2'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className='w-6 h-6 text-black' />
                  ) : (
                    <Menu className='w-6 h-6 text-black' />
                  )}
                </button>
              )}

              <a
                href={headerWhatsAppUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={(e) => {
                  e.preventDefault();
                  handleWhatsAppClick();
                }}
                className='p-2 rounded-lg bg-accent hover:bg-accent-hover border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
                aria-label='WhatsApp'
              >
                <MessageCircle className='w-5 h-5 text-white' />
              </a>
            </div>
          </div>

          {showNavMenu && isMenuOpen && (
            <nav className='md:hidden mt-4 pb-2 bg-white rounded-lg border-2 border-ink-dark shadow-[6px_6px_0_0_#1a1a1a] divide-y-2 divide-gray-100'>
              <a
                href='/'
                className='block w-full text-left px-4 py-3 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
              >
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

              <a
                href='/#portfolio'
                className='block w-full text-left px-4 py-3 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
              >
                {t('nav.portfolio')}
              </a>

              <a
                href='/#proceso'
                className='block w-full text-left px-4 py-3 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
              >
                Proceso
              </a>

              <a
                href='/sobre-el-estudio'
                className='block w-full text-left px-4 py-3 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
              >
                {t('nav.about')}
              </a>

              <a
                href='/contacto'
                className='block w-full text-left px-4 py-3 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
              >
                {t('nav.contact')}
              </a>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
