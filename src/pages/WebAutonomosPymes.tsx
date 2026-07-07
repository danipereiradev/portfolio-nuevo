import { useEffect } from 'react';
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
  trackPricingCtaClick,
  trackPricingSinglePayment,
  trackPricingSplitPayment,
  trackPricingMonthlyPlan,
  trackViewPricing,
} from '../utils/analytics';
import SEOLandingHero from '../components/SEOLandingHero';
import TrustBar from '../components/TrustBar';
import SEOBenefits from '../components/SEOBenefits';
import SEOFeatures from '../components/SEOFeatures';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import Portfolio from '../components/Portfolio';
import ContactForm from '../components/ContactForm';
import Button from '../components/Button';

const WHATSAPP_URL =
  'https://wa.me/34644669828?text=Hola,%20quiero%20pedir%20presupuesto%20para%20mi%20web';

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
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  const handleQuoteRequest = () => {
    trackPricingCtaClick('Web autónomos y pymes');
    openModal('Página Web');
  };

  const handlePaymentOptionClick = (type: 'single' | 'split' | 'monthly') => {
    if (type === 'single') trackPricingSinglePayment('Web autónomos y pymes');
    if (type === 'split') trackPricingSplitPayment('Web autónomos y pymes');
    if (type === 'monthly')
      trackPricingMonthlyPlan('Web autónomos y pymes');
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
        'Te enseño a gestionar los contenidos básicos de tu web para que seas autónomo.',
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
      title: 'Me cuentas qué necesitas',
      description: 'Revisamos tu negocio, objetivos y tipo de web.',
    },
    {
      number: '2',
      title: 'Te envío una propuesta',
      description: 'Recibes precio, plazo y alcance del proyecto.',
    },
    {
      number: '3',
      title: 'Diseño y desarrollo tu web',
      description: 'Trabajo la estructura, diseño responsive y desarrollo.',
    },
    {
      number: '4',
      title: 'Publicamos y te explico cómo usarla',
      description:
        'La web queda online y te doy una explicación sencilla para que puedas gestionarla.',
    },
  ];

  const faqs = [
    {
      question: '¿Cuánto tarda una web?',
      answer:
        'Normalmente entre 2 y 3 semanas, dependiendo del contenido y del alcance.',
    },
    {
      question: '¿Puedo pagar en varias cuotas?',
      answer:
        'Sí. Además del pago único, puedes elegir un pago dividido (50% al empezar y 50% al publicar la web) o un plan mensual desde 129€/mes durante 12 meses, que incluye soporte y mantenimiento básico durante ese periodo.',
    },
    {
      question: '¿El precio incluye IVA?',
      answer:
        'Sí, los precios mostrados incluyen IVA salvo que se indique lo contrario.',
    },
    {
      question: '¿Trabajas solo en Madrid?',
      answer: 'No, trabajo con clientes de toda España de forma remota.',
    },
    {
      question: '¿La web será responsive?',
      answer: 'Sí, estará adaptada a móvil, tablet y escritorio.',
    },
    {
      question: '¿Incluyes mantenimiento?',
      answer:
        'El mantenimiento se puede contratar aparte desde 60€/mes, o venir ya incluido si eliges el plan mensual de la web (129€/mes durante 12 meses).',
    },
    {
      question: '¿Puedo pedir una tienda online?',
      answer: 'Sí, desarrollo tiendas online desde 1.799€ IVA incluido.',
    },
  ];

  return (
    <>
      {/* 1. Hero con precio y CTA */}
      <SEOLandingHero
        title='Páginas web para autónomos y pymes desde 969€ IVA incluido'
        subtitle='Diseño, desarrollo y publicación en 2-3 semanas'
        description='Trato directo conmigo, sin agencias ni intermediarios. Plan mensual disponible desde 129€/mes y propuesta en menos de 24h.'
        ctaText='Pedir presupuesto por WhatsApp'
        onCTAClick={() => handleWhatsApp('LandingAutonomosHero')}
        secondaryCTAText='Ver trabajos reales'
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
          <div className='text-center mb-12'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Un Precio Claro, Sin Sorpresas
            </h2>
            <p className='text-base md:text-lg text-gray-600 max-w-2xl mx-auto'>
              Todo lo que necesitas para tener una web profesional lista para
              captar clientes
            </p>
          </div>

          <div className='max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-10 ring-2 ring-accent relative'>
            <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent-hover text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg'>
              Web Profesional
            </div>

            <p className='text-xs font-semibold text-accent uppercase tracking-wide mb-3 mt-4 text-center'>
              Ideal para: Autónomos, marcas personales y pequeños negocios
            </p>

            <div className='flex flex-col items-center gap-1 mb-6'>
              <div className='flex items-baseline gap-2'>
                <span className='text-xl text-gray-600'>Desde</span>
                <span className='text-5xl md:text-6xl font-bold text-accent'>
                  969
                </span>
                <span className='text-xl text-gray-600'>€</span>
              </div>
              <span className='text-xs text-gray-400'>IVA incluido</span>
              <span className='text-sm text-gray-500 mt-1'>
                Para proyectos estándar en pago único.
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

            {/* Formas de pago: pago único, dividido y plan mensual */}
            <div className='border-t border-gray-100 pt-8'>
              <h3 className='text-center text-sm font-bold uppercase tracking-wide text-gray-500 mb-5'>
                Elige Cómo Pagar
              </h3>
              <div className='grid sm:grid-cols-3 gap-4'>
                <div className='border border-gray-200 rounded-xl p-4 flex flex-col'>
                  <p className='font-bold text-gray-900 mb-1'>Pago único</p>
                  <p className='text-2xl font-bold text-accent mb-1'>969€</p>
                  <p className='text-xs text-gray-500 mb-4 flex-grow'>
                    IVA incluido. Pago completo al contratar el proyecto.
                  </p>
                  <Button
                    onClick={() => handlePaymentOptionClick('single')}
                    variant='ghost'
                    fullWidth
                    className='!text-sm'
                  >
                    Pedir presupuesto
                  </Button>
                </div>

                <div className='border border-gray-200 rounded-xl p-4 flex flex-col'>
                  <p className='font-bold text-gray-900 mb-1'>
                    Pago dividido
                  </p>
                  <p className='text-2xl font-bold text-accent mb-1'>
                    50% + 50%
                  </p>
                  <p className='text-xs text-gray-500 mb-4 flex-grow'>
                    50% al empezar el proyecto y 50% al publicar la web.
                  </p>
                  <Button
                    onClick={() => handlePaymentOptionClick('split')}
                    variant='ghost'
                    fullWidth
                    className='!text-sm'
                  >
                    Pedir presupuesto
                  </Button>
                </div>

                <div className='border-2 border-accent bg-accent/5 rounded-xl p-4 flex flex-col relative'>
                  <span className='absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap'>
                    OPCIÓN CÓMODA
                  </span>
                  <p className='font-bold text-gray-900 mb-1 mt-1'>
                    Plan mensual
                  </p>
                  <p className='text-2xl font-bold text-accent mb-1'>
                    129€/mes
                  </p>
                  <p className='text-xs text-gray-500 mb-4 flex-grow'>
                    Durante 12 meses. Incluye soporte y mantenimiento básico.
                  </p>
                  <Button
                    onClick={() => handlePaymentOptionClick('monthly')}
                    variant='primary'
                    fullWidth
                    className='!text-sm'
                  >
                    Consultar plan mensual
                  </Button>
                </div>
              </div>

              <p className='text-center text-xs text-gray-400 mt-5'>
                El plan mensual incluye la creación de la web, soporte y
                mantenimiento básico durante los 12 meses. Condiciones
                finales según alcance del proyecto.
              </p>
            </div>

            <p className='text-center text-xs text-gray-400 mt-4'>
              Todos los precios incluyen IVA salvo que se indique lo
              contrario.
            </p>

            <div className='mt-6 text-center'>
              <button
                onClick={() => handleWhatsApp('LandingAutonomosPrecio')}
                className='inline-flex items-center gap-1.5 text-sm text-green-600 font-semibold hover:underline'
              >
                <MessageCircle className='w-4 h-4' />O escríbeme directo por
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

      {/* 6. Portfolio o trabajos reales */}
      <div id='portfolio' className='scroll-mt-24'>
        <Portfolio />
      </div>

      {/* 7. Proceso de trabajo */}
      <SEOProcess title='Cómo Trabajaremos' steps={process} />

      {/* 8. Preguntas frecuentes */}
      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ title='Preguntas Frecuentes' faqs={faqs} />
      </div>

      {/* 9. Formulario / contacto final */}
      <SEOCTAFinal
        title='Páginas web para autónomos y pymes desde 969€ IVA incluido'
        subtitle='Trato directo conmigo, sin agencias ni intermediarios. Solicita tu propuesta y recíbela en menos de 24h.'
        buttonText='Recibir propuesta en 24h'
        onButtonClick={handleQuoteRequest}
      />

      <div id='contacto' className='scroll-mt-24'>
        <ContactForm preselectedPlan='Página Web' />
      </div>
    </>
  );
};

export default WebAutonomosPymes;
