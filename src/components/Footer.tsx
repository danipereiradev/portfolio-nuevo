import { useState } from 'react';
import {
  Code2,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Phone,
  Instagram,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LegalPages from './LegalPages';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [legalPageOpen, setLegalPageOpen] = useState<{
    isOpen: boolean;
    page: 'privacy' | 'terms' | 'cookies' | 'legal' | null;
  }>({ isOpen: false, page: null });

  const comunidades = [
    'Madrid',
    'Barcelona',
    'Valencia',
    'Sevilla',
    'Bilbao',
    'Málaga',
    'Zaragoza',
    'Murcia',
    'Palma',
    'Las Palmas',
    'Alicante',
    'Córdoba',
    'Valladolid',
    'Vigo',
    'Gijón',
    'Hospitalet',
    'Vitoria',
    'Granada',
  ];

  const openLegalPage = (page: 'privacy' | 'terms' | 'cookies' | 'legal') => {
    setLegalPageOpen({ isOpen: true, page });
  };

  const closeLegalPage = () => {
    setLegalPageOpen({ isOpen: false, page: null });
  };

  return (
    <>
      <footer className='bg-black text-white'>
        <div className='container mx-auto px-6 py-16'>
          <div className='grid lg:grid-cols-4 gap-8'>
            <div className='lg:col-span-1'>
              <div className='flex items-center mb-6'>
                <Code2 className='w-12 h-12 text-accent' />
              </div>
              <p className='text-gray-300 mb-6 leading-relaxed'>
                {t('footer.description')}
              </p>
              <div className='flex space-x-4'>
                <a
                  href='mailto:web.danipereira@gmail.com'
                  className='bg-accent hover:bg-accent-hover p-3 rounded-lg transition-colors duration-200'
                >
                  <Mail className='w-5 h-5' />
                </a>
                <a
                  href='https://www.linkedin.com/in/dani-pereira-396618226/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-accent hover:bg-accent-hover p-3 rounded-lg transition-colors duration-200'
                >
                  <Linkedin className='w-5 h-5' />
                </a>
                <a
                  href='https://github.com/danipereiradev'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-accent hover:bg-accent-hover p-3 rounded-lg transition-colors duration-200'
                >
                  <Github className='w-5 h-5' />
                </a>
                <a
                  href='https://www.instagram.com/disenowebdp/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-accent hover:bg-accent-hover p-3 rounded-lg transition-colors duration-200'
                >
                  <Instagram className='w-5 h-5' />
                </a>
              </div>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-6 text-gray-400'>
                Servicios
              </h3>
              <ul className='space-y-3 text-gray-300'>
                <li>
                  <a
                    href='/diseno-web'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Diseño Web
                  </a>
                </li>
                <li>
                  <a
                    href='/paginas-web-empresas'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Páginas Web Empresas
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
                    href='/desarrollo-aplicaciones-web'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Aplicaciones Web
                  </a>
                </li>
                <li>
                  <a
                    href='/posicionamiento-web-seo'
                    className='hover:text-white transition-colors duration-200'
                  >
                    Posicionamiento SEO
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
                <li className='pt-2 border-t border-gray-700'>
                  <a
                    href='/'
                    className='hover:text-gray-400 transition-colors duration-200 text-sm'
                  >
                    Ver todos los servicios →
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-6 text-gray-400'>
                {t('footer.contact_title')}
              </h3>
              <ul className='space-y-4 text-gray-300'>
                <li className='flex items-start gap-3'>
                  <Mail className='w-5 h-5 text-accent mt-0.5' />
                  <div>
                    <p className='font-medium'>Email</p>
                    <a
                      href='mailto:web.danipereira@gmail.com'
                      className='hover:text-white transition-colors duration-200'
                    >
                      web.danipereira@gmail.com
                    </a>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <Phone className='w-5 h-5 text-accent mt-0.5' />
                  <div>
                    <p className='font-medium'>Teléfono</p>
                    <a
                      href='tel:+34644669828'
                      className='hover:text-white transition-colors duration-200'
                    >
                      +34 644 669 828
                    </a>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <MapPin className='w-5 h-5 text-accent mt-0.5' />
                  <div>
                    <p className='font-medium'>Ubicación</p>
                    <p>Madrid, España - Servicios en todas las CCAA</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-6 text-gray-400'>
                {t('footer.areas_title')}
              </h3>
              <p className='text-gray-300 mb-4'>{t('footer.areas_desc')}</p>
              <div className='grid grid-cols-2 gap-1 text-sm text-gray-400'>
                {comunidades.map((ciudad, index) => (
                  <div
                    key={index}
                    className='hover:text-white transition-colors duration-200 cursor-default'
                  >
                    {ciudad}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-700'>
          <div className='container mx-auto px-6 py-6'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
              <p className='text-gray-400 text-sm'>
                © {currentYear} {t('footer.copyright')}
              </p>
              <div className='flex gap-6 text-sm text-gray-400'>
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
