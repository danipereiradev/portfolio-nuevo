import { useEffect } from 'react';
import {
  Check,
  MessageCircle,
  FileText,
  Camera,
  Palette,
  Handshake,
  Zap,
  ShieldCheck,
  MessageSquare,
  Award,
  Building2,
} from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useSectionView } from '../hooks/useSectionView';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackWebProfesionalView,
  trackWebProfesionalWhatsAppClick,
  trackWebProfesionalViewPlanes,
  trackWebProfesionalScrollToPlanes,
} from '../utils/analytics';
import {
  WEB_PROFESIONAL_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import SEOLandingHero from '../components/SEOLandingHero';
import TrustBar from '../components/TrustBar';
import SEOProcess from '../components/SEOProcess';
import SEOCTAFinal from '../components/SEOCTAFinal';
import ContactForm from '../components/ContactForm';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Button from '../components/Button';
import RevealOnScroll from '../components/RevealOnScroll';

const WHATSAPP_URL = buildWhatsAppUrl(WEB_PROFESIONAL_WHATSAPP_MESSAGE);

const processSteps = [
  {
    number: '1',
    title: 'Eliges tu opción',
    description:
      'One Page 249 € o Web de 3 páginas 349 €. Hosting incluido en ambas.',
  },
  {
    number: '2',
    title: 'Nos envías textos e imágenes',
    description:
      'Usamos tu contenido. Si lo necesitas, podemos encargarnos de la redacción, fotos o logo.',
  },
  {
    number: '3',
    title: 'Entrega en 72 horas',
    description:
      'Diseñamos, revisamos contigo y publicamos la web con tu dominio en 72 horas desde que tenemos lo necesario.',
  },
];

const whyPoints = [
  {
    icon: Award,
    title: 'Más de 12 años de experiencia',
    description:
      'Llevamos más de una década creando webs para negocios reales. Sabemos qué funciona y qué no.',
  },
  {
    icon: Building2,
    title: 'Experiencia en grandes empresas',
    description:
      'Desarrolladores que han trabajado en proyectos para empresas de banca, retail y otros sectores, como Banco Santander o Inditex.',
  },
  {
    icon: Handshake,
    title: 'Trato directo',
    description:
      'Hablas con quien hace la web. Sin intermediarios ni agencia hinchada.',
  },
  {
    icon: ShieldCheck,
    title: 'Precio cerrado',
    description:
      'Sabes qué incluye y cuánto cuesta antes de empezar. Sin sorpresas.',
  },
  {
    icon: Zap,
    title: 'Lista para captar clientes',
    description:
      'Formulario, WhatsApp, móvil y SEO básico desde el primer día.',
  },
  {
    icon: MessageSquare,
    title: 'Respuesta rápida',
    description:
      'Te contestamos pronto por formulario o WhatsApp, sin rodeos.',
  },
];

const esencialIncludes = [
  '1 página tipo One Page',
  'Hasta 5 secciones: Inicio, Servicios, Sobre mí/nosotros, CTA y Contacto',
  'Diseño adaptado al negocio usando tu starter',
  'Responsive móvil / tablet / ordenador',
  'Formulario de contacto',
  'Botón de WhatsApp',
  'SEO técnico básico',
  'Optimización de velocidad',
  'Integración de dominio existente',
  'Publicación y puesta en producción',
  'Entrega en 72 horas',
  'Hosting incluido',
  'Sin cuotas mensuales obligatorias',
  'Mantenimiento opcional disponible',
  '1 ronda de cambios',
  'Textos e imágenes aportados por el cliente',
  'Pensada para ampliarse más adelante (páginas, secciones o funciones)',
];

const profesionalIncludes = [
  '3 páginas independientes: Inicio, Servicios y Contacto',
  'Más libertad de estructura dentro de esas páginas',
  'Todo lo incluido en Web Esencial',
  'Hasta 2 servicios destacados en la página de Servicios',
  'Mejor base para SEO y para crecer con nuevas páginas o contenidos',
  '2 rondas de cambios',
  'Entrega en 72 horas',
  'Hosting incluido',
  'Sin cuotas mensuales obligatorias',
  'Mantenimiento opcional disponible',
  'Publicación y puesta en producción',
  'Escalable: puedes añadir páginas, servicios o mejoras cuando lo necesites',
];

const extras = [
  {
    icon: FileText,
    title: 'Redacción completa de textos',
    description: 'Si no quieres escribir tú los contenidos, los preparamos por ti.',
  },
  {
    icon: Camera,
    title: 'Imágenes profesionales',
    description: 'Fotos o recursos visuales para que la web se vea cuidada y creíble.',
  },
  {
    icon: Palette,
    title: 'Logo (si no lo tienes)',
    description: 'Creamos un logo sencillo para tu negocio si aún no tienes identidad.',
  },
];

const WebProfesional = () => {
  usePageMeta('/web-profesional');
  const planesSectionRef = useSectionView<HTMLElement>(
    trackWebProfesionalViewPlanes,
  );

  useEffect(() => {
    trackWebProfesionalView();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const timeoutId = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleWhatsApp = (
    location: string,
    message?: string,
    plan?: string,
  ) => {
    const url = message ? buildWhatsAppUrl(message) : WHATSAPP_URL;
    trackWhatsAppClick(location);
    trackWebProfesionalWhatsAppClick(location, plan);
    trackGoogleAdsWhatsAppConversion(url);
  };

  return (
    <>
      <SEOLandingHero
        kicker='WEB PROFESIONAL'
        title={
          <>
            Tu web profesional
            <br />
            desde 249 € + IVA
          </>
        }
        subtitle='Dos opciones claras: One Page o web de 3 páginas.'
        description='Diseño adaptado a tu negocio, hosting incluido, publicación con tu dominio y lista para móvil, Google y contacto.'
        trustLine='One Page 249 € · Web 3 páginas 349 € · Entrega en 72 h'
        ctaText='WhatsApp'
        onCTAClick={() => handleWhatsApp('LandingWebProfesionalHero')}
        secondaryCTAText='Ver qué incluye'
        secondaryCTAAction={() => {
          trackWebProfesionalScrollToPlanes();
          document
            .getElementById('incluye')
            ?.scrollIntoView({ behavior: 'smooth' });
        }}
        secondaryCTAIcon='chevron-down'
        ctaFootnote='Entrega en 72 horas · Precio cerrado · Sin compromiso'
      />

      <RevealOnScroll>
        <TrustBar deliveryText='ENTREGA EN 72H' hidePaymentPoint />
      </RevealOnScroll>

      <section
        ref={planesSectionRef}
        className='py-20 bg-gray-50'
      >
        <div id='incluye' className='scroll-mt-24' />
        <div id='planes' className='scroll-mt-24 h-0' aria-hidden='true' />
        <div className='container mx-auto px-6'>
          <RevealOnScroll>
            <div className='text-center mb-12 max-w-3xl mx-auto'>
              <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
                Qué incluye
              </h2>
            <p className='text-base md:text-lg text-gray-600'>
              Dos opciones — One Page 249 € / Web 3 páginas 349 €. Hosting
              incluido y entrega en 72 horas en ambas.
            </p>
            </div>
          </RevealOnScroll>

          <div className='max-w-5xl mx-auto grid lg:grid-cols-2 gap-8'>
            <RevealOnScroll delayMs={80}>
              <article className='bg-white rounded-xl p-7 md:p-8 border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] relative flex flex-col h-full'>
                <span className='absolute -top-4 left-6 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
                  One Page
                </span>
                <h3 className='text-2xl font-extrabold text-gray-900 mt-2 mb-1'>
                  Web Esencial
                </h3>
                <p className='text-3xl font-bold text-gray-900 mb-1'>
                  249 €{' '}
                  <span className='text-lg font-semibold text-gray-500'>+ IVA</span>
                </p>
                <p className='text-sm text-gray-500 mb-6'>
                  Ideal para presentarte online con una sola página clara. Luego
                  puedes ampliarla cuando tu negocio lo pida.
                </p>
                <ul className='space-y-3 mb-8 flex-1'>
                  {esencialIncludes.map((item) => (
                    <li key={item} className='flex items-start gap-3'>
                      <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-700'>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() =>
                    handleWhatsApp(
                      'LandingWebProfesionalEsencial',
                      'Hola, me interesa la Web Esencial (One Page) por 249 € + IVA.',
                      'Web Esencial',
                    )
                  }
                  variant='primary'
                  fullWidth
                >
                  <MessageCircle className='w-4 h-4' />
                  WhatsApp
                </Button>
              </article>
            </RevealOnScroll>

            <RevealOnScroll delayMs={180}>
              <article className='bg-white rounded-xl p-7 md:p-8 border-2 border-accent shadow-[7px_7px_0_0_#14b8a6] relative flex flex-col h-full'>
                <span className='absolute -top-4 left-6 bg-ink-dark text-accent border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
                  3 páginas
                </span>
                <h3 className='text-2xl font-extrabold text-gray-900 mt-2 mb-1'>
                  Web Profesional
                </h3>
                <p className='text-3xl font-bold text-gray-900 mb-1'>
                  349 €{' '}
                  <span className='text-lg font-semibold text-gray-500'>+ IVA</span>
                </p>
                <p className='text-sm text-gray-500 mb-6'>
                  Más estructura para servicios y SEO. Una base sólida a la que
                  puedes sumar páginas o funciones más adelante.
                </p>
                <ul className='space-y-3 mb-8 flex-1'>
                  {profesionalIncludes.map((item) => (
                    <li key={item} className='flex items-start gap-3'>
                      <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                      <span className='text-sm text-gray-700'>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() =>
                    handleWhatsApp(
                      'LandingWebProfesionalProfesional',
                      'Hola, me interesa la Web Profesional (3 páginas) por 349 € + IVA.',
                      'Web Profesional',
                    )
                  }
                  variant='primary'
                  fullWidth
                >
                  <MessageCircle className='w-4 h-4' />
                  WhatsApp
                </Button>
              </article>
            </RevealOnScroll>
          </div>

          <p className='max-w-2xl mx-auto mt-8 text-center text-xs md:text-sm text-gray-500 leading-relaxed'>
            Podrás solicitar cambios de textos e imágenes durante la fase de
            revisión incluida.
            <br className='hidden sm:block' />
            Una vez publicada, los cambios posteriores pueden hacerse como
            servicio puntual o mediante mantenimiento opcional.
          </p>

          <RevealOnScroll delayMs={100} className='mt-10'>
            <div className='max-w-3xl mx-auto bg-white border-2 border-ink-dark rounded-xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
              <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3 text-center'>
                Empieza simple. Crece cuando haga falta.
              </h3>
              <p className='text-sm md:text-base text-gray-700 leading-relaxed text-center'>
                No hace falta montar una web grande el primer día. Publicamos una
                base clara y profesional, y más adelante puedes ampliarla: nuevas
                páginas, más servicios, blog, reserva de citas, mejoras de diseño
                u otras funciones. Lo valoramos contigo cuando lo necesites, sin
                obligarte a pagar por cosas que aún no usas.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id='extras' className='scroll-mt-24 py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <RevealOnScroll>
            <div className='text-center mb-12 max-w-3xl mx-auto'>
              <h2 className='text-2xl md:text-4xl font-bold text-gray-900 mb-4'>
                ¿Necesitas textos, fotos o logo?
              </h2>
              <p className='text-base md:text-lg text-gray-600'>
                Por defecto usamos lo que nos envías. Si no lo tienes, podemos
                ayudarte con estos extras.
              </p>
            </div>
          </RevealOnScroll>
          <div className='max-w-5xl mx-auto grid md:grid-cols-3 gap-5'>
            {extras.map((extra, index) => {
              const Icon = extra.icon;
              return (
                <RevealOnScroll key={extra.title} delayMs={index * 100}>
                  <div className='bg-gray-50 rounded-xl border-2 border-ink-dark p-6 shadow-[4px_4px_0_0_#1a1a1a] h-full'>
                    <Icon className='w-7 h-7 text-accent mb-3' />
                    <h3 className='text-lg font-bold text-gray-900 mb-2'>
                      {extra.title}
                    </h3>
                    <p className='text-sm text-gray-600'>{extra.description}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <RevealOnScroll>
        <div id='proceso' className='scroll-mt-24'>
          <SEOProcess title='Cómo funciona' steps={processSteps} />
        </div>
      </RevealOnScroll>

      <section id='por-que' className='scroll-mt-24 py-20 bg-accent'>
        <div className='container mx-auto px-6'>
          <RevealOnScroll>
            <div className='text-center mb-10 max-w-3xl mx-auto'>
              <h2 className='text-2xl md:text-4xl font-bold text-ink-dark mb-4'>
                ¿Por qué PereiraWeb?
              </h2>
              <p className='text-base md:text-lg text-ink-dark/80'>
                Más de 12 años creando webs profesionales, con un equipo que ha
                trabajado en proyectos para empresas de banca, retail y otros
                sectores exigentes.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delayMs={80}>
            <div className='max-w-3xl mx-auto mb-10'>
              <div className='bg-ink-dark text-white rounded-xl border-2 border-ink-dark p-5 md:p-6 shadow-[5px_5px_0_0_#1a1a1a] text-center'>
                <p className='text-sm md:text-base font-semibold leading-relaxed'>
                  Experiencia real en entornos corporativos:{' '}
                  <span className='text-accent'>Banca</span>,{' '}
                  <span className='text-accent'>Retail</span> y más — con
                  trayectoria en proyectos vinculados a empresas como{' '}
                  <span className='text-accent'>Banco Santander</span> e{' '}
                  <span className='text-accent'>Inditex</span>.
                </p>
              </div>
            </div>
          </RevealOnScroll>
          <div className='max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {whyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <RevealOnScroll key={point.title} delayMs={(index % 3) * 90}>
                  <div className='bg-white rounded-xl border-2 border-ink-dark p-6 shadow-[5px_5px_0_0_#1a1a1a] h-full'>
                    <Icon className='w-7 h-7 text-accent mb-3' />
                    <h3 className='text-lg font-bold text-gray-900 mb-2'>
                      {point.title}
                    </h3>
                    <p className='text-sm md:text-base text-gray-700'>
                      {point.description}
                    </p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <RevealOnScroll>
        <div id='portfolio' className='scroll-mt-24'>
          <Portfolio variant='web-profesional' />
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <Testimonials id='valoraciones' />
      </RevealOnScroll>

      <RevealOnScroll>
        <SEOCTAFinal
          title='Elige tu web y empecemos'
          subtitle='One Page desde 249 € + IVA o web de 3 páginas por 349 € + IVA. Hosting incluido y entrega en 72 horas. Escríbenos por WhatsApp o deja tus datos en el formulario.'
          buttonText='WhatsApp'
          onButtonClick={() => handleWhatsApp('LandingWebProfesionalCTAFinal')}
          backgroundImage='/img/cta-background.webp'
          className='mt-[100px] !py-[calc(5rem+50px)]'
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div id='contacto' className='scroll-mt-24 bg-accent/30 py-4'>
          <ContactForm preselectedPlan='Web Esencial' />
        </div>
      </RevealOnScroll>
    </>
  );
};

export default WebProfesional;
