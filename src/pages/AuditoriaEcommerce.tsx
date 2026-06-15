import { useEffect } from 'react';
import {
  ShoppingCart,
  TrendingDown,
  Smartphone,
  AlertCircle,
  CreditCard,
  Users,
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
  Send,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import SEOLandingHero from '../components/SEOLandingHero';
import SEOProblem from '../components/SEOProblem';
import SEOFeatures from '../components/SEOFeatures';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import AuditoriaPlans from '../components/AuditoriaPlans';

const AuditoriaEcommerce = () => {
  const { openModal } = useContactModal();

  useEffect(() => {
    document.title =
      'Auditoría ecommerce antes de invertir en publicidad | Dani Pereira';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Revisión de tiendas online para detectar problemas de confianza, móvil, producto, carrito y checkout antes de invertir más en Google Ads o Meta Ads.',
      );
    }
  }, []);

  const callPhone = () => {
    window.location.href = 'tel:+34644669828';
  };

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
        'Navego por tu tienda y detecto problemas visibles, dudas, bloqueos y errores de experiencia.',
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
        'Si tu tienda está en WordPress/WooCommerce, también puedo ayudarte a aplicar las mejoras.',
      icon: <Wrench className='w-8 h-8' />,
    },
  ];

  const reviewAreas = [
    { name: 'Primera impresión de la home', icon: <Home className='w-6 h-6' /> },
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
      title: 'Opción de presupuestar la implementación en WordPress/WooCommerce',
      icon: <Settings className='w-6 h-6' />,
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Me envías la URL de tu tienda',
      description:
        'Completa el formulario con la dirección de tu ecommerce y cuéntame brevemente qué te preocupa.',
    },
    {
      number: '2',
      title: 'Reviso el ecommerce como cliente real',
      description:
        'Navego por tu tienda desde la perspectiva de un usuario que quiere comprar, detectando problemas de claridad, confianza y usabilidad.',
    },
    {
      number: '3',
      title: 'Te entrego el vídeo y las mejoras detectadas',
      description:
        'Recibirás el vídeo completo con mis comentarios más una lista priorizada de mejoras.',
    },
    {
      number: '4',
      title: 'Si quieres, presupuestamos la implementación',
      description:
        'Si tu tienda está en WordPress/WooCommerce y decides aplicar las mejoras, puedo ayudarte con la implementación técnica.',
    },
  ];

  const forYouList = [
    'Tienes una tienda online y no sabes por qué no vende más',
    'Estás invirtiendo o quieres invertir en Google Ads o Meta Ads',
    'Recibes visitas pero pocas compras',
    'Tienes una tienda WooCommerce, Shopify o similar',
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
        'No. Ninguna auditoría seria puede garantizar ventas. Lo que sí hago es detectar problemas de claridad, confianza, navegación y compra que pueden estar generando fricción.',
    },
    {
      question: '¿Necesitas acceso a mi tienda?',
      answer:
        'No para la auditoría inicial. Solo necesito la URL pública. Si después quieres que implemente mejoras, veremos qué accesos hacen falta.',
    },
    {
      question: '¿Sirve para WooCommerce?',
      answer:
        'Sí. De hecho, si tu tienda está en WordPress/WooCommerce puedo ayudarte también con la implementación de mejoras.',
    },
    {
      question: '¿Sirve para Shopify?',
      answer:
        'Sí, puedo auditar tiendas Shopify, aunque la implementación técnica dependerá del alcance y de la configuración de la tienda.',
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

  return (
    <div>
      <SEOLandingHero
        title='Auditoría ecommerce antes de invertir más en publicidad'
        subtitle='Reviso tu tienda online como si fuera un cliente real y te entrego un vídeo con los puntos que pueden estar frenando compras: móvil, confianza, ficha de producto, carrito y checkout.'
        ctaPrimary='Solicitar auditoría'
        ctaSecondary='Ver planes'
        ctaPrimaryAction={openModal}
        ctaSecondaryAction={() => {
          const element = document.getElementById('planes');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        supportText='Ideal para tiendas WooCommerce, Shopify y ecommerce pequeños que reciben visitas pero no consiguen suficientes ventas.'
      />

      <SEOProblem
        title='Quizá el problema no está en tus anuncios, sino en tu tienda'
        description='Muchas tiendas invierten en Google Ads, Meta Ads o redes sociales sin revisar antes si su ecommerce está preparado para convertir. Si el usuario llega a una página confusa, lenta, poco clara o que no genera confianza, es muy probable que abandone antes de comprar.'
        problems={problems}
      />

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
              Te ayudo a detectar los puntos de fuga de tu tienda
            </h2>
            <p className='text-xl text-gray-600 max-w-4xl mx-auto'>
              Analizo tu ecommerce desde el punto de vista de un cliente real,
              combinando mirada de usuario, diseño, usabilidad y experiencia en
              WordPress/WooCommerce. El objetivo es encontrar mejoras concretas
              que puedan reducir fricción y aumentar confianza antes de seguir
              invirtiendo en tráfico.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {solutionBlocks.map((block, index) => (
              <div
                key={index}
                className='bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300'
              >
                <div className='bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-accent'>
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
              Qué reviso en la auditoría
            </h2>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
            {reviewAreas.map((area, index) => (
              <div
                key={index}
                className='bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300'
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
                className='flex items-start gap-4 bg-gray-50 rounded-xl p-6'
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

      <div id='planes'>
        <AuditoriaPlans />
      </div>

      <SEOProcess
        title='Cómo funciona'
        steps={processSteps}
      />

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-12'>
            <div className='bg-green-50 rounded-2xl p-8 md:p-12'>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8'>
                Este servicio es para ti si…
              </h2>
              <ul className='space-y-4'>
                {forYouList.map((item, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <CheckCircle2 className='w-6 h-6 text-green-600 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-800'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='bg-red-50 rounded-2xl p-8 md:p-12'>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8'>
                Este servicio no es para ti si…
              </h2>
              <ul className='space-y-4'>
                {notForYouList.map((item, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <AlertCircle className='w-6 h-6 text-red-600 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-800'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SEOFAQ faqs={faqs} />

      <SEOCTAFinal
        title='Antes de invertir más en anuncios, revisa si tu tienda está preparada para vender'
        description='Te ayudo a detectar los puntos que pueden estar generando dudas, abandono o falta de confianza en tu ecommerce.'
        buttonText='Solicitar auditoría ecommerce'
        buttonAction={openModal}
      />
    </div>
  );
};

export default AuditoriaEcommerce;
