import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { trackCtaClick, trackPhoneClick } from '../utils/analytics';
import {
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  ABOUT_PATH,
  ABOUT_LABEL,
  isAdsGoogleAdsLandingPath,
  isAdsLandingPath,
  isAdsLaunchLandingPath,
  isAdsMaintenanceInfraLandingPath,
} from '../config/contact';
import {
  LANDING_NAV,
  LANDING_NAV_CTA,
  LANDING_NAV_CTA_MAINTENANCE_INFRA,
  LANDING_NAV_GOOGLE_ADS,
  LANDING_NAV_MAINTENANCE_INFRA,
  SERVICE_NAV,
} from '../config/nav';

const navLinkClass =
  'relative shrink-0 text-center text-sm xl:text-xl py-2 px-2 xl:px-4 rounded-lg uppercase font-bold transition-colors';

const defaultNavLinkClass = `${navLinkClass} text-ink-dark`;

const homeNavLinkClass = `${navLinkClass} text-brand-light hover:text-white`;

const mobileNavLinkClass =
  'flex w-full items-center justify-end px-4 py-4 pr-10 text-[1.15em] uppercase font-bold text-ink-dark transition-colors duration-200 hover:text-accent';

const homeMobileNavLinkClass =
  'flex w-full items-center justify-end px-4 py-4 pr-10 text-[1.15em] uppercase font-bold text-brand-light transition-colors duration-200 hover:text-white';

