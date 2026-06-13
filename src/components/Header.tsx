import { useState, useEffect } from 'react';
import { Menu, X, Code2, ChevronDown } from 'lucide-react';
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
    { name: 'Página Web Sencilla', path: '/landing-express' },
    {
      name: 'Página Web Autónomos y Pymes',
      path: '/web-autonomos-pymes',
    },
    {
      name: 'Tienda Online',
      path: '/tienda-online',
      popular: true,
    },
    {
      name: 'Aplicación Web o Móvil',
      path: '/aplicacion-web',
    },
  ];

  return (
    <>
      <header className='fixed w-full top-0 z-50 bg-white shadow-lg'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='flex items-center space-x-2'>
              <Code2 className='w-8 h-8 text-ink-dark' />
              <span className='text-xl font-bold bg-gradient-to-r from-ink-dark to-ink-gray bg-clip-text'>
                Dani Pereira
              </span>
            </Link>

            {/* Desktop Navigation */}
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
                          className='block px-4 py-3 hover:bg-gray-50 transition-colors'
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className='flex items-center justify-between'>
                            <span className='text-gray-900 font-medium text-sm'>
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
                          className='block w-full text-left px-4 py-2 text-gray-600 hover:text-ink-dark text-sm font-medium'
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
                        className='block px-6 py-2 text-sm text-gray-600 hover:text-ink-dark'
                      >
                        <div className='flex items-center justify-between'>
                          <span>{service.name}</span>
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
