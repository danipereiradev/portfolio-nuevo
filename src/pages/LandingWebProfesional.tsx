import { useEffect, useMemo } from 'react';
import {
  Check,
  Clock,
  FileCheck,
  Globe,
  Handshake,
  LayoutTemplate,
  MessageCircle,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
  Type,
  X,
} from 'lucide-react';
import Portfolio from '../components/Portfolio';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import LaunchTrustBar from '../components/LaunchTrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';
import LaunchPaymentTable from '../components/LaunchPaymentTable';
import LaunchReserveActions from '../components/LaunchReserveActions';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  ADS_LAUNCH_FORM_ORIGIN,
  ADS_LAUNCH_LANDING_PATH,
} from '../config/contact';
import {
  getLaunchPriceLabel,
  LAUNCH_DELIVERY_LABEL,
} from '../config/launchOffer';
import { trackLandingPromo349View } from '../utils/analytics';

const includes = [
  {
    icon: Clock,
    title: `Lista en ${LAUNCH_DELIVERY_LABEL}`,
    description: `Cuando tenemos logo, textos y datos, montamos la web y te la enseñamos. Se publica en ${LAUNCH_DELIVERY_LABEL} desde esa entrega.`,
  },
  {
    icon: LayoutTemplate,
    title: 'Diseño adaptado a tu negocio',
    description:
      'Adaptamos colores, estructura y estilo a tu marca y sector.',
  },
  {
    icon: Type,
    title: 'Logo y textos',
    description:
      'Tú nos entregas logo y textos. Si no los tienes, te los presupuestamos.',
  },
  {
    icon: Smartphone,
    title: 'Se ve bien en móvil',
    description:
      'Diseño responsive para que se vea y funcione bien desde el teléfono.',
  },
  {
    icon: MessageCircle,
    title: 'Formulario y WhatsApp',
    description:
      'Incluimos formulario y botón de WhatsApp para facilitar el contacto.',
  },
  {
    icon: Share2,
    title: 'Tus redes sociales',
    description:
      'Conectamos Instagram, Facebook y las redes que utilices.',
  },
  {
    icon: Search,
    title: 'Preparada para Google y rápida',
    description:
      'Títulos, encabezados, URLs limpias y una base técnica optimizada.',
  },
  {
    icon: Globe,
    title: 'Hosting, dominio y publicación',
    description:
      'Hosting y dominio incluidos el primer año. La web queda a tu nombre.',
  },
  {
    icon: ShieldCheck,
    title: 'No se publica hasta que estés conforme',
    description:
      'La revisas antes de publicar. Si algo importante no encaja, lo ajustamos. El 50% final se paga tras tu aprobación.',
  },
];

const offerIncludes = [
  'Hasta 5 secciones',
  'Adaptación a tu marca',
  'Estructura y estilos personalizados',
  'Formulario y WhatsApp',
  'Integración de tus redes sociales',
  'Publicación',
  'No se publica hasta que estés conforme',
];

const offerExcludes = [
  'Ecommerce',
  'Funcionalidades especiales',
  'Áreas privadas',
  'Desarrollos a medida',
  'Redacción profesional de contenidos',
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
    title: 'Nos escribes y lo confirmamos',
    description: (
      <>
        Te contactamos y confirmamos el proyecto.{' '}
        <strong className='font-extrabold'>
          Precio cerrado: {getLaunchPriceLabel()}
        </strong>
        . Se paga 50% al empezar y 50% antes de publicar.
      </>
    ),
  },
  {
    number: '2',
    title: 'Nos entregas la información',
    description: (
      <>
        Logo, textos, fotos y los datos de tu negocio. Con eso montamos la web.{' '}
        <strong className='font-extrabold'>
          El plazo de {LAUNCH_DELIVERY_LABEL} empieza aquí
        </strong>
        .
      </>
    ),
  },
  {
    number: '3',
    title: 'Montamos la web',
    description: (
      <>
        Con tu marca y tus contenidos.{' '}
        <strong className='font-extrabold'>
          Hablas con quien la está haciendo
        </strong>
        .
      </>
    ),
  },
  {
    number: '4',
    title: 'La ves. Si estás contento, se publica',
    description: (
      <>
        No sale a internet hasta que tú digas que sí. Si algo importante no
        encaja, lo ajustamos.{' '}
        <strong className='font-extrabold'>
          Entonces pagas el 50% final y se publica a tu nombre
        </strong>
        .
      </>
    ),
  },
];

