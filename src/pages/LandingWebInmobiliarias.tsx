import { useMemo } from 'react';
import {
  Globe,
  MessageCircle,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import Portfolio from '../components/Portfolio';
import { localWebDemoHref } from '../data/localWebDemos';
import { Team } from '../components/Team';
import SEOFAQ from '../components/SEOFAQ';
import Testimonials from '../components/Testimonials';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';
import LaunchPaymentTable from '../components/LaunchPaymentTable';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import LaunchExitPopup from '../components/LaunchExitPopup';
import {
  ADS_REAL_ESTATE_EXIT_FORM_ORIGIN,
  ADS_REAL_ESTATE_FORM_ORIGIN,
  ADS_REAL_ESTATE_LANDING_PATH,
} from '../config/contact';
import {
  getLaunchInstallmentLabel,
  getLaunchPriceAmountLabel,
  LAUNCH_DELIVERY_LABEL,
} from '../config/launchOffer';

const includes = [
  {
    icon: Smartphone,
    title: 'Se ve bien en móvil',
    description:
      'Tus viviendas, fotos y datos de contacto se ven bien también desde el teléfono.',
  },
  {
    icon: MessageCircle,
    title: 'Formulario y WhatsApp',
    description:
      'Formulario y WhatsApp para recibir consultas sobre tus inmuebles y solicitudes de propietarios.',
  },
  {
    icon: Share2,
    title: 'Gestiona tus inmuebles',
    description: 'Un panel para editar textos, fotos y fichas de inmuebles. Te enseñamos a utilizarlo.',
  },
  {
    icon: Search,
    title: 'Preparada para Google y rápida',
    description:
      'Títulos, encabezados y una página que carga rápido, con una estructura clara para presentar tu agencia y tus servicios.',
  },
  {
    icon: Globe,
    title: 'Publicación',
    description:
      'Hosting y dominio (.es o .com) incluidos el primer año. También podemos publicar en tu hosting.',
  },
  {
    icon: ShieldCheck,
    title: 'Revisión antes de publicar',
    description: 'Revisamos contigo el diseño y los contenidos para que la web represente bien tu negocio.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas cómo trabaja tu agencia',
    description: (
      <>
        Hablamos sin compromiso. Si decides contratar, confirmamos alcance, plazos y condiciones antes del anticipo.{' '}
        <strong className='font-extrabold'>
          {getLaunchPriceAmountLabel()}. Te lo cerramos por escrito
        </strong>
        .
      </>
    ),
  },
  {
    number: '2',
    title: 'Montamos y adaptamos',
    description: (
      <>
        Con tu logo y tus textos (los creamos si no tienes) montamos la web a tu
        gusto.{' '}
        <strong className='font-extrabold'>
          El plazo de {LAUNCH_DELIVERY_LABEL} empieza aquí
        </strong>
        .
      </>
    ),
  },
  {
    number: '3',
    title: 'Revisas y publicamos',
    description: (
      <>
        Revisamos juntos la web, ajustamos lo acordado y la publicamos con tu aprobación.
      </>
    ),
  },
];

const faqs = [
  { question: '¿Tengo que pagar para pedir información?', answer: 'No. La primera conversación es sin compromiso y sin pagar. Si decides contratar, te enviamos alcance, plazos y condiciones por escrito antes de abonar el primer tramo.' },
  { question: '¿Trabajáis con negocios de mi ciudad?', answer: 'Trabajamos online con autónomos y negocios de toda España. Hablamos por teléfono o videollamada y revisamos juntos la web antes de publicarla.' },
  {
    question: '¿Cuánto cuesta?',
    answer: `El precio cerrado es de ${getLaunchPriceAmountLabel()}. No hay sorpresas, ni letra pequeña, ni costes ocultos. Te lo cerramos por escrito antes de empezar, para que sepas exactamente lo que pagas de principio a fin. Incluye diseño basado en nuestra demo, hasta 8 secciones, catálogo y panel de edición. Acordamos por escrito la carga inicial de inmuebles. Integraciones con CRM, portales y funciones a medida se presupuestan aparte.`,
  },
  {
    question: '¿Cuánto tarda?',
    answer: `La referencia para el paquete es ${LAUNCH_DELIVERY_LABEL} desde que disponemos de los contenidos y confirmamos el alcance. Te damos la fecha de entrega por escrito antes de empezar.`,
  },
  {
    question: '¿Puedo importar o exportar mis inmuebles con Excel?',
    answer: 'Consúltanos la importación y exportación de tu catálogo mediante Excel o CSV. Revisamos las columnas, los datos y las fotos de tu archivo y te confirmamos la viabilidad, el alcance y cualquier coste adicional por escrito antes de contratar. Esta opción no sustituye la sincronización con un CRM o un portal.',
  },
  {
    question: '¿Se conecta con mi CRM o con Idealista?',
    answer:
      'El paquete incluye la gestión manual del catálogo desde el panel. La sincronización automática con CRM o portales no está incluida: revisamos tu herramienta y te damos un presupuesto aparte si la necesitas.',
  },
  {
    question: '¿Cómo se paga?',
    answer: `Dos tramos fijos: ${getLaunchInstallmentLabel()} al empezar, para poner en marcha el diseño, y ${getLaunchInstallmentLabel()} antes de publicar. El último pago solo lo haces cuando has revisado la web y estás conforme con el resultado.`,
  },
  {
    question: '¿El hosting y el dominio están incluidos?',
    answer:
      'Sí. El primer año incluye hosting y registro de dominio (.es o .com). A partir del segundo año se renuevan aparte; te indicamos su coste por escrito antes de contratar. No es obligatorio contratar mantenimiento. Si ya tienes hosting, la montamos ahí sin coste.',
  },
  {
    question: '¿La web es mía? ¿Puedo pedir cambios?',
    answer:
      'Sí, la web es tuya. Sin suscripción ni permanencia mensual. Al terminar te entregamos los accesos. Podrás editar textos, fotos y fichas de inmuebles desde el panel. Incluimos una explicación de uso. Nuevas secciones y funciones se presupuestan aparte. Cualquier coste recurrente de servicios externos se detalla antes de contratar.',
  },
];

const launchHeroDescription = (
  <>
    <p>Presenta tu agencia, muestra tus inmuebles y facilita las consultas de compradores y propietarios.</p>
    <p className='mt-3 font-bold'>Tu marca, catálogo de inmuebles y un panel para actualizar contenidos.</p>
    <p className='mt-3 text-base'>Hosting y dominio incluidos el primer año.</p>
  </>
);

const LaunchLandingHero = () => {
  return (
    <HeroCta
      label='Diseño web para inmobiliarias'
      title={
        <>
          La web de tu inmobiliaria por{' '}
          <span className='whitespace-nowrap'>
            {getLaunchPriceAmountLabel()}
          </span>
        </>
      }
      description={launchHeroDescription}
      convertFirstOnMobile
      buttonText='Hablemos de tu inmobiliaria'
      buttonHref='#contacto'
      heroType='form'
      hasButton
      formTitle='Hablemos de tu inmobiliaria'
      formDescription='Sin compromiso y sin pagar ahora. Resolvemos tus dudas antes de contratar.'
      formSectionInfo={ADS_REAL_ESTATE_FORM_ORIGIN}
      formSubmitLabel='Quiero que me llaméis'
      formId='contacto'
      hasBackground={false}
      hasReviewBadge
      isTopHero
    />
  );
};

const LandingWebInmobiliarias = () => {
  usePageMeta(ADS_REAL_ESTATE_LANDING_PATH);
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

  useJsonLd('jsonld-landing-web-inmobiliarias-faq', faqJsonLd);

  return (
    <>
      <LaunchLandingHero />

      <ServiceIncludes
        title='Qué incluye la web'
        intro={
          <>
            Esta oferta es para una{' '}
            <strong className='font-extrabold'>
              web para tu inmobiliaria
            </strong>
            . Hasta 8 secciones, catálogo con fichas de inmuebles, panel de edición, formulario, WhatsApp, hosting y publicación. Precio del paquete: {getLaunchPriceAmountLabel()}.
          </>
        }
        items={includes}
      />

      <section className='py-8 md:py-10'>
        <div className='container mx-auto max-w-3xl text-center text-base leading-relaxed text-ink-dark md:text-lg'>
          <p>
            Pensada para agencias independientes que quieren presentar sus servicios, mostrar su cartera y recibir consultas desde su propia web.
          </p>
          <p className='mt-3'>
            <strong>¿Tienes tus inmuebles en Excel?</strong> Consúltanos la importación y exportación de tu catálogo. Revisamos tu archivo y confirmamos el alcance y el presupuesto antes de contratar.
          </p>
          <p className='mt-3'>
            La conexión con CRM, la sincronización con Idealista u otros portales y los desarrollos a medida se presupuestan aparte.
          </p>
        </div>
      </section>

      <Portfolio
        ids={['inmobiliaria', 'mhin']}
        headingLabel='Portfolio inmobiliaria'
        headingTitle='Así puede verse tu inmobiliaria'
        headingDescription={
          <>
            Una demo de diseño y un proyecto real del sector. Adaptamos la marca,
            los textos y las imágenes a tu agencia. Paquete por{' '}
            <strong className='font-extrabold'>{getLaunchPriceAmountLabel()}</strong>.
          </>
        }
        note='Entra en la demo y recorre sus secciones. Se abre en otra pestaña para que puedas volver aquí cuando quieras.'
        ctaText='Entrar y probar la demo'
        ctaHref={localWebDemoHref('inmobiliaria', 'torrejon-de-ardoz')}
      />

      <Team
        compact
        label='El equipo de 36WEB'
        title='Quién está detrás de tu web'
        paragraphs={[
          'Los responsables de cada equipo. Detrás hay más diseñadores y desarrolladores trabajando en tu web.',
        ]}
      />

      <Testimonials />

      <SEOProcess
        title='Así se hace'
        subtitle='Tres pasos. Nos cuentas cómo trabaja tu agencia, montamos y adaptamos, revisas y publicamos.'
        steps={processSteps}
        compact
      />

      <div id='faq'>
        <SEOFAQ title='Lo que suele preguntar la gente' faqs={faqs} />
      </div>

      <div id='contacto-final'>
        <HeroCta
          title='Dale a tu inmobiliaria su propia web'
          description='Cuéntanos cómo gestionas tus inmuebles y te confirmamos el alcance antes de empezar.'
          belowDescription={<LaunchPaymentTable className='md:mx-0' />}
          buttonText='Hablemos de tu inmobiliaria'
          buttonHref='#contacto'
          heroType='form'
          hasButton={false}
          formTitle='Hablemos de tu inmobiliaria'
          formDescription='Sin compromiso y sin pagar ahora. Resolvemos tus dudas antes de contratar.'
          formSectionInfo={ADS_REAL_ESTATE_FORM_ORIGIN}
          formSubmitLabel='Quiero que me llaméis'
          hasBackground={false}
          hasReviewBadge={false}
        />
      </div>
      <LaunchExitPopup origin={ADS_REAL_ESTATE_EXIT_FORM_ORIGIN} />
    </>
  );
};

export default LandingWebInmobiliarias;
