import { useEffect, useMemo } from 'react';
import {
  Check,
  Handshake,
  LayoutTemplate,
  Megaphone,
  MousePointerClick,
  Search,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import Testimonials from '../components/Testimonials';
import TrustBar from '../components/TrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';
import GoogleAdsPaymentTable from '../components/GoogleAdsPaymentTable';
import GoogleAdsCtaActions from '../components/GoogleAdsCtaActions';
import GoogleAdsCaseStudies from '../components/GoogleAdsCaseStudies';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  ADS_GOOGLE_ADS_FORM_ORIGIN,
  ADS_GOOGLE_ADS_LANDING_PATH,
} from '../config/contact';
import {
  getGoogleAdsFirstPaymentLabel,
  getGoogleAdsMonthlyLabel,
  getGoogleAdsSetupLabel,
} from '../config/googleAdsOffer';
import { trackLandingGoogleAdsView } from '../utils/analytics';

const GoogleAdsPriceLines = ({ className }: { className?: string }) => (
  <ul className={className}>
    <li>Setup: {getGoogleAdsSetupLabel()}</li>
    <li>Gestión: {getGoogleAdsMonthlyLabel()}</li>
    <li>Primer pago: {getGoogleAdsFirstPaymentLabel()}</li>
  </ul>
);

const landingTrustPoints = [
  { icon: Target, text: 'Clientes que ya te buscan' },
  { icon: MousePointerClick, text: 'Coste por lead a la vista' },
  { icon: Megaphone, text: getGoogleAdsMonthlyLabel() },
  { icon: ShieldCheck, text: 'Sin permanencia' },
];