const Header = ({ hideNav = false }: { hideNav?: boolean }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isAdsLanding = isAdsLandingPath(pathname);
  const isLaunchLanding = isAdsLaunchLandingPath(pathname);
  const isInfraLanding = isAdsMaintenanceInfraLandingPath(pathname);
  const landingNav = isAdsGoogleAdsLandingPath(pathname)
    ? LANDING_NAV_GOOGLE_ADS
    : isInfraLanding
      ? LANDING_NAV_MAINTENANCE_INFRA
      : LANDING_NAV;
  const landingCta = isInfraLanding
    ? LANDING_NAV_CTA_MAINTENANCE_INFRA
    : LANDING_NAV_CTA;
  const desktopNavClass = isHome ? homeNavLinkClass : defaultNavLinkClass;
  const mobileLinksClass = isHome ? homeMobileNavLinkClass : mobileNavLinkClass;

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

  const iconLogo = (
    <img
      src='/img/favicon/android-chrome-512x512.png'
      alt='36web'
      width={512}
      height={512}
      className='h-12 w-12 rounded-lg object-cover lg:h-14 lg:w-14'
    />
  );

  const logo = isHome ? (
    <span className='overflow-hidden rounded-lg bg-brand-light'>{iconLogo}</span>
  ) : (
    brand
  );

  return (
    <div
      className={`flex w-full justify-center ${
        isHome
          ? 'absolute inset-x-0 top-0 z-50'
          : 'fixed inset-x-0 top-0 z-50'
      }`}
    >
      {isHome && isMenuOpen ? (
        <button
          type='button'
          className='fixed inset-0 z-0 bg-black/70 lg:hidden'
          aria-label='Cerrar menú'
          onClick={() => {
            setIsMenuOpen(false);
            setIsServicesOpen(false);
          }}
        />
      ) : null}
      <header
        className={`site-header relative z-10 mx-auto mt-4 w-[95%] max-w-page rounded-lg ${
          isHome
            ? 'site-header--home'
            : 'shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
        }`}
      >
        <div className='mx-auto w-full px-page-x py-4'>
          <div className='flex w-full items-center justify-between gap-3'>
            {hideNav ? (
              <div className='flex min-w-0 shrink-0 items-center'>{logo}</div>
            ) : (
              <a
                href={isAdsLanding ? '#hero' : '/'}
                className='flex min-w-0 shrink-0 items-center outline-none'
              >
                {logo}
              </a>
            )}

            {hideNav ? null : isLaunchLanding ? (
              <a
                href={PHONE_TEL_LINK}
                onClick={() => trackPhoneClick('AdsLandingHeader')}
                className='inline-flex shrink-0 items-center gap-1.5 text-ink-dark md:gap-2'
                aria-label={`Llamar al ${PHONE_DISPLAY}`}
              >
                <Phone
                  className='h-4 w-4 shrink-0 md:h-6 md:w-6'
                  strokeWidth={2.5}
                />
                <span className='text-[calc(0.7rem*1.15)] font-semibold leading-none tracking-tight md:text-[calc(1.05rem*1.15)]'>
                  {PHONE_DISPLAY}
                </span>
              </a>
            ) : isAdsLanding ? (
              <>
                <div className='flex items-center justify-end gap-3 lg:hidden'>
                  <a
                    href={PHONE_TEL_LINK}
                    onClick={() => trackPhoneClick('AdsLandingHeader')}
                    className='inline-flex items-center gap-1.5 text-ink-dark'
                    aria-label={`Llamar al ${PHONE_DISPLAY}`}
                  >
                    <Phone
                      className='h-4 w-4 shrink-0'
                      strokeWidth={2.5}
                    />
                    <span className='text-[calc(0.7rem*1.15)] font-semibold leading-none tracking-tight'>
                      {PHONE_DISPLAY}
                    </span>
                  </a>
                  <button
                    className='p-2 text-ink-dark'
                    onClick={() => setIsMenuOpen((open) => !open)}
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
                  className='hidden shrink-0 items-center gap-1 lg:flex xl:gap-2'
                  aria-label='En la página'
                >
                  {landingNav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={defaultNavLinkClass}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href={landingCta.href}
                    className={`${defaultNavLinkClass} !text-accent`}
                    onClick={() =>
                      trackCtaClick(landingCta.label, 'LandingHeader')
                    }
                  >
                    {landingCta.label}
                  </a>
                </nav>
              </>
            ) : (
              <>
                <div className='flex items-center justify-end lg:hidden'>
                  <button
                    className={isHome ? 'text-brand-light' : 'p-2 text-ink-dark'}
                    onClick={() => {
                      setIsMenuOpen((open) => {
                        if (open) setIsServicesOpen(false);
                        return !open;
                      });
                    }}
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                  >
                    {isMenuOpen ? (
                      <X
                        className={
                          isHome
                            ? 'h-12 w-12 text-brand-light'
                            : 'h-6 w-6 text-ink-dark'
                        }
                      />
                    ) : (
                      <Menu
                        className={
                          isHome
                            ? 'h-12 w-12 text-brand-light'
                            : 'h-6 w-6 text-ink-dark'
                        }
                      />
                    )}
                  </button>
                </div>

                <nav
                  className={`hidden shrink-0 items-center gap-1 lg:flex xl:gap-4 ${
                    isHome ? 'text-brand-light' : 'text-ink-dark'
                  }`}
                  aria-label='Principal'
                >
                  <div
                    className='relative'
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`${desktopNavClass} flex items-center gap-1`}
                      aria-expanded={isServicesOpen}
                      aria-haspopup='true'
                    >
                      Servicios
                      <ChevronDown className='h-4 w-4' />
                    </button>
                    {isServicesOpen ? (
                      <div className='absolute left-0 top-full z-50 w-72 pt-3'>
                        <div
                          className={`rounded-lg py-2 uppercase ${
                            isHome
                              ? 'bg-transparent'
                              : 'bg-white shadow-[0_8px_24px_rgba(20,20,20,0.12)]'
                          }`}
                        >
                          {SERVICE_NAV.map((service) => (
                            <a
                              key={service.href}
                              href={service.href}
                              className={`group block px-4 py-3 ${
                                isHome
                                  ? ''
                                  : 'transition-colors hover:bg-accent'
                              }`}
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <span
                                className={`text-lg transition-colors ${
                                  isHome
                                    ? 'text-brand-light group-hover:text-white'
                                    : 'text-ink-dark group-hover:text-white'
                                }`}
                              >
                                {service.label}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <a href={ABOUT_PATH} className={desktopNavClass}>
                    {ABOUT_LABEL}
                  </a>
                  <a
                    href='#contacto'
                    className={
                      isHome ? desktopNavClass : `${defaultNavLinkClass} !text-accent`
                    }
                  >
                    Contacto
                  </a>
                </nav>
              </>
            )}
          </div>

          {!hideNav && isAdsLanding && !isLaunchLanding && isMenuOpen ? (
            <nav
              className='mt-2 divide-y divide-ink-dark/15 lg:hidden'
              aria-label='En la página'
            >
              {landingNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={landingCta.href}
                onClick={() => {
                  trackCtaClick(landingCta.label, 'LandingHeader');
                  setIsMenuOpen(false);
                }}
                className={`${mobileNavLinkClass} !text-accent`}
              >
                {landingCta.label}
              </a>
            </nav>
          ) : null}

          {!hideNav && !isAdsLanding && isMenuOpen ? (
            <nav
              className={`mt-2 lg:hidden ${
                isHome ? '' : 'divide-y divide-ink-dark/15'
              }`}
              aria-label='Principal'
            >
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`${mobileLinksClass} relative`}
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
                  <div
                    className={
                      isHome ? '' : 'divide-y divide-ink-dark/15'
                    }
                  >
                    {SERVICE_NAV.map((service) => (
                      <a
                        key={service.href}
                        href={service.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesOpen(false);
                        }}
                        className={`${mobileLinksClass} pr-16`}
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
                className={mobileLinksClass}
              >
                {ABOUT_LABEL}
              </a>
              <a
                href='#contacto'
                onClick={() => setIsMenuOpen(false)}
                className={
                  isHome ? mobileLinksClass : `${mobileNavLinkClass} !text-accent`
                }
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
