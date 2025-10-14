import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import LegalPages from './LegalPages';

const FooterLanding = () => {
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
      <footer className='bg-gray-900 text-white py-12'>
        <div className='container mx-auto px-6'>
          {/* Main content */}
          <div className='grid md:grid-cols-3 gap-8 mb-8'>
            {/* Contact Info */}
            <div>
              <h3 className='text-lg font-bold mb-4 text-blue-400'>Contacto</h3>
              <ul className='space-y-3 text-gray-300 text-sm'>
                <li className='flex items-center gap-2'>
                  <Phone className='w-4 h-4 text-blue-400' />
                  <a
                    href='tel:+34644669828'
                    className='hover:text-white transition-colors duration-200'
                  >
                    +34 644 669 828
                  </a>
                </li>
                <li className='flex items-center gap-2'>
                  <Mail className='w-4 h-4 text-blue-400' />
                  <a
                    href='mailto:web.danipereira@gmail.com'
                    className='hover:text-white transition-colors duration-200'
                  >
                    web.danipereira@gmail.com
                  </a>
                </li>
                <li className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4 text-blue-400' />
                  <span>Madrid, España</span>
                </li>
              </ul>
              <div className='flex space-x-3 mt-6'>
                <a
                  href='https://www.linkedin.com/in/dani-pereira-396618226/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors duration-200'
                >
                  <Linkedin className='w-4 h-4' />
                </a>
                <a
                  href='https://github.com/danipereiradev'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors duration-200'
                >
                  <Github className='w-4 h-4' />
                </a>
                <a
                  href='https://www.instagram.com/danipereira.web/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 p-2 rounded-lg transition-colors duration-200'
                >
                  <Instagram className='w-4 h-4' />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className='text-lg font-bold mb-4 text-blue-400'>
                Otros Servicios
              </h3>
              <ul className='space-y-2 text-gray-300 text-sm'>
                <li>
                  <Link
                    to='/landing-express'
                    className='hover:text-white transition-colors'
                  >
                    Página Web Sencilla
                  </Link>
                </li>
                <li>
                  <Link
                    to='/web-autonomos-pymes'
                    className='hover:text-white transition-colors'
                  >
                    Web Autónomos y Pymes
                  </Link>
                </li>
                <li>
                  <Link
                    to='/tienda-online'
                    className='hover:text-white transition-colors'
                  >
                    Tienda Online
                  </Link>
                </li>
                <li>
                  <Link
                    to='/aplicacion-web'
                    className='hover:text-white transition-colors'
                  >
                    Aplicación Web/Móvil
                  </Link>
                </li>
                <li className='pt-2'>
                  <Link
                    to='/'
                    className='text-blue-400 hover:text-blue-300 transition-colors'
                  >
                    Ver todos los servicios →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Trust Signals */}
            <div>
              <h3 className='text-lg font-bold mb-4 text-blue-400'>
                Garantías
              </h3>
              <ul className='space-y-2 text-gray-300 text-sm'>
                <li>✅ Respuesta en 24h</li>
                <li>✅ Garantía de satisfacción 100%</li>
                <li>✅ +10 años de experiencia</li>
                <li>✅ 4.8/5 valoración de clientes</li>
                <li>✅ Pago flexible 50/50</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='border-t border-gray-800 pt-6'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
              <p className='text-gray-400 text-sm'>
                © {currentYear} Dani Pereira - Desarrollo Web Profesional
              </p>
              <div className='flex gap-4 text-sm text-gray-400'>
                <button
                  onClick={() => openLegalPage('privacy')}
                  className='hover:text-white transition-colors duration-200'
                >
                  Privacidad
                </button>
                <button
                  onClick={() => openLegalPage('terms')}
                  className='hover:text-white transition-colors duration-200'
                >
                  Términos
                </button>
                <button
                  onClick={() => openLegalPage('cookies')}
                  className='hover:text-white transition-colors duration-200'
                >
                  Cookies
                </button>
                <button
                  onClick={() => openLegalPage('legal')}
                  className='hover:text-white transition-colors duration-200'
                >
                  Aviso Legal
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Pages Modal */}
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

export default FooterLanding;
