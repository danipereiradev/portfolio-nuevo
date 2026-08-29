import { useMemo } from 'react';
import {
  FileCheck,
  Handshake,
  LayoutTemplate,
} from 'lucide-react';
import Portfolio from '../components/Portfolio';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import LaunchTrustBar from '../components/LaunchTrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';
import LaunchOfferCard from '../components/LaunchOfferCard';
import LaunchPaymentTable from '../components/LaunchPaymentTable';
import LaunchReserveActions from '../components/LaunchReserveActions';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { ADS_LAUNCH_LANDING_PATH } from '../config/contact';
import {
  getLaunchAvailabilityCopy,
  getLaunchPriceLabel,
  getLaunchRemainderLabel,
  getLaunchReserveLabel,
  LAUNCH_DELIVERY_HOURS,
  LAUNCH_OFFER_MAX,
} from '../config/launchOffer';

const includes = [
  {
    title: 'Logo si no tienes',
    description: (
      <>
        Si no tienes logo, te lo hacemos. Si ya tienes marca, la usamos.{' '}
        <strong className='font-extrabold'>
          La web sale con identidad, no con un recuadro vacío
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Textos, fotos y contenidos de tu sector',
    description: (
      <>
        No hace falta que nos mandes un dossier. Redactamos los textos y
        ponemos fotos acordes a lo que haces:{' '}
        <strong className='font-extrabold'>
          fontanero, clínica, restaurante, tienda…
        </strong>{' '}
        La web habla de tu negocio desde el día uno.
      </>
    ),
  },
  {
    title: 'Diseño a tu medida',
    description: (
      <>
        No hacemos la misma web para todo el mundo. Colores, estructura y tono
        de tu sector.{' '}
        <strong className='font-extrabold'>
          Cada web es distinta porque cada negocio lo es
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Se ve bien en el móvil',
    description: (
      <>
        La mayor parte de tus visitas llegan del teléfono. La página tiene que
        leerse y{' '}
        <strong className='font-extrabold'>
          dejar que te escriban desde ahí
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Formulario o WhatsApp',
    description: (
      <>
        Si no pueden contactarte, la web no sirve. Dejamos{' '}
        <strong className='font-extrabold'>
          un formulario o un botón de WhatsApp
        </strong>{' '}
        a la vista.
      </>
    ),
  },
  {
    title: 'Preparada para Google y para cargar rápido',
    description: (
      <>
        Títulos, encabezados, URLs limpias y una página rápida.{' '}
        <strong className='font-extrabold'>
          Google y tus clientes lo notan
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Hosting, dominio y panel',
    description: (
      <>
        Un año de hosting para arrancar, tu dominio y un panel sencillo para
        textos y fotos.{' '}
        <strong className='font-extrabold'>La web queda a tu nombre</strong>.
      </>
    ),
  },
];

const whyUs = [
  {
    icon: FileCheck,
    title: 'Precio y plazo, por escrito',
    description: (
      <>
        Antes de empezar sabes qué entra, cuánto sale y cuándo está.{' '}
        <strong className='font-extrabold'>
          Sin packs hinchados ni “ya te digo”
        </strong>
        .
      </>
    ),
  },
  {
    icon: Handshake,
    title: 'Trato directo',
    description: (
      <>
        Hablas con quien la diseña y la desarrolla. Estudio pequeño.{' '}
        <strong className='font-extrabold'>Siempre contestamos</strong>.
      </>
    ),
  },
  {
    icon: LayoutTemplate,
    title: 'Diseño adaptado a ti',
    description: (
      <>
        A tu marca y a lo que necesitas de verdad. Si con 4 páginas vale,{' '}
        <strong className='font-extrabold'>no te vendemos 12</strong>.
      </>
    ),
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Reservas tu plaza',
    description: (
      <>
        Pagas{' '}
        <strong className='font-extrabold'>{getLaunchReserveLabel()}</strong> y
        arrancamos. Precio cerrado:{' '}
        <strong className='font-extrabold'>{getLaunchPriceLabel()}</strong>.
      </>
    ),
  },
  {
    number: '2',
    title: 'Montamos la web',
    description: (
      <>
        Con tu marca si la tienes. Si no, te hacemos el logo y redactamos textos
        y fotos de tu sector.{' '}
        <strong className='font-extrabold'>
          Hablas con quien la está haciendo
        </strong>
        .
      </>
    ),
  },
  {
    number: '3',
    title: 'Te la enseñamos',
    description: (
      <>
        En{' '}
        <strong className='font-extrabold'>
          {LAUNCH_DELIVERY_HOURS} h máximo
        </strong>{' '}
        te mostramos la web. Después pagas el resto (<strong className='font-extrabold'>{getLaunchRemainderLabel()}</strong>) y la publicamos.
      </>
    ),
  },
  {
    number: '4',
    title: 'Se publica y queda tuya',
    description: (
      <>
        Conectamos el dominio, se ve bien en el móvil y te pueden escribir.{' '}
        <strong className='font-extrabold'>La web es tuya</strong>.
      </>
    ),
  },
];

const faqs = [
  {
    question: `¿Por qué cuesta ${getLaunchPriceLabel()}?`,
    answer: `Es una oferta de lanzamiento: solo ${LAUNCH_OFFER_MAX} proyectos a este precio. Nuestras webs a medida suelen partir de 600 €. Aquí montamos una web funcional, rápida y sencilla para empezar a captar clientes ya: se ve bien en el móvil, te pueden escribir y Google la entiende. No es una plantilla ni un proyecto inflado. Es el arranque profesional. Cuando el negocio pida más —páginas, reservas, tienda— la escalamos. Empiezas con lo que hace falta, sin pagar por lo que aún no usas. Y la web es tuya.`,
  },
  {
    question: '¿Cuánto cuesta y cómo se paga?',
    answer: `${getLaunchPriceLabel()}, precio cerrado. Reservas con ${getLaunchReserveLabel()}. El resto (${getLaunchRemainderLabel()}) se paga antes de la publicación. Hosting y dominio incluidos. Sin permanencia. La web es tuya.`,
  },

  {
    question: '¿Cuánto tarda?',
    answer: `En ${LAUNCH_DELIVERY_HOURS} h máximo. No esperamos a que nos mandes textos: si no tienes logo, textos o fotos, los preparamos nosotros según tu sector.`,
  },
  {
    question: '¿Qué incluye?',
    answer:
      'Diseño a tu sector, versión móvil, formulario o WhatsApp, SEO de base, panel para textos y fotos, hosting y dominio. Si no tienes logo, te lo hacemos. Textos y fotos, acordes a lo que haces. Precio cerrado. La web es tuya.',
  },
  {
    question: '¿Y si no tengo logo, textos o fotos?',
    answer:
      'No pasa nada. Si no tienes logo, te hacemos uno. Redactamos los textos y ponemos fotos según tu sector. Si ya tienes marca o material, lo usamos. No tienes que llegar con un dossier para reservar.',
  },
  {
    question: '¿WordPress o a medida?',
    answer:
      'Lo que pida el caso. WordPress si encaja; a medida u otra base si hace falta. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
  },
  {
    question: '¿Me rehacéis la web que ya tengo?',
    answer:
      'Sí. Partimos de tu marca, textos, fotos y dominio, y montamos la nueva. No es un parche sobre la vieja.',
  },
  {
    question: '¿El hosting está incluido? ¿De quién es la web?',
    answer:
      'Hosting para publicar, sí. El dominio es tuyo. Archivos y accesos a tu nombre. La web es tuya desde el día que se publica.',
  },
];

const LandingWebProfesional = () => {
  usePageMeta(ADS_LAUNCH_LANDING_PATH);

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

  useJsonLd('jsonld-landing-web-profesional-faq', faqJsonLd);

  return (
    <>
      <HeroCta
        label={`Oferta de lanzamiento · Máximo ${LAUNCH_OFFER_MAX} proyectos`}
        labelNote={getLaunchAvailabilityCopy()}
        title={`Una Web Profesional para arrancar tu negocio por ${getLaunchPriceLabel()}`}
        description={
          <>
            Solo {LAUNCH_OFFER_MAX} proyectos · Logo si no tienes · Textos y
            fotos de tu sector · Hosting y dominio · Sin permanencia · La web es
            tuya.
            <br />
            <strong className='font-extrabold'>
              Oferta de lanzamiento limitada a las {LAUNCH_OFFER_MAX} primeras
              reservas.
            </strong>{' '}
            Reserva con {getLaunchReserveLabel()}; el resto (
            {getLaunchRemainderLabel()}) se paga antes de la publicación. La web
            se entrega en {LAUNCH_DELIVERY_HOURS} h máximo.
          </>
        }
        buttonText={`Reservar ${getLaunchReserveLabel()}`}
        buttonHref='#reserva'
        backgroundUrl='/img/hero/hero-diseno-web-36web.webp'
        heroType='offer'
        hasButton={false}
        hasBackground
        grayscale
        overlay='black'
        hasReviewBadge
        isTopHero
        offerContent={<LaunchOfferCard className='hero-cta-form' />}
      />

      <LaunchTrustBar />

      <ServiceIncludes
        title='Qué incluye la web'
        intro={
          <>
            Esto entra en el pack, precio cerrado.{' '}
            <strong className='font-extrabold'>
              Logo, textos y fotos incluidos si no los tienes
            </strong>
            .
          </>
        }
        items={includes}
      />

      <section className='page-section'>
        <div className='container mx-auto flex flex-col items-center gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
              ¿Y después de publicar?
            </h2>
            <p className='text-xl md:text-2xl text-ink-dark'>
              La web es tuya y no tienes permanencia. Si prefieres que nosotros
              sigamos ocupándonos de ella, puedes contratar mantenimiento desde{' '}
              <strong className='font-extrabold'>60 € + IVA/mes</strong>.
            </p>
          </div>
          <article className='w-full max-w-3xl rounded-lg border-2 border-ink-dark bg-white p-content-pad text-center'>
            <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
              Mantenimiento opcional
            </p>
            <p className='mt-2 text-3xl font-extrabold text-ink-dark md:text-4xl'>
              Desde 60 € + IVA/mes
            </p>
            <p className='mt-text-gap text-lg text-ink-dark md:text-xl'>
              Actualizaciones, copias de seguridad, soporte y pequeños cambios.
            </p>
            <p className='mt-text-gap text-lg font-extrabold text-ink-dark md:text-xl'>
              Es opcional. No necesitas contratarlo para acceder a la oferta de{' '}
              {getLaunchPriceLabel()}.
            </p>
          </article>
        </div>
      </section>

      <SEOBenefits
        title='Por qué encargárnosla a nosotros'
        subtitle={
          <>
            Tres cosas claras:{' '}
            <strong className='font-extrabold'>el precio</strong>,{' '}
            <strong className='font-extrabold'>con quién hablas</strong> y{' '}
            <strong className='font-extrabold'>cómo queda la web</strong>.
          </>
        }
        benefits={whyUs}
      />

      <Portfolio casos contained />

      <SEOProcess
        title='Así se hace'
        subtitle={
          <>
            <strong className='font-extrabold'>Cuatro pasos.</strong> Reservas,
            montamos, te la enseñamos en {LAUNCH_DELIVERY_HOURS} h máximo y, al
            pagar el resto, se publica a tu nombre.
          </>
        }
        steps={processSteps}
      />

      <Testimonials hasVideo showClientReferenceCta />

      <Team
        label='EL EQUIPO'
        title='Trato directo durante todo el proyecto.'
        compact
        paragraphs={[
          <>
            Desde la primera reunión hasta la entrega, podrás hablar
            directamente con{' '}
            <strong className='font-extrabold'>
              la persona encargada de tu web
            </strong>{' '}
            por{' '}
            <strong className='font-extrabold'>
              email, teléfono o videollamada
            </strong>
            .
          </>,
        ]}
      />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='Lo que suele preguntar la gente'
          faqs={faqs}
          ctaText='RESERVAR MI WEB'
          ctaHref='#reserva-final'
        />
      </div>

      <div id='reserva-final' className='scroll-mt-24'>
        <HeroCta
          title={`Reserva una de las ${LAUNCH_OFFER_MAX} webs`}
          belowDescription={<LaunchPaymentTable />}
          ctaContent={
            <LaunchReserveActions location='LaunchFinal' align='center' />
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

export default LandingWebProfesional;
