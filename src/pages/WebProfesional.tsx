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
    title: 'Eliges la opción',
    description:
      'Una página 249 € o web de 3 páginas 349 €. Hosting en las dos.',
  },
  {
    number: '2',
    title: 'Nos mandas textos e imágenes',
    description:
      'Con lo tuyo montamos. Si no lo tienes, nosotros nos encargamos de crearlo.',
  },
  {
    number: '3',
    title: 'En 72 horas está online',
    description:
      'Diseño, revisión contigo y publicación con tu dominio. El reloj cuenta desde que tenemos lo necesario.',
  },
];

const whyPoints = [
  {
    icon: Award,
    title: 'Más de 12 años',
    description: 'Webs para negocios reales. Sabemos qué sobra y qué no.',
  },
  {
    icon: Building2,
    title: 'También en empresas grandes',
    description:
      'Gente del equipo ha tocado proyectos de banca y retail (Santander, Inditex…).',
  },
  {
    icon: Handshake,
    title: 'Trato directo',
    description: 'Hablas con quien hace la web. Sin intermediario hinchado.',
  },
  {
    icon: ShieldCheck,
    title: 'Precio cerrado',
    description: 'Sabes qué entra y cuánto cuesta antes de empezar.',
  },
  {
    icon: Zap,
    title: 'Lista para que te escriban',
    description: 'Formulario, WhatsApp, móvil y SEO básico desde el día uno.',
  },
  {
    icon: MessageSquare,
    title: 'Respuesta rápida',
    description: 'Formulario o WhatsApp. Sin rodeos.',
  },
];

const esencialIncludes = [
  '1 página con secciones y menú de navegación',
  'Hasta 5 secciones: Inicio, Servicios, Sobre mí/nosotros, CTA y Contacto',
  'Diseño adaptado a tu negocio',
  'Bien en móvil, tablet y ordenador',
  'Formulario de contacto',
  'Botón de WhatsApp',
  'Enlaces a redes',
  'SEO técnico básico',
  'Que no se eternice cargando',
  'Tu dominio conectado',
  'Publicación online',
  'Entrega en 72 horas',
  'Hosting incluido',
  'Sin cuota mensual obligatoria',
  'Mantenimiento opcional',
  '1 ronda de cambios',
  'Textos e imágenes los aportas tú (Si los tienes)',
  'Se puede ampliar después (páginas o funciones)',
];

const profesionalIncludes = [
  '3 páginas: Inicio, Servicios y Contacto',
  'Más margen de estructura en cada página',
  'Todo lo de Web Esencial',
  'Enlaces a redes',
  'Hasta 2 servicios destacados en Servicios',
  'Mejor base si quieres crecer en Google o añadir páginas',
  '2 rondas de cambios',
  'Entrega en 72 horas',
  'Hosting incluido',
  'Sin cuota mensual obligatoria',
  'Mantenimiento opcional',
  'Publicación online',
  'Luego puedes sumar páginas o mejoras',
];

