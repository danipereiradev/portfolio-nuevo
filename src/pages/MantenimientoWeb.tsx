import { useEffect, useMemo } from 'react';
import {
  AlertTriangle,
  BadgeCheck,
  Check,
  Code2,
  Handshake,
  MessagesSquare,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react';
import HeroCta, { HeroCtaList } from '../components/HeroCta';
import TrustBar from '../components/TrustBar';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import Button from '../components/Button';
import MaintenanceHourPacks from '../components/MaintenanceHourPacks';
import MaintenancePlans from '../components/MaintenancePlans';
import MaintenanceLeadForm from '../components/MaintenanceLeadForm';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  buildWhatsAppUrl,
  SITE_MAINTENANCE_PATH,
  MAINTENANCE_WHATSAPP_MESSAGE,
} from '../config/contact';
import {
  HOUR_PACKS,
  HOUR_PACK_VALIDITY_MONTHS,
  MAINTENANCE_BONOS_ID,
  MAINTENANCE_CONTACT_ID,
  MAINTENANCE_PLANES_ID,
  maintenanceCardAlignClass,
  maintenanceListClass,
} from '../config/maintenanceOffer';
import { formatEuro } from '../config/payments';
import {
  trackGoogleAdsWhatsAppConversion,
  trackMaintenancePageView,
  trackWhatsAppClick,
} from '../utils/analytics';

