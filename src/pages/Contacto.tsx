import { Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import {
  trackEmailClick,
  trackPhoneClick,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import {
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  CONTACT_PAGE_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import { usePageMeta } from '../hooks/usePageMeta';
import ContactForm from '../components/ContactForm';

const CONTACT_WHATSAPP_URL = buildWhatsAppUrl(CONTACT_PAGE_WHATSAPP_MESSAGE);

const Contacto = () => {
  usePageMeta('/contacto');

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('ContactoPage', 'Escríbenos por WhatsApp');
    trackGoogleAdsWhatsAppConversion(CONTACT_WHATSAPP_URL);
  };

  return (
    <>
      <section className='relative h-[75vh] flex items-center justify-center overflow-hidden pt-20'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: 'url(/img/sobre-el-estudio.png)',
          }}
        >
          <div className='absolute inset-0 bg-black/70'></div>
        </div>

        <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-4'>
          <h1 className='text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight'>
            Cuéntanos qué necesitas
          </h1>
          <p className='text-base md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto'>
            Trabajamos con empresas, autónomos y negocios que necesitan crear o
            mejorar su presencia online. Podemos ayudarte con páginas web
            profesionales, tiendas online, mantenimiento web, rediseños, mejoras
            técnicas y desarrollos a medida.
          </p>
        </div>
      </section>

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                Información de Contacto
              </h2>
              <p className='text-gray-600 mb-8 leading-relaxed'>
                PereiraWeb · Estudio web en Torrejón de Ardoz, Madrid ·
                Proyectos en toda España. Respondemos a todas las consultas en
                un máximo de 2 horas.
              </p>

              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>Email</h3>
                    <a
                      href='mailto:hola@pereiraweb.es'
                      onClick={() => trackEmailClick('ContactoPage')}
                      className='text-gray-600 hover:text-accent transition-colors'
                    >
                      hola@pereiraweb.es
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0'>
                    <MessageCircle className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>WhatsApp</h3>
                    <a
                      href={CONTACT_WHATSAPP_URL}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={(e) => {
                        e.preventDefault();
                        handleWhatsAppClick();
                      }}
                      className='text-gray-600 hover:text-accent transition-colors'
                    >
                      Escríbenos por WhatsApp
                    </a>
                    <p className='text-sm text-gray-400 mt-1'>
                      O llama al{' '}
                      <a
                        href={PHONE_TEL_LINK}
                        onClick={() => trackPhoneClick('ContactoPage')}
                        className='hover:text-accent transition-colors'
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>Ubicación</h3>
                    <p className='text-gray-600'>
                      Calle Condega 7, Torrejón de Ardoz, 28850 Madrid
                      <span className='block text-sm mt-1'>
                        Proyectos en toda España · Reuniones online o
                        presenciales con cita previa
                      </span>
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0'>
                    <Clock className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Horario de Atención
                    </h3>
                    <p className='text-gray-600'>
                      Lunes a Viernes: 9:00 - 18:00
                      <span className='block text-sm mt-1'>
                        Sábado: 9:00 - 14:00
                      </span>
                      <span className='block text-sm mt-1'>
                        Respuesta en 2h máximo
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gray-50 p-8 rounded-lg border border-gray-200'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                ¿Por Qué Trabajar con el Estudio?
              </h3>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-sm font-bold'>✓</span>
                  </div>
                  <p className='text-gray-600'>
                    +12 años de experiencia en desarrollo web
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-sm font-bold'>✓</span>
                  </div>
                  <p className='text-gray-600'>
                    Presupuesto cerrado antes de empezar, sin sorpresas
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-sm font-bold'>✓</span>
                  </div>
                  <p className='text-gray-600'>
                    Trato directo y comunicación clara durante todo el proyecto
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-sm font-bold'>✓</span>
                  </div>
                  <p className='text-gray-600'>
                    Soporte continuo y mantenimiento post-lanzamiento
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-sm font-bold'>✓</span>
                  </div>
                  <p className='text-gray-600'>
                    Opciones de pago flexible: único, fraccionado o mensual
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
};

export default Contacto;
