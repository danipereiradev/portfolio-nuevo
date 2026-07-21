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
  Briefcase,
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
    url: `${SITE_URL}/web-profesional-360`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Packs de web profesional',
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

  const handlePackCta = (planName: string, ctaText: string) => {
    trackPricingCtaClick(planName, ctaText);
    openModal(planName);
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
      text: 'Dependen únicamente de redes sociales para que los encuentren, sin una web propia donde el cliente pueda decidir con calma.',
    },
    {
      text: 'Tienen una web antigua, lenta o poco clara, que no transmite la confianza que su negocio merece.',
    },
    {
      text: 'No saben cuánto les va a costar el proyecto hasta que ya han hablado con varios proveedores distintos.',
    },
    {
      text: 'Terminan pagando por funciones que no necesitan, dentro de paquetes genéricos pensados para cualquier negocio.',
    },
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
      title: 'Móvil y Escritorio',
      description:
        'Tu web se adapta y se ve bien en cualquier dispositivo, donde sea que te busquen.',
    },
    {
      title: 'Rapidez',
      description:
        'Páginas ligeras y optimizadas para que carguen rápido y no pierdas visitas por ello.',
    },
    {
      title: 'SEO Local',
      description:
        'Estructura preparada para que Google entienda tu negocio y tu zona de actuación.',
    },
    {
      title: 'Formulario y WhatsApp',
      description:
        'Dos vías de contacto siempre visibles para que el cliente decida cómo escribirte.',
    },
    {
      title: 'Seguridad y SSL',
      description:
        'Certificado SSL activo desde el primer día: conexión segura y confianza para el visitante.',
    },
    {
      title: 'Analítica',
      description:
        'Analytics configurado desde el inicio para que sepas cuántas visitas recibes y de dónde vienen.',
    },
    {
      title: 'Accesibilidad Básica',
      description:
        'Contraste, tamaños de texto y navegación pensados para que cualquier visitante pueda usarla bien.',
    },
    {
      title: 'Dominio Conectado',
      description:
        'Tu dominio propio conectado y funcionando, sin subdominios gratuitos ni marcas de terceros.',
    },
    {
      title: 'Publicación Completa',
      description:
        'Nos encargamos de dejar la web publicada y accesible, no solo diseñada.',
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Reunión inicial',
      description:
        'Hablamos de tu negocio, tu público y qué necesita transmitir tu web.',
    },
    {
      number: '2',
      title: 'Recopilación de contenidos',
      description:
        'Nos envías textos, imágenes y datos de contacto, o te ayudamos a organizarlos.',
    },
    {
      number: '3',
      title: 'Diseño y adaptación',
      description:
        'Adaptamos la base a tu marca: colores, logo, textos e imágenes de tu negocio.',
    },
    {
      number: '4',
      title: 'Revisión',
      description:
        'Revisas la web y aplicamos los ajustes dentro de las rondas de cambios incluidas.',
    },
    {
      number: '5',
      title: 'Publicación',
      description:
        'Publicamos la web y conectamos tu dominio para que esté online y funcionando.',
    },
    {
      number: '6',
      title: 'Mantenimiento opcional',
      description:
        'Si lo necesitas, seguimos cuidando tu web con uno de los planes de mantenimiento.',
    },
  ];

  const useCases = [
    {
      icon: Stethoscope,
      sector: 'Clínica Veterinaria',
      description:
        'Servicios por tipo de animal, equipo, horarios y botón de WhatsApp para citas rápidas.',
    },
    {
      icon: Scale,
      sector: 'Despacho de Abogados',
      description:
        'Áreas de práctica, trayectoria del despacho y formulario de consulta inicial.',
    },
    {
      icon: Briefcase,
      sector: 'Empresa de Servicios',
      description:
        'Presentación de servicios, zona de trabajo y solicitud de presupuesto clara.',
    },
  ];

  const faqs = [
    {
      question: '¿Es una plantilla igual para todos?',
      answer:
        'No. Partimos de una base técnica optimizada y probada, pero cada proyecto adapta marca, contenidos, fotografías, composición y llamadas a la acción a tu negocio.',
    },
    {
      question: '¿Puedo utilizar mi propio dominio?',
      answer:
        'Sí. El dominio es siempre tuyo. Podemos gestionar su configuración y renovación si lo prefieres, pero la titularidad es tuya en todo momento.',
    },
    {
      question: '¿Quién escribe los textos?',
      answer:
        'Tú nos aportas la información de tu negocio y nosotros la organizamos y redactamos en un lenguaje claro y profesional para la web.',
    },
    {
      question: '¿Puedo modificar la web?',
      answer:
        'Con 360 Presencia, los cambios los realiza PereiraWeb mediante el servicio de mantenimiento. Con 360 Gestión tienes un panel propio para editar ciertos contenidos tú mismo.',
    },
    {
      question: '¿Qué diferencia hay entre los dos packs?',
      answer:
        '360 Presencia incluye una web completa que nosotros mantenemos. 360 Gestión añade un panel sencillo para que puedas actualizar servicios, equipo, testimonios o artículos sin depender de nosotros para esos cambios.',
    },
    {
      question: '¿El mantenimiento es obligatorio?',
      answer:
        'No es obligatorio, pero sí recomendable para mantener tu web actualizada, segura y con soporte disponible cuando lo necesites.',
    },
    {
      question: '¿Qué pasa si cancelo el mantenimiento?',
      answer:
        'Tu web sigue siendo tuya. Dejas de recibir las actualizaciones, copias de seguridad y minutos de cambios incluidos en el plan, pero la web no se retira ni deja de funcionar por cancelar el mantenimiento.',
    },
    {
      question: '¿Incluye posicionamiento SEO?',
      answer:
        'Incluye SEO técnico y SEO local básico para que tu web parta bien configurada. El posicionamiento SEO mensual de contenidos es un servicio distinto que se presupuesta aparte.',
    },
    {
      question: '¿Se pueden añadir reservas o tienda online?',
      answer:
        'Sí, como funcionalidad adicional presupuestada aparte. Si tu necesidad principal es vender online, también tenemos un servicio específico de tiendas online.',
    },
    {
      question: '¿Cuánto se tarda en tener la web lista?',
      answer:
        'Depende de lo rápido que recibamos tus contenidos. Con la información completa, el plazo habitual es de unas 2-3 semanas.',
    },
    {
      question: '¿Qué necesito entregar para empezar?',
      answer:
        'Textos o información básica de tu negocio, imágenes o logo si los tienes, y tus datos de contacto. Si te falta algo, te ayudamos a organizarlo en la reunión inicial.',
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <SEOLandingHero
        title='Tu negocio necesita una web profesional, no un proyecto interminable'
        subtitle='Webs rápidas, personalizadas y con un precio claro para autónomos, pymes y negocios locales.'
        description='Dos packs de alcance definido, sin procesos eternos ni presupuestos ambiguos, pensados para negocios que necesitan estar online y funcionando.'
        trustLine='Diseño personalizado, alcance definido y acompañamiento directo.'
        ctaText='Solicitar propuesta'
        onCTAClick={() => handleWhatsApp('LandingNegociosHero')}
        secondaryCTAText='Ver planes 360'
        secondaryCTAAction={() => scrollToSection('packs')}
        secondaryCTAIcon='chevron-down'
      />

      {/* 2. Bloque de confianza rápida */}
      <TrustBar />

      {/* 3. Comparativa de paquetes */}
      <section
        id='packs'
        ref={pricingSectionRef}
        className='scroll-mt-24 py-20 bg-white'
      >
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-2xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Dos packs, un precio claro desde el principio
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Elige el pack que encaje con tu negocio. Si no lo tienes claro, te
              ayudamos a decidir sin compromiso.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto items-start'>
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
                  className={`rounded-xl p-8 border-2 flex flex-col relative transition-all duration-200 ${
                    pack.recommended
                      ? 'bg-ink-dark text-white border-accent shadow-[7px_7px_0_0_#0d9488]'
                      : 'bg-white border-ink-dark shadow-[7px_7px_0_0_#1a1a1a]'
                  }`}
                >
                  {pack.recommended && (
                    <div className='absolute -top-4 left-8 bg-accent text-ink-dark px-5 py-1.5 border-2 border-white text-sm font-bold rotate-[-2deg]'>
                      Recomendado para la mayoría
                    </div>
                  )}

                  <div className='mb-6 mt-2'>
                    <h3
                      className={`text-2xl font-bold mb-2 ${pack.recommended ? 'text-white' : 'text-gray-900'}`}
                    >
                      {pack.name}
                    </h3>
                    <p className='text-sm font-bold text-accent uppercase tracking-wide mb-4'>
                      Ideal para: {pack.idealFor}
                    </p>
                    <div className='flex flex-col gap-0.5'>
                      <span
                        className={`text-2xl md:text-3xl font-bold ${pack.recommended ? 'text-white' : 'text-gray-900'}`}
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
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:underline ${
                          pack.recommended ? 'text-accent' : 'text-accent'
                        }`}
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
                      onClick={() =>
                        handlePackCta(pack.formPlanName, pack.ctaText)
                      }
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

          <p className='text-center text-xs text-gray-400 mt-8 max-w-2xl mx-auto'>
            Precios orientativos + IVA. La propuesta final se cierra antes de
            empezar, según el alcance real de tu proyecto.
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

          <div className='max-w-2xl mx-auto text-center bg-gray-50 border-2 border-ink-dark rounded-xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a] mt-10'>
            <p className='text-base md:text-lg text-gray-800 font-medium mb-4'>
              ¿Necesitas funcionalidades específicas o un proyecto completamente
              personalizado? Descubre el servicio de Web a Medida.
            </p>
            <a
              href='/web-autonomos-pymes'
              className='inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline'
            >
              Ver Web a Medida
            </a>
          </div>
        </div>
      </section>

      {/* 4. Problema y solución */}
      <SEOProblem
        title='Muchos negocios locales están perdiendo clientes por su web'
        subtitle='Antes de hablar de packs, esto es lo que solemos ver en negocios como el tuyo.'
        problems={problems}
      />
      <div className='bg-white pt-6 pb-16 md:pt-8 md:pb-20'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center bg-gray-50 border-2 border-ink-dark rounded-xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
            <p className='text-base md:text-lg text-gray-800 font-medium leading-relaxed'>
              La solución es una web profesional de alcance definido, adaptada a
              tu negocio, con un precio claro desde el principio y sin procesos
              eternos.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Para quién es */}
      <SEOBenefits title='¿Es Esta Web para tu Negocio?' benefits={sectors} />
      <div className='bg-gray-50 pt-6 pb-16 md:pt-8 md:pb-20'>
        <div className='container mx-auto px-6'>
          <p className='max-w-2xl mx-auto text-center text-sm md:text-base text-gray-500'>
            No usamos el mismo diseño para todos: partimos de una base técnica
            optimizada, pero cada proyecto adapta marca, contenidos,
            fotografías, composición y llamadas a la acción a tu negocio.
          </p>
        </div>
      </div>

      {/* 6. Qué incluye cualquier web */}
      <div id='incluye' className='scroll-mt-24'>
        <SEOFeatures
          title='Qué Incluye Cualquier Web de PereiraWeb'
          subtitle='Independientemente del pack que elijas, esto viene siempre incluido'
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

      {/* 7. Cómo funciona */}
      <SEOProcess title='Cómo Funciona el Proceso' steps={processSteps} />
      <div className='bg-white pt-6 pb-16 md:pt-8 md:pb-20'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto bg-gray-50 border-2 border-ink-dark rounded-xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
            <ul className='space-y-2 text-sm md:text-base text-gray-700'>
              <li>· El proyecto se inicia con un 50% del presupuesto.</li>
              <li>· Incluye dos rondas de cambios sobre el diseño.</li>
              <li>
                · El plazo se acuerda según cuándo nos entregues los contenidos.
                Si no cuentas con tiempo para prepararlos, nosotros nos
                encargamos.
              </li>
              <li>
                · El segundo pago se realiza antes de la publicación definitiva.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 8. Ejemplos de uso */}
      <div id='ejemplos' className='scroll-mt-24 py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-4 max-w-2xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Así se Adapta la Web a tu Sector
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Ejemplos ilustrativos de cómo se plantearía cada proyecto, no
              clientes reales.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mt-10'>
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className='bg-white p-6 md:p-8 rounded-xl border-2 border-ink-dark shadow-[5px_5px_0_0_#1a1a1a] hover:shadow-[2px_2px_0_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200'
                >
                  <Icon className='w-7 h-7 md:w-8 md:h-8 text-accent mb-4 md:mb-6' />
                  <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3'>
                    {useCase.sector}
                  </h3>
                  <p className='text-sm md:text-base text-gray-700 leading-relaxed'>
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 9. Mantenimiento */}
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
                        {plan.monthlyPrice}
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
                        {plan.annualPrice}
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
                      handlePackCta('Mantenimiento Web', 'Solicitar mantenimiento')
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

      {/* 10. Preguntas frecuentes */}
      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='Preguntas Frecuentes sobre la Web de tu Negocio'
          faqs={faqs}
        />
      </div>

      {/* 11. CTA final */}
      <SEOCTAFinal
        title='Cuéntanos qué necesita tu negocio'
        subtitle='Te indicaré qué pack encaja mejor y recibirás una propuesta clara, sin compromiso.'
        buttonText='Abrir formulario'
        onButtonClick={handleOpenFormGeneric}
        secondaryButtonText='Hablar por WhatsApp'
        onSecondaryButtonClick={() => handleWhatsApp('LandingNegociosCTAFinal')}
      />

      <div id='contacto' className='scroll-mt-24'>
        <ContactForm />
      </div>
    </>
  );
};

export default WebProfesionalNegocios;