const SITE_URL = 'https://36web.es';

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
    description: 'No con un call center. Te atiende quien revisa la web.',
  },
  {
    icon: Code2,
    title: 'Perfil técnico',
    description: 'No nos limitamos a actualizar plugins.',
  },
  {
    icon: BadgeCheck,
    title: 'Precio claro',
    description: 'Horas y planes definidos antes de empezar.',
  },
  {
    icon: Wrench,
    title: 'Podemos arreglar y evolucionar',
    description: 'Frontend, backend, ecommerce y aplicaciones.',
  },
  {
    icon: Handshake,
    title: 'Nos adaptamos',
    description: 'No necesitas haber hecho la web con nosotros.',
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

const faqs = [
  {
    question: '¿Cuánto cuesta el mantenimiento de una página web?',
    answer:
      `El plan Web empieza en 59 € + IVA/mes. El plan Negocio son 99 € + IVA/mes. Ecommerce, desde 149 € + IVA/mes, según la tienda. Si solo necesitas algo puntual, hay bonos de 3, 6 y 10 horas, válidos durante ${HOUR_PACK_VALIDITY_MONTHS} meses desde la compra. Antes de cobrar, te decimos si el plan encaja.`,
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
    answer:
      'No. Las horas del plan mensual son de ese mes. No se acumulan.',
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

const examplePack = HOUR_PACKS.find((pack) => pack.id === '6') ?? HOUR_PACKS[1];

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

const MantenimientoWeb = () => {
  usePageMeta(SITE_MAINTENANCE_PATH);

  useEffect(() => {
    trackMaintenancePageView();
  }, []);

  const whatsappUrl = buildWhatsAppUrl(MAINTENANCE_WHATSAPP_MESSAGE);

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Mantenimiento web y soporte técnico',
          serviceType: 'Mantenimiento web',
          description:
            'Mantenimiento y soporte para webs, WordPress, ecommerce y aplicaciones. Planes mensuales y bonos de horas.',
          url: `${SITE_URL}${SITE_MAINTENANCE_PATH}/`,
          areaServed: { '@type': 'Country', name: 'España' },
          provider: {
            '@type': 'ProfessionalService',
            name: '36web',
            url: `${SITE_URL}/`,
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    }),
    [],
  );

  useJsonLd('jsonld-mantenimiento-web', jsonLd);

  return (
    <>
      <HeroCta
        label='Mantenimiento y soporte'
        title='Mantenimiento y soporte web cuando lo necesitas'
        description={
          <HeroCtaList
            className='mx-auto w-full list-none pl-0 text-center'
            items={[
              'Arreglamos incidencias, hacemos cambios y mantenemos webs, tiendas online y aplicaciones.',
              'Puedes contratar horas puntuales o dejarnos el mantenimiento mes a mes.',
              'Sin comerciales. Hablas directamente con quien revisa tu web.',
            ]}
          />
        }
        buttonText='Necesito arreglar mi web'
        buttonHref={`#${MAINTENANCE_BONOS_ID}`}
        backgroundUrl='/img/hero/hero-mantenimiento-36web.webp'
        heroType='clean'
        hasButton={false}
        hasBackground
        grayscale
        overlay='black'
        hasReviewBadge
        isTopHero
        ctaContent={
          <div className='flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center'>
            <Button
              href={`#${MAINTENANCE_BONOS_ID}`}
              className='!mt-0 sm:flex-1 sm:max-w-[var(--button-width)]'
            >
              Necesito arreglar mi web
            </Button>
            <Button
              href={`#${MAINTENANCE_PLANES_ID}`}
              variant='secondary'
              className='!mt-0 sm:flex-1 sm:max-w-[var(--button-width)]'
            >
              Quiero mantenimiento mensual
            </Button>
            <Button
              href={whatsappUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='!mt-0 !bg-[#25D366] hover:!bg-[#20bd5a] sm:flex-1 sm:max-w-[var(--button-width)]'
              onClick={(event) => {
                event.preventDefault();
                trackWhatsAppClick('MaintenanceHero');
                trackGoogleAdsWhatsAppConversion(whatsappUrl);
              }}
            >
              <WhatsAppIcon />
              Cuéntanos qué está pasando
            </Button>
          </div>
        }
      />

      <TrustBar
        points={[
          { icon: Wrench, text: 'Bonos de horas' },
          { icon: ShieldCheck, text: 'Desde 59 €/mes' },
          { icon: BadgeCheck, text: 'Sin permanencia' },
          { icon: Handshake, text: 'Webs de otros, también' },
        ]}
      />

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
        <div className='container mx-auto max-w-4xl'>
          <article className='rounded-lg border-2 border-ink-dark bg-white p-content-pad text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl'>
              ¿La web no la hicimos nosotros? No pasa nada.
            </h2>
            <p className='mt-text-gap text-xl text-ink-dark md:text-2xl'>
              La mayoría de incidencias que recibimos llegan de webs
              desarrolladas por otras agencias o profesionales. Podemos
              revisarla y decirte si podemos hacernos cargo.
            </p>
            <Button href={`#${MAINTENANCE_CONTACT_ID}`} className='mt-8'>
              Quiero que reviséis mi web
            </Button>
          </article>
        </div>
      </section>

      <section className='page-section bg-surface-muted'>
        <div className='container mx-auto max-w-4xl'>
          <div className='flex flex-col items-center gap-4 rounded-lg border-2 border-ink-dark bg-white p-content-pad text-center md:flex-row md:items-start md:text-left'>
            <AlertTriangle
              className='h-7 w-7 shrink-0 text-accent md:mt-1'
              aria-hidden
            />
            <div>
              <h2 className='text-2xl font-extrabold text-ink-dark md:text-3xl'>
                Si la web ya viene con problemas graves
              </h2>
              <p className='mt-text-gap text-lg text-ink-dark md:text-xl'>
                Malware, plugins rotos, versiones obsoletas o deuda técnica
                importante: el saneamiento inicial no está incluido en la cuota
                mensual. Se valora aparte con un bono de horas o un presupuesto
                cerrado. Después puede entrar en mantenimiento mensual.
              </p>
            </div>
          </div>
        </div>
      </section>

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
            <article className={`flex flex-col ${maintenanceCardAlignClass} rounded-lg border-2 border-ink-dark bg-white p-content-pad`}>
              <h3 className='text-2xl font-extrabold text-ink-dark'>Incluido</h3>
              <ul className={`mt-6 space-y-2 text-base md:text-lg ${maintenanceListClass}`}>
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
            <article className={`flex flex-col ${maintenanceCardAlignClass} rounded-lg border-2 border-ink-dark bg-white p-content-pad`}>
              <h3 className='text-2xl font-extrabold text-ink-dark'>
                No incluido
              </h3>
              <ul className={`mt-6 space-y-2 text-base md:text-lg ${maintenanceListClass}`}>
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
        title='Cuando algo falla, no quieres abrir un ticket y esperar una semana.'
        subtitle='Estudio pequeño. Hablas con quien mira la web.'
        benefits={whyUs}
        mobileCenter
      />

      <section className='page-section bg-surface-muted'>
        <div className='container mx-auto max-w-3xl'>
          <article className={`flex flex-col ${maintenanceCardAlignClass} rounded-lg border-2 border-ink-dark bg-white p-content-pad`}>
            <h2 className='text-2xl font-extrabold text-ink-dark md:text-3xl'>
              Un ejemplo
            </h2>
            <p className='mt-text-gap text-lg text-ink-dark md:text-xl'>
              Después de una actualización la web falla, el formulario deja de
              enviar y hay que cambiar textos y fotos. No necesitas un rediseño:
              necesitas que alguien técnico lo deje funcionando.
            </p>
            <p className='mt-text-gap text-2xl font-extrabold text-ink-dark'>
              {examplePack.name} · {formatEuro(examplePack.amount)} + IVA
            </p>
            <p className='mt-text-gap text-lg text-ink-dark md:text-xl'>
              Revisamos, solucionamos y probamos. Si después prefieres que nos
              ocupemos cada mes, puedes pasar a mantenimiento.
            </p>
            <Button href={`#${MAINTENANCE_BONOS_ID}`} className='mt-6 mx-auto md:mx-0'>
              Ver bonos de horas
            </Button>
          </article>
        </div>
      </section>

      <Testimonials hasVideo showClientReferenceCta />

      <Team
        label='EL EQUIPO'
        title='Trato directo durante todo el soporte.'
        compact
        paragraphs={[
          <>
            Cuando escribes, hablas con{' '}
            <strong className='font-extrabold'>
              la persona que revisa tu web
            </strong>
            , por email, teléfono o videollamada.
          </>,
        ]}
      />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='Lo que suele preguntar la gente'
          faqs={faqs}
          ctaText='CUÉNTANOS TU WEB'
          ctaHref={`#${MAINTENANCE_CONTACT_ID}`}
        />
      </div>

      <HeroCta
        title='Cuéntanos qué le pasa a tu web'
        description='Nombre, email, teléfono y un mensaje con el síntoma. Si tienes la URL, mejor. Sin compromiso.'
        heroType='offer'
        hasButton={false}
        hasBackground={false}
        hasReviewBadge
        offerContent={<MaintenanceLeadForm />}
      />
    </>
  );
};

export default MantenimientoWeb;
