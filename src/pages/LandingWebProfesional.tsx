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
    answer: `${getLaunchPriceLabel()}. El precio concreto va por escrito, según el alcance. Hosting incluido. El dominio lo pagas tú: 12 € al año. Sin permanencia. La web es tuya.`,
  },
  {
    question: '¿Cuánto tarda?',
    answer: `Se publica en ${LAUNCH_DELIVERY_LABEL} desde que tenemos logo, textos, fotos y datos de contacto. El reloj empieza cuando ese material está listo.`,
  },
  {
    question: '¿Y si no tengo logo ni textos?',
    answer:
      'No hace falta que los traigas. Nuestro departamento de diseño gráfico crea el logo y el de copy redacta los textos, adaptados a tu marca y a tu sector. Los revisas tú antes de publicar.',
  },
  {
    question: '¿Cómo se paga?',
    answer:
      `${getLaunchInstallmentLabel()} al empezar y ${getLaunchInstallmentLabel()} cuando estés contento con el resultado, justo antes de publicar. Primero te contactamos y confirmamos el proyecto.`,
  },
  {
    question: '¿El hosting y el dominio están incluidos?',
    answer:
      'El hosting lo incluimos gratis, con tu dominio. Si ya tienes hosting, la montamos ahí sin coste. El dominio lo pagas tú: 12 € al año, a tu nombre.',
  },
  {
    question: '¿La web es mía? ¿Puedo pedir cambios?',
    answer:
      `Sí. El dominio queda a tu nombre y el hosting lo incluimos gratis. Antes de publicar la revisas; si algo importante no encaja, lo ajustamos. ${getLaunchInstallmentLabel()} al publicar, cuando apruebes. Cambios posteriores se presupuestan aparte.`,
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
        title={`Una web profesional para tu negocio desde ${getLaunchPriceAmountLabel()}`}
        description={
          <>
            <p>
              Web profesional para autónomos, emprendedores y pequeños negocios.
            </p>
            <p className='mt-2 font-extrabold'>
              {getLaunchPriceLabel()} · Lista en {LAUNCH_DELIVERY_LABEL} ·
              Hosting incluido · Sin cuotas mensuales
            </p>
            <ul className='mt-4 space-y-1 text-center text-base font-bold md:text-left md:text-lg'>
              <li>
                {getLaunchInstallmentLabel()} al empezar ·{' '}
                {getLaunchInstallmentLabel()} antes de publicar
              </li>
            </ul>
          </>
        }
        mobileDescription={
          <>
            <p>
              Web profesional para autónomos, emprendedores y pequeños negocios.
            </p>
            <p className='mt-2 font-extrabold'>
              {getLaunchPriceLabel()} · Lista en {LAUNCH_DELIVERY_LABEL} ·
              Hosting incluido · Sin cuotas mensuales
            </p>
          </>
        }
        mobileProof={
          <ul className='space-y-1 text-center text-base font-bold'>
            <li>
              {getLaunchInstallmentLabel()} al empezar ·{' '}
              {getLaunchInstallmentLabel()} antes de publicar
            </li>
            <li>Hosting incluido</li>
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
