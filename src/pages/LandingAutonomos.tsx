import {
  Globe,
  Check,
  ArrowRight,
  Search,
  BarChart,
  Shield,
  Smartphone,
  Mail,
  Star,
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { trackButtonClick } from '../utils/analytics';
import { useEffect } from 'react';

const LandingAutonomos = () => {
  useEffect(() => {
    // Track landing page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Página Web Autónomos y Pymes',
        page_location: window.location.href,
        page_path: '/web-autonomos-pymes',
      });
    }
  }, []);

  const scrollToContact = () => {
    trackButtonClick('Solicitar Presupuesto', 'Landing Autónomos Hero');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-16'>
        {/* Background Image */}
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className='absolute inset-0 bg-black/40'></div>
        </div>

        {/* Animated Background */}
        <div className='absolute inset-0 bg-gradient-to-br from-blue-600/80 via-cyan-500/80 to-blue-700/80 overflow-hidden'>
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute top-10 left-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
            <div className='absolute top-0 right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
            <div className='absolute bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
          </div>
        </div>

        <div className='relative z-10 text-center px-6 max-w-5xl mx-auto py-20'>
          <div className='flex justify-center mb-6'>
            <div className='bg-white/20 backdrop-blur-sm p-4 rounded-2xl'>
              <Globe className='w-16 h-16 text-white animate-pulse' />
            </div>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
            Tu Web Profesional
            <span className='block text-3xl md:text-4xl mt-4 text-white/90'>
              Diseñada para hacer crecer tu negocio
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto'>
            La solución perfecta para{' '}
            <strong>autónomos, pymes y profesionales</strong> que buscan
            establecer su presencia digital con <strong>SEO optimizado</strong>{' '}
            y diseño profesional.
          </p>

          {/* Price Badge */}
          <div className='bg-white rounded-2xl shadow-2xl p-6 mb-8 inline-block'>
            <div className='flex items-center gap-3'>
              <div>
                <p className='text-gray-500 text-sm line-through'>€950</p>
                <p className='text-6xl font-bold text-blue-600'>€750</p>
              </div>
              <div className='text-left'>
                <p className='text-green-600 font-bold text-lg'>Ahorras €200</p>
                <p className='text-gray-600 text-sm'>Precio final</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
            <button
              onClick={scrollToContact}
              className='bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl flex items-center gap-2'
            >
              Solicitar Ahora
              <ArrowRight className='w-6 h-6' />
            </button>
          </div>

          {/* Trust Badges */}
          <div className='flex flex-wrap gap-4 justify-center'>
            <span className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30'>
              <Search className='w-4 h-4' />
              SEO Optimizado
            </span>
            <span className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30'>
              <BarChart className='w-4 h-4' />
              Google Analytics
            </span>
            <span className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30'>
              <Star className='w-4 h-4' />
              4.8/5 valoración
            </span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              ¿Por qué necesitas una web profesional?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              En la era digital, tu web es tu mejor vendedor 24/7
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {/* Benefit 1 */}
            <div className='bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Search className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                SEO ON PAGE
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Optimización completa para que tus clientes te encuentren en{' '}
                <strong>Google</strong>. Posicionamiento desde el día 1.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Smartphone className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                100% Responsive
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Tu web se verá{' '}
                <strong>perfecta en cualquier dispositivo</strong>: móvil,
                tablet u ordenador. Sin excepciones.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className='bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <BarChart className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Google Analytics
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Conoce a tus visitantes:{' '}
                <strong>de dónde vienen, qué buscan</strong> y cómo mejorar tu
                negocio con datos reales.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className='bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-yellow-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Mail className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Formulario Avanzado
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Captura leads de forma profesional con{' '}
                <strong>validaciones</strong>, protección anti-spam y
                notificaciones automáticas.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className='bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Shield className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Seguridad SSL
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                <strong>Certificado SSL incluido</strong> para que tus clientes
                naveguen seguros. Google lo premia en posicionamiento.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className='bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-indigo-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Star className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Entrega Rápida
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Tu web estará lista en <strong>2 semanas</strong>. Sin retrasos,
                con actualizaciones constantes del progreso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                ¿Qué incluye este plan?
              </h2>
              <p className='text-xl text-gray-600'>
                Todo lo que necesitas para destacar profesionalmente
              </p>
            </div>

            <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Hasta 5 secciones incluidas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Inicio, Servicios, Sobre mí, Portfolio, Contacto
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Diseño responsivo profesional
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Perfecto en móvil, tablet y ordenador
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Formulario de contacto avanzado
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Con validaciones y protección anti-spam
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Optimización SEO ON PAGE
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Meta tags, keywords, estructura optimizada
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Integración con Google Analytics
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Seguimiento de visitantes y estadísticas
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Certificado SSL incluido
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Navegación segura con HTTPS
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Entrega en 2 semanas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Con actualizaciones de progreso
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      1 revisión incluida
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Para ajustar detalles y contenido
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200'>
                <h3 className='font-bold text-gray-900 mb-2 text-lg'>
                  💳 Pago flexible
                </h3>
                <p className='text-gray-700 text-sm mb-2'>
                  50% al inicio (€375) y 50% a la entrega (€375).
                </p>
                <p className='text-gray-700 text-sm'>
                  ✅ <strong>Garantía de satisfacción 100%</strong> - Ajustamos
                  hasta que estés feliz con el resultado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <TestimonialsCarousel
        title='Casos de éxito'
        description='Empresas que han transformado su presencia digital'
      />

      {/* Final CTA Section */}
      <section className='py-20 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            ¿Listo para llevar tu negocio al siguiente nivel?
          </h2>
          <p className='text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
            Completa el formulario y te responderé en menos de 24 horas con una
            propuesta personalizada
          </p>
          <button
            onClick={scrollToContact}
            className='bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl inline-flex items-center gap-2'
          >
            Solicitar Presupuesto
            <ArrowRight className='w-6 h-6' />
          </button>
        </div>
      </section>

      {/* Contact Form with preselected plan */}
      <ContactForm preselectedPlan='Página Web Autónomos y Pymes (Desde €750)' />
    </>
  );
};

export default LandingAutonomos;
