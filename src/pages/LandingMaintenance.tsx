import { useEffect, useMemo, type MouseEvent } from 'react';
import {
  BadgeCheck,
  Check,
  Code2,
  Handshake,
  MessagesSquare,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react';
import Portfolio from '../components/Portfolio';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import TrustBar from '../components/TrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta, { HeroCtaList } from '../components/HeroCta';
import Button from '../components/Button';
import MaintenanceHourPacks from '../components/MaintenanceHourPacks';
import MaintenancePlans from '../components/MaintenancePlans';
import MaintenanceLeadForm from '../components/MaintenanceLeadForm';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  ADS_MAINTENANCE_FORM_FINAL,
  ADS_MAINTENANCE_FORM_HERO,
  ADS_MAINTENANCE_LANDING_PATH,
  ADS_MAINTENANCE_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';
import {
  HOUR_PACK_VALIDITY_MONTHS,
  MAINTENANCE_BONOS_ID,
  MAINTENANCE_CONTACT_ID,
  MAINTENANCE_PLANES_ID,
  maintenanceCardAlignClass,
  maintenanceListClass,
} from '../config/maintenanceOffer';
import {
  trackGoogleAdsWhatsAppConversion,
  trackLandingMaintenanceView,
  trackMaintenanceWhatsAppClick,
  trackWhatsAppClick,
} from '../utils/analytics';

const landingTrustPoints = [
  { icon: Wrench, text: 'Bonos de horas' },
  { icon: ShieldCheck, text: 'Desde 59 €/mes' },
  { icon: BadgeCheck, text: 'Sin permanencia' },
  { icon: Handshake, text: 'Webs de otros, también' },
];

const needCards = [
  {
    title: 'Algo se ha roto',
    text: 'Errores, caídas, HTTPS, formularios, vídeos, integraciones, problemas después de una actualización…',
    cta: 'Ver bonos de horas',
    href: `#${MAINTENANCE_BONOS_ID}`,
  },
  {
    title: 'Necesito hacer cambios',
    text: 'Textos, imágenes, nuevas secciones, ajustes responsive, pequeños desarrollos o mejoras.',
    cta: 'Ver bonos de horas',
    href: `#${MAINTENANCE_BONOS_ID}`,
  },
  {
    title: 'Quiero olvidarme del mantenimiento',
    text: 'Nos ocupamos de actualizaciones, copias, seguridad, incidencias y pequeños cambios.',
    cta: 'Ver mantenimiento mensual',
    href: `#${MAINTENANCE_PLANES_ID}`,
  },
  {
    title: 'Tengo una tienda o aplicación',
    text: 'WooCommerce, Shopify, ecommerce, frontend/backend o desarrollo a medida.',
    cta: 'Solicitar valoración',
    href: `#${MAINTENANCE_CONTACT_ID}`,
  },
];

const whyUs = [
  {
    icon: MessagesSquare,
    title: 'Hablas con una persona',
    description: (
      <>
        No con un call center.{' '}
        <strong className='font-extrabold'>
          Te atiende quien revisa la web
        </strong>
        .
      </>
    ),
  },
  {
    icon: Code2,
    title: 'Perfil técnico',
    description: (
      <>
        No nos limitamos a actualizar plugins.{' '}
        <strong className='font-extrabold'>
          Arreglamos y evolucionamos
        </strong>
        .
      </>
    ),
  },
  {
    icon: BadgeCheck,
    title: 'Precio claro',
    description: (
      <>
        Horas y planes definidos antes de empezar.{' '}
        <strong className='font-extrabold'>Sin permanencia</strong>.
      </>
    ),
  },
];

const included = [
  'Actualizaciones',
  'Copias',
  'Pequeñas incidencias',
  'Pequeñas modificaciones',
  'Soporte técnico',
  'Monitorización según plan',
  'Seguridad básica',
  'Revisión de funcionamiento',
];

const excluded = [
  'Rediseños completos',
  'Nuevas funcionalidades grandes',
  'Desarrollos de muchas horas',
  'Licencias premium de terceros',
  'Costes externos de hosting o plataformas',
  'Recuperación de ataques graves previa al contrato',
  'Migraciones complejas',
  'Grandes cargas de contenido',
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas la web',
    description: (
      <>
        Formulario, WhatsApp o llamada. Qué tienes ahora y qué te falla.{' '}
        <strong className='font-extrabold'>Aún no hay nada que pagar</strong>.
      </>
    ),
  },
  {
    number: '2',
    title: 'Te decimos qué encaja',
    description: (
      <>
        Te devolvemos <strong className='font-extrabold'>propuesta</strong>{' '}
        <strong className='font-extrabold'>en el mismo día</strong>: bono de
        horas o plan mensual, qué entra y cuánto sale, por escrito.
      </>
    ),
  },
  {
    number: '3',
    title: 'Arrancamos',
    description: (
      <>
        Si es un bono, revisamos y arreglamos. Si es un plan, dejamos
        actualizaciones, copias y soporte en marcha.{' '}
        <strong className='font-extrabold'>
          Hablas con quien mira la web
        </strong>
        .
      </>
    ),
  },
  {
    number: '4',
    title: 'La web sigue siendo tuya',
    description: (
      <>
        Pago mensual o horas del bono. Puedes cancelar.{' '}
        <strong className='font-extrabold'>La web es tuya</strong>.
      </>
    ),
  },
];