const includes = [
  {
    title: 'Palabras que ya buscan',
    description: (
      <>
        No inventamos audiencia.{' '}
        <strong className='font-extrabold'>
          Anunciamos a quien está escribiendo lo que tú vendes
        </strong>
        . El resto es ruido de pago.
      </>
    ),
  },
  {
    title: 'Anuncios que piden el paso',
    description: (
      <>
        Llamada, WhatsApp o compra. El anuncio no “cuenta tu historia”.{' '}
        <strong className='font-extrabold'>Pide el cliente</strong>.
      </>
    ),
  },
  {
    title: 'Negativas, cada semana',
    description: (
      <>
        Gratis, empleo, tutorial, la ciudad de al lado.{' '}
        <strong className='font-extrabold'>
          Dejamos de pagar clics que no van a comprar
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Medimos la conversión, no el clic',
    description: (
      <>
        Formulario, llamada, pedido.{' '}
        <strong className='font-extrabold'>
          Si no entra en el recuento, no sabemos si el anuncio sirve
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Landing que cierra',
    description: (
      <>
        El clic tiene que caer en una página que pida el dato.{' '}
        <strong className='font-extrabold'>La montamos. Entra en el setup</strong>
        . Sin eso, Google Ads es un impuesto.
      </>
    ),
  },
  {
    title: 'Pujas y presupuesto vivos',
    description: (
      <>
        Cada semana: qué palabra gasta, qué anuncio convierte, dónde recortar.{' '}
        <strong className='font-extrabold'>
          Un resumen corto. No un PDF para no abrir
        </strong>
        .
      </>
    ),
  },
];

const offerIncludes = [
  'Estudio de búsquedas y palabras clave',
  'Campañas, grupos y anuncios',
  'Negativas y zona',
  'Tracking de llamadas, formularios o compras',
  'Landing de aterrizaje',
  'Optimización semanal de pujas y presupuesto',
  'Resumen de resultados',
];

const offerExcludes = [
  'La inversión publicitaria. La pagas tú a Google',
  'SEO',
  'Campañas extra (Shopping extra, Display, más países)',
  'Creatividades de vídeo a medida',
  'Cambios grandes de la web que no sean la landing',
];

const whyUs = [
  {
    icon: Search,
    title: 'Porque tú estás aquí',
    description: (
      <>
        Has llegado buscando. Un anuncio te ha traído.{' '}
        <strong className='font-extrabold'>
          Si te hemos vendido a nosotros, podemos venderte a ti
        </strong>
        .
      </>
    ),
  },
  {
    icon: LayoutTemplate,
    title: 'La campaña y la página',
    description: (
      <>
        Las agencias de Ads te tiran tráfico a una web que no pide nada.{' '}
        <strong className='font-extrabold'>
          Nosotros hacemos el anuncio y la landing que cierra
        </strong>
        .
      </>
    ),
  },
  {
    icon: Handshake,
    title: 'Sin permanencia y con cara',
    description: (
      <>
        Setup: {getGoogleAdsSetupLabel()}. Gestión:{' '}
        {getGoogleAdsMonthlyLabel()}. Primer pago:{' '}
        {getGoogleAdsFirstPaymentLabel()}.{' '}
        <strong className='font-extrabold'>
          Si no encaja, te vas. Por eso no dormimos la cuenta
        </strong>
        .
      </>
    ),
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Qué tiene que pasar',
    description: (
      <>
        Pedido, llamada, reserva o WhatsApp. Zona y presupuesto de Google.{' '}
        <strong className='font-extrabold'>Aún no hay nada que pagar</strong>.
      </>
    ),
  },
  {
    number: '2',
    title: 'Te decimos si da para una campaña',
    description: (
      <>
        Palabras, orientación de gasto y precio de gestión.{' '}
        <strong className='font-extrabold'>
          Si con 10 € al día no se aprende nada, te lo decimos
        </strong>
        .
      </>
    ),
  },
  {
    number: '3',
    title: 'Setup, tracking y landing',
    description: (
      <>
        {getGoogleAdsSetupLabel()}. Configuramos la campaña, medición y landing.
      </>
    ),
  },
  {
    number: '4',
    title: 'Cada semana, más barato el cliente',
    description: (
      <>
        {getGoogleAdsMonthlyLabel()} de gestión. Recortamos lo que no convierte.
        Subimos lo que sí.{' '}
        <strong className='font-extrabold'>Tú ves el coste por lead</strong>, no
        un porcentaje de impresiones.
      </>
    ),
  },
];

const faqs = [
  {
    question: '¿Cuánto cuesta la gestión?',
    answer: `Setup: ${getGoogleAdsSetupLabel()}. Gestión: ${getGoogleAdsMonthlyLabel()}. Primer pago: ${getGoogleAdsFirstPaymentLabel()}. Luego solo la mensual. Sin permanencia. Lo que se gasta en anuncios lo pagas tú a Google.`,
  },
  {
    question: '¿La inversión de Google está incluida?',
    answer:
      'No. Ese dinero va a Google. En la propuesta te damos una orientación. Para un negocio local suele empezar por 300–500 €/mes a Google. Si el presupuesto no da para aprender, te lo decimos antes del setup.',
  },
  {
    question: '¿Qué incluye el setup?',
    answer:
      'Búsquedas, palabras, estructura, anuncios, negativas, zona, conversiones, landing y el lanzamiento. No es “activar un anuncio y ya”.',
  },
  {
    question: '¿Qué miráis cada mes?',
    answer:
      'Pujas, presupuesto, negativas, anuncios y la landing. Un resumen de lo que ha pasado: gasto, clics, leads o pedidos, y coste de cada uno.',
  },
  {
    question: '¿Garantizáis X clientes?',
    answer:
      'No. Nadie honesto lo hace. Garantizamos el trabajo: campaña bien montada, medición y recorte semanal. El volumen depende de sector, zona y lo que gastes en Google.',
  },
  {
    question: '¿Hay permanencia?',
    answer:
      'No. Puedes cancelar. Si no encaja, te vas. Por eso nos esforzamos: no te tenemos atado.',
  },
  {
    question: '¿Y si mi web no convierte?',
    answer:
      'Por eso la landing entra en el setup. El anuncio sin una página que pida el teléfono es tirar el dinero.',
  },
  {
    question: '¿Cómo se empieza?',
    answer:
      'Nos escribes. Te decimos si encaja. Si sí: primer pago, accesos y lanzamos. El pago es por Stripe en la web.',
  },
];

const LandingGoogleAds = () => {
  usePageMeta(ADS_GOOGLE_ADS_LANDING_PATH);

  useEffect(() => {
    trackLandingGoogleAdsView();
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

  useJsonLd('jsonld-landing-google-ads-faq', faqJsonLd);

  return (
    <>
      <HeroCta
        label='Google Ads'
        title='Tú nos has encontrado. Ahora hacemos que te compren a ti.'
        description={
          <>
            <p>
              Campañas de búsqueda para autónomos y pequeños negocios. Gente que
              ya te está buscando. Leads, llamadas y pedidos. No likes.
            </p>
            <GoogleAdsPriceLines className='mt-2 space-y-1 font-extrabold' />
            <ul className='mt-4 space-y-1 text-center text-base font-bold md:text-left md:text-lg'>
              <li>Landing orientada a conseguir contactos, incluida</li>
              <li>Google lo pagas tú a Google</li>
              <li>Coste por lead a la vista, cada semana</li>
            </ul>
          </>
        }
        mobileDescription={
          <>
            <p>
              Campañas de búsqueda. Gente que ya te está buscando. Leads,
              llamadas y pedidos. No likes.
            </p>
            <GoogleAdsPriceLines className='mt-2 space-y-1 font-extrabold' />
          </>
        }
        mobileProof={
          <ul className='space-y-1 text-center text-base font-bold'>
            <li>Landing orientada a conseguir contactos, incluida</li>
            <li>Google lo pagas tú a Google</li>
            <li>Coste por lead a la vista, cada semana</li>
          </ul>
        }
        convertFirstOnMobile
        buttonText='Quiero información'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Nosotros te llamamos'
        formDescription='Te decimos si da para una campaña. Sin compromiso.'
        formSectionInfo={ADS_GOOGLE_ADS_FORM_ORIGIN}
        formSubmitLabel='Quiero información'
        formId='contacto'
        hasBackground={false}
        hasReviewBadge
        isTopHero
      />

      <TrustBar points={landingTrustPoints} />

      <GoogleAdsCaseStudies />

      <ServiceIncludes
        title='Qué hacemos con tu cuenta'
        intro={
          <>
            Palabras, anuncios, negativas, medición y landing.{' '}
            <strong className='font-extrabold'>
              Cada semana recortamos lo que no trae clientes
            </strong>
            .
          </>
        }
        items={includes}
      />

      <section className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Qué entra y qué no
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              El dinero de los anuncios va a Google. Nosotros cobramos el
              montaje y la gestión.
            </p>
          </div>
          <div className='grid items-stretch gap-page-gap md:grid-cols-2'>
            <article className='flex flex-col rounded-lg border-2 border-ink-dark bg-white p-content-pad'>
              <h3 className='text-2xl font-extrabold text-ink-dark'>Incluye</h3>
              <ul className='mt-6 space-y-2 text-base md:text-lg'>
                {offerIncludes.map((item) => (
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
            <article className='flex flex-col rounded-lg border-2 border-ink-dark bg-white p-content-pad'>
              <h3 className='text-2xl font-extrabold text-ink-dark'>
                No incluye
              </h3>
              <ul className='mt-6 space-y-2 text-base md:text-lg'>
                {offerExcludes.map((item) => (
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

      <SEOBenefits
        title='Por qué con nosotros'
        subtitle={
          <>
            El anuncio te ha traído.{' '}
            <strong className='font-extrabold'>Hacemos el anuncio</strong> y{' '}
            <strong className='font-extrabold'>la página que cierra</strong>.
          </>
        }
        benefits={whyUs}
      />

      <Testimonials />

      <section className='page-section bg-surface-muted'>
        <div className='container mx-auto flex flex-col items-center gap-page-gap text-center'>
          <div className='page-title-block mx-auto max-w-5xl'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              ¿Quieres clientes que ya te están buscando?
            </h2>
            <GoogleAdsPriceLines className='text-xl text-ink-dark md:text-2xl' />
          </div>
          <GoogleAdsCtaActions location='GoogleAdsSocialProof' align='center' />
        </div>
      </section>

      <SEOProcess
        title='De cero a campaña al aire'
        subtitle={
          <>
            <strong className='font-extrabold'>Cuatro pasos.</strong> Si no da
            para una campaña, te lo decimos antes de cobrar.
          </>
        }
        steps={processSteps}
      />

      <HeroCta
        title='¿Te encaja? Te llamamos'
        description={
          <>
            Nombre y teléfono. Te decimos si Google Ads tiene sentido en tu
            caso.{' '}
            <strong className='font-extrabold'>Sin compromiso.</strong>
          </>
        }
        buttonText='Quiero información'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Nosotros te llamamos'
        formDescription='Te escribimos en horario laboral.'
        formSectionInfo={ADS_GOOGLE_ADS_FORM_ORIGIN}
        formSubmitLabel='Quiero información'
        hasBackground={false}
        hasReviewBadge
      />

      <div id='faq'>
        <SEOFAQ
          title='Lo que suele preguntar quien paga anuncios'
          faqs={faqs}
          ctaText='Quiero información'
          ctaHref='#contacto'
        />
      </div>

      <div id='contacto-final'>
        <HeroCta
          title='Quiero que me encuentren y me compren'
          belowDescription={<GoogleAdsPaymentTable />}
          ctaContent={
            <GoogleAdsCtaActions location='GoogleAdsFinal' align='center' />
          }
          heroType='clean'
          hasButton={false}
          hasBackground={false}
          hasReviewBadge
        />
      </div>
    </>
  );
};

export default LandingGoogleAds;
