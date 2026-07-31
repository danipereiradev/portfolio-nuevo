import { useEffect } from 'react';
import {
  Briefcase,
  Building2,
  Check,
  Store,
  UserRound,
  Wrench,
  Sparkles,
  MonitorSmartphone,
  Search,
  Globe,
  X,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  trackWebStartView,
  trackWebStartCalendlyClick,
  trackWebStartContactClick,
  trackWebStartFaqOpen,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import {
  WEB_START_CALENDLY_URL,
  WEB_START_FORM_PLAN,
  WEB_START_PRICE,
  WEB_START_WHATSAPP_URL,
} from '../config/webStart';
import {
  maintenancePlans,
  webPacks,
} from '../config/webProfesionalNegociosPricing';
import SEOLandingHero from '../components/SEOLandingHero';
import SEOBenefits from '../components/SEOBenefits';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import SEOCTAFinal from '../components/SEOCTAFinal';
import Button from '../components/Button';

const SITE_URL = 'https://pereiraweb.es';
const presencia360 = webPacks[0];
const maintenance = maintenancePlans[0];

const WebStart = () => {
  const { openModal } = useContactModal();

  usePageMeta('/web-start');

  useEffect(() => {
    trackWebStartView();
  }, []);

  useJsonLd('jsonld-web-start', {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Diseño y desarrollo de páginas web',
    name: 'Web Start',
    description:
      'Página web profesional de alcance cerrado para empresas y autónomos que necesitan empezar con una solución clara.',
    provider: {
      '@type': 'ProfessionalService',
      name: 'PereiraWeb',
      url: SITE_URL,
    },
    areaServed: 'ES',
    url: `${SITE_URL}/web-start/`,
  });

  useJsonLd('jsonld-web-start-breadcrumb', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Web Start',
        item: `${SITE_URL}/web-start/`,
      },
    ],
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCalendly = (location: string) => {
    trackWebStartCalendlyClick(location);
    window.open(WEB_START_CALENDLY_URL, '_blank', 'noopener,noreferrer');
  };

  const openWhatsApp = (location: string) => {
    trackWhatsAppClick(`WebStart_${location}`);
    trackWebStartContactClick(location);
    trackGoogleAdsWhatsAppConversion(WEB_START_WHATSAPP_URL);
  };

  const openContact = (location: string) => {
    trackWebStartContactClick(location);
    openModal(WEB_START_FORM_PLAN);
  };

  const audience = [
    {
      icon: UserRound,
      title: 'Autónomos que todavía no tienen web',
      description:
        'Para empezar a presentarte online con una imagen clara y profesional.',
    },
    {
      icon: Store,
      title: 'Negocios locales',
      description:
        'Ideal si necesitas explicar servicios, horarios y facilitar el contacto.',
    },
    {
      icon: Briefcase,
      title: 'Profesionales y despachos',
      description:
        'Una presencia sobria y confiable para quien te busca por primera vez.',
    },
    {
      icon: Building2,
      title: 'Pequeñas empresas de servicios',
      description:
        'Cuando lo importante es transmitir seriedad y generar solicitudes.',
    },
    {
      icon: Sparkles,
      title: 'Nuevos negocios que necesitan empezar',
      description:
        'Una base profesional para salir online sin abrir un proyecto demasiado amplio.',
    },
    {
      icon: Wrench,
      title: 'Empresas con una web antigua muy básica',
      description:
        'Si tu web actual ya no representa bien tu negocio y necesitas renovarla con un alcance cerrado.',
    },
  ];

  const includeGroups = [
    {
      title: 'Diseño y contenido',
      items: [
        'Diseño adaptado a la identidad de tu negocio',
        'Web responsive para móvil, tablet y escritorio',
        'Hasta 4 páginas o secciones principales',
        'Inicio, servicios, sobre el negocio y contacto',
        'Adaptación de colores, logo, textos e imágenes',
        'Páginas legales básicas adaptadas con los datos facilitados',
        'Una ronda de cambios',
      ],
    },
    {
      title: 'Contacto y conversión',
      items: [
        'Formulario de contacto',
        'Botón de WhatsApp',
        'Mapa, horarios y datos de contacto',
      ],
    },
    {
      title: 'SEO y rendimiento',
      items: [
        'SEO técnico básico',
        'Metadatos',
        'Open Graph',
        'Sitemap',
        'robots.txt',
        'Optimización de imágenes y rendimiento',
      ],
    },
    {
      title: 'Publicación',
      items: ['Publicación y conexión del dominio'],
    },
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Reserva o cuéntame tu proyecto',
      description:
        'Agendamos una sesión o me escribes para revisar si Web Start encaja contigo.',
    },
    {
      number: '2',
      title: 'Confirmamos el alcance',
      description:
        'Validamos juntos que tu proyecto cabe en Web Start antes de empezar.',
    },
    {
      number: '3',
      title: 'Me envías materiales',
      description:
        'Textos, logo, imágenes y datos de contacto, ubicación y horarios.',
    },
    {
      number: '4',
      title: 'Adapto el diseño',
      description:
        'Preparo la web sobre una base técnica profesional, adaptada a tu identidad.',
    },
    {
      number: '5',
      title: 'Revisas la primera versión',
      description: 'Ves la web funcionando y me indicas los ajustes necesarios.',
    },
    {
      number: '6',
      title: 'Aplicamos una ronda de cambios',
      description:
        'Incluye una ronda de cambios dentro del alcance cerrado de Web Start.',
    },
    {
      number: '7',
      title: 'Publicación',
      description: 'Publico la web y conecto tu dominio para que quede online.',
    },
  ];

  const clientNeeds = [
    'Nombre y datos del negocio',
    'Logo, si existe',
    'Colores de marca, si existen',
    'Descripción del negocio',
    'Servicios principales',
    'Textos o información base',
    'Fotografías e imágenes',
    'Dirección, horarios y contacto',
    'Datos legales necesarios',
  ];

  const heroTrust = [
    { icon: Sparkles, text: 'Diseño profesional' },
    { icon: MonitorSmartphone, text: 'Adaptada a móvil' },
    { icon: Search, text: 'SEO técnico básico' },
    { icon: Globe, text: 'Dominio conectado' },
  ];

  const faqs = [
    {
      question: '¿Por qué Web Start cuesta menos?',
      answer:
        'Porque el alcance está claramente cerrado: menos páginas, una sola ronda de cambios, funcionalidades estándar y una base técnica profesional reutilizable. El precio no es una rebaja: refleja un proyecto más sencillo y definido.',
    },
    {
      question: '¿Es una plantilla igual para todos?',
      answer:
        'No. Se utiliza una base técnica profesional para reducir tiempos, pero se adaptan identidad, colores, contenidos, imágenes y composición al negocio. El alcance es reutilizable; la identidad final no debe verse genérica.',
    },
    {
      question: '¿Puedo ampliar la web más adelante?',
      answer:
        'Sí. La base debe permitir añadir posteriormente páginas o funcionalidades mediante presupuesto adicional.',
    },
    {
      question: '¿Puedo editar la web yo mismo?',
      answer:
        'No incluye CMS. Los cambios posteriores pueden gestionarse mediante mantenimiento o presupuesto puntual.',
    },
    {
      question: '¿Incluye dominio?',
      answer:
        'La conexión del dominio está incluida. El dominio y el correo profesional no están incluidos si todavía no los tienes; puedo ayudarte a configurarlos.',
    },
    {
      question: '¿Incluye hosting?',
      answer:
        'Sí. El alojamiento web está incluido en el servicio, tanto en la publicación inicial como, si contratas mantenimiento, en su gestión y renovación continuas.',
    },
    {
      question: '¿Incluye mantenimiento?',
      answer: `No está incluido en los ${WEB_START_PRICE}. Si lo necesitas, puedes contratar ${maintenance.name}: ${maintenance.monthlyPrice}${maintenance.monthlyPriceNote} o ${maintenance.annualPrice}${maintenance.annualPriceNote}.`,
    },
    {
      question: '¿Qué ocurre si necesito más de cuatro páginas?',
      answer:
        'Entonces Web Start deja de encajar. Te propondré Web Profesional 360 o una solución a medida y te indicaré el coste antes de empezar.',
    },
    {
      question: '¿Quién prepara los textos y las imágenes?',
      answer:
        'Tú aportas la información base, imágenes y datos. Si no tienes los textos completamente preparados, puedo ayudarte a organizarlos a partir de lo que me facilites. La redacción extensa o creación completa de contenido no está incluida.',
    },
    {
      question: '¿Cuánto tarda el proyecto?',
      answer:
        'Depende de lo rápido que recibamos tus contenidos. Al ser un alcance más cerrado que Web Profesional 360, el proceso suele ser más ágil cuando la información está completa.',
    },
    {
      question: '¿El precio incluye IVA?',
      answer: `No. El precio es ${WEB_START_PRICE}.`,
    },
    {
      question: '¿Qué diferencia hay con Web Profesional 360?',
      answer:
        'Web Start es adecuada para necesidades más sencillas: hasta 4 páginas o secciones, una ronda de cambios y funcionalidades estándar. Web Profesional 360 ofrece mayor personalización, más margen de estructura y una configuración más completa para una presencia más desarrollada.',
    },
  ];

  return (
    <>
      <SEOLandingHero
        kicker='Web Start'
        title='Una web profesional para empezar con una inversión más contenida'
        subtitle={WEB_START_PRICE}
        description='Una solución de alcance cerrado para empresas y autónomos que necesitan presentar sus servicios, generar confianza y facilitar el contacto desde el primer día.'
        trustLine='Precio cerrado para proyectos que encajen en el alcance Web Start.'
        ctaText='Ver si Web Start encaja conmigo'
        onCTAClick={() => openWhatsApp('Hero')}
        secondaryCTAText='Ver qué incluye'
        secondaryCTAAction={() => scrollToSection('incluye')}
        secondaryCTAIcon='chevron-down'
      />

      <section className='bg-black py-8 border-b-2 border-white/10'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto'>
            {heroTrust.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className='flex items-center justify-center gap-2 px-3 py-3 border-2 border-white/15 rounded-lg bg-white/[0.04]'
                >
                  <Icon className='w-4 h-4 text-accent flex-shrink-0' />
                  <span className='text-xs md:text-sm font-bold text-white'>
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SEOBenefits
        title='Una forma sencilla de poner tu negocio online'
        subtitle='Web Start está pensada para negocios que necesitan una presencia profesional clara, pero todavía no requieren una web extensa, un panel de administración o funcionalidades personalizadas.'
        benefits={audience}
      />

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='grid md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
            <div className='rounded-xl border-2 border-ink-dark bg-white p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                Web Start puede encajar si necesitas:
              </h3>
              <ul className='space-y-3'>
                {[
                  'explicar qué haces;',
                  'mostrar tus servicios;',
                  'facilitar llamadas, WhatsApp o solicitudes;',
                  'mostrar ubicación y horarios;',
                  'transmitir una imagen profesional.',
                ].map((item) => (
                  <li key={item} className='flex items-start gap-3'>
                    <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-800'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='rounded-xl border-2 border-ink-dark bg-gray-50 p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                Probablemente necesitas Web Profesional 360 o una web a medida
                si requieres:
              </h3>
              <ul className='space-y-3'>
                {[
                  'más de cuatro páginas principales;',
                  'blog o panel de edición;',
                  'reservas o pagos;',
                  'varios idiomas;',
                  'integraciones;',
                  'áreas privadas;',
                  'funcionalidades específicas.',
                ].map((item) => (
                  <li key={item} className='flex items-start gap-3'>
                    <X className='w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id='incluye' className='scroll-mt-24 py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Todo lo necesario para empezar bien
            </h2>
          </div>

          <div className='grid md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
            {includeGroups.map((group) => (
              <div
                key={group.title}
                className='bg-white rounded-xl border-2 border-ink-dark p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'
              >
                <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-4'>
                  {group.title}
                </h3>
                <ul className='space-y-3'>
                  {group.items.map((item) => (
                    <li key={item} className='flex items-start gap-3'>
                      <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                      <span className='text-sm md:text-base text-gray-800'>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='precio' className='scroll-mt-24 py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center mb-10'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Un precio claro porque el alcance también lo es
            </h2>
          </div>

          <div className='max-w-xl mx-auto rounded-xl border-2 border-ink-dark bg-ink-dark text-white p-8 md:p-10 shadow-[7px_7px_0_0_#0d9488]'>
            <p className='text-sm font-bold text-accent uppercase tracking-wide mb-3'>
              Precio cerrado
            </p>
            <p className='text-3xl md:text-4xl font-extrabold mb-6'>
              {WEB_START_PRICE}
            </p>
            <ul className='space-y-3 mb-6'>
              {[
                'Hasta cuatro páginas o secciones',
                'Una ronda de cambios',
                'Contenido aportado por el cliente',
                'Funcionalidades estándar',
                'Entrega y publicación',
                'Dominio conectado',
              ].map((item) => (
                <li key={item} className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                  <span className='text-white/90'>{item}</span>
                </li>
              ))}
            </ul>
            <p className='text-white/80 text-sm md:text-base leading-relaxed mb-4'>
              El precio se mantiene cerrado siempre que el proyecto encaje en
              este alcance. Si necesitas más páginas, integraciones o
              funcionalidades, te indicaré el coste antes de empezar.
            </p>
            <p className='text-white/60 text-sm leading-relaxed mb-6'>
              Dominio y correo profesional no incluidos si todavía no los
              tienes. Puedo ayudarte a configurarlos. El alojamiento web está
              incluido en el servicio, tanto en la publicación inicial como, si
              contratas mantenimiento, en su gestión y renovación continuas.
            </p>
            <Button
              onClick={() => openWhatsApp('Precio')}
              variant='primary'
              fullWidth
              className='!shadow-[5px_5px_0_0_#0d9488]'
            >
              Ver si Web Start encaja conmigo
            </Button>
          </div>
        </div>
      </section>

      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-12 max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Dos caminos según lo que necesites
            </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Web Start no es una versión rebajada: es la opción adecuada cuando
              tu necesidad es más sencilla. Si tu proyecto pide más alcance,
              Web Profesional 360 encaja mejor.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto'>
            <div className='bg-white rounded-xl border-2 border-accent p-6 md:p-8 shadow-[6px_6px_0_0_#14b8a6]'>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                Web Start
              </h3>
              <p className='text-xl font-extrabold text-gray-900 mb-6'>
                {WEB_START_PRICE}
              </p>
              <ul className='space-y-3'>
                {[
                  'Hasta 4 páginas o secciones',
                  'Alcance cerrado',
                  'Una ronda de cambios',
                  'Sin CMS',
                  'Funcionalidades estándar',
                  'Ideal para empezar',
                ].map((item) => (
                  <li key={item} className='flex items-start gap-3'>
                    <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-800'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='bg-white rounded-xl border-2 border-ink-dark p-6 md:p-8 shadow-[6px_6px_0_0_#1a1a1a]'>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                Web Profesional 360
              </h3>
              <p className='text-xl font-extrabold text-gray-900 mb-6'>
                {presencia360.priceFrom} + IVA
              </p>
              <ul className='space-y-3'>
                {[
                  'Entre 4 y 6 páginas o secciones principales',
                  'Mayor personalización',
                  'Dos rondas de cambios',
                  'SEO y configuración más completa',
                  'Más margen para contenidos y estructura',
                  'Ideal para una presencia más desarrollada',
                ].map((item) => (
                  <li key={item} className='flex items-start gap-3'>
                    <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-800'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='mt-10 flex justify-center'>
            <Button
              onClick={() => openWhatsApp('Comparacion')}
              variant='primary'
              className='px-8'
            >
              No sé cuál necesito
            </Button>
          </div>
        </div>
      </section>

      <SEOProcess
        title='Tu web lista mediante un proceso claro'
        steps={processSteps}
      />

      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center'>
              Qué necesito para empezar
            </h2>
            <div className='bg-white rounded-xl border-2 border-ink-dark p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a] mt-8'>
              <ul className='space-y-3 mb-6'>
                {clientNeeds.map((item) => (
                  <li key={item} className='flex items-start gap-3'>
                    <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-800'>{item}</span>
                  </li>
                ))}
              </ul>
              <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
                Si no tienes los textos completamente preparados, puedo ayudarte
                a organizarlos a partir de la información que me facilites. La
                redacción extensa o creación completa de contenido no está
                incluida.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SEOFAQ
        title='Preguntas frecuentes'
        faqs={faqs}
        onFaqOpen={trackWebStartFaqOpen}
      />

      <SEOCTAFinal
        title='Empieza con la web que tu negocio necesita ahora'
        subtitle='Reserva una sesión gratuita de 20 minutos. Revisaremos tu caso y te diré con claridad si Web Start es suficiente o si necesitas una solución más completa.'
        buttonText='Ver si Web Start encaja conmigo'
        onButtonClick={() => openCalendly('CTAFinal')}
        secondaryButtonText='Cuéntame tu proyecto'
        onSecondaryButtonClick={() => openContact('CTAFinal')}
      />

      <div className='bg-ink-dark text-center py-4'>
        <p className='text-white/70 text-sm font-medium'>
          Sin compromiso · 20 minutos
        </p>
      </div>
    </>
  );
};

export default WebStart;
