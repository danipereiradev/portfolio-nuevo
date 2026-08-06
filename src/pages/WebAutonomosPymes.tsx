import { useEffect } from 'react';
import {
  Palette,
  Blocks,
  Plug,
  Lock,
  CalendarClock,
  SlidersHorizontal,
  Workflow,
  LayoutDashboard,
  Boxes,
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

const WHATSAPP_URL = buildWhatsAppUrl(ADS_WHATSAPP_MESSAGE);

const WebAutonomosPymes = () => {
  const { openModal } = useContactModal();

  usePageMeta('/web-a-medida');

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Permite llegar directamente a una sección vía ancla en la URL
  // (ej. /web-a-medida#precios desde un sitelink de Google Ads).
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
    trackPricingCtaClick('Web a Medida', 'Solicitar propuesta');
    openModal('Web a Medida');
  };

  const problems = [
    {
      text: 'Tu proyecto tiene necesidades concretas y las propuestas que recibes son plantillas cerradas que no encajan del todo.',
    },
    {
      text: 'Necesitas integraciones, paneles o funcionalidades específicas y no sabes quién puede desarrollarlas de forma sólida.',
    },
    {
      text: 'Los presupuestos que recibes son muy dispares porque nadie define bien el alcance antes de empezar.',
    },
    {
      text: 'Te preocupa que el desarrollo quede a medio camino o que no pueda crecer si tu negocio cambia.',
    },
  ];

  const targetAudience = [
    {
      icon: Palette,
      title: 'Diseño Completamente Personalizado',
      description:
        'Sin partir de una base cerrada: la estructura y el diseño se piensan para tu proyecto concreto.',
    },
    {
      icon: Blocks,
      title: 'Funcionalidades Especiales',
      description:
        'Necesitas algo que no es un formulario y una lista de servicios, sino un desarrollo a medida.',
    },
    {
      icon: Plug,
      title: 'Conexión con tus herramientas',
      description:
        'Conexión con los programas y herramientas que ya usa tu negocio.',
    },
    {
      icon: Lock,
      title: 'Áreas Privadas',
      description:
        'Zonas de acceso restringido para clientes, socios o equipo, con permisos propios.',
    },
    {
      icon: CalendarClock,
      title: 'Reservas Complejas',
      description:
        'Sistemas de reserva con disponibilidad, recursos o condiciones que van más allá de un formulario simple.',
    },
    {
      icon: SlidersHorizontal,
      title: 'Buscadores y Filtros',
      description:
        'Catálogos o listados grandes que necesitan búsqueda avanzada y filtros a medida.',
    },
    {
      icon: Workflow,
      title: 'Automatizaciones',
      description:
        'Procesos que hoy haces a mano y que se pueden automatizar dentro de tu propia web.',
    },
    {
      icon: LayoutDashboard,
      title: 'Paneles Internos y Aplicaciones Web',
      description:
        'Herramientas internas o aplicaciones web para gestionar tu negocio, no solo una web informativa.',
    },
    {
      icon: Boxes,
      title: 'Solución a tu medida',
      description:
        'Proyectos que necesitan una web pensada para tu forma de trabajar y preparada para crecer contigo.',
    },
  ];

  const included = [
    'Diseño completamente adaptado a tu negocio',
    'Funciones especiales desarrolladas para tu proyecto',
    'Reservas, calculadoras, formularios avanzados o procesos personalizados',
    'Conexión con programas y herramientas que ya utilizas',
    'Zonas privadas para clientes, empleados o colaboradores',
    'Paneles para consultar o gestionar información',
    'Web segura, rápida y preparada para crecer',
    'Acompañamiento durante todo el proyecto',
    'Revisiones acordadas antes de empezar',
  ];

  const features = [
    {
      title: 'Diseño completamente adaptado',
      description:
        'La web se diseña para tu proyecto concreto, no se adapta desde una plantilla cerrada.',
    },
    {
      title: 'Funciones especiales',
      description:
        'Desarrollamos lo que tu proyecto necesita: reservas, calculadoras, formularios avanzados u otros procesos personalizados.',
    },
    {
      title: 'Conexión con tus herramientas',
      description:
        'Conectamos tu web con los programas y herramientas que ya utilizas.',
    },
    {
      title: 'Zonas privadas y paneles',
      description:
        'Si el proyecto lo necesita, añadimos zonas privadas para clientes o equipo y paneles para gestionar información.',
    },
    {
      title: 'Web segura',
      description:
        'Navegación segura que transmite confianza a tus clientes desde el primer día.',
    },
    {
      title: 'Lista para crecer',
      description:
        'Pensada para poder ampliar el proyecto más adelante sin empezar de cero.',
    },
    {
      title: 'Acompañamiento durante el proyecto',
      description:
        'Trato directo mientras se construye, con revisiones acordadas antes de empezar.',
    },
    {
      title: 'Publicación incluida',
      description:
        'Dejamos la web online y te explicamos de forma sencilla cómo usarla.',
    },
  ];

  const process = [
    {
      number: '1',
      title: 'Nos cuentas qué necesitas',
      description:
        'Revisamos tu proyecto, sus funcionalidades y qué lo hace distinto de una web estándar.',
    },
    {
      number: '2',
      title: 'Preparamos una propuesta',
      description:
        'Recibes una propuesta con el alcance definido, plazo estimado y opciones de pago.',
    },
    {
      number: '3',
      title: 'Diseñamos y desarrollamos',
      description:
        'Trabajamos el diseño y las funciones especiales que necesita tu proyecto.',
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
      question: '¿En qué se diferencia esto de Web Profesional 360?',
      answer:
        'Web Profesional 360 es una web con precio y proceso claros, ideal cuando necesitas una presencia profesional estándar. Web a Medida es para negocios que necesitan funciones especiales, conexión con otras herramientas o zonas privadas, con presupuesto según el proyecto.',
    },
    {
      question: '¿Cuánto tarda un proyecto a medida?',
      answer:
        'Depende del alcance y las funcionalidades del proyecto. Lo estimamos en la propuesta una vez definidos los requisitos.',
    },
    {
      question: '¿Podemos pagar en varias cuotas?',
      answer:
        'Sí. Ofrecemos opciones de pago flexible: pago único o pago fraccionado (por ejemplo una parte al empezar y el resto al publicar la web), según lo que mejor se adapte a tu proyecto. Lo concretamos en la propuesta.',
    },
    {
      question: '¿El presupuesto incluye IVA?',
      answer:
        'Sí, la propuesta que preparamos incluye IVA salvo que se indique lo contrario. La propuesta final se cierra antes de empezar el proyecto, para que tengas todo claro desde el principio.',
    },
    {
      question: '¿Trabajáis solo en Madrid?',
      answer:
        'PereiraWeb tiene sede en Galicia/Madrid, pero trabajamos con clientes de toda España de forma online.',
    },
    {
      question: '¿La web se verá bien en el móvil?',
      answer: 'Sí, estará adaptada a móvil, tablet y ordenador.',
    },
    {
      question: '¿Incluís mantenimiento?',
      answer:
        'El mantenimiento se puede contratar aparte con un plan mensual, o incluirse dentro de la propuesta. Te pasamos el detalle con tu presupuesto.',
    },
    {
      question: '¿El alojamiento está incluido?',
      answer:
        'Sí. El alojamiento de la web está incluido en el servicio, tanto en la publicación inicial como, si contratas mantenimiento, en su gestión continua.',
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
        title='Diseño y desarrollo web a medida para proyectos que necesitan algo más'
        subtitle='Ideal para negocios que necesitan algo más que una web informativa.'
        description='Diseñamos una solución adaptada a tu forma de trabajar cuando necesitas funciones especiales, conexión con otras herramientas o una zona privada para clientes o equipo.'
        trustLine='Proyectos en toda España · Plazo y precio según el proyecto'
        ctaText='Saber más'
        onCTAClick={() => scrollToSection('precios')}
        secondaryCTAText='Ver trabajos'
        secondaryCTAAction={() => scrollToSection('portfolio')}
        secondaryCTAIcon='chevron-down'
      />

      {/* 2. Bloque de confianza rápida */}
      <TrustBar />

      {/* 3. Precio y formas de pago */}
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
              Cada proyecto tiene necesidades distintas. Por eso preparamos una
              propuesta personalizada según el alcance, funcionalidades,
              contenidos y objetivos de la web.
            </p>
          </div>

          <div className='max-w-3xl mx-auto bg-white rounded-xl p-8 md:p-10 border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] relative'>
            <span className='absolute -top-4 left-8 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
              Web a Medida
            </span>

            <p className='text-xs font-semibold text-accent uppercase tracking-wide mb-3 mt-4 text-center'>
              Ideal para: negocios que necesitan algo más que una web
              informativa
            </p>

            <div className='flex flex-col items-center gap-1 mb-6 text-center'>
              <span className='text-2xl md:text-3xl font-bold text-gray-900'>
                Presupuesto según proyecto
              </span>
              <span className='text-sm text-gray-500'>
                Cerrado antes de empezar, sin sorpresas.
              </span>
              <span className='text-sm text-gray-500 mt-1'>
                Pago único o fraccionado
              </span>
              <span className='text-sm text-gray-500'>
                Plazo y precio según las necesidades del proyecto
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
                Cuéntanos qué necesitas
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

      {/* 4. Problema y solución */}
      <SEOProblem
        title='Cuando un proyecto no encaja en un alcance cerrado'
        subtitle='Esto es lo que solemos ver antes de que un negocio llegue a Web a Medida.'
        problems={problems}
      />
      <div className='bg-white pt-6 pb-16 md:pt-8 md:pb-20'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center bg-gray-50 border-2 border-ink-dark rounded-xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
            <p className='text-base md:text-lg text-gray-800 font-medium leading-relaxed'>
              La solución es un proyecto a medida: definimos el alcance
              contigo, preparamos un presupuesto claro antes de empezar y
              construimos una base técnica pensada para tu caso concreto.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Para quién es este servicio */}
      <SEOBenefits
        title='¿Tu Proyecto Necesita Algo a Medida?'
        benefits={targetAudience}
      />
      <div className='bg-gray-50 pt-6 pb-16 md:pt-8 md:pb-20'>
        <div className='container mx-auto px-6'>
          <p className='max-w-2xl mx-auto text-center text-sm md:text-base text-gray-500'>
            Si tu proyecto no encaja en un alcance cerrado, es un buen candidato
            para Web a Medida.
          </p>
        </div>
      </div>

      {/* 6. Qué incluye la web */}
      <div id='incluye' className='scroll-mt-24'>
        <SEOFeatures
          title='Qué Incluye un Proyecto a Medida'
          subtitle='Todo lo necesario para desarrollar un proyecto con funcionalidades específicas'
          features={features}
        />
      </div>

      {/* 6.1 También podemos ayudarte con (sección secundaria, no compite con el foco principal) */}
      <section className='py-16 bg-white border-t-2 border-gray-100'>
        <div className='content-container'>
          <h3 className='text-xl md:text-2xl font-bold text-gray-900 text-center mb-8'>
            También podemos ayudarte con
          </h3>
          <div className='grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto'>
            <a
              href='/tiendas-online'
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Tiendas online
            </a>
            <a
              href='/mantenimiento-web'
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Mantenimiento web
            </a>
            <button
              type='button'
              onClick={() => openModal('Web a Medida')}
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Mejoras o rediseños
            </button>
          </div>
        </div>
      </section>

      {/* 6.2 Enlace cruzado hacia Web Profesional 360 */}
      <section className='py-12 bg-gray-50 border-t-2 border-gray-100'>
        <div className='content-container'>
          <div className='max-w-2xl mx-auto text-center bg-white border-2 border-ink-dark rounded-xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
            <p className='text-base md:text-lg text-gray-800 font-medium mb-4'>
              Si buscas una solución profesional con alcance, precio y proceso
              definidos, consulta Web Profesional 360.
            </p>
            <a
              href='/web-profesional-360'
              className='inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline'
            >
              Ver Web Profesional 360
            </a>
          </div>
        </div>
      </section>

      {/* 7. Portfolio o trabajos reales */}
      <div id='portfolio' className='scroll-mt-24'>
        <Portfolio />
      </div>

      {/* 7.1 Valoraciones de clientes */}
      <Testimonials id='valoraciones' />

      {/* 8. Proceso de trabajo */}
      <SEOProcess
        title='Un proceso claro desde el primer mensaje'
        steps={process}
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

      {/* 9. Preguntas frecuentes */}
      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ title='Preguntas Frecuentes' faqs={faqs} />
      </div>

      {/* 10. Formulario / contacto final */}
      <SEOCTAFinal
        title='Diseño y desarrollo web a medida para tu proyecto'
        subtitle='Trabajamos con empresas de toda España. Trato directo, sin intermediarios. Cuéntanos tu proyecto y te preparamos una propuesta a medida.'
        buttonText='Solicitar propuesta'
        onButtonClick={handleQuoteRequest}
      />

      <div id='contacto' className='scroll-mt-24'>
        <ContactForm preselectedPlan='Web a Medida' />
      </div>
    </>
  );
};

export default WebAutonomosPymes;
