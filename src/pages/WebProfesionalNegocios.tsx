import { useEffect, useState } from 'react';
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
  ChevronDown,
  MessageCircle,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useSectionView } from '../hooks/useSectionView';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackPricingCtaClick,
  trackViewPricing,
} from '../utils/analytics';
import {
  BUSINESS_PACKS_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import {
  webPacks,
  maintenancePlans,
  CUSTOM_MAINTENANCE_NOTE,
  OUT_OF_SCOPE_NOTE,
} from '../config/webProfesionalNegociosPricing';
import { WEB_START_PRICE } from '../config/webStart';
import SEOLandingHero from '../components/SEOLandingHero';
import TrustBar from '../components/TrustBar';
import SEOProblem from '../components/SEOProblem';
import SEOBenefits from '../components/SEOBenefits';
import SEOFeatures from '../components/SEOFeatures';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import ContactForm from '../components/ContactForm';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Button from '../components/Button';

const WHATSAPP_URL = buildWhatsAppUrl(BUSINESS_PACKS_WHATSAPP_MESSAGE);
const SITE_URL = 'https://pereiraweb.es';

const WebProfesionalNegocios = () => {
  const { openModal } = useContactModal();
  const [expandedPackId, setExpandedPackId] = useState<string | null>(null);

  usePageMeta('/web-profesional-360');

  useJsonLd('jsonld-web-profesional-360', {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Diseño y desarrollo de páginas web',
    name: 'Webs profesionales para autónomos, pymes y negocios locales',
    provider: {
      '@type': 'ProfessionalService',
      name: 'PereiraWeb',
      url: SITE_URL,
    },
    areaServed: 'ES',
    url: `${SITE_URL}/web-profesional-360/`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Modalidades de Web Profesional 360',
      itemListElement: webPacks.map((pack) => ({
        '@type': 'Offer',
        name: pack.name,
        priceCurrency: 'EUR',
        price: pack.priceFrom.replace(/[^\d]/g, ''),
        description: pack.idealFor,
      })),
    },
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Permite llegar directamente a una sección vía ancla en la URL
  // (ej. /web-profesional-360#packs desde un sitelink de Google Ads).
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

  const handlePackCta = (pack: (typeof webPacks)[number]) => {
    trackPricingCtaClick(pack.formPlanName, pack.ctaText);
    if (pack.href) return;
    openModal(pack.formPlanName);
  };

  const handleOpenFormGeneric = () => {
    trackPricingCtaClick('Web profesional para negocios', 'Abrir formulario');
    openModal();
  };

  const togglePackDetails = (packId: string) => {
    setExpandedPackId((current) => (current === packId ? null : packId));
  };

  const problems = [
    {
      text: 'Depender solo de redes sociales hace más difícil que te encuentren y confíen en tu negocio.',
    },
    {
      text: 'Una web antigua o poco clara puede hacer que un posible cliente se vaya.',
    },
    {
      text: 'No necesitas pagar por herramientas que no vas a usar.',
    },
    {
      text: 'Tampoco deberías empezar sin saber cuánto costará todo.',
    },
  ];

  const deliverables = [
    'Una web completa y publicada',
    'Entre 4 y 6 páginas principales',
    'Diseño propio, sin plantillas genéricas',
    'Versión móvil revisada',
    'Formulario y WhatsApp funcionando',
    'Tu dominio conectado',
    'Preparada para aparecer en Google',
    'Estadísticas de visitas configuradas',
  ];

  const sectors = [
    {
      icon: Stethoscope,
      title: 'Clínicas Veterinarias',
      description:
        'Servicios, equipo veterinario, horarios y contacto claro para dueños de mascotas.',
    },
    {
      icon: Smile,
      title: 'Dentistas y Clínicas Dentales',
      description:
        'Tratamientos, equipo, ubicación y solicitud de cita presentados con claridad y confianza.',
    },
    {
      icon: Brain,
      title: 'Psicólogos y Clínicas',
      description:
        'Especialidades, forma de trabajar y un primer contacto sencillo para el paciente.',
    },
    {
      icon: Scale,
      title: 'Abogados y Despachos',
      description:
        'Áreas de práctica, confianza profesional y una vía de contacto directa y discreta.',
    },
    {
      icon: Hammer,
      title: 'Reformas y Servicios Locales',
      description:
        'Trabajos realizados, zona de actuación y solicitud de presupuesto sin fricción.',
    },
    {
      icon: GraduationCap,
      title: 'Academias y Centros de Formación',
      description:
        'Cursos, horarios y matriculación explicados con claridad para alumnos y familias.',
    },
    {
      icon: Dumbbell,
      title: 'Gimnasios y Centros Deportivos',
      description:
        'Instalaciones, actividades, horarios, tarifas y contacto para captar nuevas altas.',
    },
    {
      icon: Sparkles,
      title: 'Centros de Estética y Bienestar',
      description:
        'Tratamientos, resultados, equipo y reserva de cita en una web visual y profesional.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Restaurantes y Hostelería',
      description:
        'Carta, ubicación y reserva o contacto directo, con una presentación cuidada.',
    },
    {
      icon: Store,
      title: 'Autónomos y Pequeñas Empresas',
      description:
        'Una presencia profesional clara para cualquier negocio que necesite mostrarse bien.',
    },
  ];

  const genericFeatures = [
    {
      title: 'Se ve bien en cualquier pantalla',
      description:
        'Revisamos la web para móvil, tablet y ordenador.',
    },
    {
      title: 'Carga rápido',
      description:
        'Optimizamos páginas e imágenes para que tus visitas no tengan que esperar.',
    },
    {
      title: 'Preparada para Google',
      description:
        'Dejamos la configuración inicial para que Google pueda encontrar y entender tu web.',
    },
    {
      title: 'Formulario y WhatsApp',
      description:
        'Tus clientes podrán contactar de la forma que les resulte más cómoda.',
    },
    {
      title: 'Web segura',
      description:
        'La publicamos con conexión segura desde el primer día.',
    },
    {
      title: 'Estadísticas de visitas',
      description:
        'Podrás saber cuántas personas visitan tu web y desde dónde llegan.',
    },
    {
      title: 'Fácil de usar',
      description:
        'Organizamos la información para que cualquier persona encuentre lo que busca.',
    },
    {
      title: 'Tu propio dominio',
      description:
        'La web se publica con tu dirección, sin marcas ni subdominios gratuitos.',
    },
    {
      title: 'Publicación incluida',
      description:
        'Nos ocupamos de dejarla online y funcionando.',
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Hablamos de tu negocio',
      description:
        'Nos cuentas qué haces, qué necesitas y qué quieres conseguir con la web.',
    },
    {
      number: '2',
      title: 'Nos envías el contenido',
      description:
        'Recibimos tus textos, imágenes, logo y datos de contacto. Te ayudamos a ordenarlo.',
    },
    {
      number: '3',
      title: 'Diseñamos la web',
      description:
        'Adaptamos el diseño a tu marca y preparamos todas las páginas incluidas.',
    },
    {
      number: '4',
      title: 'La revisas',
      description:
        'Nos envías los cambios dentro de las dos rondas incluidas.',
    },
    {
      number: '5',
      title: 'La publicamos',
      description:
        'Conectamos tu dominio y dejamos la web online y funcionando.',
    },
    {
      number: '6',
      title: 'Seguimos contigo si lo necesitas',
      description:
        'El mantenimiento es opcional y se puede contratar después.',
    },
  ];

  const faqs = [
    {
      question: '¿Es una plantilla igual para todos?',
      answer:
        'No. Cada web se adapta a la imagen, los textos y las fotos de tu negocio. No entregamos la misma plantilla a todo el mundo.',
    },
    {
      question: '¿Qué diferencia hay entre 360 Start, 360 Presencia y 360 Gestión?',
      answer:
        '360 Start es la opción más sencilla y económica, con alcance cerrado y una sola ronda de cambios. 360 Presencia y 360 Gestión comparten la misma base profesional más completa: en Presencia nos ocupamos nosotros de los cambios; en Gestión, además, tienes un panel sencillo para actualizar ciertos contenidos por tu cuenta.',
    },
    {
      question: '¿Quién prepara los textos y las imágenes?',
      answer:
        'Tú nos envías la información, los textos, el logo y las fotos que tengas. Nosotros te ayudamos a ordenarlo y lo adaptamos a la web. Si necesitas redacción completa desde cero, lo valoramos aparte.',
    },
    {
      question: '¿Puedo utilizar mi propio dominio?',
      answer:
        'Sí. El dominio es siempre tuyo. Podemos ayudarte a configurarlo o a registrar uno nuevo si hace falta; en ese caso te lo indicamos antes de empezar.',
    },
    {
      question: '¿El alojamiento está incluido?',
      answer:
        'Sí. El alojamiento para publicar la web está incluido en el servicio. Te lo confirmamos por escrito antes de empezar.',
    },
    {
      question: '¿El mantenimiento es obligatorio?',
      answer:
        'No. Es opcional. Sin mantenimiento, la web sigue siendo tuya y puede seguir online.',
    },
    {
      question: '¿Qué ocurre si cancelo el mantenimiento?',
      answer:
        'Tu web sigue siendo tuya y no se retira. Dejas de recibir actualizaciones, copias de seguridad, soporte y los minutos de cambios del plan.',
    },
    {
      question: '¿Está preparada para aparecer en Google?',
      answer:
        'Sí. Dejamos una configuración inicial para que Google pueda encontrar y entender tu web. Nadie puede garantizar la primera posición. Mejorar posiciones mes a mes es un servicio aparte.',
    },
    {
      question: '¿Puedo añadir reservas o una tienda online?',
      answer:
        'Sí, pero se presupuesta aparte. Si lo que necesitas es vender productos online, te orientamos hacia el servicio de tienda online.',
    },
    {
      question: '¿Cuánto tarda en estar lista?',
      answer:
        'El plazo habitual es de 2–3 semanas. El plazo empieza cuando tenemos toda la información necesaria.',
    },
    {
      question: '¿Qué necesito entregar para empezar?',
      answer:
        'La información de tu negocio, textos, logo, imágenes y datos de contacto. Si te falta algo, te ayudamos a ordenar lo que tengas.',
    },
    {
      question: '¿Qué no está incluido en el precio?',
      answer:
        'No incluye redacción completa desde cero, nuevas páginas fuera de lo acordado, reservas, tienda online ni el trabajo mensual de posicionamiento en Google. Si lo necesitas, te lo presupuestamos antes de hacerlo.',
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <SEOLandingHero
        kicker='WEB PROFESIONAL 360'
        title='Tu web profesional, lista en pocos días'
        subtitle='Diseñamos y publicamos una web adaptada a tu negocio, preparada para móvil, Google y contacto por formulario o WhatsApp.'
        description={`Tres opciones claras desde ${WEB_START_PRICE}. Pago único o fraccionado.`}
        trustLine='El plazo empieza cuando tenemos toda la información necesaria.'
        ctaText='Ver precios'
        onCTAClick={() => scrollToSection('packs')}
        secondaryCTAText='Cuéntanos qué necesitas'
        secondaryCTAAction={() => scrollToSection('contacto')}
        secondaryCTAIcon='chevron-down'
        ctaFootnote='360 Start · 360 Presencia · 360 Gestión'
      />

      {/* 2. Bloque de confianza rápida */}
      <TrustBar />

      {/* 3. Modalidades */}
      <section
        id='packs'
        ref={pricingSectionRef}
        className='scroll-mt-24 py-20 bg-white'
      >
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-2xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Elige la opción que encaja con tu negocio
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Tres precios claros. 360 Start es la vía más sencilla; Presencia
              y Gestión son la base profesional completa, según si prefieres
              pedirnos los cambios o actualizar algunos contenidos tú mismo.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start'>
            {webPacks.map((pack) => {
              const isExpanded = expandedPackId === pack.id;
              const visibleIncludes = pack.includes.slice(
                0,
                pack.highlightsCount,
              );
              const restIncludes = pack.includes.slice(pack.highlightsCount);

              return (
                <div
                  key={pack.id}
                  className={`rounded-xl p-6 md:p-7 border-2 flex flex-col relative transition-all duration-200 ${
                    pack.recommended
                      ? 'bg-ink-dark text-white border-accent shadow-[7px_7px_0_0_#0d9488]'
                      : 'bg-white border-ink-dark shadow-[7px_7px_0_0_#1a1a1a]'
                  }`}
                >
                  {pack.recommended && (
                    <div className='absolute -top-4 left-6 bg-accent text-ink-dark px-4 py-1.5 border-2 border-white text-xs md:text-sm font-bold rotate-[-2deg]'>
                      Recomendado para la mayoría
                    </div>
                  )}
                  {pack.id === 'start' && (
                    <div className='absolute -top-4 left-6 bg-white text-ink-dark px-4 py-1.5 border-2 border-ink-dark text-xs md:text-sm font-bold rotate-[-2deg]'>
                      Presupuesto más ajustado
                    </div>
                  )}

                  <div className='mb-6 mt-2'>
                    <h3
                      className={`text-xl md:text-2xl font-bold mb-2 ${pack.recommended ? 'text-white' : 'text-gray-900'}`}
                    >
                      {pack.name}
                    </h3>
                    <p className='text-sm font-bold text-accent uppercase tracking-wide mb-4'>
                      Ideal para: {pack.idealFor}
                    </p>
                    <div className='flex flex-col gap-0.5'>
                      <span
                        className={`inline-block origin-left motion-safe:animate-price-pulse text-2xl md:text-3xl font-bold ${pack.recommended ? 'text-white' : 'text-gray-900'}`}
                      >
                        {pack.priceFrom}
                      </span>
                      <span
                        className={`text-sm ${pack.recommended ? 'text-white/60' : 'text-gray-500'}`}
                      >
                        {pack.priceNote}
                      </span>
                    </div>
                  </div>

                  <ul className='space-y-3 mb-4'>
                    {visibleIncludes.map((item, index) => (
                      <li key={index} className='flex items-start gap-3'>
                        <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                        <span
                          className={`text-sm md:text-base ${pack.recommended ? 'text-white/90' : 'text-gray-800'}`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {restIncludes.length > 0 && (
                    <div className='mb-6'>
                      {isExpanded && (
                        <ul className='space-y-3 mb-4'>
                          {restIncludes.map((item, index) => (
                            <li key={index} className='flex items-start gap-3'>
                              <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                              <span
                                className={`text-sm md:text-base ${pack.recommended ? 'text-white/90' : 'text-gray-800'}`}
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <button
                        type='button'
                        onClick={() => togglePackDetails(pack.id)}
                        aria-expanded={isExpanded}
                        className='inline-flex items-center gap-1.5 text-sm font-semibold hover:underline text-accent'
                      >
                        {isExpanded
                          ? 'Ver menos'
                          : `Ver todo lo incluido (+${restIncludes.length})`}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                  )}

                  <div className='mt-auto'>
                    <Button
                      href={pack.href}
                      onClick={() => handlePackCta(pack)}
                      variant='primary'
                      fullWidth
                      className={
                        pack.recommended
                          ? '!bg-accent !text-ink-dark'
                          : '!bg-ink-dark !text-white hover:!bg-accent hover:!text-ink-dark'
                      }
                    >
                      {pack.ctaText}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className='text-center text-sm text-gray-600 mt-8 max-w-3xl mx-auto leading-relaxed'>
            360 Start cuesta {WEB_START_PRICE}, 360 Presencia 1.090 € + IVA y
            360 Gestión 1.590 € + IVA para los proyectos que encajen en lo
            indicado. Antes de empezar confirmaremos por escrito el precio y
            todo lo incluido.
          </p>

          <div className='mt-6 text-center'>
            <button
              onClick={() => handleWhatsApp('LandingNegociosPacks')}
              className='inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline'
            >
              <MessageCircle className='w-4 h-4' />O escríbenos directo por
              WhatsApp
            </button>
          </div>

          <div className='mt-10 max-w-xl mx-auto'>
            <div className='relative text-center bg-gray-50 border-[3px] border-ink-dark rounded-xl p-6 md:p-8 shadow-[7px_7px_0_0_#1a1a1a]'>
              <span className='inline-block bg-white text-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1.5 border-2 border-ink-dark rotate-[-2deg] mb-4 shadow-[3px_3px_0_0_#1a1a1a]'>
                Proyecto a medida
              </span>
              <p className='text-base md:text-lg text-gray-800 font-bold leading-snug mb-5'>
                ¿Necesitas funciones especiales o un proyecto completamente
                personalizado? Descubre el servicio de Web a Medida.
              </p>
              <div className='flex justify-center'>
                <Button href='/web-a-medida' variant='primary'>
                  Ver Web a Medida
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.1 Qué recibes */}
      <section className='py-16 md:py-20 bg-gray-50 border-y-2 border-ink-dark/10'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center mb-10'>
            <h2 className='text-2xl md:text-4xl font-bold text-gray-900 mb-4'>
              Qué tendrás al terminar
            </h2>
          </div>
          <ul className='max-w-3xl mx-auto grid sm:grid-cols-2 gap-4 mb-8'>
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
          <p className='max-w-2xl mx-auto text-center text-base md:text-lg text-gray-700 font-semibold'>
            No entregamos solo un diseño. Dejamos la web online y funcionando.
          </p>
        </div>
      </section>

      {/* 4. Problema y solución */}
      <SEOProblem
        title='Una web debe ayudarte a conseguir clientes, no darte más trabajo'
        subtitle='Esto es lo que solemos ver cuando un negocio todavía no tiene una presencia clara online.'
        problems={problems}
      />
      <div className='bg-white pt-6 pb-16 md:pt-8 md:pb-20'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center bg-gray-50 border-2 border-ink-dark rounded-xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
            <p className='text-base md:text-lg text-gray-800 font-medium leading-relaxed'>
              Web Profesional 360 reúne lo necesario para tener una presencia
              seria, clara y lista para recibir contactos.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Para quién es */}
      <SEOBenefits title='¿Es Esta Web para tu Negocio?' benefits={sectors} />

      {/* 6. Qué incluye */}
      <div id='incluye' className='scroll-mt-24'>
        <SEOFeatures
          title='Qué incluye Web Profesional 360'
          subtitle='Sea cual sea la modalidad que elijas, esto viene siempre incluido'
          features={genericFeatures}
        />
      </div>

      {/* 6.1 También podemos ayudarte con (enlaces internos a servicios relacionados) */}
      <section className='py-16 bg-white border-t-2 border-gray-100'>
        <div className='container mx-auto px-6'>
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
            <a
              href='/sobre-el-estudio'
              className='block bg-gray-50 border-2 border-ink-dark rounded-xl p-5 text-center font-bold text-gray-900 shadow-[4px_4px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Sobre el estudio
            </a>
          </div>
        </div>
      </section>

      {/* 6.2 Portfolio o trabajos reales */}
      <div id='portfolio' className='scroll-mt-24'>
        <Portfolio />
      </div>

      {/* 6.3 Valoraciones de clientes */}
      <Testimonials id='valoraciones' />

      {/* 6.4 Qué necesitamos de tu parte */}
      <section className='py-16 md:py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-2xl md:text-4xl font-bold text-gray-900 mb-5'>
              ¿Qué necesitamos de tu parte?
            </h2>
            <p className='text-base md:text-lg text-gray-700 leading-relaxed mb-4'>
              Nos envías la información de tu negocio, los textos, el logo y las
              imágenes que tengas. Nosotros te ayudamos a ordenarlo y lo
              adaptamos al diseño de la web.
            </p>
            <p className='text-sm md:text-base text-gray-600 leading-relaxed bg-gray-50 border-2 border-ink-dark rounded-xl p-5 shadow-[4px_4px_0_0_#1a1a1a]'>
              Si necesitas que redactemos todos los textos desde cero o que
              busquemos material adicional, lo valoramos aparte antes de
              empezar.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Proceso */}
      <SEOProcess title='Así será el proceso' steps={processSteps} />
      <div className='bg-white pt-2 pb-16 md:pb-20'>
        <div className='container mx-auto px-6 text-center space-y-3'>
          <p className='text-sm md:text-base text-gray-600 font-medium'>
            El plazo empieza cuando tenemos toda la información necesaria.
          </p>
          <a
            href='/condiciones-del-proyecto'
            className='inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-accent hover:underline'
          >
            Ver condiciones del proyecto: pagos, revisiones y plazos
          </a>
        </div>
      </div>

      {/* 8. Preguntas frecuentes */}
      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='Preguntas frecuentes sobre Web Profesional 360'
          faqs={faqs}
        />
      </div>

      {/* 9. CTA final */}
      <SEOCTAFinal
        title='Cuéntanos qué web necesita tu negocio'
        subtitle='Te diremos si encaja 360 Start, Presencia o Gestión. Antes de empezar recibirás el precio, los plazos y todo lo incluido por escrito.'
        buttonText='Solicitar propuesta'
        onButtonClick={handleOpenFormGeneric}
        secondaryButtonText='Hablar por WhatsApp'
        onSecondaryButtonClick={() => handleWhatsApp('LandingNegociosCTAFinal')}
      />

      <div id='contacto' className='scroll-mt-24'>
        <ContactForm />
      </div>

      {/* 10. Mantenimiento Opcional */}
      <div id='mantenimiento' className='scroll-mt-24 py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-2xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Mantenimiento Opcional
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Para que tu web siga funcionando, actualizada y con soporte
              disponible cuando lo necesites.
            </p>
          </div>

          <div className='max-w-md mx-auto'>
            {maintenancePlans.map((plan) => (
              <div
                key={plan.id}
                className='rounded-xl p-8 border-2 border-accent bg-ink-dark text-white shadow-[7px_7px_0_0_#0d9488] flex flex-col'
              >
                <div className='mb-6'>
                  <h3 className='text-2xl font-bold text-white mb-2'>
                    {plan.name}
                  </h3>
                  <p className='text-sm font-bold text-accent uppercase tracking-wide mb-5'>
                    Ideal para: {plan.idealFor}
                  </p>

                  <div className='grid grid-cols-2 gap-3'>
                    <div className='bg-white/5 border-2 border-white/15 rounded-lg p-4'>
                      <p className='text-xs text-white/60 uppercase tracking-wide mb-1'>
                        Mensual
                      </p>
                      <p className='text-xl md:text-2xl font-bold text-white leading-tight'>
                        <span className='inline-block origin-left motion-safe:animate-price-pulse'>
                          {plan.monthlyPrice}
                        </span>
                        <span className='text-sm font-medium text-white/60'>
                          {plan.monthlyPriceNote}
                        </span>
                      </p>
                    </div>
                    <div className='bg-accent/15 border-2 border-accent rounded-lg p-4'>
                      <p className='text-xs text-accent uppercase tracking-wide mb-1'>
                        Anual
                      </p>
                      <p className='text-xl md:text-2xl font-bold text-white leading-tight'>
                        <span className='inline-block origin-left motion-safe:animate-price-pulse'>
                          {plan.annualPrice}
                        </span>
                        <span className='text-sm font-medium text-white/60'>
                          {plan.annualPriceNote}
                        </span>
                      </p>
                    </div>
                  </div>

                  {plan.annualSavingsNote && (
                    <span className='inline-block mt-4 bg-accent text-ink-dark text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full'>
                      {plan.annualSavingsNote}
                    </span>
                  )}
                </div>

                <ul className='space-y-3 mb-6'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='flex items-start gap-3'>
                      <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                      <span className='text-sm md:text-base text-white/90'>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className='mt-auto'>
                  <Button
                    onClick={() =>
                      handlePackCta(
                        'Mantenimiento Web',
                        'Solicitar mantenimiento',
                      )
                    }
                    variant='primary'
                    fullWidth
                    className='!bg-accent !text-ink-dark'
                  >
                    Solicitar mantenimiento
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className='max-w-2xl mx-auto mt-8 text-center bg-white border-2 border-ink-dark rounded-xl p-5 md:p-6 shadow-[4px_4px_0_0_#1a1a1a]'>
            <p className='text-sm md:text-base text-gray-800 font-medium'>
              {CUSTOM_MAINTENANCE_NOTE}
            </p>
          </div>

          <div className='max-w-4xl mx-auto mt-8 space-y-2 text-center'>
            <p className='text-xs md:text-sm text-gray-500'>
              El dominio pertenece siempre al cliente, aunque PereiraWeb puede
              gestionar su configuración y renovación.
            </p>
            <p className='text-xs md:text-sm text-gray-500'>
              {OUT_OF_SCOPE_NOTE}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebProfesionalNegocios;
