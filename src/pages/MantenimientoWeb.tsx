import { useEffect } from 'react';
import {
  Laptop,
  Wrench,
  ShieldCheck,
  Clock,
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
  MAINTENANCE_WHATSAPP_MESSAGE,
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

  const problems = [
    {
      text: 'La web está online, pero nadie mira actualizaciones, seguridad ni copias.',
    },
    {
      text: 'Cambiar un horario o una foto se convierte en un pelea técnica.',
    },
    {
      text: 'Te da miedo que se caiga o la hackeen y te enteres tarde.',
    },
    {
      text: 'No quieres pelearte con el dominio, el hosting ni avisos raros.',
    },
  ];

  const targetAudience = [
    {
      icon: Laptop,
      title: 'Ya tienes web',
      description: 'Está publicada y quieres que no se quede abandonada.',
    },
    {
      icon: Wrench,
      title: 'Cambios del día a día',
      description: 'Textos, fotos, horarios… sin abrir un ticket eterno.',
    },
    {
      icon: ShieldCheck,
      title: 'Copias y seguridad',
      description: 'Por si un día hay que recuperar o parar un susto.',
    },
    {
      icon: Clock,
      title: 'Alguien al otro lado',
      description: 'Cuando algo falla, escribes y te contestan.',
    },
  ];

  const included = [
    'Cambios pequeños de textos e imágenes',
    'Actualizaciones de seguridad',
    'Copias periódicas',
    'Comprobar que sigue online',
    'Revisar el formulario de contacto',
    'Apaños básicos de carga',
    'Vigilancia ante amenazas',
    'Soporte cuando haya un problema',
    'Ayuda con dominio y hosting',
    'Resumen mensual de lo hecho',
  ];

  const features = [
    {
      title: 'Actualizaciones',
      description: 'Para no dejar la web en una versión vieja y vulnerable.',
    },
    {
      title: 'Copias',
      description: 'Por si hay que volver atrás.',
    },
    {
      title: 'Revisión de seguridad',
      description: 'Miramos fallos antes de que te den un disgusto.',
    },
    {
      title: 'Cambios de contenido',
      description: 'Textos, fotos o secciones, según el plan mensual.',
    },
    {
      title: 'Formulario',
      description: 'Que siga llegando el correo o el aviso de contacto.',
    },
    {
      title: 'Errores',
      description: 'Cosas rotas en pantalla o en el funcionamiento.',
    },
    {
      title: 'Soporte',
      description: 'Escribes cuando lo necesites.',
    },
    {
      title: 'Resumen mensual',
      description: 'Sabes qué se ha tocado ese mes.',
    },
  ];

  const faqs = [
    {
      question: '¿Es obligatorio el mantenimiento?',
      answer:
        'No. Pero si nadie mira la web, acaba dando problemas. Tú decides.',
    },
    {
      question: '¿Se paga a plazos?',
      answer:
        'Es cuota mensual. Un cambio grande puntual se presupuesta aparte.',
    },
    {
      question: '¿Cuánto cuesta?',
      answer:
        'Depende del soporte y de los cambios mensuales. Te pasamos la cuota antes de empezar.',
    },
    {
      question: '¿Lleva IVA?',
      answer: 'Sí, salvo que indiquemos lo contrario. Todo por escrito.',
    },
    {
      question: '¿Cuántos cambios al mes?',
      answer: 'Lo dejamos claro en la propuesta según lo que necesites.',
    },
    {
      question: '¿Podéis mantener una web que no hicisteis vosotros?',
      answer:
        'Sí. Antes miramos el estado técnico y te decimos si tiene sentido.',
    },
    {
      question: '¿Y si es urgente?',
      answer: 'Con plan activo, lo atendemos dentro del soporte incluido.',
    },
  ];

  return (
    <>
      {/* 1. Hero de posicionamiento, sin precio como primer impacto */}
      <SEOLandingHero
        title='Mantenimiento web: que no se te caiga encima'
        subtitle='Actualizaciones, copias, cambios de textos y alguien a quien escribir.'
        description='Si ya tienes web y no quieres pelearte con ella cada mes, esto es para ti.'
        trustLine='Cuota mensual · Alcance por escrito antes de empezar'
        ctaText='Ver qué incluye'
        onCTAClick={() => scrollToSection('incluye')}
        secondaryCTAText='Ver trabajos'
        secondaryCTAAction={() => scrollToSection('portfolio')}
        secondaryCTAIcon='chevron-down'
      />

      <TrustBar />

      <SEOProblem
        title='Una web sin nadie detrás acaba dando problemas'
        subtitle='Lo que solemos ver cuando la página está online… y abandonada.'
        problems={problems}
      />

      <SEOBenefits
        title='¿Te hace falta mantenimiento?'
        benefits={targetAudience}
      />

      <div id='incluye' className='scroll-mt-24'>
        <SEOFeatures
          title='Qué suele incluir el plan'
          subtitle='Lo habitual. Si necesitas más cambios, lo ajustamos.'
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
              Qué tendrás con el plan
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              La cuota depende del tamaño de la web y de cuántos cambios
              mensuales quieras. Te lo escribimos antes.
            </p>
          </div>

          <div className='   mx-auto bg-white rounded-2xl p-8 md:p-10 border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] relative'>
            <span className='absolute -top-4 left-8 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
              Mantenimiento Web
            </span>

            <p className='text-xs font-semibold text-accent uppercase tracking-wide mb-3 mt-4 text-center'>
              Si ya tienes web y no quieres pelearte con ella
            </p>

            <div className='flex flex-col items-center gap-1 mb-6 text-center'>
              <span className='text-2xl md:text-3xl font-bold text-gray-900'>
                Cuota según tu caso
              </span>
              <span className='text-sm text-gray-500'>
                Por escrito, antes de activar el plan.
              </span>
              <span className='text-sm text-gray-500 mt-1'>Plan mensual</span>
              <span className='text-sm text-gray-500'>
                Soporte + cambios incluidos
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
                Orientativo, IVA incluido. La cuota final la cerramos en la
                propuesta según el alcance.
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

      {/* 7. Proceso de trabajo */}
      <SEOProcess title='Cómo solemos trabajar' steps={defaultServiceProcess} />

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
              href='/tiendas-online'
              className='block bg-gray-50 border-2 border-ink-dark rounded-2xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Tiendas online
            </a>
            <button
              type='button'
              onClick={() => openModal('Mantenimiento Web')}
              className='block bg-gray-50 border-2 border-ink-dark rounded-2xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
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
        <SEOFAQ title='Preguntas frecuentes sobre mantenimiento' faqs={faqs} />
      </div>

      <SEOCTAFinal
        title='¿Te hacemos el mantenimiento?'
        subtitle='Cuéntanos cómo está la web ahora. Te pasamos cuota y qué entra.'
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
