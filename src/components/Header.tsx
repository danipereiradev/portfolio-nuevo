import { useState, useEffect } from 'react';

import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const navLinkClass =
  ' text-center relative text-xl py-2 px-4 rounded-2xl text-ink-dark uppercase font-bold';

const mobileNavLinkClass =
  'text-right text-ink-dark block w-full text-left px-4 py-4 text-md uppercase font-bold hover:text-accent transition-colors duration-200';

const Header = () => {
  const { t } = useLanguage();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
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
      name: 'Web a medida',
      path: '/web-profesional-a-medida',
      popular: true,
    },
    {
      name: 'Web con wordpress',
      path: '/mantenimiento-web',
    },
    {
      name: 'Tiendas Online',
      path: '/tiendas-online',
    },
    {
      name: 'Mantenimiento Web',
      path: '/mantenimiento-web',
    },
    {
      name: 'Posicionamiento SEO',
      path: '/mantenimiento-web',
    },
    {
      name: 'Publicidad google',
      path: '/mantenimiento-web',
    },
  ];

  const about = [
    {
      name: 'Quienes somos',
      path: '/',
      popular: true,
    },
    {
      name: 'Casos de exito',
      path: '/casos-de-exito',
    },
    {
      name: 'Testimonios de clientes',
      path: '/testimonios-clientes',
    },
    {
      name: 'Trabaja con nosotros',
      path: '/',
    },
  ];

  const brand = (
    <span
      className='text-xl md:text-3xl whitespace-nowrap font-extrabold flex items-center'
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <span className='text-ink-dark font-mono text-xl md:text-3xl'>&gt;</span>
      <span className='text-ink-dark font-mono tracking-tight ml-1'>
        {hasTyped ? 'pereiraweb' : typedText.split(' ')[0]}
      </span>
      <span className='text-ink-dark font-mono font-normal'>
        {hasTyped
          ? ' .es'
          : typedText.includes(' .')
            ? ' ' + typedText.split(' ')[1]
            : ''}
      </span>
      <span className='text-ink-dark font-mono text-xl md:text-xl animate-pulse ml-0'>
        _
      </span>
    </span>
  );

  /* const scrollToAnchor = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }; */

  return (
    <div className='w-full flex justify-center'>
      <header className=' fixed mx-auto place-self-center mt-4 rounded-2xl top-0 z-50 bg-brand-light shadow-[0_4px_16px_rgba(0,0,0,0.08)] w-[95%]'>
        <div className='mx-auto w-full px-6 py-4'>
          <div className='flex items-center justify-evenly w-full'>
            <a
              href='/'
              className='flex items-center gap-1.5 md:gap-2 flex-shrink-0 md:min-w-[280px] md:w-[280px]'
            >
              {brand}
            </a>
            <>
              <div
                className='hidden md:block md:min-w-[280px] md:w-[280px]'
                aria-hidden='true'
              />

              <div className='lg:hidden flex items-center justify-end'>
                <button
                  className='p-2 text-ink-dark'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                  {isMenuOpen ? (
                    <X className='w-6 h-6 text-ink-dark' />
                  ) : (
                    <Menu className='w-6 h-6 text-ink-dark' />
                  )}
                </button>
              </div>
            </>
            <nav className='text-ink-dark hidden lg:flex place-self-end space-x-8'>
              <div
                className='relative'
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button
                  className={`${navLinkClass} flex items-center gap-1 text-ink-dark`}
                >
                  Pereiraweb
                  <ChevronDown className='w-4 h-4' />
                </button>

                {isAboutOpen && (
                  <div className='absolute top-full left-0 pt-3 w-72 z-50 '>
                    <div className='bg-white rounded-lg py-2 uppercase shadow-[0_8px_24px_rgba(20,20,20,0.12)]'>
                      {about.map((item) => (
                        <a
                          key={item.path}
                          href={item.path}
                          className='group block px-4 py-3 hover:bg-accent transition-colors'
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className='flex items-center justify-between'>
                            <span className='text-ink-dark group-hover:text-white  text-lg transition-colors'>
                              {item.name}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div
                className='relative'
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  className={`${navLinkClass} flex items-center gap-1 text-ink-dark`}
                >
                  Servicios
                  <ChevronDown className='w-4 h-4' />
                </button>

                {isServicesOpen && (
                  <div className=' absolute top-full left-0 pt-3 w-72 z-50'>
                    <div className='bg-white rounded-lg py-2 uppercase shadow-[0_8px_24px_rgba(20,20,20,0.12)]'>
                      {services.map((service) => (
                        <a
                          key={service.path}
                          href={service.path}
                          className='group block px-4 py-3 hover:bg-accent transition-colors'
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className='flex items-center justify-between'>
                            <span className='text-ink-dark group-hover:text-white text-lg transition-colors'>
                              {service.name}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <a href='/' className={navLinkClass}>
                {t('nav.blog')}
              </a>

              <a href='/contacto' className={`${navLinkClass} !text-accent`}>
                {t('nav.contact')}
              </a>
            </nav>
          </div>

          {isMenuOpen && (
            <nav className='lg:hidden mt-4 pb-2 bg-white text-ink-dark rounded-lg text-md divide-y divide-ink-light'>
              <a href='/' className={mobileNavLinkClass}>
                Inicio
              </a>

              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className='relative flex text-ink-dark items-center gap-2 justify-end w-full px-4 py-4 text-md uppercase hover:text-accent transition-colors duration-200'
                >
                  <span className='text-center'>Servicios</span>
                  <ChevronDown
                    className={`absolute right-[.5px] w-4 h-4 transition-transform ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isServicesOpen && (
                  <div className='bg-[#fff] rounded-2xl divide-y divide-ink-dark'>
                    {services.map((service) => (
                      <a
                        key={service.path}
                        href={service.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                        className='text-sm group block px-6 py-2.5 uppercase hover:bg-accent  hover:text-white transition-colors'
                      >
                        <div className='flex items-center justify-end text-right py-2 divide-y-black'>
                          <span className='text-black font-bold  group-hover:text-white transition-colors'>
                            {service.name}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href='/sobre-el-estudio' className={mobileNavLinkClass}>
                {t('nav.about')}
              </a>

              <a href='/contacto' className={`${mobileNavLinkClass} !text-accent`}>
                {t('nav.contact')}
              </a>

              <a
                href='/preguntas-frecuentes'
                onClick={() => setIsMenuOpen(false)}
                className={mobileNavLinkClass}
              >
                Preguntas
              </a>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
