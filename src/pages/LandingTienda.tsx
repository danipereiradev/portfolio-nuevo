import {
  ShoppingCart,
  Check,
  ArrowRight,
  CreditCard,
  Package,
  TrendingUp,
  BarChart2,
  Settings,
  Star,
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { trackButtonClick } from '../utils/analytics';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

const LandingTienda = () => {
  useEffect(() => {
    // Track landing page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Tienda Online E-commerce',
        page_location: window.location.href,
        page_path: '/tienda-online',
      });
    }
  }, []);

  const scrollToContact = () => {
    trackButtonClick('Solicitar Presupuesto', 'Landing Tienda Hero');
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
        <div className='absolute inset-0 bg-gradient-to-br from-green-600/80 via-emerald-500/80 to-green-700/80 overflow-hidden'>
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute top-10 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob'></div>
            <div className='absolute top-0 right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000'></div>
            <div className='absolute bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000'></div>
          </div>
        </div>

        <div className='relative z-10 text-center px-6 max-w-5xl mx-auto py-20'>
          <div className='flex justify-center mb-6'>
            <div className='bg-white/20 backdrop-blur-sm p-4 rounded-2xl relative'>
              <ShoppingCart className='w-16 h-16 text-white animate-pulse' />
              <span className='absolute -top-2 -right-2 bg-yellow-400 text-green-900 font-bold text-xs px-2 py-1 rounded-full'>
                MÁS POPULAR
              </span>
            </div>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
            Tu Tienda Online Completa
            <span className='block text-3xl md:text-4xl mt-4 text-white/90'>
              Empieza a vender online hoy mismo
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto'>
            Solución <strong>e-commerce completa</strong> con pasarela de pagos,
            gestión de inventario y panel de administración.{' '}
            <strong>Hasta 50 productos incluidos</strong>.
          </p>

          {/* Price Badge */}
          <div className='bg-white rounded-2xl shadow-2xl p-6 mb-8 inline-block ring-4 ring-yellow-400'>
            <span className='bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block'>
              ⭐ PLAN MÁS ELEGIDO
            </span>
            <div className='flex items-center gap-3'>
              <div className='flex flex-col items-center'>
                <p className='text-lg text-gray-600 font-medium mb-1'>Desde</p>
                <p className='text-gray-500 text-sm line-through'>€1,650</p>
                <p className='text-6xl font-bold text-green-600'>€1,250</p>
              </div>
              <div className='text-left'>
                <p className='text-green-600 font-bold text-lg'>Ahorras €400</p>
                <p className='text-gray-600 text-sm'>Precio final</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
            <button
              onClick={scrollToContact}
              className='bg-white text-green-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl flex items-center gap-2'
            >
              Empezar a Vender
              <ArrowRight className='w-6 h-6' />
            </button>
          </div>

          {/* Trust Badges */}
          <div className='flex flex-wrap gap-4 justify-center'>
            <span className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30'>
              <CreditCard className='w-4 h-4' />
              Pagos Seguros
            </span>
            <span className='bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30'>
              <Package className='w-4 h-4' />
              50 Productos
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
              Todo lo que necesitas para vender online
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Una tienda online profesional con todas las funcionalidades que
              tus clientes esperan
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {/* Benefit 1 */}
            <div className='bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <CreditCard className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Pagos Seguros
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Integración con <strong>Stripe y PayPal</strong>. Tus clientes
                pagan con tarjeta, PayPal o transferencia de forma 100% segura.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className='bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Package className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Gestión de Inventario
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Control total de tu stock:{' '}
                <strong>añade, edita o elimina productos</strong> fácilmente
                desde tu panel de administración.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className='bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <Settings className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Panel de Administración
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Gestiona tu tienda de forma <strong>intuitiva</strong>: pedidos,
                productos, clientes y estadísticas en un solo lugar.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className='bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-yellow-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <ShoppingCart className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Carrito Avanzado
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Carrito de compra optimizado con{' '}
                <strong>cupones de descuento</strong>, cálculo automático de
                envíos y proceso de pago rápido.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className='bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <TrendingUp className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                SEO Optimizado
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                <strong>SEO ON PAGE completo</strong> para que tus productos
                aparezcan en Google y generes ventas orgánicas.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className='bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='bg-indigo-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4'>
                <BarChart2 className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                Estadísticas de Ventas
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                Conoce tus <strong>productos más vendidos</strong>, ingresos
                totales y comportamiento de clientes para optimizar tu negocio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className='py-20 bg-gradient-to-br from-gray-50 to-green-50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                ¿Qué incluye la Tienda Online?
              </h2>
              <p className='text-xl text-gray-600'>
                Todo lo necesario para empezar a vender desde el día 1
              </p>
            </div>

            <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12 ring-4 ring-green-200'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Hasta 50 productos incluidos
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Yo cargo los primeros 50 productos por ti
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Pagos con Stripe/PayPal
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Configuración completa de pasarelas
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Gestión completa de inventario
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Actualiza stock en tiempo real
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Panel de administración intuitivo
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Fácil de usar, sin conocimientos técnicos
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Carrito de compra avanzado
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Con cupones y descuentos
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Configuración de envíos
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Zonas, tarifas y opciones personalizadas
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Sistema de cupones
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Crea descuentos y promociones
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Redes sociales integradas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Conecta con tus perfiles sociales
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
                      Para aparecer en Google
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Estadísticas básicas de ventas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Conoce tu rendimiento
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      Entrega en 2-4 semanas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Según complejidad del catálogo
                    </p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Check className='w-6 h-6 text-green-500 flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>
                      2 revisiones incluidas
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Ajustes y mejoras sin coste
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200'>
                <h3 className='font-bold text-gray-900 mb-2 text-lg'>
                  💳 Pago flexible
                </h3>
                <p className='text-gray-700 text-sm mb-2'>
                  50% al inicio (€625) y 50% a la entrega (€625).
                </p>
                <p className='text-gray-700 text-sm'>
                  ✅ <strong>Garantía de satisfacción 100%</strong> - No se
                  realizará el cobro total hasta que estés conforme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <TestimonialsCarousel
        title='Clientes vendiendo online con éxito'
        description='Testimonios reales de tiendas que confían en mi trabajo'
      />

      {/* Final CTA Section */}
      <section className='py-20 bg-gradient-to-br from-green-600 via-emerald-500 to-green-700'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            ¿Listo para empezar a vender online?
          </h2>
          <p className='text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
            Completa el formulario y te enviaré una propuesta detallada en menos
            de 24 horas
          </p>
          <button
            onClick={scrollToContact}
            className='bg-white text-green-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl inline-flex items-center gap-2'
          >
            Crear Mi Tienda
            <ArrowRight className='w-6 h-6' />
          </button>
        </div>
      </section>

      {/* Contact Form with preselected plan */}
      <ContactForm preselectedPlan='Tienda Online (Desde €1250)' />
    </>
  );
};

export default LandingTienda;
