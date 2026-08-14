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
  DEFAULT_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';

const FOOTER_WHATSAPP_URL = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

const infoLinks = [
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/condiciones-del-proyecto', label: 'Condiciones del proyecto' },
  { href: '/politica-de-privacidad', label: 'Política de Privacidad' },
  { href: '/terminos-y-condiciones', label: 'Términos y Condiciones' },
  { href: '/politica-de-cookies', label: 'Cookies' },
  { href: '/aviso-legal', label: 'Aviso Legal' },
];

const Footer = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const isMinimalChrome = normalizedPath === '/web-profesional';
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-ink-dark text-white border-t-4 border-accent'>
      <div className='container mx-auto px-6 py-16'>
        <div
          className={`grid gap-10 lg:gap-6 xl:gap-8 lg:divide-x-2 lg:divide-white/10 md:grid-cols-2 ${
            isMinimalChrome ? 'lg:grid-cols-3' : 'lg:grid-cols-5'
          }`}
        >
          <div className='lg:col-span-1 text-center md:text-left lg:pr-6 xl:pr-8'>
            <div className='flex items-center mb-6 justify-center md:justify-start'>
              <span
                className='text-sm md:text-base whitespace-nowrap font-extrabold flex items-center gap-1'
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className='text-white font-mono text-base md:text-lg'>
                  &gt;
                </span>
                <span className='text-white font-mono tracking-tight'>
                  pereiraweb
                </span>
                <span className='text-white font-mono font-normal'> .es</span>
                <span className='text-white font-mono text-sm md:text-base animate-pulse'>
                  _
                </span>
              </span>
            </div>
            <p className='text-accent font-semibold text-sm mb-3'>
              Estudio de diseño y desarrollo web
            </p>
            <p className='text-gray-300 mb-6 leading-relaxed'>
              {t('footer.description')}
            </p>
            <div className='flex space-x-4 justify-center md:justify-start'>
              <a
                href='mailto:hola@pereiraweb.es'
                onClick={() => trackEmailClick('FooterIcon')}
                className='bg-accent hover:bg-accent-hover p-3 rounded-lg border-2 border-white/80 shadow-[3px_3px_0_0_rgba(255,255,255,0.4)] hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
              >
                <Mail className='w-5 h-5' />
              </a>

              <a
                href='https://www.instagram.com/pereiraweb.es/'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-accent hover:bg-accent-hover p-3 rounded-lg border-2 border-white/80 shadow-[3px_3px_0_0_rgba(255,255,255,0.4)] hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
              >
                <Instagram className='w-5 h-5' />
              </a>
            </div>
          </div>

          {!isMinimalChrome && (
            <div className='text-center md:text-left lg:px-6 xl:px-8'>
              <h3 className='text-xl md:text-2xl font-bold mb-1 text-accent'>
                Servicios
              </h3>
              <span className='block w-10 h-1 bg-accent mb-6 mx-auto md:mx-0' />
              <ul className='space-y-3 text-gray-300'>
                <li>
                  <a
                    href='/web-profesional-a-medida'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Web profesional a medida
                  </a>
                </li>
                <li>
                  <a
                    href='/tiendas-online'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Tiendas Online
                  </a>
                </li>
                <li>
                  <a
                    href='/mantenimiento-web'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Mantenimiento Web
                  </a>
                </li>
              </ul>
            </div>
          )}

          {!isMinimalChrome && (
            <div className='text-center md:text-left lg:px-6 xl:px-8'>
              <h3 className='text-xl md:text-2xl font-bold mb-1 text-accent'>
                Estudio
              </h3>
              <span className='block w-10 h-1 bg-accent mb-6 mx-auto md:mx-0' />
              <ul className='space-y-3 text-gray-300'>
                <li>
                  <a
                    href='/'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href='/sobre-el-estudio'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Sobre el Estudio
                  </a>
                </li>
                <li>
                  <a
                    href='/contacto'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          )}

          <div className='text-center md:text-left lg:px-6 xl:px-8'>
            <h3 className='text-xl md:text-2xl font-bold mb-1 text-accent'>
              Info
            </h3>
            <span className='block w-10 h-1 bg-accent mb-6 mx-auto md:mx-0' />
            <ul className='space-y-3 text-gray-300'>
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className='hover:text-white transition-colors duration-200'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='text-center md:text-left lg:pl-6 xl:pl-8'>
            <h3 className='text-xl md:text-2xl font-bold mb-1 text-accent'>
              {t('footer.contact_title')}
            </h3>
            <span className='block w-10 h-1 bg-accent mb-6 mx-auto md:mx-0' />
            <ul className='space-y-4 text-gray-300'>
              <li className='flex flex-col items-center md:flex-row md:items-start gap-3 md:justify-start'>
                <Mail className='w-5 h-5 text-accent flex-shrink-0' />
                <div className='text-center md:text-left'>
                  <p className='font-medium'>Email</p>
                  <a
                    href='mailto:hola@pereiraweb.es'
                    onClick={() => trackEmailClick('FooterList')}
                    className='hover:text-white transition-colors duration-200 break-all'
                  >
                    hola@pereiraweb.es
                  </a>
                </div>
              </li>
              <li className='flex flex-col items-center md:flex-row md:items-start gap-3 md:justify-start'>
                <Phone className='w-5 h-5 text-accent flex-shrink-0' />
                <div className='text-center md:text-left'>
                  <p className='font-medium'>Teléfono</p>
                  <a
                    href={PHONE_TEL_LINK}
                    onClick={() => trackPhoneClick('FooterList')}
                    className='hover:text-white transition-colors duration-200'
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </li>
              <li className='flex flex-col items-center md:flex-row md:items-start gap-3 md:justify-start'>
                <MessageCircle className='w-5 h-5 text-accent flex-shrink-0' />
                <div className='text-center md:text-left'>
                  <p className='font-medium'>WhatsApp</p>
                  <a
                    href={FOOTER_WHATSAPP_URL}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={(e) => {
                      e.preventDefault();
                      trackWhatsAppClick('FooterList');
                      trackGoogleAdsWhatsAppConversion(FOOTER_WHATSAPP_URL);
                    }}
                    className='hover:text-white transition-colors duration-200'
                  >
                    Escríbenos por WhatsApp
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='border-t-2 border-white/15'>
        <div className='container mx-auto px-6 py-6'>
          <p className='text-gray-400 text-sm text-center'>
            © {currentYear} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