const faqs = [
  {
    question: '¿Cuánto cuesta el mantenimiento de una página web?',
    answer: `El plan Web empieza en 59 € + IVA/mes. El plan Negocio son 99 € + IVA/mes. Ecommerce, desde 149 € + IVA/mes, según la tienda. Si solo necesitas algo puntual, hay bonos de 3, 6 y 10 horas, válidos durante ${HOUR_PACK_VALIDITY_MONTHS} meses desde la compra. Antes de cobrar, te decimos si el plan encaja.`,
  },
  {
    question: '¿Puedo contrataros si la web la hizo otra empresa?',
    answer:
      'Sí. La mayoría de incidencias que vemos vienen de webs hechas por otros. Primero la revisamos y te decimos si podemos hacernos cargo. Si es un pozo, también te lo decimos.',
  },
  {
    question: '¿Qué pasa si mi web ya está rota?',
    answer:
      'Empieza por un bono de horas. Revisamos, arreglamos y te decimos qué queda. El saneamiento inicial —malware, plugins rotos, versiones muy antiguas— no entra en la cuota mensual. Luego, si quieres, pasas a mantenimiento.',
  },
  {
    question: '¿Qué se considera un pequeño cambio?',
    answer:
      'Un texto, una foto, un teléfono, un horario, un ajuste visual o un arreglo acotado. Una página nueva, una funcionalidad o un rediseño van aparte, con precio antes de hacerlos.',
  },
  {
    question: '¿Qué ocurre si necesito más horas?',
    answer:
      'Te lo decimos antes de seguir. Puedes ampliar con otro bono o un presupuesto cerrado. No consumimos horas de más sin tu aprobación.',
  },
  {
    question: '¿Cuánto tiempo es válido un bono de horas?',
    answer: `Los bonos son válidos durante ${HOUR_PACK_VALIDITY_MONTHS} meses desde la compra. Si queda tiempo, puedes usarlo en pequeños trabajos dentro de ese plazo.`,
  },
  {
    question: '¿Las horas mensuales se acumulan?',
    answer: 'No. Las horas del plan mensual son de ese mes. No se acumulan.',
  },
  {
    question: '¿Mantenéis WordPress?',
    answer:
      'Sí. WordPress, temas, plugins y lo habitual de una web de negocio. Primero vemos el estado; no cogemos un sitio irrecuperable a ciegas.',
  },
  {
    question: '¿Mantenéis WooCommerce?',
    answer:
      'Sí. Checkout, pagos, pedidos e integraciones, según el plan Ecommerce. Antes revisamos la tienda para confirmar que el plan encaja.',
  },
  {
    question: '¿Trabajáis con Shopify?',
    answer:
      'Sí, cuando el alcance encaja. Shopify tiene sus límites de plataforma. Te lo decimos en la revisión, no después de cobrar.',
  },
  {
    question: '¿Mantenéis aplicaciones hechas a medida?',
    answer:
      'Sí: React, Next.js, Vue, Angular, Node, PHP, Laravel, APIs, servidores. El precio parte de 199 € + IVA/mes y depende de la arquitectura. Antes se revisa el stack.',
  },
  {
    question: '¿Hosting y dominio están incluidos?',
    answer:
      'No. El dominio es tuyo. El hosting o la plataforma (Shopify, Vercel, un VPS…) los pagas tú. Nosotros nos ocupamos de la web sobre esa infraestructura.',
  },
  {
    question: '¿Hay permanencia?',
    answer:
      'No. Pago mensual. Puedes cancelar. Te dejamos accesos y copias; la web sigue siendo tuya.',
  },
  {
    question: '¿Cuánto tardáis en responder una incidencia?',
    answer:
      'En horario laboral. Objetivo: ≤ 48 h en el plan Web y ≤ 24 h en Negocio y Ecommerce. No es un servicio 24/7. Si algo es urgente, WhatsApp o el formulario y lo vemos en cuanto estemos.',
  },
  {
    question: '¿Puedo empezar con un bono y pasar después a mantenimiento mensual?',
    answer:
      'Sí. Es el camino habitual: arreglar lo que falla, y si encaja, dejarla en un plan mes a mes.',
  },
];

