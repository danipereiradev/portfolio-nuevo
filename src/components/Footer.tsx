import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Linkedin,
  MapPin,
  Phone,
  Instagram,
  MessageCircle,
} from 'lucide-react';
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
import LegalPages from './LegalPages';

const FOOTER_WHATSAPP_URL = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

interface FooterProps {
  // En páginas pensadas como embudo cerrado (landings de Ads) se oculta todo
  // lo que no sea marca, contacto o legal, para no ofrecer salidas hacia
  // otras páginas del sitio.
  minimal?: boolean;
}

const Footer = ({ minimal = false }: FooterProps = {}) => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [legalPageOpen, setLegalPageOpen] = useState<{
    isOpen: boolean;
    page: 'privacy' | 'terms' | 'cookies' | 'legal' | null;
  }>({ isOpen: false, page: null });

  const openLegalPage = (page: 'privacy' | 'terms' | 'cookies' | 'legal') => {
    setLegalPageOpen({ isOpen: true, page });
  };

  const closeLegalPage = () => {
    setLegalPageOpen({ isOpen: false, page: null });
  };

  return (
    <>
      <footer className='bg-black text-white border-t-4 border-accent'>
        <div className='container mx-auto px-6 py-16'>
          <div
            className={`grid gap-10 lg:gap-8 lg:divide-x-2 lg:divide-white/10 ${
              minimal
                ? 'md:grid-cols-2 max-w-3xl mx-auto'
                : 'md:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            <div className='lg:col-span-1 text-center md:text-left lg:pr-8'>
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
                Estudio web con base en Torrejón de Ardoz, Madrid
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
                {!minimal && (
                  <>
                    <a
                      href='https://www.linkedin.com/in/dani-pereira-396618226/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-accent hover:bg-accent-hover p-3 rounded-lg border-2 border-white/80 shadow-[3px_3px_0_0_rgba(255,255,255,0.4)] hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
                    >
                      <Linkedin className='w-5 h-5' />
                    </a>
                    <a
                      href='https://www.instagram.com/pereiraweb.es/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-accent hover:bg-accent-hover p-3 rounded-lg border-2 border-white/80 shadow-[3px_3px_0_0_rgba(255,255,255,0.4)] hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
                    >
                      <Instagram className='w-5 h-5' />
                    </a>
                  </>
                )}
              </div>
            </div>

            {!minimal && (
              <>
                <div className='text-center md:text-left lg:px-8'>
                  <h3 className='text-xl md:text-2xl font-bold mb-1 text-accent'>
                    Servicios
                  </h3>
                  <span className='block w-10 h-1 bg-accent mb-6 mx-auto md:mx-0' />
                  <ul className='space-y-3 text-gray-300'>
                    <li>
                      <a
                        href='/web-autonomos-pymes'
                        className='hover:text-white transition-colors duration-200'
                      >
                        Web para Autónomos y Pymes
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

                <div className='text-center md:text-left lg:px-8'>
                  <h3 className='text-xl md:text-2xl font-bold mb-1 text-accent'>
                    Estudio
                  </h3>
                  <span className='block w-10 h-1 bg-accent mb-6 mx-auto md:mx-0' />
                  <ul className='space-y-3 text-gray-300'>
                    <li>
                      <Link
                        to='/'
                        className='hover:text-white transition-colors duration-200'
                      >
                        Inicio
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/#portfolio'
                        className='hover:text-white transition-colors duration-200'
                      >
                        Trabajos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/#proceso'
                        className='hover:text-white transition-colors duration-200'
                      >
                        Proceso
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/sobre-el-estudio'
                        className='hover:text-white transition-colors duration-200'
                      >
                        Sobre el Estudio
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/contacto'
                        className='hover:text-white transition-colors duration-200'
                      >
                        Contacto
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}

            <div className='text-center md:text-left lg:pl-8'>
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
                <li className='flex flex-col items-center md:flex-row md:items-start gap-3 md:justify-start'>
                  <MapPin className='w-5 h-5 text-accent flex-shrink-0' />
                  <div className='text-center md:text-left'>
                    <p className='font-medium'>Ubicación</p>
                    <p>Calle Condega 7 | Torrejón de Ardoz | 28850 | Madrid</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='border-t-2 border-white/15'>
          <div className='container mx-auto px-6 py-6'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left'>
              <p className='text-gray-400 text-sm'>
                © {currentYear} {t('footer.copyright')}
              </p>
              <div className='flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-400'>
                <button
                  onClick={() => openLegalPage('privacy')}
                  className='hover:text-white transition-colors duration-200'
                >
                  {t('footer.privacy')}
                </button>
                <button
                  onClick={() => openLegalPage('terms')}
                  className='hover:text-white transition-colors duration-200'
                >
                  {t('footer.terms')}
                </button>
                <button
                  onClick={() => openLegalPage('cookies')}
                  className='hover:text-white transition-colors duration-200'
                >
                  {t('footer.cookies')}
                </button>
                <button
                  onClick={() => openLegalPage('legal')}
                  className='hover:text-white transition-colors duration-200'
                >
                  {t('footer.legal')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {legalPageOpen.isOpen && legalPageOpen.page && (
        <LegalPages
          isOpen={legalPageOpen.isOpen}
          onClose={closeLegalPage}
          page={legalPageOpen.page}
        />
      )}
    </>
  );
};

export default Footer;
