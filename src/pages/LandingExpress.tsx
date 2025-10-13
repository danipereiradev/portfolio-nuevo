import {
  Zap,
  Check,
  ArrowRight,
  Clock,
  TrendingUp,
  Shield,
  Star,
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { trackButtonClick } from '../utils/analytics';
import { useEffect } from 'react';

const LandingExpress = () => {
  useEffect(() => {
    // Track landing page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Página Web Sencilla',
        page_location: window.location.href,
        page_path: '/landing-express',
      });
    }
  }, []);

  const scrollToContact = () => {
    trackButtonClick('Solicitar Presupuesto', 'Landing Express Hero');
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
        <div className='absolute inset-0 bg-gradient-to-br from-orange-500/80 via-yellow-500/80 to-orange-600/80 overflow-hidden'>
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
            <div className='absolute top-0 right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
            <div className='absolute bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
          </div>
        </div>

        <div className='relative z-10 text-center px-6 max-w-5xl mx-auto py-20'>
          <div className='flex justify-center mb-6'>
            <div className='bg-white/20 backdrop-blur-sm p-4 rounded-2xl'>
              <Zap className='w-16 h-16 text-white animate-pulse' />
            </div>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
            Página Web Sencilla
            <span className='block text-3xl md:text-4xl mt-4 text-white/90'>
              Tu presencia online en tiempo récord
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto'>
            Perfecta para{' '}
            <strong>emprendedores, eventos y lanzamientos rápidos</strong>. Una
            solución profesional y económica lista en <strong>1 semana</strong>.
          </p>

          {/* Price Badge */}
          <div className='bg-white rounded-2xl shadow-2xl p-6 mb-8 inline-block'>
            <div className='flex items-center gap-3'>
              <div>
                <p className='text-gray-500 text-sm line-through'>€500</p>
                <p className='text-6xl font-bold text-orange-600'>€350</p>
              </div>
              <div className='text-left'>
                <p className='text-green-600 font-bold text-lg'>Ahorras €150</p>
                <p className='text-gray-600 text-sm'>Precio final</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
            <button
              onClick={scrollToContact}
              className='bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl flex items-center gap-2'
            >
              Solicitar Ahora
              <ArrowRight className='w-6 h-6' />
            </button>
          </div>

          {/* Trust Badges */}
          <div className='flex flex-wrap gap-4 justify-center'>
            <span className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30'>
              <Clock className='w-4 h-4' />
              Entrega en 1 semana
            </span>
            <span className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30'>
              <Shield className='w-4 h-4' />
              Garantía 100%
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
              ¿Por qué elegir Página Web Sencilla?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Diseñada específicamente para emprendedores y proyectos que
              necesitan resultados rápidos sin sacrificar calidad
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {/* Benefit 1 */}
            <div className='bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-orange-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Clock className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Ultra Rápida
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                <strong>Entrega en 1 semana</strong>. Perfecta para eventos,
                lanzamientos urgentes o cuando necesitas presencia online
                inmediata.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <TrendingUp className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Económica
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Por solo <strong>€350</strong> tendrás una landing profesional,
                responsiva y optimizada. Sin costes ocultos.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className='bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Zap className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Profesional
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Diseño moderno, <strong>formulario de contacto</strong>,
                certificado SSL y totalmente <strong>responsive</strong>.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className='bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Check className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Fácil de Actualizar
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Te entregaré instrucciones claras para que puedas hacer cambios
                básicos tú mismo/a cuando lo necesites.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className='bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-yellow-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Shield className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Seguridad Incluida
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                <strong>Certificado SSL</strong> para que tus visitantes
                naveguen de forma segura. Esencial para generar confianza.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className='bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Star className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Resultados Probados
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Más de <strong>10 años de experiencia</strong> ayudando a
                emprendedores a tener su primera presencia online exitosa.
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
                ¿Qué incluye el plan Express?
              </h2>
              <p className='text-xl text-gray-600'>
                Todo lo esencial para empezar con buen pie
              </p>
            </div>

            <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      1-2 secciones personalizadas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Perfectas para presentar tu servicio o evento
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Diseño responsivo
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Se ve perfecto en móvil, tablet y ordenador
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Formulario de contacto básico
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Para que tus clientes te escriban fácilmente
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
                      Entrega ultra-rápida
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Lista en 1 semana desde el inicio
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Garantía de satisfacción
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      100% comprometido con tu proyecto
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200'>
                <h3 className='font-bold text-gray-900 mb-2 text-lg'>
                  💳 Pago flexible
                </h3>
                <p className='text-gray-700 text-sm'>
                  50% al inicio (€175) y 50% a la entrega (€175). Sin sorpresas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <TestimonialsCarousel
        title='Lo que dicen mis clientes'
        description='Testimonios reales de empresarios que confiaron en mi trabajo'
      />

      {/* Final CTA Section */}
      <section className='py-20 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            ¿Listo para lanzar tu proyecto?
          </h2>
          <p className='text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
            Completa el formulario y te responderé en menos de 24 horas con un
            plan personalizado
          </p>
          <button
            onClick={scrollToContact}
            className='bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl inline-flex items-center gap-2'
          >
            Empezar Ahora
            <ArrowRight className='w-6 h-6' />
          </button>
        </div>
      </section>

      {/* Contact Form with preselected plan */}
      <ContactForm preselectedPlan='Página Web Sencilla (Desde €350)' />
    </>
  );
};

export default LandingExpress;
