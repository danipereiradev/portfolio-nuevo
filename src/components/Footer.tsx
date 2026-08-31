import { Mail, Phone, Instagram, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  trackEmailClick,
  trackPhoneClick,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import {
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  buildWhatsAppUrl,
  getWhatsAppMessageForPath,
  isAdsLandingPath,
} from '../config/contact';
import { FOOTER_NAV } from '../config/nav';

const infoLinks = [
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/condiciones-del-proyecto', label: 'Condiciones del proyecto' },
  { href: '/politica-de-privacidad', label: 'Política de Privacidad' },
  { href: '/terminos-y-condiciones', label: 'Términos y Condiciones' },
  { href: '/politica-de-cookies', label: 'Cookies' },
  { href: '/aviso-legal', label: 'Aviso Legal' },
];

const legalLinks = infoLinks.filter((link) =>
  [
    '/politica-de-privacidad',
    '/terminos-y-condiciones',
    '/politica-de-cookies',
    '/aviso-legal',
  ].includes(link.href),
);

const Footer = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const isAdsLanding = isAdsLandingPath(pathname);
  const isMinimalChrome = normalizedPath === '/web-profesional' || isAdsLanding;
  const footerWhatsAppUrl = buildWhatsAppUrl(
    getWhatsAppMessageForPath(pathname),
  );
  const currentYear = new Date().getFullYear();
  const footerInfoLinks = isAdsLanding ? legalLinks : infoLinks;

  return (
    <footer className='bg-surface-muted text-ink-medium'>
      <div className='container mx-auto py-16'>
        <div
          className={`grid gap-10 lg:gap-6 xl:gap-8 lg:divide-x-2 lg:divide-ink-light md:grid-cols-2 ${
            isAdsLanding
              ? 'lg:grid-cols-2'
              : isMinimalChrome
                ? 'lg:grid-cols-3'
                : 'lg:grid-cols-4'
          }`}
        >
          {!isAdsLanding && (
            <div className='lg:col-span-1 text-center md:text-left lg:pr-6 xl:pr-8'>
              <div className='flex items-center mb-6 justify-center md:justify-start'>
                <span className='flex items-baseline whitespace-nowrap font-display text-[calc(0.875rem*1.15)] font-normal tracking-tight md:text-[calc(1rem*1.15)]'>
                  <span className='text-[calc(1rem*1.15)] text-accent md:text-[calc(1.125rem*1.15)]'>
                    &gt;&nbsp;
                  </span>
                  <span className='font-bold text-ink-dark'>36Web</span>
                  <span className='text-ink-dark'>.es</span>
                  <span className='animate-pulse text-[calc(0.875rem*1.15)] text-accent md:text-[calc(1rem*1.15)]'>
                    &nbsp;_
                  </span>
                </span>
              </div>
              <p className='text-ink-dark font-semibold text-sm mb-3'>
                Agencia de diseño web y marketing digital
              </p>
              <p className='text-ink-medium mb-6 leading-relaxed'>
                {t('footer.description')}
              </p>
              <div className='flex space-x-4 justify-center md:justify-start'>
                <a
                  href='mailto:hola@36web.es'
                  onClick={() => trackEmailClick('FooterIcon')}
                  className='bg-accent hover:bg-accent-hover p-3 rounded-lg text-white transition-colors duration-150'
                >
                  <Mail className='w-5 h-5' />
                </a>

                <a
                  href='https://www.instagram.com/36web.es/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-accent hover:bg-accent-hover p-3 rounded-lg text-white transition-colors duration-150'
                >
                  <Instagram className='w-5 h-5' />
                </a>
              </div>
            </div>
          )}

          {!isMinimalChrome && (
            <div className='text-center md:text-left lg:px-6 xl:px-8'>
              <h3 className='text-xl md:text-2xl font-bold mb-1 text-ink-medium'>
                36web
              </h3>
              <span className='block w-10 h-1 bg-brand mb-6 mx-auto md:mx-0' />
              <ul className='space-y-3 text-ink-dark'>
                {FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className='hover:text-link transition-colors duration-200'
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className='text-center md:text-left lg:px-6 xl:px-8'>
            <h3 className='text-xl md:text-2xl font-bold mb-1 text-ink-medium'>
              {isAdsLanding ? 'Legal' : 'Info'}
            </h3>
            <span className='block w-10 h-1 bg-brand mb-6 mx-auto md:mx-0' />
            <ul className='space-y-3 text-ink-dark'>
              {footerInfoLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className='hover:text-link transition-colors duration-200'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='text-center md:text-left lg:pl-6 xl:pl-8'>
            <h3 className='text-xl md:text-2xl font-bold mb-1 text-ink-medium'>
              {t('footer.contact_title')}
            </h3>
            <span className='block w-10 h-1 bg-brand mb-6 mx-auto md:mx-0' />
            <ul className='space-y-4 text-ink-dark'>
              <li className='flex flex-col items-center md:flex-row md:items-start gap-3 md:justify-start'>
                <Mail className='w-5 h-5 text-accent flex-shrink-0' />
                <div className='text-center md:text-left'>
                  <p className='font-medium text-ink-medium'>Email</p>
                  <a
                    href='mailto:hola@36web.es'
                    onClick={() => trackEmailClick('FooterList')}
                    className='hover:text-link transition-colors duration-200 break-all'
                  >
                    hola@36web.es
                  </a>
                </div>
              </li>
              <li className='flex flex-col items-center md:flex-row md:items-start gap-3 md:justify-start'>
                <Phone className='w-5 h-5 text-accent flex-shrink-0' />
                <div className='text-center md:text-left'>
                  <p className='font-medium text-ink-medium'>Teléfono</p>
                  <a
                    href={PHONE_TEL_LINK}
                    onClick={() => trackPhoneClick('FooterList')}
                    className='hover:text-link transition-colors duration-200'
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </li>
              <li className='flex flex-col items-center md:flex-row md:items-start gap-3 md:justify-start'>
                <MessageCircle className='w-5 h-5 text-accent flex-shrink-0' />
                <div className='text-center md:text-left'>
                  <p className='font-medium text-ink-medium'>WhatsApp</p>
                  <a
                    href={footerWhatsAppUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={(e) => {
                      e.preventDefault();
                      trackWhatsAppClick('FooterList');
                      trackGoogleAdsWhatsAppConversion(footerWhatsAppUrl);
                    }}
                    className='hover:text-link transition-colors duration-200'
                  >
                    Escríbenos por WhatsApp
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='border-t border-ink-light'>
        <div className='container mx-auto py-6'>
          <p className='text-ink-medium text-sm text-center'>
            © {currentYear} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
