import {
  ShoppingCart,
  CreditCard,
  TrendingUp,
  Lock,
  Package,
  BarChart,
  Clock,
  Target,
  Award,
  Headphones,
  Zap,
  Shield,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { trackPhoneClick } from '../utils/analytics';
import { PHONE_TEL_LINK } from '../config/contact';
import SEOLandingHero from '../components/SEOLandingHero';
import SEOProblem from '../components/SEOProblem';
import SEOBenefits from '../components/SEOBenefits';
import SEOFeatures from '../components/SEOFeatures';
import SEOProcess from '../components/SEOProcess';
import SEOWhyMe from '../components/SEOWhyMe';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import Portfolio from '../components/Portfolio';

const TiendasOnline = () => {
  const { openModal } = useContactModal();

  usePageMeta('/tiendas-online');

  const callPhone = () => {
    trackPhoneClick('TiendasOnlineHero');
    window.location.href = PHONE_TEL_LINK;
  };

  const problems = [
    {
      text: 'Quieres vender online pero no sabes cómo empezar ni qué necesitas',
    },
    { text: 'Tu tienda actual tiene pocas ventas o conversiones muy bajas' },
    {
      text: 'El proceso de compra es complicado y los clientes abandonan el carrito',
    },
    {
      text: 'No tienes tiempo para gestionar la parte técnica de una tienda online',
    },
    { text: 'Te preocupa la seguridad de los pagos y la protección de datos' },
    {
      text: 'Necesitas una tienda profesional pero tu presupuesto es limitado',
    },
  ];

  const benefits = [
    {
      icon: ShoppingCart,
      title: 'Tienda Completa y Funcional',
      description:
        'Desarrollo completo de tu tienda online con carrito de compra, gestión de productos, categorías, y todas las funcionalidades necesarias para vender online.',
    },
    {
      icon: CreditCard,
      title: 'Pasarelas de Pago Integradas',
      description:
        'Integración con Stripe, Redsys, PayPal y otras pasarelas de pago seguras que tus clientes ya conocen y confían.',
    },
    {
      icon: TrendingUp,
      title: 'Optimizada para Conversión',
      description:
        'Diseño cada elemento de tu tienda pensando en maximizar las ventas, con checkout simplificado y proceso de compra optimizado.',
    },
    {
      icon: Lock,
      title: 'Seguridad Garantizada',
      description:
        'Tu tienda online contará con certificado SSL, protección de datos de clientes y cumplimiento total del RGPD europeo.',
    },
    {
      icon: Package,
      title: 'Gestión de Envíos',
      description:
        'Configuración de zonas de envío, tarifas personalizadas e integración con transportistas para automatizar tu logística.',
    },
    {
      icon: BarChart,
      title: 'Panel de Control Completo',
      description:
        'Dashboard intuitivo para gestionar productos, pedidos, clientes, stock e informes de ventas desde un solo lugar.',
    },
  ];

  const features = [
    {
      title: 'Hasta 50 Productos Cargados',
      description:
        'Cargo tu catálogo inicial completo con descripciones, imágenes optimizadas, precios y variantes.',
    },
    {
      title: 'Pasarela de Pago Integrada',
      description:
        'Configuro Stripe, Redsys, PayPal o la pasarela que prefieras para cobros seguros online.',
    },
    {
      title: 'Gestión de Stock Automática',
      description:
        'Sistema que actualiza automáticamente el inventario con cada venta para evitar sobreventa.',
    },
    {
      title: 'Sistema de Cupones y Descuentos',
      description:
        'Crea promociones, códigos de descuento y ofertas especiales para impulsar las ventas.',
    },
    {
      title: 'Carrito de Compra Optimizado',
      description:
        'Checkout simplificado y rápido que reduce abandonos y aumenta las conversiones.',
    },
    {
      title: 'Emails Transaccionales',
      description:
        'Confirmaciones de pedido, actualizaciones de envío y notificaciones automáticas profesionales.',
    },
    {
      title: 'Zona de Envíos Configurable',
      description:
        'Define zonas geográficas, tarifas por peso, valor o destino y métodos de entrega.',
    },
    {
      title: 'SEO para E-commerce',
      description:
        'Optimización específica para tiendas online: fichas de producto, categorías y estructura SEO.',
    },
  ];

  const whyMeReasons = [
    {
      icon: Clock,
      title: '+12 Años en E-commerce',
      description:
        'Experiencia creando tiendas online exitosas para diferentes sectores y modelos de negocio.',
    },
    {
      icon: Target,
      title: 'Enfoque en Conversión',
      description:
        'Diseño cada elemento de la tienda pensando en maximizar ventas y reducir abandonos de carrito.',
    },
    {
      icon: Award,
      title: 'Formación Completa',
      description:
        'Te enseño a gestionar productos, procesar pedidos y usar todas las funcionalidades de tu tienda.',
    },
    {
      icon: Headphones,
      title: 'Soporte Post-Venta',
      description:
        'No te dejo solo después del lanzamiento. Estoy aquí para resolver dudas y ayudarte a crecer.',
    },
    {
      icon: Zap,
      title: 'Optimización Continua',
      description:
        'Analizo métricas y te ayudo a mejorar continuamente las conversiones de tu tienda.',
    },
    {
      icon: Shield,
      title: 'Seguridad y Cumplimiento',
      description:
        'Tu tienda cumple con RGPD, tiene SSL, backups y todas las medidas de seguridad necesarias.',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Análisis de tu Negocio',
      description:
        'Estudio tu catálogo de productos, modelo de negocio, competencia y objetivos para diseñar la tienda online perfecta para tu caso.',
    },
    {
      number: '2',
      title: 'Diseño de la Tienda',
      description:
        'Creo el diseño visual de tu e-commerce, optimizando la experiencia de compra y asegurando que tus productos destaquen.',
    },
    {
      number: '3',
      title: 'Desarrollo E-commerce',
      description:
        'Desarrollo tu tienda con WooCommerce o Shopify, configurando pasarelas de pago, envíos, impuestos y todas las funcionalidades necesarias.',
    },
    {
      number: '4',
      title: 'Carga de Productos',
      description:
        'Cargo tu catálogo de productos con descripciones, imágenes optimizadas, precios, variantes y stock para que puedas empezar a vender.',
    },
    {
      number: '5',
      title: 'Lanzamiento y Formación',
      description:
        'Lanzo tu tienda online, te formo en la gestión de pedidos, productos y te acompaño en tus primeras ventas.',
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto cuesta crear una tienda online?',
      answer:
        'Una tienda online profesional desde 1.799€ IVA incluido en pago único, con diseño personalizado, hasta 50 productos cargados, pasarela de pago, sistema de envíos y formación completa. También puedes optar por un pago dividido (50% al empezar y 50% al publicar) o un plan mensual desde 249€/mes durante 12 meses que incluye soporte y mantenimiento básico. El precio varía según funcionalidades específicas que necesites.',
    },
    {
      question: '¿Qué plataforma recomiendan para crear una tienda online?',
      answer:
        'Recomiendo WooCommerce para tiendas con WordPress o Shopify para soluciones más sencillas. Ambas son potentes, seguras y permiten gestionar tu tienda fácilmente. Elijo la mejor opción según tus necesidades y preferencias.',
    },
    {
      question: '¿Incluye la integración de pasarelas de pago?',
      answer:
        'Sí, configuro e integro las pasarelas de pago que prefieras: Redsys, Stripe, PayPal, Bizum u otras. Tus clientes podrán pagar de forma segura con tarjeta, transferencia o el método que elijas.',
    },
    {
      question: '¿Podré gestionar yo mismo los productos y pedidos?',
      answer:
        'Por supuesto. Tu tienda incluye un panel de administración intuitivo donde podrás añadir productos, gestionar stock, procesar pedidos y hacer seguimiento de ventas. Te doy formación completa para que seas autónomo.',
    },
    {
      question: '¿Cómo funciona el sistema de envíos?',
      answer:
        'Configuro zonas de envío con tarifas personalizadas según peso, destino o precio del pedido. Puedo integrar con transportistas como Correos, SEUR o MRW para automatizar el proceso de envío.',
    },
    {
      question: '¿Qué pasa si necesito añadir más funcionalidades después?',
      answer:
        'Tu tienda está preparada para crecer. Puedo añadir funcionalidades como cupones descuento, programa de puntos, suscripciones, venta mayorista, multi-idioma o cualquier característica adicional que necesites.',
    },
  ];

  return (
    <>
      <SEOLandingHero
        title='Crear Tienda Online Profesional'
        subtitle='Vende Online con una Tienda que Convierte'
        description='Desarrollo tu tienda online completa con todo lo necesario para vender con éxito: diseño atractivo, pasarelas de pago y gestión sencilla.'
        ctaText='Quiero mi tienda online'
        onCTAClick={openModal}
        secondaryCTAText='Llamar Ahora'
        secondaryCTAAction={callPhone}
      />

      <SEOProblem
        title='¿Quieres Vender Online Pero No Sabes Cómo Empezar?'
        subtitle='Estos son los retos más comunes al crear una tienda online'
        problems={problems}
      />

      <SEOBenefits title='¿Qué Incluye tu Tienda Online?' benefits={benefits} />

      <SEOFeatures
        title='Todo lo que Necesitas para Vender Online'
        subtitle='Funcionalidades completas para gestionar tu negocio digital'
        features={features}
      />

      <Portfolio />

      <SEOProcess
        title='Proceso de Creación de tu Tienda Online'
        steps={process}
      />

      <Testimonials />

      <SEOWhyMe
        title='Por Qué Crear tu Tienda Online Conmigo'
        subtitle='Experiencia y resultados en e-commerce'
        reasons={whyMeReasons}
      />

      <SEOFAQ title='Preguntas Frecuentes sobre Tiendas Online' faqs={faqs} />

      <SEOCTAFinal
        title='¿Listo para Empezar a Vender Online?'
        subtitle='No esperes más para lanzar tu tienda online. Solicita tu presupuesto personalizado y comienza a vender en internet con éxito.'
        buttonText='Recibir propuesta en 24h'
        onButtonClick={openModal}
      />

      <ContactForm preselectedPlan='Tienda Online' />
    </>
  );
};

export default TiendasOnline;
