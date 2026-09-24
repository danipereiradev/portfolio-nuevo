import { useEffect, useMemo } from 'react';
import {
  Globe,
  MessageCircle,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import Portfolio from '../components/Portfolio';
import SEOFAQ from '../components/SEOFAQ';
import Testimonials from '../components/Testimonials';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';
import LaunchPaymentTable from '../components/LaunchPaymentTable';
import LaunchExitPopup from '../components/LaunchExitPopup';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  ADS_LAUNCH_FORM_ORIGIN,
  ADS_LAUNCH_LANDING_PATH,
} from '../config/contact';
import {
  getLaunchInstallmentLabel,
  getLaunchPriceAmountLabel,
  getLaunchPriceLabel,
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
      'En nuestro hosting, gratis, con tu dominio. O la montamos en el hosting que tú elijas, sin coste.',
  },
  {
    icon: ShieldCheck,
    title: 'No se publica hasta que estés conforme',
    description:
      `La revisas antes de publicar. Si algo importante no encaja, lo ajustamos. ${getLaunchInstallmentLabel()} al publicar, tras tu aprobación.`,
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas tu negocio',
    description: (
      <>
        Nos escribes, te llamamos y confirmamos el proyecto.{' '}
        <strong className='font-extrabold'>
          {getLaunchPriceLabel()}. Te lo cerramos por escrito
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
        La ves, si algo no encaja lo ajustamos, y entonces se publica.{' '}
        <strong className='font-extrabold'>
          {getLaunchInstallmentLabel()} al publicar, cuando apruebes
        </strong>
        .
      </>
    ),
  },
];

const faqs = [
  {
    question: '¿Cuánto cuesta?',
    answer: `El precio cerrado es de ${getLaunchPriceAmountLabel()}. No hay sorpresas, ni letra pequeña, ni costes ocultos. Te lo cerramos por escrito antes de empezar, para que sepas exactamente lo que pagas de principio a fin. Ecommerce, desarrollo a medida o tiendas online con catálogos grandes se presupuestan aparte.`,
  },
  {
    question: '¿Cuánto tarda?',
    answer: `Tu web está lista y publicada en ${LAUNCH_DELIVERY_LABEL}. El plazo empieza cuando nos das la información básica de tu negocio (fotos, textos e ideas). Los plazos van por escrito.`,
  },
  {
    question: '¿Y si no tengo logo ni textos?',
    answer:
      'No hace falta que los traigas. Si no tienes textos, los redactamos y los adaptamos a tu sector. Si no tienes logo, te preparamos una propuesta básica y limpia para arrancar, sin coste añadido. Lo revisas tú antes de publicar.',
  },
  {
    question: '¿Cómo se paga?',
    answer: `Dos tramos fijos: ${getLaunchInstallmentLabel()} al empezar, para poner en marcha el diseño, y ${getLaunchInstallmentLabel()} antes de publicar. El último pago solo lo haces cuando has revisado la web y estás conforme con el resultado.`,
  },
  {
    question: '¿El hosting y el dominio están incluidos?',
    answer:
      'Sí. El primer año entran el hosting y el registro de tu dominio (.es o .com). Si ya tienes hosting, la montamos ahí sin coste.',
  },
  {
    question: '¿La web es mía? ¿Puedo pedir cambios?',
    answer:
      'Sí, la web es tuya. Sin suscripción ni permanencia mensual. Al terminar te entregamos los accesos. Podrás cambiar textos e imágenes desde el panel. Cambios posteriores o secciones nuevas se presupuestan aparte.',
  },
];

const LandingWebProfesional = () => {
  usePageMeta(ADS_LAUNCH_LANDING_PATH);

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
      <HeroCta
        label='Web profesional'
        title={
          <>
            Una web profesional para tu negocio desde{' '}
            <span className='whitespace-nowrap'>
              {getLaunchPriceAmountLabel()}
            </span>
          </>
        }
        description={
          <>
            <p className='mb-1'>
              Web profesional para autónomos, emprendedores y pequeños negocios.
            </p>
            <p className='font-bold'>
              Lista en {LAUNCH_DELIVERY_LABEL} · Hosting incluido · Sin cuotas
              mensuales
            </p>
            <p className='mt-2 text-xl font-extrabold md:text-left md:text-2xl'>
              <span className='whitespace-nowrap'>
                {getLaunchInstallmentLabel()}
              </span>{' '}
              al empezar ·{' '}
              <span className='whitespace-nowrap'>
                {getLaunchInstallmentLabel()}
              </span>{' '}
              antes de publicar
            </p>
          </>
        }
        mobileDescription={
          <>
            <p className='mb-1'>
              Web profesional para autónomos, emprendedores y pequeños negocios.
            </p>
            <p className='font-bold'>
              Lista en {LAUNCH_DELIVERY_LABEL} · Hosting incluido · Sin cuotas
              mensuales
            </p>
            <p className='mt-2 text-xl font-extrabold'>
              <span className='whitespace-nowrap'>
                {getLaunchInstallmentLabel()}
              </span>{' '}
              al empezar ·{' '}
              <span className='whitespace-nowrap'>
                {getLaunchInstallmentLabel()}
              </span>{' '}
              antes de publicar
            </p>
          </>
        }
        convertFirstOnMobile
        buttonText='Quiero información'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Nosotros te llamamos'
        formDescription='Te contactamos y confirmamos el proyecto. Sin compromiso.'
        formSectionInfo={ADS_LAUNCH_FORM_ORIGIN}
        formSubmitLabel='Quiero información'
        formId='contacto'
        hasBackground={false}
        hasReviewBadge
        isTopHero
      />

      <ServiceIncludes
        title='Qué incluye la web'
        intro={
          <>
            Esta oferta es para una{' '}
            <strong className='font-extrabold'>
              web profesional para negocios
            </strong>
            . Hasta 8 secciones, tu marca, formulario, WhatsApp, hosting y
            publicación. Desde {getLaunchPriceAmountLabel()}.
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
        headingLabel='Portfolio'
        headingTitle='Clientes reales y demos de sector'
        headingDescription={
          <>
            Estos son ejemplos de clientes reales y demos de lo que podría ser
            tu web desde{' '}
            <strong className='font-extrabold'>
              {getLaunchPriceAmountLabel()}
            </strong>
            .
          </>
        }
        ctaText='Quiero resultados como estos'
        ctaHref='#contacto'
      />

      <Testimonials />

      <section className='page-section'>
        <div className='container mx-auto max-w-4xl text-center'>
          <div className='page-title-block mx-auto'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              No se publica hasta que estés conforme
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              {getLaunchPriceLabel()} · {getLaunchInstallmentLabel()} al empezar
              · {getLaunchInstallmentLabel()} cuando apruebes. La
              ves antes de publicar. Si algo importante no encaja, lo ajustamos.
            </p>
          </div>
        </div>
      </section>

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
          description={
            <>
              <strong className='font-extrabold'>
                No se publica hasta que estés conforme
              </strong>
              . La ves, si no encaja la tocamos, y entonces sale.
            </>
          }
          belowDescription={<LaunchPaymentTable className='md:mx-0' />}
          buttonText='Quiero información'
          buttonHref='#contacto'
          heroType='form'
          hasButton={false}
          formTitle='Nosotros te llamamos'
          formDescription='Te contactamos y confirmamos el proyecto. Sin compromiso.'
          formSectionInfo={ADS_LAUNCH_FORM_ORIGIN}
          formSubmitLabel='Quiero información'
          hasBackground={false}
          hasReviewBadge={false}
        />
      </div>
      <LaunchExitPopup />
    </>
  );
};

export default LandingWebProfesional;
