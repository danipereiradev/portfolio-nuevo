import { Mail, Phone, Video, Clock, MessageCircle, Check } from 'lucide-react';
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
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_PLACE_URL,
  buildWhatsAppUrl,
} from '../config/contact';
import { usePageMeta } from '../hooks/usePageMeta';
import ContactForm from '../components/ContactForm';
import GlowBackdrop from '../components/decor/GlowBackdrop';

const CONTACT_WHATSAPP_URL = buildWhatsAppUrl(CONTACT_PAGE_WHATSAPP_MESSAGE);

const Contacto = () => {
  usePageMeta('/contacto');

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('ContactoPage', 'Escríbenos por WhatsApp');
    trackGoogleAdsWhatsAppConversion(CONTACT_WHATSAPP_URL);
  };

  return (
    <>
      <section className='relative min-h-[min(72vh,640px)] flex items-center justify-center overflow-hidden pt-24 pb-14'>
        <GlowBackdrop />

        <div className='relative z-10 w-full mx-auto max-w-screen-2xl px-6'>
          <div className='max-w-2xl mx-auto text-center'>
            <p className='text-accent font-mono text-sm md:text-base font-semibold tracking-tight mb-5'>
              Contacto
            </p>
            <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight'>
              Cuéntanos qué necesitas
            </h1>
            <p className='text-base md:text-xl text-white/85 leading-relaxed mx-auto max-w-xl'>
              WhatsApp, email, teléfono o videollamada. Si estás en Madrid,
              también podemos vernos. Respondemos pronto.
            </p>
          </div>
        </div>
      </section>

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                Cómo contactar
              </h2>
              <p className='text-gray-600 mb-8 leading-relaxed'>
                Trabajamos online con clientes de toda España. No hay oficina
                abierta al público. En Madrid podemos desplazarnos.
              </p>

              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] flex items-center justify-center flex-shrink-0'>
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
                  <div className='w-12 h-12 bg-accent rounded-xl border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>Teléfono</h3>
                    <a
                      href={PHONE_TEL_LINK}
                      onClick={() => trackPhoneClick('ContactoPage')}
                      className='text-gray-600 hover:text-accent transition-colors'
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] flex items-center justify-center flex-shrink-0'>
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
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] flex items-center justify-center flex-shrink-0'>
                    <Video className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Videollamada
                    </h3>
                    <p className='text-gray-600'>
                      Reuniones por videollamada en toda España.
                      <span className='block text-sm mt-1 text-gray-500'>
                        Si estás en Madrid, también podemos desplazarnos.
                      </span>
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] flex items-center justify-center flex-shrink-0'>
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
                        Respuesta muy rápida
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gray-50 p-8 rounded-xl border-2 border-ink-dark shadow-[6px_6px_0_0_#1a1a1a]'>
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Por qué escribirnos
              </h3>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <p className='text-gray-700'>
                    Más de 12 años haciendo webs
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <p className='text-gray-700'>
                    Precio y alcance por escrito antes de empezar
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <p className='text-gray-700'>
                    Hablas con quien construye el proyecto
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <p className='text-gray-700'>
                    Mantenimiento después, si lo quieres
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <p className='text-gray-700'>
                    Opciones de pago flexible: único o fraccionado
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div id='mapa' className='scroll-mt-24 max-w-6xl mx-auto'>
            <div className='text-center mb-8 max-w-2xl mx-auto'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-3'>
                Encuéntranos en Google
              </h2>
              <p className='text-gray-600 leading-relaxed'>
                Ficha oficial de Pereira Web en Google Maps, con valoraciones de
                clientes. Dirección fiscal en Torrejón de Ardoz, 28850, Madrid.
              </p>
            </div>

            <div className='rounded-xl border-2 border-ink-dark overflow-hidden shadow-[7px_7px_0_0_#1a1a1a] bg-white'>
              <iframe
                title='Pereira Web en Google Maps'
                src={GOOGLE_MAPS_EMBED_URL}
                className='block w-full h-[320px] md:h-[450px] border-0'
                loading='lazy'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              />
            </div>

            <p className='text-center mt-5'>
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline'
              >
                Abrir ficha en Google Maps
              </a>
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
};

export default Contacto;
