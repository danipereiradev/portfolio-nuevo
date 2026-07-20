import { useEffect } from 'react';
import { Laptop, Wrench, ShieldCheck, Clock, Check, MessageCircle } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useSectionView } from '../hooks/useSectionView';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackPricingCtaClick,
  trackViewPricing,
} from '../utils/analytics';
import { MAINTENANCE_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../config/contact';
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

const WHATSAPP_URL = buildWhatsAppUrl(MAINTENANCE_WHATSAPP_MESSAGE);

const MantenimientoWeb = () => {
  const { openModal } = useContactModal();

  usePageMeta('/mantenimiento-web');

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Permite llegar directamente a una sección vía ancla en la URL
  // (ej. /mantenimiento-web#precios desde un sitelink de Google Ads).
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
    trackPricingCtaClick('Mantenimiento web', 'Solicitar orientación');
    openModal('Mantenimiento Web');
  };

  const targetAudience = [
    {
      icon: Laptop,
      title: 'Webs Ya Publicadas',
      description:
        'Tienes una web funcionando y quieres que siga actualizada, segura y en buen estado.',
    },
    {
      icon: Wrench,
      title: 'Cambios Puntuales',
      description:
        'Necesitas hacer ajustes de contenido, textos o imágenes de forma recurrente, sin complicaciones técnicas.',
    },
    {
      icon: ShieldCheck,
      title: 'Seguridad y Copias',
      description:
        'Quieres evitar caídas, hackeos o pérdida de información con copias de seguridad periódicas.',
    },
    {
      icon: Clock,
      title: 'Soporte Continuo',
      description:
        'Prefieres tener a alguien disponible para resolver dudas o problemas técnicos cuando surgen.',
    },
  ];

  const included = [
    'Modificaciones incluidas cada mes',
    'Actualizaciones de seguridad mensuales',
    'Backups automáticos semanales',
    'Monitoreo uptime 24/7',
    'Soporte técnico prioritario',
    'Optimización de rendimiento',
    'Protección contra malware',
    'Renovación certificado SSL',
    'Informes mensuales de actividad',
    'Gestión de dominio y hosting',
  ];

  const features = [
    {
      title: 'Actualizaciones Técnicas Periódicas',
      description:
        'Mantenemos tu web, plugins y sistema actualizados para evitar fallos y vulnerabilidades.',
    },
    {
      title: 'Copias de Seguridad',
      description:
        'Backups periódicos para poder recuperar tu web ante cualquier imprevisto.',
    },
    {
      title: 'Revisión de Seguridad',
      description:
        'Supervisamos tu web para detectar y corregir problemas de seguridad a tiempo.',
    },
    {
      title: 'Cambios de Contenido Incluidos',
      description:
        'Pequeños cambios de textos, imágenes o secciones incluidos cada mes según el plan.',
    },
    {
      title: 'Revisión de Formularios y Contacto',
      description:
        'Comprobamos que tus vías de contacto sigan funcionando correctamente.',
    },
    {
      title: 'Corrección de Errores',
      description:
        'Detectamos y solucionamos errores visuales o funcionales que puedan aparecer.',
    },
    {
      title: 'Soporte Técnico',
      description:
        'Puedes escribirnos cuando lo necesites para resolver dudas o incidencias.',
    },
    {
      title: 'Informes de Actividad',
      description:
        'Recibes un resumen de lo revisado y actualizado cada mes.',
    },
  ];

  const faqs = [
    {
      question: '¿Es obligatorio el mantenimiento web?',
      answer:
        'No es obligatorio, pero sí recomendable si quieres que la web siga actualizada, revisada y en buen estado después de publicarla.',
    },
    {
      question: '¿Podemos pagar en varias cuotas?',
      answer:
        'El mantenimiento se contrata como plan mensual. Si necesitas un cambio puntual más grande, también podemos presupuestarlo aparte con pago único o fraccionado.',
    },
    {
      question: '¿El presupuesto incluye IVA?',
      answer:
        'Sí, la propuesta que preparamos incluye IVA salvo que se indique lo contrario. El alcance y la cuota mensual se cierran antes de empezar.',
    },
    {
      question: '¿Cuántos cambios incluye cada mes?',
      answer:
        'Depende del plan contratado. Te indicamos el alcance exacto de modificaciones y soporte incluido en la propuesta según lo que necesites.',
    },
    {
      question: '¿Trabajáis solo en Madrid?',
      answer:
        'PereiraWeb tiene base en Torrejón de Ardoz, Madrid, pero trabajamos con clientes de toda España de forma online.',
    },
    {
      question: '¿Podéis mantener una web que no habéis creado vosotros?',
      answer:
        'Sí, podemos hacernos cargo del mantenimiento de webs desarrolladas por otros, revisando antes su estado técnico.',
    },
    {
      question: '¿Qué pasa si necesito algo urgente?',
      answer:
        'Si tienes un plan de mantenimiento activo, tus incidencias tienen prioridad dentro del soporte técnico incluido.',
    },
  ];

  return (
    <>
      {/* 1. Hero de posicionamiento, sin precio como primer impacto */}
      <SEOLandingHero
        title='Mantenimiento web'
        subtitle='Soporte y mejoras para que tu web siga funcionando, cargando bien y transmitiendo confianza después de publicarla.'
        description='Ofrecemos mantenimiento web para negocios que quieren tener la tranquilidad de que su web está atendida y pueden pedir cambios cuando lo necesiten.'
        trustLine='Presupuesto cerrado antes de empezar · Proyectos en toda España · Base en Torrejón de Ardoz, Madrid'
        ctaText='Solicitar orientación'
        onCTAClick={() => handleWhatsApp('LandingMantenimientoHero')}
        secondaryCTAText='Ver trabajos'
        secondaryCTAAction={() => scrollToSection('portfolio')}
        secondaryCTAIcon='chevron-down'
      />

      {/* 2. Bloque de confianza rápida */}
      <TrustBar />

      {/* 3. Para quién es este servicio */}
      <SEOBenefits
        title='¿Necesitas Mantenimiento para tu Web?'
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
              El mantenimiento se adapta al tamaño y las necesidades de tu
              web. Preparamos una propuesta personalizada con el alcance y la
              cuota mensual antes de empezar.
            </p>
          </div>

          <div className='max-w-3xl mx-auto bg-white rounded-xl p-8 md:p-10 border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] relative'>
            <span className='absolute -top-4 left-8 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
              Mantenimiento Web
            </span>

            <p className='text-xs font-semibold text-accent uppercase tracking-wide mb-3 mt-4 text-center'>
              Ideal para: Webs ya publicadas que necesitan soporte continuo
            </p>

            <div className='flex flex-col items-center gap-1 mb-6 text-center'>
              <span className='text-2xl md:text-3xl font-bold text-gray-900'>
                Presupuesto a medida
              </span>
              <span className='text-sm text-gray-500'>
                Cerrado antes de empezar, sin sorpresas.
              </span>
              <span className='text-sm text-gray-500 mt-1'>
                Plan mensual, según el alcance del servicio.
              </span>
              <span className='text-sm text-gray-500'>
                Servicio mensual
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
                Solicitar orientación
              </Button>

              <p className='text-center text-xs text-gray-400 mt-4'>
                Presupuesto orientativo, IVA incluido. La propuesta final se
                cierra antes de empezar, según el alcance real del servicio.
              </p>
            </div>

            <div className='mt-6 text-center'>
              <button
                onClick={() => handleWhatsApp('LandingMantenimientoPrecio')}
                className='inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline'
              >
                <MessageCircle className='w-4 h-4' />O escríbenos directo por
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Qué incluye el mantenimiento web */}
      <div id='incluye' className='scroll-mt-24'>
        <SEOFeatures
          title='Qué Incluye tu Mantenimiento Web'
          subtitle='Todo lo necesario para que tu web siga funcionando y actualizada'
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
              href='/tiendas-online'
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Tiendas online
            </a>
            <button
              type='button'
              onClick={() => openModal('Mantenimiento Web')}
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
        <SEOFAQ
          title='Preguntas Frecuentes sobre Mantenimiento Web'
          faqs={faqs}
        />
      </div>

      {/* 9. Formulario / contacto final */}
      <SEOCTAFinal
        title='¿Hablamos del mantenimiento de tu web?'
        subtitle='Cuéntanos cómo está tu web ahora. Te preparamos una propuesta cerrada de mantenimiento, con alcance y plazos claros.'
        buttonText='Solicitar orientación'
        onButtonClick={handleQuoteRequest}
      />

      <div id='contacto' className='scroll-mt-24'>
        <ContactForm preselectedPlan='Mantenimiento Web' />
      </div>
    </>
  );
};

export default MantenimientoWeb;