const faqs = [
  {
    question: '¿Cómo podéis ofrecer este precio?',
    answer:
      'Trabajamos sobre una estructura profesional propia de 36web ya preparada y adaptamos diseño, colores, contenidos e información a cada negocio. Esto nos permite reducir muchas horas de desarrollo desde cero y ofrecer una web profesional a un precio más accesible.',
  },
  {
    question: '¿Cuánto cuesta y cómo se paga?',
    answer: `${getLaunchPriceLabel()}, precio cerrado. 50% al empezar. El 50% final se paga cuando estés contento con el resultado, justo antes de publicar. Primero te contactamos y confirmamos el proyecto. Hosting y dominio incluidos el primer año. Sin permanencia. La web es tuya.`,
  },
  {
    question: '¿Qué incluye?',
    answer:
      'Esta oferta es para una web sencilla de presentación de negocio. Incluye hasta 5 secciones, adaptación a tu marca, estructura y estilos personalizados, formulario, WhatsApp, integración de tus redes sociales, publicación y hosting y dominio el primer año. No se publica hasta que estés conforme: la ves, si algo importante no encaja lo ajustamos, y el 50% final se paga cuando apruebes. Tú aportas logo, textos y fotos. Si no cuentas con logo o textos, te lo presupuestamos. Precio cerrado. La web es tuya.',
  },
  {
    question: '¿Qué no incluye?',
    answer:
      'No incluye ecommerce, funcionalidades especiales, áreas privadas ni desarrollos a medida. Logo y redacción profesional de contenidos tampoco entran en este precio: si no cuentas con ellos, te lo presupuestamos.',
  },
  {
    question: '¿Cuánto tarda?',
    answer: `Se publica en ${LAUNCH_DELIVERY_LABEL} desde que nos entregas la información necesaria de tu negocio: logo, textos, fotos y datos de contacto. El reloj empieza cuando nos llega ese material.`,
  },
  {
    question: '¿El hosting y el dominio están incluidos?',
    answer:
      'Sí. Incluimos el hosting y el dominio durante el primer año para que puedas arrancar sin costes adicionales. A partir del segundo año, podrás renovarlos con nosotros o trasladarlos al proveedor que prefieras. El coste orientativo es de 80–150 € + IVA al año, según las características y el espacio. La web y el dominio quedan a tu nombre.',
  },
  {
    question: '¿Qué tengo que entregar yo?',
    answer: `Logo, textos, fotos y la información de tu negocio (qué haces, cómo te contactan, horarios, redes). Con eso montamos y publicamos. Si no cuentas con logo o textos, te lo presupuestamos. El plazo de ${LAUNCH_DELIVERY_LABEL} cuenta desde que nos llega el material.`,
  },
  {
    question: '¿Y si no me convence el resultado?',
    answer:
      'No se publica hasta que estés conforme. La ves antes de que salga a internet. Si algo importante no encaja, lo ajustamos. El 50% final se paga cuando apruebes. No antes.',
  },
  {
    question: '¿Me rehacéis la web que ya tengo?',
    answer:
      'Sí. Partimos de tu marca, textos, fotos y dominio, y montamos la nueva. No es un parche sobre la vieja.',
  },
  {
    question: `¿Por qué cuesta ${getLaunchPriceLabel()}?`,
    answer: `Es el precio de lanzamiento. Nuestras webs a medida suelen partir de 590 €. Aquí montamos una web funcional, rápida y sencilla para empezar a captar clientes: se ve bien en el móvil, te pueden escribir y Google la entiende. No es una plantilla ni un proyecto inflado. Es el arranque profesional. Cuando el negocio pida más —páginas, reservas, tienda— la escalamos. Empiezas con lo que hace falta, sin pagar por lo que aún no usas. Y la web es tuya.`,
  },
  {
    question: '¿WordPress o a medida?',
    answer:
      'Lo que pida el caso. WordPress si encaja; a medida u otra base si hace falta. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
  },
];

