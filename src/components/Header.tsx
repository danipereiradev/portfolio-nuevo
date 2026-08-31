import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import {
  trackGoogleAdsWhatsAppConversion,
  trackPhoneClick,
  trackWhatsAppClick,
} from '../utils/analytics';
import {
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  ABOUT_PATH,
  ABOUT_LABEL,
  buildWhatsAppUrl,
  getWhatsAppMessageForPath,
  isAdsLandingPath,
} from '../config/contact';
import { SERVICE_NAV } from '../config/nav';
import { BLOG_PATH } from '../blog/types';

const navLinkClass =
  'relative shrink-0 text-center text-sm xl:text-xl py-2 px-2 xl:px-4 rounded-lg text-ink-dark uppercase font-bold';

const mobileNavLinkClass =
  'flex w-full items-center justify-end px-4 py-4 pr-10 text-md uppercase font-bold text-ink-dark transition-colors duration-200 hover:text-accent';

const adsHeaderIconLinkClass =
  'inline-flex items-center justify-center rounded-lg p-2 text-accent transition-transform duration-200 ease-out hover:scale-125';

const WhatsAppIcon = () => (
  <svg
    className='h-6 w-6 overflow-visible'
    viewBox='0 0 24 24'
    fill='currentColor'
    stroke='currentColor'
    strokeWidth='1.25'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
  </svg>
);

const Header = ({ hideNav = false }: { hideNav?: boolean }) => {
  const { pathname } = useLocation();
  const isAdsLanding = isAdsLandingPath(pathname);
  const whatsappUrl = buildWhatsAppUrl(getWhatsAppMessageForPath(pathname));

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
                className='flex shrink-0 items-center justify-end gap-4'
                aria-label='Contacto'
              >
                <a
                  href={PHONE_TEL_LINK}
                  onClick={() => trackPhoneClick('AdsLandingHeader')}
                  className={adsHeaderIconLinkClass}
                  aria-label={`Llamar al ${PHONE_DISPLAY}`}
                  title={PHONE_DISPLAY}
                >
                  <Phone className='h-6 w-6' strokeWidth={2.75} />
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
                  className={adsHeaderIconLinkClass}
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
                  <a href={BLOG_PATH} className={navLinkClass}>
                    Blog
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
                href={BLOG_PATH}
                onClick={() => setIsMenuOpen(false)}
                className={mobileNavLinkClass}
              >
                Blog
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
