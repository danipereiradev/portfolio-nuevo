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
      text: 'Quieres vender online y Shopify o la plantilla barata no te encajan.',
    },
    {
      text: 'Ya probaste una tienda lenta o imposible de gestionar.',
    },
    {
      text: 'No tienes claro cobros, stock o envíos.',
    },
    {
      text: 'Te llegan presupuestos muy distintos y nadie dice qué incluye de verdad.',
    },
  ];

  const targetAudience = [
    {
      icon: ShoppingBag,
      title: 'Producto físico',
      description:
        'Vendes cosas reales y necesitas catálogo + compra sin líos.',
    },
    {
      icon: Package,
      title: 'Muchas referencias',
      description:
        'Tallas, colores, variantes… hace falta orden, no un Excel eterno.',
    },
    {
      icon: Rocket,
      title: 'Empiezas ahora',
      description:
        'Primera tienda seria. Sin inventar el proceso a base de prueba y error.',
    },
    {
      icon: TrendingUp,
      title: 'Ya vendes',
      description:
        'Quieres rediseñar, migrar o dejar de pelearte con la plataforma actual.',
    },
  ];

  const included = [
    'Hasta 50 productos cargados',
    'Pago con tarjeta',
    'Panel para productos y pedidos',
    'Control de stock',
    'Gastos y zonas de envío',
    'Carrito y cupones',
    'Bien en móvil',
    'Hosting y dominio incluidos',
    'Lista para Google',
    'Enlaces a redes',
    'Te enseñamos a gestionarla',
    'Dos rondas de cambios',
  ];

  const features = [
    {
      title: 'Diseño con tu marca',
      description: 'No una plantilla genérica con tu logo pegado.',
    },
    {
      title: 'Fichas claras',
      description: 'Fotos, variantes, precio y lo que hace falta para decidir.',
    },
    {
      title: 'Compra corta',
      description: 'Pocos pasos. Menos abandono en el carrito.',
    },
    {
      title: 'Pago con tarjeta',
      description: 'Cobro online seguro.',
    },
    {
      title: 'Panel de gestión',
      description:
        'Productos, stock, pedidos y envíos sin pedirnos ayuda cada vez.',
    },
    {
      title: 'Móvil',
      description:
        'La mayoría compra desde el teléfono. Tiene que ir bien ahí.',
    },
    {
      title: 'Hosting y dominio',
      description: 'Publicamos con tu dominio y alojamiento.',
    },
    {
      title: 'Base para Google',
      description:
        'Estructura lista para que el buscador entienda el catálogo.',
    },
    {
      title: 'Formación',
      description: 'Una sesión para que sepas subir productos y mirar pedidos.',
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tarda una tienda?',
      answer: 'Normalmente 4 a 6 semanas, según el catálogo y lo que pedáis.',
    },
    {
      question: '¿Se puede pagar a plazos?',
      answer: 'Sí. Único o fraccionado. Lo dejamos en la propuesta.',
    },
    {
      question: '¿Cuánto cuesta?',
      answer:
        'Depende del catálogo y las funciones. Te pasamos un número concreto antes de empezar.',
    },
    {
      question: '¿El presupuesto lleva IVA?',
      answer: 'Sí, salvo que indiquemos lo contrario. Todo por escrito.',
    },
    {
      question: '¿Cuántos productos?',
      answer: 'Lo fijamos en la propuesta. Si son muchos, lo ajustamos.',
    },
    {
      question: '¿Cómo pagan los clientes?',
      answer: 'Con tarjeta. Elegimos pasarela según tu banco y tu público.',
    },
    {
      question: '¿Incluye mantenimiento?',
      answer:
        'Se puede contratar aparte o meterlo en la propuesta. Te lo detallamos.',
    },
  ];

  return (
    <>
      {/* 1. Hero de posicionamiento, sin precio como primer impacto */}
      <SEOLandingHero
        title='Tienda online para vender de verdad'
        subtitle='Catálogo, cobro con tarjeta, envíos y un panel que puedas usar tú.'
        description='Si Shopify o la plantilla barata no te sirven, hablamos y te decimos qué haría falta.'
        trustLine='Suele estar en 4–6 semanas · Precio por escrito antes de empezar'
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
        title='Sin una tienda decente, pierdes pedidos'
        subtitle='Cosas que vemos antes de montar o rehacer una tienda.'
        problems={problems}
      />
      <div className='bg-white pt-6 pb-16 md:pt-8 md:pb-20'>
        <div className='container mx-auto px-6'>
          <div className='   mx-auto text-center bg-gray-50 border-2 border-ink-dark rounded-2xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
            <p className='text-base md:text-lg text-gray-800 font-medium leading-relaxed'>
              La idea es una tienda que encaje con cómo vendes tú: precio
              cerrado, catálogo ordenado y panel usable. Sin letra pequeña.
            </p>
          </div>
        </div>
      </div>

      <SEOBenefits title='¿Te encaja esta tienda?' benefits={targetAudience} />

      <div id='incluye' className='scroll-mt-24'>
        <SEOFeatures
          title='Qué lleva la tienda'
          subtitle='Lo habitual. Si necesitas más, lo vemos en la propuesta.'
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
              El precio depende del catálogo y de lo que pedáis. Te lo
              escribimos antes de empezar.
            </p>
          </div>

          <div className='   mx-auto bg-white rounded-2xl p-8 md:p-10 border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] relative'>
            <span className='absolute -top-4 left-8 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
              Tienda Online
            </span>

            <p className='text-xs font-semibold text-accent uppercase tracking-wide mb-3 mt-4 text-center'>
              Si vendes productos y quieres cobrar online
            </p>

            <div className='flex flex-col items-center gap-1 mb-6 text-center'>
              <span className='text-2xl md:text-3xl font-bold text-gray-900'>
                Presupuesto según tu caso
              </span>
              <span className='text-sm text-gray-500'>
                Por escrito, antes de cobrar nada.
              </span>
              <span className='text-sm text-gray-500 mt-1'>
                Pago único o fraccionado
              </span>
              <span className='text-sm text-gray-500'>
                Suele estar en 4–6 semanas
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
                Orientativo, IVA incluido. El número final lo cerramos en la
                propuesta según el alcance real.
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
      <SEOProcess title='Cómo solemos trabajar' steps={defaultServiceProcess} />
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
          <div className='grid sm:grid-cols-3 gap-4    mx-auto'>
            <a
              href='/web-profesional-a-medida'
              className='block bg-gray-50 border-2 border-ink-dark rounded-2xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Web a Medida
            </a>
            <a
              href='/mantenimiento-web'
              className='block bg-gray-50 border-2 border-ink-dark rounded-2xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Mantenimiento web
            </a>
            <button
              type='button'
              onClick={() => openModal('Tienda Online')}
              className='block bg-gray-50 border-2 border-ink-dark rounded-2xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Mejoras o rediseños
            </button>
          </div>
        </div>
      </section>

      {/* 9. Portfolio o trabajos reales */}
      <div id='portfolio' className='scroll-mt-24'>
        <Portfolio contained />
      </div>

      {/* 10. Valoraciones de clientes */}
      <Testimonials id='valoraciones' />

      {/* 11. Preguntas frecuentes */}
      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ title='Preguntas frecuentes sobre tiendas' faqs={faqs} />
      </div>

      <SEOCTAFinal
        title='¿Montamos tu tienda?'
        subtitle='Cuéntanos el catálogo y lo que necesitas cobrar. Te mandamos propuesta con plazos y precio.'
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
