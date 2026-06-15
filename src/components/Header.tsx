import { useState } from 'react';
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useContactModal } from '../contexts/ContactModalContext';
import AboutMe from './AboutMe';

interface HeaderProps {
  showNavMenu?: boolean;
}

const Header = ({ showNavMenu = true }: HeaderProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useContactModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [aboutMeOpen, setAboutMeOpen] = useState<{
    isOpen: boolean;
    language: 'es' | 'en';
  }>({ isOpen: false, language: 'es' });

  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const openAboutMe = () => {
    setAboutMeOpen({ isOpen: true, language: 'es' });
    setIsMenuOpen(false);
  };

  const closeAboutMe = () => {
    setAboutMeOpen({ isOpen: false, language: 'es' });
  };

  const services = [
    {
      name: 'Diseño Web',
      path: '/diseno-web',
    },
    {
      name: 'Páginas Web Empresas',
      path: '/paginas-web-empresas',
    },
    {
      name: 'Tiendas Online',
      path: '/tiendas-online',
      popular: true,
    },
    {
      name: 'Aplicaciones Web',
      path: '/desarrollo-aplicaciones-web',
    },
    {
      name: 'Posicionamiento SEO',
      path: '/posicionamiento-web-seo',
    },
    {
      name: 'Mantenimiento Web',
      path: '/mantenimiento-web',
    },
  ];

  return (
    <>
      <header className='fixed w-full max-w-full top-0 z-50 bg-white shadow-lg'>
        <div className='container mx-auto px-4 md:px-6 py-4 max-w-full'>
          <div className='flex items-center justify-between'>
            <Link
              to='/'
              className='flex items-center gap-1.5 md:gap-2 flex-shrink-0'
            >
              <span
                className='text-xl md:text-2xl whitespace-nowrap font-extrabold flex items-center gap-1'
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className='text-accent font-mono text-2xl md:text-3xl'>
                  &gt;
                </span>
                <span className='text-black font-mono tracking-tight'>
                  danipereiraweb
                </span>
                <span className='text-accent font-mono font-normal'> .es</span>
                <span className='text-accent font-mono text-xl md:text-2xl animate-pulse'>
                  _
                </span>
              </span>
            </Link>

            {showNavMenu && (
              <nav className='hidden md:flex items-center space-x-8'>
                <Link
                  to='/'
                  className='font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent'
                >
                  Inicio
                </Link>

                <button
                  onClick={openAboutMe}
                  className='font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent'
                >
                  {t('nav.about')}
                </button>

                <div
                  className='relative'
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className='font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent flex items-center gap-1'>
                    Servicios
                    <ChevronDown className='w-4 h-4' />
                  </button>

                  {isServicesOpen && (
                    <div className='absolute top-full left-0 pt-2 w-72 z-50'>
                      <div className='bg-white rounded-lg shadow-xl py-2'>
                        {services.map((service) => (
                          <a
                            key={service.path}
                            href={service.path}
                            className='group block px-4 py-3 hover:bg-accent transition-colors'
                            onClick={() => setIsServicesOpen(false)}
                          >
                            <div className='flex items-center justify-between'>
                              <span className='text-gray-900 group-hover:text-white font-medium text-sm transition-colors'>
                                {service.name}
                              </span>
                              {service.popular && (
                                <span className='bg-ink-gray text-white text-xs px-2 py-1 rounded-full'>
                                  Popular
                                </span>
                              )}
                            </div>
                          </a>
                        ))}
                        <div className='border-t border-gray-200 mt-2 pt-2'>
                          <button
                            onClick={() => {
                              scrollToSection('pricing');
                              setIsServicesOpen(false);
                            }}
                            className='block w-full text-left px-4 py-2 text-gray-600 hover:bg-accent hover:text-white text-sm font-medium transition-colors'
                          >
                            Ver todos los servicios →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => scrollToSection('portfolio')}
                  className='font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent'
                >
                  {t('nav.portfolio')}
                </button>

                <button
                  onClick={() => {
                    openModal();
                    setIsMenuOpen(false);
                  }}
                  className='font-bold text-md uppercase text-black transition-colors duration-200 hover:text-accent'
                >
                  {t('nav.contact')}
                </button>
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
                href='https://wa.me/34644669828'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-lg bg-accent hover:bg-accent-hover transition-colors duration-200'
                aria-label='WhatsApp'
              >
                <MessageCircle className='w-5 h-5 text-white' />
              </a>
            </div>
          </div>

          {showNavMenu && isMenuOpen && (
            <nav className='md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg'>
              <Link
                to='/'
                onClick={() => setIsMenuOpen(false)}
                className='block w-full text-left px-4 py-2 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
              >
                Inicio
              </Link>

              <button
                onClick={openAboutMe}
                className='block w-full text-left px-4 py-2 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
              >
                {t('nav.about')}
              </button>

              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className='flex items-center justify-between w-full px-4 py-2 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
                >
                  <span>Servicios</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isServicesOpen && (
                  <div className='bg-gray-50'>
                    {services.map((service) => (
                      <a
                        key={service.path}
                        href={service.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                        className='group block px-6 py-2 text-sm hover:bg-accent transition-colors'
                      >
                        <div className='flex items-center justify-between'>
                          <span className='text-gray-600 group-hover:text-white transition-colors'>
                            {service.name}
                          </span>
                          {service.popular && (
                            <span className='bg-ink-gray text-white text-xs px-2 py-0.5 rounded-full'>
                              ★
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection('portfolio')}
                className='block w-full text-left px-4 py-2 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
              >
                {t('nav.portfolio')}
              </button>

              <button
                onClick={() => {
                  openModal();
                  setIsMenuOpen(false);
                }}
                className='block w-full text-left px-4 py-2 font-bold text-md uppercase text-black hover:bg-gray-100 hover:text-accent transition-colors duration-200'
              >
                {t('nav.contact')}
              </button>
            </nav>
          )}
        </div>
      </header>

      <AboutMe isOpen={aboutMeOpen.isOpen} onClose={closeAboutMe} />
    </>
  );
};

export default Header;
