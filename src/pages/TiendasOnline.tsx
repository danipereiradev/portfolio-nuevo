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
import SEOProblem from '../components/SEOProblem';
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

  const problems = [
    {
      text: 'Quieres vender online pero las plataformas genéricas no encajan con tu catálogo ni con tu forma de trabajar.',
    },
    {
      text: 'Has probado plantillas de tienda lentas, difíciles de gestionar o poco profesionales para tus clientes.',
    },
    {
      text: 'No tienes claro cómo cobrar online, controlar existencias o configurar los envíos de tu negocio.',
    },
    {
      text: 'Los presupuestos que recibes son muy distintos entre sí y no sabes qué incluye realmente cada uno.',
    },
  ];

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
    'Hasta 50 productos añadidos a la tienda',
    'Pagos seguros con tarjeta',
    'Panel sencillo para gestionar productos y pedidos',
    'Control de existencias para saber qué productos quedan disponibles',
    'Configuración de gastos y zonas de envío',
    'Carrito de compra y cupones de descuento',
    'Diseño adaptado a móvil, tablet y ordenador',
    'Preparada para aparecer en Google',
    'Enlaces y conexión con tus redes sociales',
    'Formación para aprender a gestionar la tienda',
    'Dos rondas de cambios incluidas',
  ];

  const features = [
    {
      title: 'Diseño adaptado a tu marca',
      description:
        'Tu catálogo refleja la identidad de tu negocio, con una navegación clara y cuidada.',
    },
    {
      title: 'Fichas de producto claras',
      description:
        'Imágenes, variantes, precios y descripciones para que el cliente decida con confianza.',
    },
    {
      title: 'Compra sencilla',
      description:
        'Un proceso de compra fácil, pensado para que el cliente complete el pedido sin fricción.',
    },
    {
      title: 'Pagos seguros con tarjeta',
      description:
        'Tus clientes pueden pagar online con tarjeta de forma segura.',
    },
    {
      title: 'Gestión de productos y pedidos',
      description:
        'Controla productos, existencias, pedidos y envíos desde un panel sencillo.',
    },
    {
      title: 'Preparada para móvil',
      description:
        'Tu tienda se ve y funciona bien en móvil, tablet y ordenador.',
    },
    {
      title: 'Preparada para Google',
      description:
        'Lista para que Google entienda tu catálogo y tus productos desde el inicio.',
    },
    {
      title: 'Formación incluida',
      description:
        'Te enseñamos a gestionar productos, pedidos y contenidos sin depender de nosotros.',
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tarda una tienda online?',
      answer:
        'Normalmente entre 4 y 6 semanas, dependiendo del catálogo y de lo que necesite tu tienda.',
    },
    {
      question: '¿Podemos pagar en varias cuotas?',
      answer:
        'Sí. Ofrecemos opciones de pago flexible: pago único o pago fraccionado, según lo que mejor se adapte a tu proyecto. Lo concretamos en la propuesta.',
    },
    {
      question: '¿Cuánto cuesta una tienda online?',
      answer:
        'Depende del catálogo y las funcionalidades. Como orientación, muchos proyectos web suelen situarse entre 400 € y 3.000 € + IVA; una tienda se valora según tu caso. Te enviamos una propuesta concreta antes de empezar.',
    },
    {
      question: '¿El presupuesto incluye IVA?',
      answer:
        'Sí, la propuesta que preparamos incluye IVA salvo que se indique lo contrario. El precio y el alcance quedan por escrito antes de empezar.',
    },
    {
      question: '¿Cuántos productos puedo cargar?',
      answer:
        'Lo definimos en la propuesta según tu catálogo. Si necesitas muchos productos, lo ajustamos a tu caso.',
    },
    {
      question: '¿Cómo cobran los clientes?',
      answer:
        'Con tarjeta de forma segura. Valoramos la mejor opción según tu negocio, tu banco y tus clientes.',
    },
    {
      question: '¿Trabajáis solo en Madrid?',
      answer:
        'No. Trabajamos online con empresas y autónomos de toda España. Podemos hablar por teléfono, videollamada, correo o WhatsApp. Si estás en Madrid, también podemos desplazarnos.',
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
        title='Tiendas online preparadas para vender'
        subtitle='Ideal para negocios y emprendedores que quieren vender productos por internet.'
        description='Creamos una tienda preparada para mostrar tus productos, cobrar online, recibir pedidos y gestionar las ventas de forma sencilla.'
        trustLine='Lista en 4–6 semanas · Presupuesto cerrado antes de empezar'
        ctaText='Ver qué incluye'
        onCTAClick={() => scrollToSection('incluye')}
        secondaryCTAText='Ver trabajos'
        secondaryCTAAction={() => scrollToSection('portfolio')}
        secondaryCTAIcon='chevron-down'
      />

      {/* 2. Bloque de confianza rápida */}
      <TrustBar />

      {/* 3. Problema y solución */}
      <SEOProblem
        title='Vender online sin la tienda adecuada cuesta clientes'
        subtitle='Esto es lo que solemos ver antes de que un negocio llegue a Tienda Online.'
        problems={problems}
      />
      <div className='bg-white pt-6 pb-16 md:pt-8 md:pb-20'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center bg-gray-50 border-2 border-ink-dark rounded-xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
            <p className='text-base md:text-lg text-gray-800 font-medium leading-relaxed'>
              La solución es una tienda online seria desde el primer día, con
              precio cerrado y sin letras pequeñas, y un catálogo pensado para
              tu forma de vender.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Para quién es este servicio */}
      <SEOBenefits
        title='¿Es Esta Tienda Online para tu Negocio?'
        benefits={targetAudience}
      />

      {/* 5. Qué incluye la tienda online */}
      <div id='incluye' className='scroll-mt-24'>
        <SEOFeatures
          title='Qué Incluye tu Tienda Online'
          subtitle='Todo lo necesario para vender online de forma profesional'
          features={features}
        />
      </div>

      {/* 6. Qué tendrás / propuesta */}
      <section
        id='precios'
        ref={pricingSectionRef}
        className='scroll-mt-24 py-20 bg-gray-50'
      >
        <div className='content-container'>
          <div className='text-center mb-12 max-w-2xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Qué tendrás al terminar
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
              Ideal para: negocios y emprendedores que quieren vender productos
              por internet
            </p>

            <div className='flex flex-col items-center gap-1 mb-6 text-center'>
              <span className='text-2xl md:text-3xl font-bold text-gray-900'>
                Presupuesto a medida
              </span>
              <span className='text-sm text-gray-500'>
                Cerrado antes de empezar, sin sorpresas.
              </span>
              <span className='text-sm text-gray-500 mt-1'>
                Pago único o fraccionado
              </span>
              <span className='text-sm text-gray-500'>
                Lista en 4–6 semanas
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

      {/* 7. Proceso de trabajo */}
      <SEOProcess
        title='Un proceso claro desde el primer mensaje'
        steps={defaultServiceProcess}
      />
      <div className='bg-white pt-2 pb-16 md:pb-20'>
        <div className='container mx-auto px-6 text-center'>
          <a
            href='/condiciones-del-proyecto'
            className='inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-accent hover:underline'
          >
            Ver condiciones del proyecto: pagos, revisiones y plazos
          </a>
        </div>
      </div>

      {/* 8. También podemos ayudarte con */}
      <section className='py-16 bg-white border-t-2 border-gray-100'>
        <div className='content-container'>
          <h3 className='text-xl md:text-2xl font-bold text-gray-900 text-center mb-8'>
            También podemos ayudarte con
          </h3>
          <div className='grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto'>
            <a
              href='/web-profesional-a-medida'
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

      {/* 9. Portfolio o trabajos reales */}
      <div id='portfolio' className='scroll-mt-24'>
        <Portfolio />
      </div>

      {/* 10. Valoraciones de clientes */}
      <Testimonials id='valoraciones' />

      {/* 11. Preguntas frecuentes */}
      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ title='Preguntas Frecuentes sobre Tiendas Online' faqs={faqs} />
      </div>

      {/* 12. Formulario / contacto final */}
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
