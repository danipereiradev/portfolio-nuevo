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
      'Te montamos la web de tu negocio con precio y plazos por escrito antes de empezar.',
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
    'Solo redes: cuando Instagram cambia el algoritmo, desapareces.',
    'Web vieja o confusa: el cliente entra y se va en diez segundos.',
    'Presupuestos hinchados con cosas que no vas a usar.',
    'Quieres saber precio, plazos y qué entra… antes de pagar.',
  ];

  const deliverables = [
    'Web publicada con tu dominio',
    'Diseño propio, no plantilla genérica',
    'Revisada en móvil',
    'Formulario y WhatsApp listos',
    'Hosting y dominio incluidos',
    'Base para que Google la encuentre',
    'Estadísticas de visitas',
    'Propuesta con precio y alcance por escrito',
  ];

  const sectors = [
    {
      icon: Stethoscope,
      title: 'Clínicas y salud',
      description: 'Servicios, equipo, horarios y cómo contactar.',
    },
    {
      icon: Smile,
      title: 'Dentistas',
      description: 'Tratamientos y pedir cita sin laberinto.',
    },
    {
      icon: Brain,
      title: 'Psicólogos',
      description: 'Especialidades y un primer contacto sencillo.',
    },
    {
      icon: Scale,
      title: 'Abogados',
      description: 'Áreas de práctica y contacto discreto.',
    },
    {
      icon: Hammer,
      title: 'Reformas y oficios',
      description: 'Trabajos, zona y pedir presupuesto.',
    },
    {
      icon: GraduationCap,
      title: 'Academias',
      description: 'Cursos, horarios e inscripción.',
    },
    {
      icon: Dumbbell,
      title: 'Gimnasios',
      description: 'Actividades, horarios y altas.',
    },
    {
      icon: Sparkles,
      title: 'Estética',
      description: 'Tratamientos y reserva de cita.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Hostelería',
      description: 'Carta, dónde estás y cómo llamar.',
    },
    {
      icon: Store,
      title: 'Autónomos y pymes',
      description: 'Una web que diga qué haces y cómo te escriben.',
    },
  ];

  const features = [
    {
      title: 'Bien en cualquier pantalla',
      description: 'La miramos en móvil, tablet y ordenador antes de publicar.',
    },
    {
      title: 'Que no se eternice cargando',
      description: 'Páginas e imágenes ligeras. Nadie espera 8 segundos.',
    },
    {
      title: 'Lista para Google',
      description:
        'Títulos y estructura en orden para que el buscador la entienda.',
    },
    {
      title: 'Formulario y WhatsApp',
      description: 'El cliente elige cómo escribirte.',
    },
    {
      title: 'HTTPS desde el día uno',
      description: 'Publicación con conexión segura.',
    },
    {
      title: 'Hosting y dominio incluidos',
      description:
        'Tu dominio, tu alojamiento. Sin subdominios raros ni marcas ajenas.',
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Nos cuentas el caso',
      description: 'Qué haces, a quién te diriges y qué quieres que haga la web.',
    },
    {
      number: '2',
      title: 'Te mandamos la propuesta',
      description: 'Precio, plazos, lo incluido. Por escrito.',
    },
    {
      number: '3',
      title: 'La montamos',
      description: 'Con tu marca, tus textos y tus fotos (o te ayudamos a ordenarlos).',
    },
    {
      number: '4',
      title: 'Revisas y sale online',
      description: 'Afinamos, conectamos el dominio y listo.',
    },
  ];

  const faqs = [
    {
      question: '¿Es una plantilla igual para todos?',
      answer:
        'No. Se adapta a tu imagen, textos y fotos. Si solo quieres una plantilla barata, hay sitios mejores para eso.',
    },
    {
      question: '¿Cuánto cuesta?',
      answer:
        'Orientación: muchas webs entre 400 € y 3.000 € + IVA. Te damos un número concreto tras hablar contigo.',
    },
    {
      question: '¿Quién prepara textos e imágenes?',
      answer:
        'Tú nos mandas lo que tengas. Lo ordenamos y lo metemos en la web. Redactar todo desde cero se valora aparte.',
    },
    {
      question: '¿Puedo usar mi dominio?',
      answer:
        'Sí, es tuyo. Lo configuramos o te ayudamos a registrar uno nuevo.',
    },
    {
      question: '¿El hosting está incluido?',
      answer:
        'Sí, para publicar la web. Lo confirmamos en la propuesta.',
    },
    {
      question: '¿Cuánto tarda?',
      answer:
        'Depende del alcance. El plazo de la propuesta cuenta desde que tenemos lo necesario, no desde el primer “hola”.',
    },
    {
      question: '¿Y si quiero vender productos?',
      answer:
        'Eso es tienda online. Te pasamos a esa propuesta.',
    },
  ];

  return (
    <>
      <SEOLandingHero
        kicker='Web a medida'
        title='Tu web, hecha para que te escriban'
        subtitle='Estructura, móvil, formulario y WhatsApp. Con tu marca, no con una plantilla de moda.'
        description='Cuéntanos el caso y te pasamos precio y plazos antes de empezar.'
        trustLine='Sin plantillas genéricas · Hablas con quien la hace · Propuesta por escrito'
        ctaText='Solicitar presupuesto'
        onCTAClick={() => openQuote('Hero')}
        secondaryCTAText='Hablar por WhatsApp'
        secondaryCTAAction={() => handleWhatsApp('LandingWebAMedidaHero')}
        secondaryCTAIcon='phone'
        ctaFootnote='Respondemos rápido · Preguntar no compromete'
      />

      <TrustBar />

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Si tu web no ayuda a conseguir clientes, sobra
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Situaciones que vemos a menudo antes de arrancar un proyecto.
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
              ¿Para quién es?
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Autónomos, pymes y negocios locales. Da igual la ciudad: trabajamos
              online.
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

      <section
        id='incluye'
        className='relative py-20 overflow-hidden scroll-mt-24 bg-white'
      >
        <div className='relative z-10 container mx-auto px-6'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl font-bold text-gray-900 mb-4'>
              Qué suele llevar la web
            </h2>
            <p className='text-gray-600 text-base md:text-lg'>
              Lo básico para presentarte y que te contacten. Sin relleno.
            </p>
          </div>
          <div className='max-w-5xl mx-auto grid md:grid-cols-2 gap-5'>
            {features.map((feature) => (
              <div
                key={feature.title}
                className='rounded-xl border-2 border-ink-dark bg-white p-5 md:p-6 shadow-[4px_4px_0_0_#1a1a1a]'
              >
                <div className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <div>
                    <h3 className='text-lg font-bold text-gray-900 mb-1'>
                      {feature.title}
                    </h3>
                    <p className='text-sm md:text-base text-gray-700'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center mb-10'>
            <h2 className='text-2xl md:text-4xl font-bold text-gray-900 mb-4'>
              Qué tendrás al terminar
            </h2>
            <p className='text-gray-600 text-base md:text-lg'>
              No entregamos solo un diseño. Dejamos la web online y funcionando.
            </p>
          </div>
          <ul className='max-w-3xl mx-auto grid sm:grid-cols-2 gap-4'>
            {deliverables.map((item) => (
              <li
                key={item}
                className='flex items-start gap-3 bg-white border-2 border-ink-dark rounded-lg p-4 shadow-[3px_3px_0_0_#1a1a1a]'
              >
                <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                <span className='text-sm md:text-base text-gray-800 font-medium'>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center'>
            <Button onClick={() => openQuote('Deliverables')} variant='primary'>
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

      <section className='py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl font-bold text-gray-900 mb-4'>
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
        title='Cuéntanos qué web necesitas'
        subtitle='Si encaja, te enviamos propuesta con precio, plazos y lo incluido. Si no, te lo decimos.'
        buttonText='Solicitar presupuesto'
        onButtonClick={() => openQuote('CTAFinal')}
        secondaryButtonText='Hablar por WhatsApp'
        onSecondaryButtonClick={() => handleWhatsApp('LandingWebAMedidaCTAFinal')}
      />

      <div id='contacto' className='scroll-mt-24 py-4'>
        <ContactForm />
      </div>
    </>
  );
};

export default WebProfesionalAMedida;
