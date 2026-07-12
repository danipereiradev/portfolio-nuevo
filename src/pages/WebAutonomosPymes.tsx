import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  Store,
  UserCircle,
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
import { ADS_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../config/contact';
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

const WHATSAPP_URL = buildWhatsAppUrl(ADS_WHATSAPP_MESSAGE);

const WebAutonomosPymes = () => {
  const { openModal } = useContactModal();

  usePageMeta('/web-autonomos-pymes');

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Permite llegar directamente a una sección vía ancla en la URL
  // (ej. /web-autonomos-pymes#precios desde un sitelink de Google Ads).
  // El scroll nativo del navegador no funciona de forma fiable en esta SPA
  // porque el elemento con ese id todavía no existe cuando la página carga.
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
    trackPricingCtaClick('Web autónomos y pymes', 'Solicitar propuesta');
    openModal('Página Web');
  };

  const targetAudience = [
    {
      icon: Briefcase,
      title: 'Autónomos',
      description:
        'Necesitas una web que transmita profesionalidad y te ayude a conseguir clientes sin depender solo de redes sociales.',
    },
    {
      icon: Building2,
      title: 'Pymes',
      description:
        'Tu empresa necesita presencia digital sólida para competir y generar confianza en nuevos clientes.',
    },
    {
      icon: Store,
      title: 'Pequeños Negocios',
      description:
        'Negocios locales que quieren aparecer en Google y ser encontrados por clientes cercanos.',
    },
    {
      icon: UserCircle,
      title: 'Marcas Personales',
      description:
        'Consultores, coaches o profesionales que quieren mostrar su trabajo y credibilidad online.',
    },
  ];

  const included = [
    'Diseño responsive adaptado a móviles',
    'Hasta 6 páginas o secciones',
    'Formulario de contacto funcional',
    'Optimización SEO básica',
    'Integración Google Analytics',
    'Certificado SSL (https seguro)',
    'Hosting primer año incluido',
    'Formación uso y gestión',
    'Hasta 2 revisiones incluidas',
  ];

  const features = [
    {
      title: 'Diseño Responsive Adaptado',
      description:
        'Tu web se ve perfecta en móvil, tablet y ordenador, donde te van a encontrar la mayoría de tus clientes.',
    },
    {
      title: 'Formulario de Contacto Funcional',
      description:
        'Capta clientes potenciales directamente desde tu web, sin depender de otras plataformas.',
    },
    {
      title: 'Optimización SEO Básica',
      description:
        'Tu web queda preparada con una estructura que Google entiende desde el primer día.',
    },
    {
      title: 'Integración Google Analytics',
      description:
        'Mide tus visitas y resultados desde el primer momento para tomar mejores decisiones.',
    },
    {
      title: 'Certificado SSL Incluido',
      description:
        'Navegación segura (https) que transmite confianza a tus clientes y mejora tu SEO.',
    },
    {
      title: 'Hosting Primer Año Incluido',
      description:
        'Tu web queda publicada sin que tengas que preocuparte por la parte técnica.',
    },
    {
      title: 'Formación de Uso y Gestión',
      description:
        'Te enseñamos a gestionar los contenidos básicos de tu web para que seas autónomo.',
    },
    {
      title: 'Hasta 2 Revisiones Incluidas',
      description:
        'Ajustamos el diseño y los contenidos hasta que la web quede exactamente como quieres.',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Nos cuentas qué necesitas',
      description: 'Revisamos tu negocio, objetivos y tipo de web.',
    },
    {
      number: '2',
      title: 'Preparamos una propuesta',
      description:
        'Recibes una propuesta cerrada con alcance, plazo y opciones de pago.',
    },
    {
      number: '3',
      title: 'Diseñamos y desarrollamos',
      description: 'Trabajamos la estructura, el diseño responsive y el desarrollo.',
    },
    {
      number: '4',
      title: 'Publicamos y acompañamos',
      description:
        'La web queda online y te damos una explicación sencilla para que puedas gestionarla.',
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tarda una web?',
      answer:
        'Normalmente entre 2 y 3 semanas, dependiendo del contenido y del alcance.',
    },
    {
      question: '¿Podemos pagar en varias cuotas?',
      answer:
        'Sí. Ofrecemos opciones de pago flexible: pago único, pago dividido (por ejemplo una parte al empezar y el resto al publicar la web) o un plan mensual, según lo que mejor se adapte a tu proyecto. Lo concretamos en la propuesta.',
    },
    {
      question: '¿El presupuesto incluye IVA?',
      answer:
        'Sí, la propuesta que preparamos incluye IVA salvo que se indique lo contrario. La propuesta final se cierra antes de empezar el proyecto, para que tengas todo claro desde el principio.',
    },
    {
      question: '¿Trabajáis solo en Madrid?',
      answer:
        'PereiraWeb tiene base en Torrejón de Ardoz, Madrid, pero trabajamos con clientes de toda España de forma online.',
    },
    {
      question: '¿La web será responsive?',
      answer: 'Sí, estará adaptada a móvil, tablet y escritorio.',
    },
    {
      question: '¿Incluís mantenimiento?',
      answer:
        'El mantenimiento se puede contratar aparte con un plan mensual, o incluirse dentro de la propuesta si eliges pago mensual para tu web. Te pasamos el detalle con tu presupuesto.',
    },
    {
      question: '¿Podemos pedir una tienda online?',
      answer:
        'Sí, también desarrollamos tiendas online. Te preparamos una propuesta a medida según el catálogo y las funcionalidades que necesites.',
    },
  ];

  return (
    <>
      {/* 1. Hero de posicionamiento, sin precio como primer impacto */}
      <SEOLandingHero
        title='Páginas web profesionales para empresas y negocios'
        subtitle='Diseñamos y desarrollamos webs claras, rápidas y preparadas para generar confianza, explicar bien tus servicios y facilitar que tus clientes contacten.'
        description='Estudio web en Madrid · Proyectos para toda España · Presupuesto cerrado antes de empezar.'
        ctaText='Solicitar propuesta'
        onCTAClick={() => handleWhatsApp('LandingAutonomosHero')}
        secondaryCTAText='Ver trabajos'
        secondaryCTAAction={() => scrollToSection('portfolio')}
        secondaryCTAIcon='chevron-down'
      />

      {/* 2. Bloque de confianza rápida */}
      <TrustBar />

      {/* 3. Para quién es este servicio */}
      <SEOBenefits
        title='¿Es Esta Web para Tu Negocio?'
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
              Cada proyecto tiene necesidades distintas. Por eso preparamos
              una propuesta personalizada según el alcance, funcionalidades,
              contenidos y objetivos de la web.
            </p>
          </div>

          <div className='max-w-3xl mx-auto bg-white rounded-xl p-8 md:p-10 border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] relative'>
            <span className='absolute -top-4 left-8 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
              Web Profesional
            </span>

            <p className='text-xs font-semibold text-accent uppercase tracking-wide mb-3 mt-4 text-center'>
              Ideal para: Autónomos, marcas personales y pequeños negocios
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
                Entrega: 2-3 semanas
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
              <Button
                onClick={handleQuoteRequest}
                variant='primary'
                fullWidth
              >
                Solicitar propuesta
              </Button>

              <p className='text-center text-xs text-gray-400 mt-4'>
                Presupuesto orientativo, IVA incluido. La propuesta final se
                cierra antes de empezar, según el alcance real del proyecto.
              </p>
            </div>

            <div className='mt-6 text-center'>
              <button
                onClick={() => handleWhatsApp('LandingAutonomosPrecio')}
                className='inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline'
              >
                <MessageCircle className='w-4 h-4' />O escríbenos directo por
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Qué incluye la web */}
      <div id='incluye' className='scroll-mt-24'>
        <SEOFeatures
          title='Qué Incluye tu Web'
          subtitle='Todo lo necesario para tener una presencia digital profesional'
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
            <Link
              to='/tiendas-online'
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Tiendas online
            </Link>
            <Link
              to='/mantenimiento-web'
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Mantenimiento web
            </Link>
            <button
              type='button'
              onClick={() => openModal('Página Web')}
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

      {/* 6.1 Valoraciones de clientes (idéntica a la de la home) */}
      <Testimonials id='valoraciones' />

      {/* 7. Proceso de trabajo */}
      <SEOProcess
        title='Un proceso claro desde el primer mensaje'
        steps={process}
      />

      {/* 8. Preguntas frecuentes */}
      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ title='Preguntas Frecuentes' faqs={faqs} />
      </div>

      {/* 9. Formulario / contacto final */}
      <SEOCTAFinal
        title='Páginas web profesionales para empresas y negocios'
        subtitle='Estudio web en Madrid con proyectos en toda España. Trato directo, sin intermediarios. Solicita tu propuesta y recíbela en máximo 2h.'
        buttonText='Solicitar propuesta'
        onButtonClick={handleQuoteRequest}
      />

      <div id='contacto' className='scroll-mt-24'>
        <ContactForm preselectedPlan='Página Web' />
      </div>
    </>
  );
};

export default WebAutonomosPymes;
