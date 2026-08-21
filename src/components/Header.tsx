import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  trackGoogleAdsWhatsAppConversion,
  trackPhoneClick,
  trackWhatsAppClick,
} from '../utils/analytics';
import {
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  SITE_WEB_PATH,
  buildWhatsAppUrl,
  getWhatsAppMessageForPath,
  isAdsLandingPath,
} from '../config/contact';

const navLinkClass =
  'relative shrink-0 text-center text-sm xl:text-xl py-2 px-2 xl:px-4 rounded-2xl text-ink-dark uppercase font-bold';

const mobileNavLinkClass =
  'text-right text-ink-dark block w-full text-left px-4 py-4 text-md uppercase font-bold hover:text-accent transition-colors duration-200';

const WhatsAppIcon = () => (
  <svg
    className='h-6 w-6'
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
  </svg>
);

const Header = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const isAdsLanding = isAdsLandingPath(pathname);
  const whatsappUrl = buildWhatsAppUrl(getWhatsAppMessageForPath(pathname));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasTyped, setHasTyped] = useState(false);

  const fullText = 'pereiraweb .es';

  useEffect(() => {
    if (hasTyped) return undefined;

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index += 1;
      } else {
        clearInterval(typingInterval);
        setHasTyped(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [hasTyped]);

  const services = [{ name: 'Web a medida', path: SITE_WEB_PATH }];

  const about = [
    { name: 'Quienes somos', path: '/' },
    { name: 'Casos de exito', path: '/casos-de-exito' },
    { name: 'Testimonios de clientes', path: '/testimonios-clientes' },
    { name: 'Trabaja con nosotros', path: '/' },
  ];

  const brand = (
    <span
      className='flex items-center whitespace-nowrap text-xl font-extrabold md:text-3xl'
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <span className='font-mono text-xl text-ink-dark md:text-3xl'>&gt;</span>
      <span className='ml-1 font-mono tracking-tight text-ink-dark'>
        {hasTyped ? 'pereiraweb' : typedText.split(' ')[0]}
      </span>
      <span className='font-mono font-normal text-ink-dark'>
        {hasTyped
          ? ' .es'
          : typedText.includes(' .')
            ? ` ${typedText.split(' ')[1]}`
            : ''}
      </span>
      <span className='ml-0 animate-pulse font-mono text-xl text-ink-dark'>
        _
      </span>
    </span>
  );

  return (
    <div className='flex w-full justify-center'>
      <header className='site-header fixed top-0 z-50 mx-auto mt-4 w-[95%] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08)]'>
        <div className='mx-auto w-full px-4 py-4 md:px-6'>
          <div className='flex w-full items-center justify-between gap-3'>
            <a
              href={isAdsLanding ? '#hero' : '/'}
              className='flex min-w-0 shrink-0 items-center'
            >
              {brand}
            </a>

            {isAdsLanding ? (
              <nav
                className='flex shrink-0 items-center justify-end gap-1'
                aria-label='Contacto'
              >
                <a
                  href={PHONE_TEL_LINK}
                  onClick={() => trackPhoneClick('AdsLandingHeader')}
                  className='rounded-lg p-2 text-ink-dark hover:text-accent'
                  aria-label={`Llamar al ${PHONE_DISPLAY}`}
                  title={PHONE_DISPLAY}
                >
                  <Phone className='h-6 w-6' />
                </a>
                <a
                  href={whatsappUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={(event) => {
                    event.preventDefault();
                    trackWhatsAppClick('AdsLandingHeader');
                    trackGoogleAdsWhatsAppConversion(whatsappUrl);
                  }}
                  className='rounded-lg p-2 text-ink-dark hover:text-accent'
                  aria-label={`Escríbenos por WhatsApp al ${PHONE_DISPLAY}`}
                  title='WhatsApp'
                >
                  <WhatsAppIcon />
                </a>
              </nav>
            ) : (
              <>
                <div className='flex items-center justify-end lg:hidden'>
                  <button
                    className='p-2 text-ink-dark'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                  >
                    {isMenuOpen ? (
                      <X className='h-6 w-6 text-ink-dark' />
                    ) : (
                      <Menu className='h-6 w-6 text-ink-dark' />
                    )}
                  </button>
                </div>

                <nav className='hidden shrink-0 items-center gap-1 text-ink-dark lg:flex xl:gap-4'>
                  <div
                    className='relative'
                    onMouseEnter={() => setIsAboutOpen(true)}
                    onMouseLeave={() => setIsAboutOpen(false)}
                  >
                    <button
                      className={`${navLinkClass} flex items-center gap-1 text-ink-dark`}
                    >
                      Pereiraweb
                      <ChevronDown className='h-4 w-4' />
                    </button>
                    {isAboutOpen ? (
                      <div className='absolute left-0 top-full z-50 w-72 pt-3'>
                        <div className='rounded-lg bg-white py-2 uppercase shadow-[0_8px_24px_rgba(20,20,20,0.12)]'>
                          {about.map((item) => (
                            <a
                              key={item.name}
                              href={item.path}
                              className='group block px-4 py-3 transition-colors hover:bg-accent'
                              onClick={() => setIsAboutOpen(false)}
                            >
                              <span className='text-lg text-ink-dark transition-colors group-hover:text-white'>
                                {item.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
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
                      <ChevronDown className='h-4 w-4' />
                    </button>
                    {isServicesOpen ? (
                      <div className='absolute left-0 top-full z-50 w-72 pt-3'>
                        <div className='rounded-lg bg-white py-2 uppercase shadow-[0_8px_24px_rgba(20,20,20,0.12)]'>
                          {services.map((service) => (
                            <a
                              key={service.path}
                              href={service.path}
                              className='group block px-4 py-3 transition-colors hover:bg-accent'
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <span className='text-lg text-ink-dark transition-colors group-hover:text-white'>
                                {service.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <a href='/' className={navLinkClass}>
                    {t('nav.blog')}
                  </a>
                  <a
                    href='/contacto'
                    className={`${navLinkClass} !text-accent`}
                  >
                    {t('nav.contact')}
                  </a>
                </nav>
              </>
            )}
          </div>

          {!isAdsLanding && isMenuOpen ? (
            <nav className='mt-4 divide-y divide-ink-light rounded-lg bg-white pb-2 text-md text-ink-dark lg:hidden'>
              <a href='/' className={mobileNavLinkClass}>
                Inicio
              </a>
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className='relative flex w-full items-center justify-end gap-2 px-4 py-4 text-md uppercase text-ink-dark transition-colors duration-200 hover:text-accent'
                >
                  <span className='text-center'>Servicios</span>
                  <ChevronDown
                    className={`absolute right-[.5px] h-4 w-4 transition-transform ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isServicesOpen ? (
                  <div className='divide-y divide-ink-dark rounded-2xl bg-white'>
                    {services.map((service) => (
                      <a
                        key={service.path}
                        href={service.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                        className='group block px-6 py-2.5 text-sm uppercase transition-colors hover:bg-accent hover:text-white'
                      >
                        <div className='flex items-center justify-end py-2 text-right'>
                          <span className='font-bold text-black transition-colors group-hover:text-white'>
                            {service.name}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
              <a href='/sobre-el-estudio' className={mobileNavLinkClass}>
                {t('nav.about')}
              </a>
              <a
                href='/contacto'
                className={`${mobileNavLinkClass} !text-accent`}
              >
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
          ) : null}
        </div>
      </header>
    </div>
  );
};

export default Header;
