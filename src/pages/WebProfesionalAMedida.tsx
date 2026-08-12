import { useEffect } from 'react';
import {
  Stethoscope,
  Smile,
  Scale,
  Brain,
  Hammer,
  GraduationCap,
  Dumbbell,
  Sparkles,
  UtensilsCrossed,
  Store,
  Check,
  MessageCircle,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackPricingCtaClick,
} from '../utils/analytics';
import {
  ADS_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import SEOLandingHero from '../components/SEOLandingHero';
import TrustBar from '../components/TrustBar';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import ContactForm from '../components/ContactForm';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Button from '../components/Button';

const WHATSAPP_URL = buildWhatsAppUrl(ADS_WHATSAPP_MESSAGE);
const SITE_URL = 'https://pereiraweb.es';
const FORM_PLAN = 'Web a Medida';

const WebProfesionalAMedida = () => {
  const { openModal } = useContactModal();

  usePageMeta('/web-profesional-a-medida');

  useJsonLd('jsonld-web-profesional-a-medida', {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Diseño y desarrollo de páginas web a medida',
    name: 'Web profesional a medida para empresas y autónomos',
    provider: {
      '@type': 'ProfessionalService',
      name: 'PereiraWeb',
      url: SITE_URL,
    },
    areaServed: 'ES',
    url: `${SITE_URL}/web-profesional-a-medida/`,
    description:
      'Diseño y desarrollo de webs profesionales a medida, con presupuesto cerrado antes de empezar.',
  });

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const timeoutId = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleWhatsApp = (location: string) => {
    trackWhatsAppClick(location);
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  const openQuote = (ctaText: string) => {
    trackPricingCtaClick(FORM_PLAN, ctaText);
    openModal(FORM_PLAN);
  };

  const problems = [
    'Depender solo de redes sociales hace más difícil que te encuentren y confíen en tu negocio.',
    'Una web antigua o poco clara puede hacer que un posible cliente se vaya.',
    'No necesitas pagar por herramientas que no vas a usar.',
    'Mereces saber el precio, los plazos y lo incluido antes de empezar.',
  ];

  const deliverables = [
    'Una web completa y publicada',
    'Diseño propio, sin plantillas genéricas',
    'Versión móvil revisada',
    'Formulario y WhatsApp funcionando',
    'Tu dominio conectado',
    'Preparada para aparecer en Google',
    'Estadísticas de visitas configuradas',
    'Propuesta clara con precio y alcance por escrito',
  ];

  const sectors = [
    {
      icon: Stethoscope,
      title: 'Clínicas y salud',
      description: 'Servicios, equipo, horarios y contacto claro.',
    },
    {
      icon: Smile,
      title: 'Dentistas',
      description: 'Tratamientos, confianza y solicitud de cita sencilla.',
    },
    {
      icon: Brain,
      title: 'Psicólogos y clínicas',
      description: 'Especialidades y un primer contacto sin fricción.',
    },
    {
      icon: Scale,
      title: 'Abogados y despachos',
      description: 'Áreas de práctica y contacto discreto.',
    },
    {
      icon: Hammer,
      title: 'Reformas y servicios',
      description: 'Trabajos, zona de actuación y presupuesto fácil.',
    },
    {
      icon: GraduationCap,
      title: 'Academias',
      description: 'Cursos, horarios y matriculación claros.',
    },
    {
      icon: Dumbbell,
      title: 'Gimnasios',
      description: 'Actividades, horarios y captación de altas.',
    },
    {
      icon: Sparkles,
      title: 'Estética y bienestar',
      description: 'Tratamientos, resultados y reserva de cita.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Hostelería',
      description: 'Carta, ubicación y contacto directo.',
    },
    {
      icon: Store,
      title: 'Autónomos y pymes',
      description: 'Una presencia profesional para mostrar lo que haces.',
    },
  ];

  const features = [
    {
      title: 'Se ve bien en cualquier pantalla',
      description: 'Revisamos la web para móvil, tablet y ordenador.',
    },
    {
      title: 'Carga rápido',
      description:
        'Optimizamos páginas e imágenes para que tus visitas no esperen.',
    },
    {
      title: 'Preparada para Google',
      description:
        'Dejamos la configuración inicial para que Google pueda encontrarla.',
    },
    {
      title: 'Formulario y WhatsApp',
      description: 'Tus clientes contactan como les resulte más cómodo.',
    },
    {
      title: 'Web segura',
      description: 'Publicación con conexión segura desde el primer día.',
    },
    {
      title: 'Tu propio dominio',
      description: 'Sin marcas ni subdominios gratuitos.',
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Nos cuentas tu proyecto',
      description:
        'Qué haces, qué necesitas y qué quieres conseguir con la web.',
    },
    {
      number: '2',
      title: 'Recibes propuesta clara',
      description:
        'Precio cerrado, plazos, lo incluido y la forma de trabajo, por escrito.',
    },
    {
      number: '3',
      title: 'Diseñamos y desarrollamos',
      description: 'Adaptamos la web a tu marca y a cómo trabaja tu negocio.',
    },
    {
      number: '4',
      title: 'Revisas y publicamos',
      description:
        'Afinamos contigo, conectamos el dominio y dejamos la web online.',
    },
  ];

  const faqs = [
    {
      question: '¿Es una plantilla igual para todos?',
      answer:
        'No. Cada web se adapta a la imagen, los textos y las fotos de tu negocio.',
    },
    {
      question: '¿Cuánto cuesta una web profesional?',
      answer:
        'No hay una tarifa fija pública. Como orientación, la mayoría de webs profesionales suelen situarse entre 400 € y 3.000 € + IVA, según el alcance. Tras hablar contigo te enviamos una propuesta concreta con precio, plazos y lo incluido.',
    },
    {
      question: '¿Quién prepara los textos y las imágenes?',
      answer:
        'Tú nos envías la información que tengas. Nosotros te ayudamos a ordenarla y la adaptamos a la web. La redacción completa desde cero se valora aparte.',
    },
    {
      question: '¿Puedo utilizar mi propio dominio?',
      answer:
        'Sí. El dominio es siempre tuyo. Podemos ayudarte a configurarlo o a registrar uno nuevo si hace falta.',
    },
    {
      question: '¿El alojamiento está incluido?',
      answer:
        'Sí. El alojamiento para publicar la web está incluido. Te lo confirmamos en la propuesta.',
    },
    {
      question: '¿Cuánto tarda en estar lista?',
      answer:
        'Depende del alcance. En la propuesta te indicamos un plazo realista. El plazo empieza cuando tenemos la información necesaria.',
    },
    {
      question: '¿Podéis hacer una tienda online?',
      answer:
        'Sí. Si lo que necesitas es vender productos, te orientamos al servicio de tienda online con una propuesta específica.',
    },
  ];

  return (
    <>
      <SEOLandingHero
        kicker='WEB PROFESIONAL A MEDIDA'
        title='Tu web profesional, hecha para captar clientes'
        subtitle='Diseñamos y publicamos una web adaptada a tu negocio, lista para móvil, Google y contacto por formulario o WhatsApp.'
        description='Cuéntanos qué necesitas y te preparamos un presupuesto claro antes de empezar.'
        trustLine='Sin plantillas genéricas · Trato directo · Propuesta clara por escrito'
        ctaText='Solicitar presupuesto'
        onCTAClick={() => openQuote('Hero')}
        secondaryCTAText='Hablar por WhatsApp'
        secondaryCTAAction={() => handleWhatsApp('LandingWebAMedidaHero')}
        secondaryCTAIcon='phone'
        ctaFootnote='Respondemos muy rápido · Sin compromiso'
      />

      <TrustBar />

      <section className='py-20 bg-accent'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-ink-dark mb-4'>
              Una web debe ayudarte a conseguir clientes
            </h2>
            <p className='text-base md:text-lg text-ink-dark/80'>
              Esto es lo que solemos ver cuando un negocio todavía no tiene una
              presencia clara online.
            </p>
          </div>
          <div className='max-w-4xl mx-auto grid md:grid-cols-2 gap-5'>
            {problems.map((problem) => (
              <div
                key={problem}
                className='flex gap-4 p-5 md:p-6 bg-white rounded-xl border-2 border-ink-dark shadow-[5px_5px_0_0_#1a1a1a]'
              >
                <span className='text-ink-dark font-black text-xl leading-none'>
                  !
                </span>
                <p className='text-gray-800 font-medium'>{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              ¿Es esta web para tu negocio?
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Trabajamos con autónomos, pymes y negocios locales de toda España.
            </p>
          </div>
          <div className='max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <div
                  key={sector.title}
                  className='bg-white rounded-xl border-2 border-ink-dark p-5 shadow-[4px_4px_0_0_#1a1a1a]'
                >
                  <Icon className='w-7 h-7 text-accent mb-3' />
                  <h3 className='text-lg font-bold text-gray-900 mb-1'>
                    {sector.title}
                  </h3>
                  <p className='text-sm text-gray-600'>{sector.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id='incluye' className='relative py-20 overflow-hidden scroll-mt-24'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: "url('/img/cta-background.webp')" }}
          aria-hidden='true'
        />
        <div className='absolute inset-0 bg-ink-dark/85' aria-hidden='true' />
        <div className='relative z-10 container mx-auto px-6'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl font-bold text-white mb-4'>
              Qué incluye tu web profesional
            </h2>
            <p className='text-white/70 text-base md:text-lg'>
              Lo esencial para presentar tu negocio y recibir contactos.
            </p>
          </div>
          <div className='max-w-5xl mx-auto grid md:grid-cols-2 gap-5'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='rounded-xl border-2 border-accent/40 bg-white/10 backdrop-blur-[2px] p-5 md:p-6'
              >
                <div className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <div>
                    <h3 className='text-lg font-bold text-white mb-1'>
                      {feature.title}
                    </h3>
                    <p className='text-sm md:text-base text-white/75'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='relative py-20 overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: "url('/img/hero-home.webp')" }}
          aria-hidden='true'
        />
        <div className='absolute inset-0 bg-ink-dark/85' aria-hidden='true' />
        <div className='relative z-10 container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center mb-10'>
            <h2 className='text-2xl md:text-4xl font-bold text-white mb-4'>
              Qué tendrás al terminar
            </h2>
            <p className='text-white/70 text-base md:text-lg'>
              No entregamos solo un diseño. Dejamos la web online y funcionando.
            </p>
          </div>
          <ul className='max-w-3xl mx-auto grid sm:grid-cols-2 gap-4'>
            {deliverables.map((item) => (
              <li
                key={item}
                className='flex items-start gap-3 bg-white/10 backdrop-blur-[2px] border-2 border-white/20 rounded-lg p-4'
              >
                <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                <span className='text-sm md:text-base text-white font-medium'>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              onClick={() => openQuote('Deliverables')}
              variant='primary'
              className='!bg-accent !text-ink-dark'
            >
              Solicitar presupuesto
            </Button>
            <button
              type='button'
              onClick={() => handleWhatsApp('LandingWebAMedidaDeliverables')}
              className='inline-flex items-center justify-center gap-2 text-sm font-semibold text-accent hover:underline'
            >
              <MessageCircle className='w-4 h-4' />
              WhatsApp
            </button>
          </div>
        </div>
      </section>

      <section className='py-20 bg-accent'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl font-bold text-ink-dark mb-4'>
              Así será el proceso
            </h2>
          </div>
          <div className='max-w-3xl mx-auto space-y-5'>
            {processSteps.map((step) => (
              <div
                key={step.number}
                className='flex gap-4 md:gap-6 bg-white border-2 border-ink-dark rounded-xl p-5 md:p-6 shadow-[5px_5px_0_0_#1a1a1a]'
              >
                <span className='flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-ink-dark text-accent font-extrabold flex items-center justify-center text-lg'>
                  {step.number}
                </span>
                <div>
                  <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-1'>
                    {step.title}
                  </h3>
                  <p className='text-sm md:text-base text-gray-700'>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id='portfolio' className='scroll-mt-24'>
        <Portfolio />
      </div>

      <Testimonials id='valoraciones' />

      <section id='faq' className='scroll-mt-24 py-4 bg-gray-50'>
        <SEOFAQ
          title='Preguntas frecuentes'
          faqs={faqs}
        />
      </section>

      <SEOCTAFinal
        title='Cuéntanos qué web necesita tu negocio'
        subtitle='Te diremos si encaja contigo y te enviaremos una propuesta con precio, plazos y todo lo incluido por escrito.'
        buttonText='Solicitar presupuesto'
        onButtonClick={() => openQuote('CTAFinal')}
        secondaryButtonText='Hablar por WhatsApp'
        onSecondaryButtonClick={() => handleWhatsApp('LandingWebAMedidaCTAFinal')}
      />

      <div id='contacto' className='scroll-mt-24 bg-accent/30 py-4'>
        <ContactForm />
      </div>
    </>
  );
};

export default WebProfesionalAMedida;
