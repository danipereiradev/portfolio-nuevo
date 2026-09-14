import { useEffect, useMemo } from 'react';
import { Check, FileCheck, Handshake, LayoutTemplate, X } from 'lucide-react';
import Portfolio from '../components/Portfolio';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import LaunchTrustBar from '../components/LaunchTrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta, { HeroCtaList } from '../components/HeroCta';
import LaunchPaymentTable from '../components/LaunchPaymentTable';
import LaunchReserveActions from '../components/LaunchReserveActions';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  ADS_LAUNCH_FORM_ORIGIN,
  ADS_LAUNCH_LANDING_PATH,
} from '../config/contact';
import { getLaunchPriceLabel, LAUNCH_DELIVERY_HOURS } from '../config/launchOffer';
import { trackLandingPromo299View } from '../utils/analytics';

const includes = [
  {
    title: `Publicación en un máximo de ${LAUNCH_DELIVERY_HOURS} h`,
    description: (
      <>
        Cuando tenemos logo, textos y los datos de tu negocio, montamos la web y
        te la enseñamos.{' '}
        <strong className='font-extrabold'>
          Se publica en un máximo de {LAUNCH_DELIVERY_HOURS} h desde esa entrega
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Diseño adaptado a tu negocio',
    description: (
      <>
        Adaptamos colores, estructura y presentación a tu marca y sector para
        que la web tenga{' '}
        <strong className='font-extrabold'>sentido para tu negocio</strong>.
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
    title: 'Formulario y WhatsApp',
    description: (
      <>
        Si no pueden contactarte, la web no sirve. Dejamos{' '}
        <strong className='font-extrabold'>
          un formulario y un botón de WhatsApp
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
    title: 'Hosting, dominio y publicación incluidos',
    description: (
      <>
        Incluimos{' '}
        <strong className='font-extrabold'>
          el hosting y el dominio durante el primer año
        </strong>
        . La web y el dominio quedan a tu nombre. El hosting puede renovarse
        con nosotros o migrarse a otro proveedor.
      </>
    ),
  },
];

const offerIncludes = [
  'Hasta 4 secciones',
  'Adaptación a tu marca',
  'Formulario y WhatsApp',
  'Publicación',
];

const offerExcludes = [
  'Ecommerce',
  'Reservas avanzadas',
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
          El plazo de {LAUNCH_DELIVERY_HOURS} h empieza aquí
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
    title: 'Te la enseñamos y se publica',
    description: (
      <>
        En un máximo de {LAUNCH_DELIVERY_HOURS} h te la mostramos. Pagas el
        50% restante y la publicamos a tu nombre.{' '}
        <strong className='font-extrabold'>La web es tuya</strong>.
      </>
    ),
  },
];

const faqs = [
  {
    question: `¿Por qué cuesta ${getLaunchPriceLabel()}?`,
    answer: `Es el precio de lanzamiento. Nuestras webs a medida suelen partir de 590 €. Aquí montamos una web funcional, rápida y sencilla para empezar a captar clientes: se ve bien en el móvil, te pueden escribir y Google la entiende. No es una plantilla ni un proyecto inflado. Es el arranque profesional. Cuando el negocio pida más —páginas, reservas, tienda— la escalamos. Empiezas con lo que hace falta, sin pagar por lo que aún no usas. Y la web es tuya.`,
  },
  {
    question: '¿Cuánto cuesta y cómo se paga?',
    answer: `${getLaunchPriceLabel()}, precio cerrado. Se paga 50% al empezar y 50% antes de publicar. Primero te contactamos y confirmamos el proyecto. Hosting y dominio incluidos el primer año. Sin permanencia. La web es tuya.`,
  },
  {
    question: '¿Cuánto tarda?',
    answer: `Se publica en un máximo de ${LAUNCH_DELIVERY_HOURS} h desde que nos entregas la información necesaria de tu negocio: logo, textos, fotos y datos de contacto. El reloj empieza cuando nos llega ese material.`,
  },
  {
    question: '¿Qué incluye?',
    answer:
      'Esta oferta es para una web sencilla de presentación de negocio. Incluye estructura estándar, adaptación a tu marca, formulario, WhatsApp, publicación y hosting y dominio el primer año. Tú aportas logo, textos y fotos. Precio cerrado. La web es tuya.',
  },
  {
    question: '¿Qué no incluye?',
    answer:
      'No incluye ecommerce, reservas avanzadas, áreas privadas, desarrollos a medida ni redacción profesional de contenidos. Si te hace falta, te hacemos una propuesta aparte.',
  },
  {
    question: '¿Qué tengo que entregar yo?',
    answer: `Logo, textos, fotos y la información de tu negocio (qué haces, cómo te contactan, horarios, redes). Con eso montamos y publicamos. El plazo de ${LAUNCH_DELIVERY_HOURS} h cuenta desde que nos llega el material.`,
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
    question: '¿El hosting y el dominio están incluidos?',
    answer:
      'Sí. Incluimos el hosting y el dominio durante el primer año para que puedas arrancar sin costes adicionales. A partir del segundo año, podrás renovarlos con nosotros o trasladarlos al proveedor que prefieras. El coste orientativo es de 80–150 € + IVA al año, según las características y el espacio. La web y el dominio quedan a tu nombre.',
  },
];

const LandingWebProfesional = () => {
  usePageMeta(ADS_LAUNCH_LANDING_PATH);

  useEffect(() => {
    trackLandingPromo299View();
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
          <HeroCtaList
            items={[
              'Esta oferta es para una web sencilla de presentación de negocio.',
              <>
                Precio cerrado. Se paga 50% al empezar y 50% antes de publicar.
              </>,
              'Tú nos entregas logo, textos y la información de tu negocio.',
              <>
                <strong className='font-extrabold'>
                  La web se publica en un máximo de {LAUNCH_DELIVERY_HOURS} h
                  desde ese momento
                </strong>
                .
              </>,
              'Hosting y dominio el primer año.',
              'Sin permanencia. La web es tuya.',
            ]}
          />
        }
        buttonText='Quiero mi web'
        buttonHref='#contacto'
        videoUrl='/video/video%20home_2.mp4'
        backgroundUrl='/video/hero-home-2.jpg'
        heroType='form'
        hasButton={false}
        formTitle='Quiero mi web'
        formDescription='Te contactamos y confirmamos el proyecto. Sin compromiso.'
        formSectionInfo={ADS_LAUNCH_FORM_ORIGIN}
        formSubmitLabel='Quiero mi web'
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
            . Hasta 4 secciones, tu marca, formulario, WhatsApp y publicación.
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

      <Portfolio casos contained ids={['carper', 'hatena', 'camisetas']} />

      <Testimonials hasVideo />

      <section className='page-section bg-surface-muted'>
        <div className='container mx-auto flex flex-col items-center gap-page-gap text-center'>
          <div className='page-title-block mx-auto max-w-5xl'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              ¿Quieres tener tu web lista en {LAUNCH_DELIVERY_HOURS} h
              laborables?
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              {getLaunchPriceLabel()} · Se paga 50% y 50%
            </p>
          </div>
          <LaunchReserveActions
            location='LaunchSocialProof'
            align='center'
          />
        </div>
      </section>

      <SEOProcess
        title='Así se hace'
        subtitle={
          <>
            <strong className='font-extrabold'>Cuatro pasos.</strong> Nos
            escribes, confirmamos, nos entregas la información de tu negocio,
            montamos y te la enseñamos. Se publica en un máximo de{' '}
            {LAUNCH_DELIVERY_HOURS} h desde esa entrega.
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
        buttonText='Quiero mi web'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Quiero mi web'
        formDescription='Nombre, email y teléfono. Te escribimos en horario laboral.'
        formSectionInfo={ADS_LAUNCH_FORM_ORIGIN}
        formSubmitLabel='Quiero mi web'
        formId='contacto'
        hasBackground={false}
        hasReviewBadge
      />

      <div id='faq'>
        <SEOFAQ
          title='Lo que suele preguntar la gente'
          faqs={faqs}
          ctaText='QUIERO MI WEB'
          ctaHref='#contacto'
        />
      </div>

      <div id='contacto-final'>
        <HeroCta
          title='Quiero mi web profesional'
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