const LandingWebProfesional = () => {
  usePageMeta(ADS_LAUNCH_LANDING_PATH);

  useEffect(() => {
    trackLandingPromo349View();
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

  useJsonLd('jsonld-landing-web-profesional-faq', faqJsonLd);

  return (
    <>
      <HeroCta
        label='Web profesional'
        title={`Una web profesional para tu negocio por ${getLaunchPriceLabel()}`}
        description={
          <>
            <p>
              Web profesional para autónomos, emprendedores y pequeños negocios.
            </p>
            <p className='mt-2 font-extrabold'>
              {getLaunchPriceLabel()} · Lista en {LAUNCH_DELIVERY_LABEL} · Sin
              cuotas mensuales
            </p>
            <ul className='mt-4 space-y-1 text-center text-base font-bold md:text-left md:text-lg'>
              <li>50 % al empezar · 50 % antes de publicar</li>
              <li>Hosting y dominio incluidos el primer año</li>
              <li>La web es tuya</li>
            </ul>
          </>
        }
        mobileDescription={
          <>
            <p>
              Web profesional para autónomos, emprendedores y pequeños negocios.
            </p>
            <p className='mt-2 font-extrabold'>
              {getLaunchPriceLabel()} · Lista en {LAUNCH_DELIVERY_LABEL} · Sin
              cuotas mensuales
            </p>
          </>
        }
        mobileProof={
          <ul className='space-y-1 text-center text-base font-bold'>
            <li>50 % al empezar · 50 % antes de publicar</li>
            <li>Hosting y dominio incluidos el primer año</li>
            <li>La web es tuya</li>
          </ul>
        }
        convertFirstOnMobile
        buttonText='Quiero información'
        buttonHref='#contacto'
        backgroundUrl='/video/hero-nubes.jpg'
        heroType='form'
        hasButton={false}
        formTitle='Nosotros te llamamos'
        formDescription='Te contactamos y confirmamos el proyecto. Sin compromiso.'
        formSectionInfo={ADS_LAUNCH_FORM_ORIGIN}
        formSubmitLabel='Quiero información'
        formId='contacto'
        hasBackground
        overlay='none'
        hasReviewBadge
        isTopHero
      />

      <LaunchTrustBar />

      <ServiceIncludes
        title='Qué incluye la web'
        intro={
          <>
            Esta oferta es para una{' '}
            <strong className='font-extrabold'>
              web sencilla de presentación de negocio
            </strong>
            . Hasta 5 secciones, tu marca, formulario, WhatsApp y publicación.
            Precio cerrado.
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
              Esta oferta es para una web sencilla de presentación de negocio.
              Si te hace falta más, lo vemos aparte.
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

      <Portfolio
        ids={['chicxs', 'resilience', 'micolet', 'delish']}
        note={
          <>
            También hemos trabajado webs para{' '}
            <strong className='font-extrabold'>moda</strong>,{' '}
            <strong className='font-extrabold'>turismo</strong>,{' '}
            <strong className='font-extrabold'>clínicas</strong>,{' '}
            <strong className='font-extrabold'>ecommerce</strong>,{' '}
            <strong className='font-extrabold'>servicios locales</strong> y{' '}
            <strong className='font-extrabold'>marcas personales</strong>.
          </>
        }
        sectorPrompt='¿Quieres ver ejemplos de tu sector? Te enseñamos proyectos similares antes de empezar.'
        sectorCtaText='Ver ejemplos de mi sector'
        sectorCtaHref='#contacto'
      />

      <Testimonials hasVideo />

      <section className='page-section bg-surface-muted'>
        <div className='container mx-auto flex flex-col items-center gap-page-gap text-center'>
          <div className='page-title-block mx-auto max-w-5xl'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              No se publica hasta que estés conforme
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              {getLaunchPriceLabel()} · 50% al empezar · 50% cuando apruebes
            </p>
          </div>
          <LaunchReserveActions location='LaunchSocialProof' align='center' />
        </div>
      </section>

      <SEOProcess
        title='Así se hace'
        subtitle={
          <>
            <strong className='font-extrabold'>Cuatro pasos.</strong> Nos
            escribes, confirmamos, nos entregas la información de tu negocio,
            montamos y te la enseñamos. Queda lista en {LAUNCH_DELIVERY_LABEL}{' '}
            desde esa entrega.
          </>
        }
        steps={processSteps}
      />

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

      <HeroCta
        title='¿Tienes dudas? Te llamamos'
        description={
          <>
            Déjanos tus datos y te contactamos.{' '}
            <strong className='font-extrabold'>Sin compromiso.</strong>{' '}
            Confirmamos el proyecto y te explicamos el pago 50% y 50%.
          </>
        }
        buttonText='Quiero información'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Nosotros te llamamos'
        formDescription='Nombre, email y teléfono. Te escribimos en horario laboral.'
        formSectionInfo={ADS_LAUNCH_FORM_ORIGIN}
        formSubmitLabel='Quiero información'
        hasBackground={false}
        hasReviewBadge
      />

      <div id='faq'>
        <SEOFAQ
          title='Lo que suele preguntar la gente'
          faqs={faqs}
          ctaText='Quiero información'
          ctaHref='#contacto'
        />
      </div>

      <div id='contacto-final'>
        <HeroCta
          title='Quiero mi web profesional'
          description={
            <>
              <strong className='font-extrabold'>
                No se publica hasta que estés conforme
              </strong>
              . La ves, si no encaja la tocamos, y entonces sale.
            </>
          }
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
