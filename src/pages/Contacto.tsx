import { useEffect } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contacto = () => {
  useEffect(() => {
    document.title = 'Contacto | Desarrollo Web Profesional - Dani Pereira';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Contacta conmigo para tu proyecto web. Solicita presupuesto sin compromiso para diseño web, tienda online o aplicación web personalizada.',
      );
    }
  }, []);

  return (
    <>
      <section className='relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-gray-900 to-black'>
        <div className='relative z-10 text-center max-w-4xl mx-auto p-4'>
          <h1 className='text-5xl md:text-7xl font-bold text-white mb-4 leading-tight'>
            Cuéntame sobre tu Proyecto
          </h1>
          <p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed'>
            Cuéntame tu idea y te ayudaré a convertirla en realidad
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
                Estoy disponible para ayudarte con tu proyecto web. Respondo a
                todas las consultas en menos de 24 horas.
              </p>

              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>Email</h3>
                    <a
                      href='mailto:web.danipereira@gmail.com'
                      className='text-gray-600 hover:text-accent transition-colors'
                    >
                      web.danipereira@gmail.com
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Teléfono / WhatsApp
                    </h3>
                    <a
                      href='tel:+34644669828'
                      className='text-gray-600 hover:text-accent transition-colors'
                    >
                      +34 644 669 828
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>Ubicación</h3>
                    <p className='text-gray-600'>
                      Madrid, España
                      <span className='block text-sm mt-1'>
                        Servicios en toda España
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
                      Lunes a Viernes: 9:00 - 19:00
                      <span className='block text-sm mt-1'>
                        Respuesta en 24h máximo
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gray-50 p-8 rounded-2xl'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                ¿Por Qué Trabajar Conmigo?
              </h3>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-sm font-bold'>✓</span>
                  </div>
                  <p className='text-gray-600'>
                    Más de 12 años de experiencia en desarrollo web
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-sm font-bold'>✓</span>
                  </div>
                  <p className='text-gray-600'>
                    Proyectos entregados a tiempo y dentro del presupuesto
                  </p>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-white text-sm font-bold'>✓</span>
                  </div>
                  <p className='text-gray-600'>
                    Comunicación clara y constante durante todo el proyecto
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
                    Presupuestos transparentes sin costes ocultos
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