const extras = [
  {
    icon: FileText,
    title: 'Redacción de textos',
    description: 'Si no los tienes, los escribimos nosotros.',
  },
  {
    icon: Camera,
    title: 'Imágenes',
    description: 'Si no tienes fotos, las preparamos para la web.',
  },
  {
    icon: Palette,
    title: 'Logo',
    description:
      'Si no tienes logo, lo creamos para que salgas con cara propia.',
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
        kicker='Web profesional'
        title={
          <>
            Tu web
            <br />
            desde 249 € + IVA
          </>
        }
        subtitle='Dos packs: Una página o web de 3 páginas.'
        description='Diseño a tu negocio, hosting, tu dominio, móvil, formulario y WhatsApp. Entrega en 72 h cuando tenemos lo necesario.'
        trustLine='Una página 249 € · 3 páginas 349 € · Entrega en 72 h'
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
        ctaFootnote='72 horas · Precio cerrado · Preguntar no obliga'
      />

      <TrustBar deliveryText='ENTREGA EN 72H' hidePaymentPoint />

      <section ref={planesSectionRef} className='py-20 bg-gray-50'>
        <div id='incluye' className='scroll-mt-24' />
        <div id='planes' className='scroll-mt-24 h-0' aria-hidden='true' />
        <div className='container mx-auto px-6'>
          <RevealOnScroll>
            <div className='text-center mb-12    mx-auto'>
              <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
                Qué incluye
              </h2>
              <p className='text-base md:text-lg text-gray-600'>
                Dos opciones — Una página 249 € / Web 3 páginas 349 €. Hosting
                incluido y entrega en 72 horas en ambas.
              </p>
            </div>
          </RevealOnScroll>

          <div className='   mx-auto grid lg:grid-cols-2 gap-8'>
            <RevealOnScroll delayMs={80}>
              <article className='bg-white rounded-2xl p-7 md:p-8 border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] relative flex flex-col h-full'>
                <span className='absolute -top-4 left-6 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
                  1 página
                </span>
                <h3 className='text-2xl font-extrabold text-gray-900 mt-2 mb-1'>
                  Web Esencial
                </h3>
                <p className='text-3xl font-bold text-gray-900 mb-1'>
                  249 €{' '}
                  <span className='text-lg font-semibold text-gray-500'>
                    + IVA
                  </span>
                </p>
                <p className='text-sm text-gray-500 mb-6'>
                  Una sola página con diferentes secciones y un menú para
                  navegar a través de ellas.
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
                      'Hola, me interesa la Web Esencial (Una página) por 249 € + IVA.',
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
              <article className='bg-white rounded-2xl p-7 md:p-8 border-2 border-accent shadow-[7px_7px_0_0_var(--color-accent)] relative flex flex-col h-full'>
                <span className='absolute -top-4 left-6 bg-[#141414] text-accent border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
                  3 páginas
                </span>
                <h3 className='text-2xl font-extrabold text-gray-900 mt-2 mb-1'>
                  Web Profesional
                </h3>
                <p className='text-3xl font-bold text-gray-900 mb-1'>
                  349 €{' '}
                  <span className='text-lg font-semibold text-gray-500'>
                    + IVA
                  </span>
                </p>
                <p className='text-sm text-gray-500 mb-6'>
                  Más estructura para servicios. Buena base si luego quieres
                  sumar páginas.
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
            <div className='   mx-auto bg-white border-2 border-ink-dark rounded-2xl p-6 md:p-8 shadow-[5px_5px_0_0_#1a1a1a]'>
              <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3 text-center'>
                Empieza simple. Crece después.
              </h3>
              <p className='text-sm md:text-base text-gray-700 leading-relaxed text-center'>
                No hace falta una web enorme el primer día. Publicamos una base
                usable y, si más adelante quieres páginas, blog, reservas u
                otras funciones, lo valoramos entonces. Sin obligarte a pagar
                por lo que aún no usas.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section id='extras' className='scroll-mt-24 py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <RevealOnScroll>
            <div className='text-center mb-12    mx-auto'>
              <h2 className='text-2xl md:text-4xl font-bold text-gray-900 mb-4'>
                ¿Necesitas textos, fotos o logo?
              </h2>
              <p className='text-base md:text-lg text-gray-600'>
                Si no lo tienes, nosotros nos encargamos de crearlo.
              </p>
            </div>
          </RevealOnScroll>
          <div className='   mx-auto grid md:grid-cols-3 gap-5'>
            {extras.map((extra, index) => {
              const Icon = extra.icon;
              return (
                <RevealOnScroll key={extra.title} delayMs={index * 100}>
                  <div className='bg-gray-50 rounded-2xl border-2 border-ink-dark p-6 shadow-[4px_4px_0_0_#1a1a1a] h-full'>
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

      <section id='por-que' className='scroll-mt-24 py-20 bg-gray-50'>
        <div className='container mx-auto px-6'>
          <RevealOnScroll>
            <div className='text-center mb-10    mx-auto'>
              <h2 className='text-2xl md:text-4xl font-bold text-gray-900 mb-4'>
                ¿Por qué PereiraWeb?
              </h2>
              <p className='text-base md:text-lg text-gray-600'>
                Más de 12 años haciendo webs. Gente del equipo ha trabajado en
                proyectos de banca y retail.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delayMs={80}>
            <div className='   mx-auto mb-10'>
              <div className='bg-[#141414] text-white rounded-2xl border-2 border-ink-dark p-5 md:p-6 shadow-[5px_5px_0_0_#1a1a1a] text-center'>
                <p className='text-sm md:text-base font-semibold leading-relaxed'>
                  Proyectos en entornos de{' '}
                  <span className='text-accent'>banca</span> y{' '}
                  <span className='text-accent'>retail</span> — trayectoria
                  vinculada a sitios como{' '}
                  <span className='text-accent'>Banco Santander</span> e{' '}
                  <span className='text-accent'>Inditex</span>.
                </p>
              </div>
            </div>
          </RevealOnScroll>
          <div className='   mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {whyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <RevealOnScroll key={point.title} delayMs={(index % 3) * 90}>
                  <div className='bg-white rounded-2xl border-2 border-ink-dark p-6 shadow-[5px_5px_0_0_#1a1a1a] h-full'>
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
          title='Elige pack y escribimos'
          subtitle='Una página desde 249 € + IVA o 3 páginas por 349 € + IVA. Hosting y 72 h. WhatsApp o formulario.'
          buttonText='WhatsApp'
          onButtonClick={() => handleWhatsApp('LandingWebProfesionalCTAFinal')}
          className='mt-[100px] !py-[calc(5rem+50px)]'
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <div id='contacto' className='scroll-mt-24 py-4'>
          <ContactForm preselectedPlan='Web Esencial' />
        </div>
      </RevealOnScroll>
    </>
  );
};

export default WebProfesional;
