import {
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Smartphone,
  AlertCircle,
  CreditCard,
  Eye,
  CheckCircle2,
  ListChecks,
  Wrench,
  Home,
  Menu,
  Search,
  FileText,
  DollarSign,
  Truck,
  Shield,
  Package,
  MousePointer,
  MessageSquare,
  Zap,
  BarChart3,
  Play,
  MessageCircle,
  FileCheck,
  ArrowUpCircle,
  Settings,
  X,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import SEOLandingHero from '../components/SEOLandingHero';
import SEOProblem from '../components/SEOProblem';
import SEOProcess from '../components/SEOProcess';
import SEOWhyMe from '../components/SEOWhyMe';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import AuditoriaPlans from '../components/AuditoriaPlans';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';

const AuditoriaEcommerce = () => {
  const { openModal } = useContactModal();

  usePageMeta('/auditoria-ecommerce');

  const problems = [
    {
      text: 'Recibes visitas pero pocas compras',
      icon: <TrendingDown className='w-6 h-6' />,
    },
    {
      text: 'El usuario abandona en producto, carrito o checkout',
      icon: <ShoppingCart className='w-6 h-6' />,
    },
    {
      text: 'La versión móvil no transmite confianza',
      icon: <Smartphone className='w-6 h-6' />,
    },
    {
      text: 'No queda claro el envío, devolución o métodos de pago',
      icon: <AlertCircle className='w-6 h-6' />,
    },
    {
      text: 'La ficha de producto no resuelve dudas importantes',
      icon: <FileText className='w-6 h-6' />,
    },
    {
      text: 'Estás invirtiendo en publicidad sin saber si la tienda convierte bien',
      icon: <CreditCard className='w-6 h-6' />,
    },
  ];

  const solutionBlocks = [
    {
      title: 'Revisión clara',
      description:
        'Navegamos por tu tienda y detectamos problemas visibles, dudas, bloqueos y errores de experiencia.',
      icon: <Eye className='w-8 h-8' />,
    },
    {
      title: 'Mejoras accionables',
      description:
        'No recibirás teoría genérica, sino recomendaciones concretas y priorizadas.',
      icon: <CheckCircle2 className='w-8 h-8' />,
    },
    {
      title: 'Posible implementación',
      description:
        'Si tu tienda está en WooCommerce, Shopify o PrestaShop, también podemos ayudarte a aplicar las mejoras.',
      icon: <Wrench className='w-8 h-8' />,
    },
  ];

  const reviewAreas = [
    {
      name: 'Primera impresión de la home',
      icon: <Home className='w-6 h-6' />,
    },
    { name: 'Navegación y menú', icon: <Menu className='w-6 h-6' /> },
    { name: 'Categorías y buscador', icon: <Search className='w-6 h-6' /> },
    { name: 'Ficha de producto', icon: <FileText className='w-6 h-6' /> },
    { name: 'Claridad de precios', icon: <DollarSign className='w-6 h-6' /> },
    {
      name: 'Gastos de envío y devoluciones',
      icon: <Truck className='w-6 h-6' />,
    },
    {
      name: 'Confianza y credibilidad',
      icon: <Shield className='w-6 h-6' />,
    },
    { name: 'Carrito', icon: <ShoppingCart className='w-6 h-6' /> },
    { name: 'Checkout', icon: <Package className='w-6 h-6' /> },
    { name: 'Versión móvil', icon: <Smartphone className='w-6 h-6' /> },
    {
      name: 'Llamadas a la acción',
      icon: <MousePointer className='w-6 h-6' />,
    },
    {
      name: 'Footer, contacto y políticas',
      icon: <MessageSquare className='w-6 h-6' />,
    },
    {
      name: 'Errores visuales básicos',
      icon: <AlertCircle className='w-6 h-6' />,
    },
    { name: 'Velocidad percibida', icon: <Zap className='w-6 h-6' /> },
  ];

  const deliverables = [
    {
      title: 'Vídeo navegando por tu tienda como usuario real',
      icon: <Play className='w-6 h-6' />,
    },
    {
      title: 'Comentarios en voz alta durante la revisión',
      icon: <MessageCircle className='w-6 h-6' />,
    },
    {
      title: 'Lista de problemas detectados',
      icon: <ListChecks className='w-6 h-6' />,
    },
    {
      title: 'Mejoras priorizadas por impacto',
      icon: <ArrowUpCircle className='w-6 h-6' />,
    },
    {
      title: 'Recomendaciones prácticas para aumentar claridad y confianza',
      icon: <FileCheck className='w-6 h-6' />,
    },
    {
      title:
        'Opción de presupuestar la implementación en WooCommerce, Shopify o PrestaShop',
      icon: <Settings className='w-6 h-6' />,
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Nos envías la URL de tu tienda',
      description:
        'Completa el formulario con la dirección de tu ecommerce y cuéntanos brevemente qué te preocupa.',
    },
    {
      number: '2',
      title: 'Revisamos el ecommerce como cliente real',
      description:
        'Navegamos por tu tienda desde la perspectiva de un usuario que quiere comprar, detectando problemas de claridad, confianza y usabilidad.',
    },
    {
      number: '3',
      title: 'Te entregamos el vídeo y las mejoras detectadas',
      description:
        'Recibirás el vídeo completo con nuestros comentarios más una lista priorizada de mejoras.',
    },
    {
      number: '4',
      title: 'Si quieres, presupuestamos la implementación',
      description:
        'Si tu tienda está en WooCommerce, Shopify o PrestaShop y decides aplicar las mejoras, podemos ayudarte con la implementación técnica.',
    },
  ];

  const forYouList = [
    'Tienes una tienda online y no sabes por qué no vende más',
    'Estás invirtiendo o quieres invertir en Google Ads o Meta Ads',
    'Recibes visitas pero pocas compras',
    'Tienes una tienda WooCommerce, Shopify, PrestaShop o similar',
    'Quieres una opinión externa antes de seguir gastando en publicidad',
    'Necesitas mejoras concretas, no un informe lleno de teoría',
    'Quieres mejorar confianza, claridad y experiencia de compra',
  ];

  const notForYouList = [
    'Buscas una garantía de ventas inmediatas',
    'Quieres una auditoría avanzada con analítica, mapas de calor y test A/B',
    'No tienes todavía una tienda publicada',
    'Solo quieres tráfico, pero no estás dispuesto a mejorar la web',
  ];

  const faqs = [
    {
      question: '¿La auditoría garantiza más ventas?',
      answer:
        'No. Ninguna auditoría seria puede garantizar ventas. Lo que sí hacemos es detectar problemas de claridad, confianza, navegación y compra que pueden estar generando fricción.',
    },
    {
      question: '¿Necesitas acceso a mi tienda?',
      answer:
        'No para la auditoría inicial. Solo necesitamos la URL pública. Si después quieres que implementemos mejoras, veremos qué accesos hacen falta.',
    },
    {
      question: '¿Sirve para WooCommerce, Shopify y PrestaShop?',
      answer:
        'Sí. De hecho, si tu tienda está en WooCommerce, Shopify o PrestaShop podemos ayudarte también con la implementación de mejoras.',
    },
    {
      question: '¿Sirve para Shopify?',
      answer:
        'Sí, podemos auditar y ayudar con la implementación en Shopify. El alcance técnico dependerá de la configuración de tu tienda.',
    },
    {
      question: '¿Cuándo debería contratar esta auditoría?',
      answer:
        'Especialmente antes de invertir más en publicidad, cuando recibes visitas pero pocas ventas, o cuando tienes dudas sobre si tu tienda transmite suficiente confianza.',
    },
    {
      question: '¿Qué diferencia hay con una auditoría CRO avanzada?',
      answer:
        'Esta auditoría está pensada para tiendas pequeñas o medianas que quieren una revisión práctica y accesible. No incluye experimentos A/B, analítica avanzada ni investigación cuantitativa profunda.',
    },
  ];

  const whyMeReasons = [
    {
      icon: BarChart3,
      title: 'Experiencia en Ecommerce',
      description:
        'Hemos trabajado con múltiples tiendas online, conocemos los errores más comunes y sabemos identificar qué puede estar frenando las conversiones.',
    },
    {
      icon: Eye,
      title: 'Visión de Usuario Real',
      description:
        'Navegamos tu tienda como lo haría un cliente potencial, detectando puntos de fricción que muchas veces pasan desapercibidos para quien la gestiona.',
    },
    {
      icon: CheckCircle2,
      title: 'Recomendaciones Accionables',
      description:
        'No recibirás un informe lleno de teoría genérica. Te entregamos mejoras concretas priorizadas por impacto y viabilidad.',
    },
    {
      icon: Settings,
      title: 'Implementación Disponible',
      description:
        'Si tu tienda está en WooCommerce, Shopify o PrestaShop, podemos ayudarte también a aplicar las mejoras técnicas necesarias.',
    },
  ];

  return (
    <div>
      <SEOLandingHero
        title='Auditoría ecommerce antes de invertir en publicidad'
        subtitle='Revisamos tu tienda como cliente real y detectamos qué frena las ventas.'
        description='Ideal para tiendas que reciben visitas pero no consiguen suficientes conversiones.'
        ctaText='Solicitar auditoría'
        onCTAClick={openModal}
        secondaryCTAText='Ver planes'
        secondaryCTAIcon='chevron-down'
        secondaryCTAAction={() => {
          const element = document.getElementById('planes');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      <SEOProblem
        title='Quizá el problema no está en tus anuncios, sino en tu tienda'
        subtitle='Muchas tiendas invierten en Google Ads, Meta Ads o redes sociales sin revisar antes si su ecommerce está preparado para convertir. Si el usuario llega a una página confusa, lenta, poco clara o que no genera confianza, es muy probable que abandone antes de comprar.'
        problems={problems}
      />

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Te ayudamos a detectar los puntos de fuga de tu tienda
            </h2>
            <p className='text-xl text-gray-600 max-w-4xl mx-auto'>
              Analizamos tu ecommerce desde el punto de vista de un cliente
              real, combinando mirada de usuario, diseño, usabilidad y
              experiencia en ecommerce. El objetivo es encontrar mejoras
              concretas que puedan reducir fricción y aumentar confianza antes
              de seguir invirtiendo en tráfico.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {solutionBlocks.map((block, index) => (
              <div
                key={index}
                className='bg-gray-50 rounded-xl p-8 border-2 border-ink-dark shadow-[5px_5px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200'
              >
                <div className='bg-accent/10 w-16 h-16 rounded-xl border-2 border-ink-dark flex items-center justify-center mb-6 text-accent'>
                  {block.icon}
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  {block.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Qué revisamos en la auditoría
            </h2>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
            {reviewAreas.map((area, index) => (
              <div
                key={index}
                className='bg-white rounded-xl p-6 text-center border-2 border-ink-dark shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
              >
                <div className='text-accent mb-4 flex justify-center'>
                  {area.icon}
                </div>
                <p className='text-gray-800 font-medium'>{area.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Qué recibirás
            </h2>
            <p className='text-xl text-gray-600 max-w-4xl mx-auto'>
              Una auditoría clara, visual y fácil de entender para saber qué
              mejorar y por dónde empezar.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {deliverables.map((item, index) => (
              <div
                key={index}
                className='flex items-start gap-4 bg-gray-50 rounded-xl p-6 border-2 border-ink-dark shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
              >
                <div className='text-accent flex-shrink-0'>{item.icon}</div>
                <p className='text-gray-800 font-medium leading-relaxed'>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              ¿Es esta auditoría para ti?
            </h2>
          </div>

          <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
            <div className='bg-gray-50 rounded-xl p-8 border-2 border-ink-dark shadow-[5px_5px_0_0_#1a1a1a]'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>
                Es para ti si...
              </h3>
              <ul className='space-y-3'>
                {forYouList.map((item, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <CheckCircle2 className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='bg-gray-50 rounded-xl p-8 border-2 border-ink-dark shadow-[5px_5px_0_0_#1a1a1a]'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>
                No es para ti si...
              </h3>
              <ul className='space-y-3'>
                {notForYouList.map((item, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <X className='w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div id='planes'>
        <AuditoriaPlans />
      </div>

      <SEOProcess title='Cómo funciona' steps={processSteps} />

      <Testimonials />

      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Casos de éxito
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Tiendas online que han optimizado su experiencia de compra y
              aumentado sus conversiones
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
            <div className='bg-white rounded-xl overflow-hidden border-2 border-ink-dark shadow-[6px_6px_0_0_#1a1a1a]'>
              <div className='relative h-64 md:h-80 overflow-hidden'>
                <img
                  src='/img/portfolio/mock-chicxs.png'
                  alt='Chicxs de la Calle'
                  className='w-full h-full object-cover'
                />
                <div className='absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-lg border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] rotate-[-2deg]'>
                  <div className='flex items-center gap-2'>
                    <TrendingUp className='w-5 h-5' />
                    <div>
                      <p className='text-2xl font-bold'>+45%</p>
                      <p className='text-xs'>conversión</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-8'>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
                  Chicxs de la Calle
                </h3>
                <p className='text-gray-600 mb-4'>
                  Empresa de venta de merchandising de bandas que escaló desde
                  redes sociales a una tienda online que procesa cientos de
                  pedidos mensuales.
                </p>
                <ul className='space-y-2 mb-6'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700 text-sm'>
                      Sistema de lanzamientos con cuenta regresiva y pre-orders
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700 text-sm'>
                      Checkout optimizado para mobile (80% del tráfico)
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700 text-sm'>
                      Mejora del flujo de compra, menos clics
                    </span>
                  </li>
                </ul>
                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium'>
                    WooCommerce
                  </span>
                  <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium'>
                    WordPress
                  </span>
                  <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium'>
                    Tienda Online
                  </span>
                </div>
                <a
                  href='https://chicxsdelacalle.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors duration-200'
                >
                  Ver tienda
                  <ArrowUpCircle className='w-5 h-5 rotate-45' />
                </a>
              </div>
            </div>

            <div className='bg-white rounded-xl overflow-hidden border-2 border-ink-dark shadow-[6px_6px_0_0_#1a1a1a]'>
              <div className='relative h-64 md:h-80 overflow-hidden'>
                <img
                  src='/img/portfolio/mock-delish.png'
                  alt='Delish Vegan'
                  className='w-full h-full object-cover'
                />
                <div className='absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-lg border-2 border-ink-dark shadow-[3px_3px_0_0_#1a1a1a] rotate-[-2deg]'>
                  <div className='flex items-center gap-2'>
                    <TrendingUp className='w-5 h-5' />
                    <div>
                      <p className='text-2xl font-bold'>+200%</p>
                      <p className='text-xs'>ventas (x3)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-8'>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
                  Delish Vegan
                </h3>
                <p className='text-gray-600 mb-4'>
                  Tienda online de donuts veganos de un restaurante en Madrid
                  que sirve a nivel local y nacional con envíos a toda España.
                </p>
                <ul className='space-y-2 mb-6'>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700 text-sm'>
                      Sistema de pedidos con gestión de zonas de envío
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700 text-sm'>
                      Filtrado avanzado por necesidades dietéticas
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <CheckCircle2 className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700 text-sm'>
                      Blog optimizado para SEO con tráfico orgánico constante
                    </span>
                  </li>
                </ul>
                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium'>
                    WooCommerce
                  </span>
                  <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium'>
                    WordPress
                  </span>
                  <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs font-medium'>
                    E-commerce
                  </span>
                </div>
                <a
                  href='https://delishvegann.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors duration-200'
                >
                  Ver tienda
                  <ArrowUpCircle className='w-5 h-5 rotate-45' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SEOWhyMe
        title='¿Por qué elegir nuestra auditoría ecommerce?'
        reasons={whyMeReasons}
      />

      <SEOFAQ title='Preguntas Frecuentes sobre la Auditoría' faqs={faqs} />

      <SEOCTAFinal
        title='Antes de invertir más en anuncios, revisa si tu tienda está preparada para vender'
        subtitle='Te ayudamos a detectar los puntos que pueden estar generando dudas, abandono o falta de confianza en tu ecommerce.'
        buttonText='Solicitar auditoría ecommerce'
        onButtonClick={openModal}
      />

      <ContactForm preselectedPlan='Auditoría Ecommerce' />
    </div>
  );
};

export default AuditoriaEcommerce;
