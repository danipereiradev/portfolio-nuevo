import { useEffect } from 'react';
import {
  ShoppingBag,
  Package,
  Rocket,
  TrendingUp,
  Check,
  MessageCircle,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useSectionView } from '../hooks/useSectionView';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackPricingCtaClick,
  trackViewPricing,
} from '../utils/analytics';
import {
  ECOMMERCE_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import SEOLandingHero from '../components/SEOLandingHero';
import TrustBar from '../components/TrustBar';
import SEOBenefits from '../components/SEOBenefits';
import SEOFeatures from '../components/SEOFeatures';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Button from '../components/Button';
import { defaultServiceProcess } from '../data/serviceProcess';

const WHATSAPP_URL = buildWhatsAppUrl(ECOMMERCE_WHATSAPP_MESSAGE);

const TiendasOnline = () => {
  const { openModal } = useContactModal();

  usePageMeta('/tiendas-online');

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Permite llegar directamente a una sección vía ancla en la URL
  // (ej. /tiendas-online#precios desde un sitelink de Google Ads).
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const timeoutId = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const pricingSectionRef = useSectionView<HTMLElement>(trackViewPricing);

  const handleWhatsApp = (location: string) => {
    trackWhatsAppClick(location);
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  const handleQuoteRequest = () => {
    trackPricingCtaClick('Tienda online', 'Solicitar propuesta');
    openModal('Tienda Online');
  };

  const targetAudience = [
    {
      icon: ShoppingBag,
      title: 'Negocios con Producto Físico',
      description:
        'Vendes productos y necesitas un catálogo claro con un proceso de compra sencillo para tus clientes.',
    },
    {
      icon: Package,
      title: 'Catálogos Amplios',
      description:
        'Tienes muchas referencias, variantes de talla o color, y necesitas una estructura que lo organice todo con claridad.',
    },
    {
      icon: Rocket,
      title: 'Nuevos en Venta Online',
      description:
        'Empiezas a vender por internet y quieres una tienda seria desde el primer día, sin improvisar.',
    },
    {
      icon: TrendingUp,
      title: 'Tiendas que Ya Venden',
      description:
        'Ya tienes una tienda online y quieres mejorarla, rediseñarla o migrarla a una plataforma más sólida.',
    },
  ];

  const included = [
    'Hasta 50 productos cargados',
    'Pasarela de pago (Stripe/Redsys)',
    'Gestión de pedidos e inventario',
    'Sistema de envíos y zonas',
    'Carrito con cupones descuento',
    'Diseño responsive profesional',
    'Panel administración español',
    'Optimización SEO e-commerce',
    'Integración redes sociales',
    'Formación completa incluida',
    'Hasta 2 revisiones incluidas',
  ];

  const features = [
    {
      title: 'Diseño de Tienda Adaptado a tu Marca',
      description:
        'Tu catálogo refleja la identidad de tu negocio, con una navegación clara y cuidada.',
    },
    {
      title: 'Fichas de Producto Completas',
      description:
        'Imágenes, variantes, precios y descripciones claras para que el cliente decida con confianza.',
    },
    {
      title: 'Carrito y Checkout Optimizado',
      description:
        'Un proceso de compra sencillo, pensado para reducir abandonos en el pago.',
    },
    {
      title: 'Pasarela de Pago Segura',
      description:
        'Cobra con tarjeta, Bizum u otros métodos a través de Stripe, Redsys u otras pasarelas.',
    },
    {
      title: 'Gestión de Pedidos e Inventario',
      description:
        'Controla stock, pedidos y envíos desde un panel de administración en español.',
    },
    {
      title: 'Diseño Responsive',
      description:
        'Tu tienda se ve y funciona perfectamente en móvil, donde compran la mayoría de tus clientes.',
    },
    {
      title: 'Base SEO para Categorías y Productos',
      description:
        'Estructura preparada para que Google entienda y posicione tu catálogo desde el inicio.',
    },
    {
      title: 'Formación de Uso y Gestión',
      description:
        'Te enseñamos a gestionar productos, pedidos y contenidos sin depender de nosotros.',
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tarda una tienda online?',
      answer:
        'Normalmente entre 4 y 6 semanas, dependiendo del catálogo, las funcionalidades y las pasarelas de pago necesarias.',
    },
    {
      question: '¿Podemos pagar en varias cuotas?',
      answer:
        'Sí. Ofrecemos opciones de pago flexible: pago único o pago fraccionado, según lo que mejor se adapte a tu proyecto. Lo concretamos en la propuesta.',
    },
    {
      question: '¿El presupuesto incluye IVA?',
      answer:
        'Sí, la propuesta que preparamos incluye IVA salvo que se indique lo contrario. La propuesta final se cierra antes de empezar el proyecto.',
    },
    {
      question: '¿Cuántos productos puedo cargar?',
      answer:
        'La propuesta base incluye hasta 50 productos. Si tu catálogo es mayor, lo ajustamos en la propuesta según tu caso.',
    },
    {
      question: '¿Qué pasarela de pago usáis?',
      answer:
        'Normalmente Stripe o Redsys, aunque valoramos otras opciones según tu negocio, tu banco y tus clientes.',
    },
    {
      question: '¿Trabajáis solo en Madrid?',
      answer:
        'PereiraWeb tiene base en Torrejón de Ardoz, Madrid, pero trabajamos con clientes de toda España de forma online.',
    },
    {
      question: '¿Incluís mantenimiento?',
      answer:
        'El mantenimiento se puede contratar aparte con un plan mensual, o incluirse dentro de la propuesta. Te pasamos el detalle con tu presupuesto.',
    },
  ];

  return (
    <>
      {/* 1. Hero de posicionamiento, sin precio como primer impacto */}
      <SEOLandingHero
        title='Tienda online'
        subtitle='Una tienda online clara, cuidada y preparada para vender productos o servicios sin complicar la experiencia de compra.'
        description='Creamos tiendas online y catálogos digitales pensados para que el cliente pueda navegar, entender el producto y comprar con facilidad.'
        trustLine='Presupuesto cerrado antes de empezar · Proyectos en toda España · Base en Torrejón de Ardoz, Madrid'
        ctaText='Solicitar propuesta'
        onCTAClick={() => handleWhatsApp('LandingTiendaHero')}
        secondaryCTAText='Ver trabajos'
        secondaryCTAAction={() => scrollToSection('portfolio')}
        secondaryCTAIcon='chevron-down'
      />

      {/* 2. Bloque de confianza rápida */}
      <TrustBar />

      {/* 3. Para quién es este servicio */}
      <SEOBenefits
        title='¿Es Esta Tienda Online para tu Negocio?'
        benefits={targetAudience}
      />

      {/* 4. Precio y formas de pago */}
      <section
        id='precios'
        ref={pricingSectionRef}
        className='scroll-mt-24 py-20 bg-gray-50'
      >
        <div className='content-container'>
          <div className='text-center mb-12 max-w-2xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Presupuesto claro antes de empezar
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Cada tienda tiene necesidades distintas. Por eso preparamos una
              propuesta personalizada según el catálogo, las funcionalidades y
              los objetivos de tu negocio.
            </p>
          </div>

          <div className='max-w-3xl mx-auto bg-white rounded-xl p-8 md:p-10 border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] relative'>
            <span className='absolute -top-4 left-8 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
              Tienda Online
            </span>

            <p className='text-xs font-semibold text-accent uppercase tracking-wide mb-3 mt-4 text-center'>
              Ideal para: Negocios que quieren vender online y emprendedores
            </p>

            <div className='flex flex-col items-center gap-1 mb-6 text-center'>
              <span className='text-2xl md:text-3xl font-bold text-gray-900'>
                Presupuesto a medida
              </span>
              <span className='text-sm text-gray-500'>
                Cerrado antes de empezar, sin sorpresas.
              </span>
              <span className='text-sm text-gray-500 mt-1'>
                Pago único, fraccionado o mensual según el proyecto.
              </span>
              <span className='text-sm text-gray-500'>
                Entrega: 4-6 semanas
              </span>
            </div>

            <ul className='space-y-3 mb-8'>
              {included.map((item, index) => (
                <li key={index} className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <span className='text-gray-700 text-sm'>{item}</span>
                </li>
              ))}
            </ul>

            <div className='border-t-2 border-gray-100 pt-6'>
              <Button onClick={handleQuoteRequest} variant='primary' fullWidth>
                Solicitar propuesta
              </Button>

              <p className='text-center text-xs text-gray-400 mt-4'>
                Presupuesto orientativo, IVA incluido. La propuesta final se
                cierra antes de empezar, según el alcance real del proyecto.
              </p>
            </div>

            <div className='mt-6 text-center'>
              <button
                onClick={() => handleWhatsApp('LandingTiendaPrecio')}
                className='inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline'
              >
                <MessageCircle className='w-4 h-4' />O escríbenos directo por
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Qué incluye la tienda online */}
      <div id='incluye' className='scroll-mt-24'>
        <SEOFeatures
          title='Qué Incluye tu Tienda Online'
          subtitle='Todo lo necesario para vender online de forma profesional'
          features={features}
        />
      </div>

      {/* 5.1 También podemos ayudarte con (sección secundaria, no compite con el foco principal) */}
      <section className='py-16 bg-white border-t-2 border-gray-100'>
        <div className='content-container'>
          <h3 className='text-xl md:text-2xl font-bold text-gray-900 text-center mb-8'>
            También podemos ayudarte con
          </h3>
          <div className='grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto'>
            <a
              href='/web-autonomos-pymes'
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Web a Medida
            </a>
            <a
              href='/mantenimiento-web'
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Mantenimiento web
            </a>
            <button
              type='button'
              onClick={() => openModal('Tienda Online')}
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Mejoras o rediseños
            </button>
          </div>
        </div>
      </section>

      {/* 6. Portfolio o trabajos reales */}
      <div id='portfolio' className='scroll-mt-24'>
        <Portfolio />
      </div>

      {/* 6.1 Valoraciones de clientes */}
      <Testimonials id='valoraciones' />

      {/* 7. Proceso de trabajo */}
      <SEOProcess
        title='Un proceso claro desde el primer mensaje'
        steps={defaultServiceProcess}
      />

      {/* 8. Preguntas frecuentes */}
      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ title='Preguntas Frecuentes sobre Tiendas Online' faqs={faqs} />
      </div>

      {/* 9. Formulario / contacto final */}
      <SEOCTAFinal
        title='¿Hablamos de tu tienda online?'
        subtitle='Cuéntanos tu catálogo y objetivos. Te preparamos una propuesta cerrada, con alcance y plazos claros, antes de empezar.'
        buttonText='Solicitar propuesta'
        onButtonClick={handleQuoteRequest}
      />

      <div id='contacto' className='scroll-mt-24'>
        <ContactForm preselectedPlan='Tienda Online' />
      </div>
    </>
  );
};

export default TiendasOnline;
