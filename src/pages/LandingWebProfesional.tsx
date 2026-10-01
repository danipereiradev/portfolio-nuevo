import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Globe,
  MessageCircle,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import Portfolio, {
  pickRandomProjectIds,
  REAL_WEB_PROJECT_IDS,
} from '../components/Portfolio';
import { Team } from '../components/Team';
import SEOFAQ from '../components/SEOFAQ';
import Testimonials from '../components/Testimonials';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';
import { ContactFormHero } from '../components/ContactFormHero';
import LaunchPaymentTable from '../components/LaunchPaymentTable';
import LaunchExitPopup from '../components/LaunchExitPopup';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { useBootHeroSlot } from '../hooks/useBootHeroSlot';
import {
  ADS_LAUNCH_FORM_ORIGIN,
  ADS_LAUNCH_LANDING_PATH,
} from '../config/contact';
import {
  getLaunchInstallmentLabel,
  getLaunchPriceAmountLabel,
  LAUNCH_DELIVERY_LABEL,
} from '../config/launchOffer';
import { trackLandingPromo590View } from '../utils/analytics';

const includes = [
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
    description: 'Conectamos Instagram, Facebook y las redes que utilices.',
  },
  {
    icon: Search,
    title: 'Preparada para Google y rápida',
    description:
      'Títulos, encabezados y una página que carga rápido, para que te encuentren y te escriban.',
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
    title: 'Nos cuentas tu negocio',
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
        Adaptamos la web a tu negocio y te ayudamos a preparar los textos
        para explicar tus servicios con claridad.{' '}
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
    answer: `El precio cerrado es de ${getLaunchPriceAmountLabel()}. No hay sorpresas, ni letra pequeña, ni costes ocultos. Te lo cerramos por escrito antes de empezar, para que sepas exactamente lo que pagas de principio a fin. Ecommerce, desarrollo a medida o tiendas online con catálogos grandes se presupuestan aparte.`,
  },
  {
    question: '¿Cuánto tarda?',
    answer: `Tu web está lista y publicada en ${LAUNCH_DELIVERY_LABEL}. El plazo empieza cuando nos das la información básica de tu negocio (fotos, textos e ideas). Los plazos van por escrito.`,
  },
  {
    question: '¿Y si no tengo los textos preparados?',
    answer:
      'Te ayudamos a preparar los textos de tu web a partir de lo que nos cuentes sobre tu negocio y tus servicios. Los revisamos contigo antes de publicar.',
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
      'Sí, la web es tuya. Sin suscripción ni permanencia mensual. Al terminar te entregamos los accesos. Podrás cambiar textos e imágenes desde el panel. Cambios posteriores o secciones nuevas se presupuestan aparte.',
  },
];

const launchHeroDescription = (
  <>
    <p>Para autónomos y pequeños negocios de toda España. Trabajamos online.</p>
    <p className='mt-3 font-bold'>Web adaptada a tu negocio, lista en {LAUNCH_DELIVERY_LABEL}.</p>
    <p className='mt-3 text-base'>Hosting y dominio incluidos el primer año.</p>
  </>
);

const LaunchLandingHero = () => {
  const formSlot = useBootHeroSlot();

  const form = (
    <ContactFormHero
      id='contacto'
      title='Hablemos de tu web'
      description='Sin compromiso y sin pagar ahora. Resolvemos tus dudas antes de contratar.'
      page={ADS_LAUNCH_FORM_ORIGIN}
      submitLabel='Quiero que me llaméis'
      className={formSlot ? 'md:!w-full' : ''}
    />
  );

  if (formSlot) {
    return createPortal(form, formSlot);
  }

  return (
    <HeroCta
      label='Web profesional'
      title={
        <>
          Tu web profesional por{' '}
          <span className='whitespace-nowrap'>
            {getLaunchPriceAmountLabel()}
          </span>
        </>
      }
      description={launchHeroDescription}
      convertFirstOnMobile
      buttonText='Hablemos de tu web'
      buttonHref='#contacto'
      heroType='form'
      hasButton
      formTitle='Hablemos de tu web'
      formDescription='Sin compromiso y sin pagar ahora. Resolvemos tus dudas antes de contratar.'
      formSectionInfo={ADS_LAUNCH_FORM_ORIGIN}
      formSubmitLabel='Quiero que me llaméis'
      formId='contacto'
      hasBackground={false}
      hasReviewBadge
      isTopHero
    />
  );
};

const LandingWebProfesional = () => {
  usePageMeta(ADS_LAUNCH_LANDING_PATH);
  const [realWebIds] = useState(() =>
    pickRandomProjectIds(REAL_WEB_PROJECT_IDS, 3),
  );

  useEffect(() => {
    trackLandingPromo590View();
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
      <LaunchLandingHero />

      <ServiceIncludes
        title='Qué incluye la web'
        intro={
          <>
            Esta oferta es para una{' '}
            <strong className='font-extrabold'>
              web profesional para negocios
            </strong>
            . Hasta 5 secciones, tu marca, formulario, WhatsApp, hosting y
            publicación. Precio del paquete: {getLaunchPriceAmountLabel()}.
          </>
        }
        items={includes}
      />

      <section className='py-8 md:py-10'>
        <div className='container mx-auto max-w-3xl text-center text-base leading-relaxed text-ink-dark md:text-lg'>
          <p>
            Ideal para autónomos, emprendedores y pequeños negocios que
            necesitan una web profesional de presentación.
          </p>
          <p className='mt-3'>
            Ecommerce, desarrollo a medida y proyectos complejos se presupuestan
            aparte.
          </p>
        </div>
      </section>

      <Portfolio
        ids={realWebIds}
        headingLabel='Portfolio'
        headingTitle='Proyectos de diseño web'
        headingDescription={
          <>
            Conoce algunos proyectos realizados para nuestros clientes. El paquete incluye
            una web de presentación por{' '}
            <strong className='font-extrabold'>
              {getLaunchPriceAmountLabel()}
            </strong>
            . Las tiendas online y funcionalidades a medida se presupuestan aparte.
          </>
        }
        ctaText='Hablemos de mi proyecto'
        ctaHref='#contacto'
      />

      <Team
        compact
        label='El equipo de 36WEB'
        title='Quién está detrás de tu web'
        paragraphs={[
          'Cuatro profesionales de diseño y desarrollo trabajando en equipo para dar forma a tu web.',
        ]}
      />

      <Testimonials />

      <SEOProcess
        title='Así se hace'
        subtitle='Tres pasos. Nos cuentas tu negocio, montamos y adaptamos, revisas y publicamos.'
        steps={processSteps}
        compact
      />

      <div id='faq'>
        <SEOFAQ title='Lo que suele preguntar la gente' faqs={faqs} />
      </div>

      <div id='contacto-final'>
        <HeroCta
          title='Quiero mi web profesional'
          description='Cuéntanos qué necesita tu negocio y resolvemos tus dudas antes de empezar.'
          belowDescription={<LaunchPaymentTable className='md:mx-0' />}
          buttonText='Hablemos de tu web'
          buttonHref='#contacto'
          heroType='form'
          hasButton={false}
          formTitle='Hablemos de tu web'
          formDescription='Sin compromiso y sin pagar ahora. Resolvemos tus dudas antes de contratar.'
          formSectionInfo={ADS_LAUNCH_FORM_ORIGIN}
          formSubmitLabel='Quiero que me llaméis'
          hasBackground={false}
          hasReviewBadge={false}
        />
      </div>
      <LaunchExitPopup />
    </>
  );
};

export default LandingWebProfesional;
