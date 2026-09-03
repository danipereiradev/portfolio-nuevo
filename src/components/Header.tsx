import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { trackPhoneClick } from '../utils/analytics';
import {
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  ABOUT_PATH,
  ABOUT_LABEL,
  isAdsLandingPath,
} from '../config/contact';
import { SERVICE_NAV } from '../config/nav';

const navLinkClass =
  'relative shrink-0 text-center text-sm xl:text-xl py-2 px-2 xl:px-4 rounded-lg text-ink-dark uppercase font-bold';

const mobileNavLinkClass =
  'flex w-full items-center justify-end px-4 py-4 pr-10 text-md uppercase font-bold text-ink-dark transition-colors duration-200 hover:text-accent';

const Header = ({ hideNav = false }: { hideNav?: boolean }) => {
  const { pathname } = useLocation();
  const isAdsLanding = isAdsLandingPath(pathname);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [hasTyped, setHasTyped] = useState(false);

  const fullText = '36Web.es';
  const dotIndex = typedText.indexOf('.');
  const namePart = hasTyped
    ? '36Web'
    : dotIndex === -1
      ? typedText
      : typedText.slice(0, dotIndex);
  const domainPart = hasTyped
    ? '.es'
    : dotIndex === -1
      ? ''
      : typedText.slice(dotIndex);

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

  const brand = (
    <span className='flex items-baseline whitespace-nowrap font-display text-[calc(1.875rem*1.15*0.8)] font-normal tracking-tight md:text-[calc(1.875rem*1.15)]'>
      <span className='text-[calc(1.25rem*1.15*0.8)] text-accent md:text-[calc(1.875rem*1.15)]'>
        &gt;&nbsp;
      </span>
      <span className='font-bold text-ink-dark'>{namePart}</span>
      {domainPart ? <span className='text-ink-dark'>{domainPart}</span> : null}
      <span className='animate-pulse text-[calc(1.25rem*1.15*0.8)] text-accent md:text-[calc(1.875rem*1.15)]'>
        &nbsp;_
      </span>
    </span>
  );

  return (
    <div className='flex w-full justify-center'>
      <header className='site-header fixed top-0 z-50 mx-auto mt-4 w-[95%] max-w-page rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)]'>
        <div className='mx-auto w-full px-page-x py-4'>
          <div className='flex w-full items-center justify-between gap-3'>
            {hideNav ? (
              <div className='flex min-w-0 shrink-0 items-center'>{brand}</div>
            ) : (
              <a
                href={isAdsLanding ? '#hero' : '/'}
                className='flex min-w-0 shrink-0 items-center'
              >
                {brand}
              </a>
            )}

            {hideNav ? null : isAdsLanding ? (
              <nav
                className='flex shrink-0 items-center justify-end'
                aria-label='Contacto'
              >
                <a
                  href={PHONE_TEL_LINK}
                  onClick={() => trackPhoneClick('AdsLandingHeader')}
                  className='inline-flex items-center gap-1.5 text-ink-dark'
                  aria-label={`Llamar al ${PHONE_DISPLAY}`}
                >
                  <Phone className='h-4 w-4 shrink-0 md:h-5 md:w-5' strokeWidth={2.5} />
                  <span className='text-[calc(0.7rem*1.15)] font-semibold leading-none tracking-tight md:text-[calc(0.875rem*1.15)]'>
                    {PHONE_DISPLAY}
                  </span>
                </a>
              </nav>
            ) : (
              <>
                <div className='flex items-center justify-end lg:hidden'>
                  <button
                    className='p-2 text-ink-dark'
                    onClick={() => {
                      setIsMenuOpen((open) => {
                        if (open) setIsServicesOpen(false);
                        return !open;
                      });
                    }}
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                  >
                    {isMenuOpen ? (
                      <X className='h-6 w-6 text-ink-dark' />
                    ) : (
                      <Menu className='h-6 w-6 text-ink-dark' />
                    )}
                  </button>
                </div>

                <nav
                  className='hidden shrink-0 items-center gap-1 text-ink-dark lg:flex xl:gap-4'
                  aria-label='Principal'
                >
                  <div
                    className='relative'
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`${navLinkClass} flex items-center gap-1 text-ink-dark`}
                      aria-expanded={isServicesOpen}
                      aria-haspopup='true'
                    >
                      Servicios
                      <ChevronDown className='h-4 w-4' />
                    </button>
                    {isServicesOpen ? (
                      <div className='absolute left-0 top-full z-50 w-72 pt-3'>
                        <div className='rounded-lg bg-white py-2 uppercase shadow-[0_8px_24px_rgba(20,20,20,0.12)]'>
                          {SERVICE_NAV.map((service) => (
                            <a
                              key={service.href}
                              href={service.href}
                              className='group block px-4 py-3 transition-colors hover:bg-accent'
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <span className='text-lg text-ink-dark transition-colors group-hover:text-white'>
                                {service.label}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <a href={ABOUT_PATH} className={navLinkClass}>
                    {ABOUT_LABEL}
                  </a>
                  <a
                    href='#contacto'
                    className={`${navLinkClass} !text-accent`}
                  >
                    Contacto
                  </a>
                </nav>
              </>
            )}
          </div>

          {!hideNav && !isAdsLanding && isMenuOpen ? (
            <nav
              className='mt-2 divide-y divide-ink-dark/15 lg:hidden'
              aria-label='Principal'
            >
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`${mobileNavLinkClass} relative`}
                  aria-expanded={isServicesOpen}
                >
                  Servicios
                  <ChevronDown
                    className={`absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform duration-200 ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isServicesOpen ? (
                  <div className='divide-y divide-ink-dark/15'>
                    {SERVICE_NAV.map((service) => (
                      <a
                        key={service.href}
                        href={service.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                        className={`${mobileNavLinkClass} pr-16`}
                      >
                        {service.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
              <a
                href={ABOUT_PATH}
                onClick={() => setIsMenuOpen(false)}
                className={mobileNavLinkClass}
              >
                {ABOUT_LABEL}
              </a>
              <a
                href='#contacto'
                onClick={() => setIsMenuOpen(false)}
                className={`${mobileNavLinkClass} !text-accent`}
              >
                Contacto
              </a>
            </nav>
          ) : null}
        </div>
      </header>
    </div>
  );
};

export default Header;
