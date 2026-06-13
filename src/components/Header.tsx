import { useState, useEffect } from 'react';
import { Menu, X, Code2, ChevronDown, Mail, MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AboutMe from './AboutMe';

const Header = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [aboutMeOpen, setAboutMeOpen] = useState<{
    isOpen: boolean;
    language: 'es' | 'en';
  }>({ isOpen: false, language: 'es' });

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      // Si no estamos en home, navegar primero
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
      name: 'Página Web',
      path: '/web-autonomos-pymes',
    },
    {
      name: 'Tienda Online',
      path: '/tienda-online',
      popular: true,
    },
    {
      name: 'App Móvil',
      path: '/aplicacion-web',
    },
  ];

  return (
    <>
      <header className='fixed w-full top-0 z-50 bg-white shadow-lg'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link to='/' className='flex items-center space-x-2'>
              <Code2 className='w-8 h-8 text-ink-dark' />
              <span className='text-xl font-bold bg-gradient-to-r from-ink-dark to-ink-gray bg-clip-text'>
                Dani Pereira
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className='hidden md:flex items-center space-x-8'>
              <Link
                to='/'
                className='font-bold text-md uppercase text-gray-700 transition-colors duration-200 hover:text-ink-dark'
              >
                Inicio
              </Link>

              <button
                onClick={openAboutMe}
                className='font-bold text-md uppercase text-gray-700 transition-colors duration-200 hover:text-ink-dark'
              >
                {t('nav.about')}
              </button>

              {/* Services Dropdown */}
              <div
                className='relative'
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className='font-bold text-md uppercase text-gray-700 transition-colors duration-200 hover:text-ink-dark flex items-center gap-1'>
                  Servicios
                  <ChevronDown className='w-4 h-4' />
                </button>

                {isServicesOpen && (
                  <div className='absolute top-full left-0 pt-2 w-72 z-50'>
                    <div className='bg-white rounded-lg shadow-xl py-2'>
                      {services.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
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
                        </Link>
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
                className='font-bold text-md uppercase text-gray-700 transition-colors duration-200 hover:text-ink-dark'
              >
                {t('nav.portfolio')}
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className='font-bold text-md uppercase text-gray-700 transition-colors duration-200 hover:text-ink-dark'
              >
                {t('nav.contact')}
              </button>
            </nav>

            {/* Contact Icons - Right */}
            <div className='hidden md:flex items-center gap-4'>
              <a
                href='mailto:web.danipereira@gmail.com'
                className='p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
                aria-label='Email'
              >
                <Mail className='w-5 h-5 text-gray-700' />
              </a>
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

            {/* Mobile Menu Button */}
            <button
              className='md:hidden'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className='w-6 h-6 text-gray-700' />
              ) : (
                <Menu className='w-6 h-6 text-gray-700' />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className='md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg'>
              <Link
                to='/'
                onClick={() => setIsMenuOpen(false)}
                className='block w-full text-left px-4 py-2 font-bold text-md uppercase text-gray-700 hover:bg-gray-100 hover:text-ink-dark transition-colors duration-200'
              >
                Inicio
              </Link>

              <button
                onClick={openAboutMe}
                className='block w-full text-left px-4 py-2 font-bold text-md uppercase text-gray-700 hover:bg-gray-100 hover:text-ink-dark transition-colors duration-200'
              >
                {t('nav.about')}
              </button>

              {/* Services Submenu Mobile */}
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className='flex items-center justify-between w-full px-4 py-2 font-bold text-md uppercase text-gray-700 hover:bg-gray-100 hover:text-ink-dark transition-colors duration-200'
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
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                        className='group block px-6 py-2 text-sm hover:bg-accent transition-colors'
                      >
                        <div className='flex items-center justify-between'>
                          <span className='text-gray-600 group-hover:text-white transition-colors'>{service.name}</span>
                          {service.popular && (
                            <span className='bg-ink-gray text-white text-xs px-2 py-0.5 rounded-full'>
                              ★
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection('portfolio')}
                className='block w-full text-left px-4 py-2 font-bold text-md uppercase text-gray-700 hover:bg-gray-100 hover:text-ink-dark transition-colors duration-200'
              >
                {t('nav.portfolio')}
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className='block w-full text-left px-4 py-2 font-bold text-md uppercase text-gray-700 hover:bg-gray-100 hover:text-ink-dark transition-colors duration-200'
              >
                {t('nav.contact')}
              </button>

              {/* Contact Icons Mobile */}
              <div className='flex items-center gap-4 px-4 py-4 mt-2 border-t border-gray-200'>
                <a
                  href='mailto:web.danipereira@gmail.com'
                  className='flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex-1 justify-center'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail className='w-5 h-5 text-gray-700' />
                  <span className='text-sm font-medium text-gray-700'>Email</span>
                </a>
                <a
                  href='https://wa.me/34644669828'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover transition-colors duration-200 flex-1 justify-center'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className='w-5 h-5 text-white' />
                  <span className='text-sm font-medium text-white'>WhatsApp</span>
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* About Me Modal */}
      <AboutMe isOpen={aboutMeOpen.isOpen} onClose={closeAboutMe} />
    </>
  );
};

export default Header;