const WhatsAppIcon = () => (
  <svg
    className='h-5 w-5 shrink-0'
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
  </svg>
);

const LandingMaintenance = () => {
  usePageMeta(ADS_MAINTENANCE_LANDING_PATH);

  useEffect(() => {
    trackLandingMaintenanceView();
  }, []);

  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }),
    [],
  );

  useJsonLd('jsonld-landing-maintenance-faq', faqJsonLd);

  const whatsappUrl = buildWhatsAppUrl(ADS_MAINTENANCE_WHATSAPP_MESSAGE);

  const openLandingWhatsApp = (
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    trackMaintenanceWhatsAppClick('LandingMaintenanceHero');
    trackWhatsAppClick('LandingMaintenanceHero', ADS_MAINTENANCE_WHATSAPP_MESSAGE);
    trackGoogleAdsWhatsAppConversion(whatsappUrl);
  };

  return (
    <>
      <HeroCta
        title='Mantenimiento y soporte web cuando lo necesitas'
        description={
          <>
            <p>
              Planes desde 59 € + IVA/mes o bonos de horas para arreglos
              puntuales. Trabajamos también con webs hechas por otras empresas.
            </p>
            <HeroCtaList
              className='mx-auto mt-text-gap w-fit max-w-[var(--button-width)] list-disc pl-5 text-left md:mx-0 md:w-full md:max-w-none'
              items={[
                <>
                  <strong className='font-extrabold'>
                    Propuesta en el mismo día
                  </strong>
                  .
                </>,
                <>
                  <strong className='font-extrabold'>
                    Hablas con quien revisa la web, no con un comercial
                  </strong>
                  .
                </>,
                'Sin permanencia.',
              ]}
            />
          </>
        }
        buttonText='Pedir propuesta'
        buttonHref={`#${MAINTENANCE_CONTACT_ID}`}
        backgroundUrl='/img/hero/hero-mantenimiento-36web.webp'
        heroType='offer'
        hasButton={false}
        hasBackground
        grayscale
        overlay='black'
        hasReviewBadge
        isTopHero
        ctaContent={
          <div className='flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:items-stretch md:justify-start'>
            <Button
              href={`#${MAINTENANCE_CONTACT_ID}`}
              className='!mx-0 !mt-0 !box-border !h-14 !min-h-14 !w-full !max-w-[var(--button-width)] !whitespace-nowrap !border-2 !border-accent !px-4 !py-0 !text-sm md:!text-base sm:!w-[var(--button-width)]'
            >
              Pedir propuesta
            </Button>
            <Button
              href={whatsappUrl}
              target='_blank'
              rel='noopener noreferrer'
              variant='secondary'
              className='!mx-0 !mt-0 !box-border !h-14 !min-h-14 !w-full !max-w-[var(--button-width)] !whitespace-nowrap !px-4 !py-0 !text-sm md:!text-base sm:!w-[var(--button-width)]'
              onClick={openLandingWhatsApp}
            >
              <WhatsAppIcon />
              Hablar por WhatsApp
            </Button>
          </div>
        }
        offerContent={
          <MaintenanceLeadForm origin={ADS_MAINTENANCE_FORM_HERO} />
        }
      />

      <TrustBar points={landingTrustPoints} />

      <section className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              ¿Qué necesitas?
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              No necesitas cambiar de web cada vez que algo falla. La
              arreglamos, mantenemos y evolucionamos.
            </p>
          </div>
          <div className='grid items-stretch gap-page-gap md:grid-cols-2'>
            {needCards.map((card) => (
              <article
                key={card.title}
                className={`flex h-full flex-col ${maintenanceCardAlignClass} rounded-lg border-2 border-ink-dark bg-white p-content-pad`}
              >
                <h3 className='text-xl font-extrabold text-ink-dark md:text-2xl'>
                  {card.title}
                </h3>
                <p className='mt-text-gap flex-1 text-base text-ink-dark md:text-lg'>
                  {card.text}
                </p>
                <Button href={card.href} className='mt-6 mx-auto md:mx-0'>
                  {card.cta}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MaintenanceHourPacks />
      <MaintenancePlans />

      <section className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Qué incluye y qué no
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              Si algo queda fuera, te damos precio antes de hacerlo.
            </p>
          </div>
          <div className='grid items-stretch gap-page-gap md:grid-cols-2'>
            <article
              className={`flex flex-col ${maintenanceCardAlignClass} rounded-lg border-2 border-ink-dark bg-white p-content-pad`}
            >
              <h3 className='text-2xl font-extrabold text-ink-dark'>
                Incluido
              </h3>
              <ul
                className={`mt-6 space-y-2 text-base md:text-lg ${maintenanceListClass}`}
              >
                {included.map((item) => (
                  <li key={item} className='flex items-start gap-2'>
                    <Check
                      className='mt-1 h-4 w-4 shrink-0 text-accent'
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article
              className={`flex flex-col ${maintenanceCardAlignClass} rounded-lg border-2 border-ink-dark bg-white p-content-pad`}
            >
              <h3 className='text-2xl font-extrabold text-ink-dark'>
                No incluido
              </h3>
              <ul
                className={`mt-6 space-y-2 text-base md:text-lg ${maintenanceListClass}`}
              >
                {excluded.map((item) => (
                  <li key={item} className='flex items-start gap-2'>
                    <X
                      className='mt-1 h-4 w-4 shrink-0 text-ink-medium'
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className='border-y border-ink-light bg-accent-light'>
        <div className='container mx-auto py-page-compact text-center'>
          <p className='text-2xl font-extrabold text-ink-dark md:text-4xl'>
            Sin permanencia.
          </p>
          <p className='mt-2 text-lg text-ink-dark md:text-xl'>
            Pago mensual. Puedes cancelar. La web es tuya.
          </p>
        </div>
      </section>

      <SEOBenefits
        title='Por qué encargárnoslo a nosotros'
        subtitle={
          <>
            Tres cosas claras:{' '}
            <strong className='font-extrabold'>el precio</strong>,{' '}
            <strong className='font-extrabold'>con quién hablas</strong> y{' '}
            <strong className='font-extrabold'>que sabemos arreglarla</strong>.
          </>
        }
        benefits={whyUs}
      />

      <Portfolio casos contained />

      <SEOProcess
        title='Así se contrata'
        subtitle={
          <>
            <strong className='font-extrabold'>Cuatro pasos.</strong> Sabes
            la cuota o las horas antes de empezar. Cancelas cuando quieras.
          </>
        }
        steps={processSteps}
      />

      <Testimonials hasVideo showClientReferenceCta />

      <Team
        label='EL EQUIPO'
        title='Trato directo durante todo el soporte.'
        compact
        paragraphs={[
          <>
            Desde la primera conversación, hablas con{' '}
            <strong className='font-extrabold'>
              la persona que revisa tu web
            </strong>{' '}
            por{' '}
            <strong className='font-extrabold'>
              email, teléfono o videollamada
            </strong>
            .
          </>,
        ]}
      />

      <div id='faq'>
        <SEOFAQ
          title='Lo que suele preguntar la gente'
          faqs={faqs}
          ctaText='Pedir propuesta'
          ctaHref={`#${MAINTENANCE_CONTACT_ID}`}
        />
      </div>

      <HeroCta
        title='Cuando quieras, lo vemos'
        description={
          <>
            URL, síntoma y cómo te localizamos. Te devolvemos{' '}
            <strong className='font-extrabold'>propuesta</strong>{' '}
            <strong className='font-extrabold'>en el mismo día</strong>: bono o
            plan, con precio.{' '}
            <strong className='font-extrabold'>Sin compromiso.</strong>
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref={`#${MAINTENANCE_CONTACT_ID}`}
        heroType='offer'
        hasButton={false}
        hasBackground={false}
        hasReviewBadge
        offerContent={
          <MaintenanceLeadForm
            origin={ADS_MAINTENANCE_FORM_FINAL}
            formId={MAINTENANCE_CONTACT_ID}
          />
        }
      />
    </>
  );
};

export default LandingMaintenance;
