import {
  Smartphone,
  Check,
  ArrowRight,
  Code,
  Database,
  Lock,
  Zap,
  Users,
  Cloud,
  Star,
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { trackButtonClick } from '../utils/analytics';
import { useEffect } from 'react';

const LandingApp = () => {
  useEffect(() => {
    // Track landing page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Aplicación Web o Móvil',
        page_location: window.location.href,
        page_path: '/aplicacion-web',
      });
    }
  }, []);

  const scrollToContact = () => {
    trackButtonClick('Solicitar Presupuesto', 'Landing App Hero');
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
        <div className='absolute inset-0 bg-gradient-to-br from-purple-600/80 via-pink-500/80 to-purple-700/80 overflow-hidden'>
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
            <div className='absolute top-0 right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
            <div className='absolute bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
          </div>
        </div>

        <div className='relative z-10 text-center px-6 max-w-5xl mx-auto py-20'>
          <div className='flex justify-center mb-6'>
            <div className='bg-white/20 backdrop-blur-sm p-4 rounded-2xl'>
              <Smartphone className='w-16 h-16 text-white animate-pulse' />
            </div>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
            Aplicación Web o Móvil
            <span className='block text-3xl md:text-4xl mt-4 text-white/90'>
              Desarrollo 100% personalizado para tu idea
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto'>
            Convierte tu <strong>idea innovadora</strong> en realidad con
            desarrollo a medida. Ideal para{' '}
            <strong>startups, proyectos únicos</strong> y empresas con
            necesidades específicas.
          </p>

          {/* Price Badge */}
          <div className='bg-white rounded-2xl shadow-2xl p-6 mb-8 inline-block'>
            <span className='bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block'>
              💎 PLAN PREMIUM
            </span>
            <div className='flex items-center gap-3'>
              <div>
                <p className='text-gray-500 text-sm line-through'>€3,800</p>
                <p className='text-6xl font-bold text-purple-600'>€3,200</p>
              </div>
              <div className='text-left'>
                <p className='text-green-600 font-bold text-lg'>Ahorras €600</p>
                <p className='text-gray-600 text-sm'>Desde</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
            <button
              onClick={scrollToContact}
              className='bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl flex items-center gap-2'
            >
              Consultar Proyecto
              <ArrowRight className='w-6 h-6' />
            </button>
          </div>

          {/* Trust Badges */}
          <div className='flex flex-wrap gap-4 justify-center'>
            <span className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30'>
              <Code className='w-4 h-4' />
              Código Limpio
            </span>
            <span className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30'>
              <Lock className='w-4 h-4' />
              Seguridad Avanzada
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
              ¿Por qué elegir desarrollo a medida?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Para proyectos que no encajan en plantillas. Tu idea merece una
              solución única.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {/* Benefit 1 */}
            <div className='bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Code className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                100% Personalizado
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Desarrollo desde cero adaptado a{' '}
                <strong>tus necesidades exactas</strong>. Sin limitaciones de
                plantillas o themes.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className='bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Database className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Base de Datos Avanzada
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Arquitectura robusta para gestionar{' '}
                <strong>grandes volúmenes de datos</strong> con consultas
                optimizadas.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Users className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Panel de Administración
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Gestiona tu aplicación con un{' '}
                <strong>dashboard completo</strong> adaptado a tu flujo de
                trabajo.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className='bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-yellow-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Lock className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Autenticación de Usuarios
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Sistema completo de <strong>registro, login y permisos</strong>{' '}
                con seguridad de nivel empresarial.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className='bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Zap className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                API REST Personalizada
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Conecta tu app con <strong>servicios externos</strong> o crea tu
                propia API para futuras integraciones.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className='bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-indigo-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Cloud className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Backup Automático
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                <strong>Copias de seguridad diarias</strong> de tu base de
                datos. Tu información siempre protegida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-purple-50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                ¿Qué incluye el desarrollo a medida?
              </h2>
              <p className='text-xl text-gray-600'>
                Una solución completa y escalable para tu proyecto
              </p>
            </div>

            <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Desarrollo 100% personalizado
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Adaptado a tus necesidades específicas
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Base de datos avanzada
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Diseño optimizado y escalable
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Panel de administración completo
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Dashboard intuitivo y funcional
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Autenticación de usuarios
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Sistema seguro de login y permisos
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      API REST personalizada
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Para integraciones y escalabilidad
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Integración con servicios externos
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      APIs, pagos, email, etc.
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Optimización SEO ON PAGE
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Para máxima visibilidad
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Funcionalidades específicas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Lo que tu proyecto necesite
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Backup automático de datos
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Copias diarias de seguridad
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Entrega en 8-16 semanas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Según complejidad del proyecto
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      2 revisiones incluidas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Ajustes sin coste adicional
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-purple-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Documentación técnica
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Para mantenimiento futuro
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200'>
                <h3 className='font-bold text-gray-900 mb-2 text-lg'>
                  💳 Pago flexible
                </h3>
                <p className='text-gray-700 text-sm mb-2'>
                  50% al inicio (€1,600) y 50% a la entrega (€1,600).
                </p>
                <p className='text-gray-700 text-sm'>
                  ✅ <strong>Garantía de satisfacción 100%</strong> -
                  Seguimiento constante del progreso y comunicación directa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-5xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                ¿Cómo funciona el proceso?
              </h2>
              <p className='text-xl text-gray-600'>
                Metodología ágil con actualizaciones constantes
              </p>
            </div>

            <div className='grid md:grid-cols-4 gap-6'>
              <div className='text-center'>
                <div className='bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg'>
                  1
                </div>
                <h3 className='font-bold text-gray-900 mb-2'>
                  Consulta Inicial
                </h3>
                <p className='text-gray-600 text-sm'>
                  Hablamos de tu idea, objetivos y requisitos
                </p>
              </div>

              <div className='text-center'>
                <div className='bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg'>
                  2
                </div>
                <h3 className='font-bold text-gray-900 mb-2'>
                  Propuesta Técnica
                </h3>
                <p className='text-gray-600 text-sm'>
                  Te envío un plan detallado con cronograma y precio
                </p>
              </div>

              <div className='text-center'>
                <div className='bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg'>
                  3
                </div>
                <h3 className='font-bold text-gray-900 mb-2'>Desarrollo</h3>
                <p className='text-gray-600 text-sm'>
                  Actualizaciones semanales del progreso
                </p>
              </div>

              <div className='text-center'>
                <div className='bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg'>
                  4
                </div>
                <h3 className='font-bold text-gray-900 mb-2'>
                  Entrega y Soporte
                </h3>
                <p className='text-gray-600 text-sm'>
                  Pruebas, ajustes y puesta en producción
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <TestimonialsCarousel
        title='Lo que dicen mis clientes'
        description='Proyectos exitosos desarrollados a medida'
      />

      {/* Final CTA Section */}
      <section className='py-20 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            ¿Tienes una idea innovadora?
          </h2>
          <p className='text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
            Cuéntame tu proyecto y te enviaré una propuesta técnica detallada
            sin compromiso
          </p>
          <button
            onClick={scrollToContact}
            className='bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl inline-flex items-center gap-2'
          >
            Consultar Proyecto
            <ArrowRight className='w-6 h-6' />
          </button>
        </div>
      </section>

      {/* Contact Form with preselected plan */}
      <ContactForm preselectedPlan='Aplicación Web o Móvil (Desde €3200)' />
    </>
  );
};

export default LandingApp;
