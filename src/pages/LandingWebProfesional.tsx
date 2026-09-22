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
import {
  trackLandingPromo349PortfolioClick,
  trackLandingPromo349View,
} from '../utils/analytics';

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

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas tu negocio',
    description: (
      <>
        Nos escribes, te llamamos y confirmamos el proyecto.{' '}
        <strong className='font-extrabold'>
          Precio cerrado: {getLaunchPriceLabel()}
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
        Con tu logo, textos y datos montamos la web a tu marca.{' '}
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
          El 50% final se paga cuando apruebes
        </strong>
        .
      </>
    ),
  },
];

const faqs = [
  {
    question: '¿Cuánto cuesta?',
    answer: `${getLaunchPriceLabel()}, precio cerrado. Hosting y dominio incluidos el primer año. Sin permanencia. La web es tuya.`,
  },
  {
    question: '¿Cuánto tarda?',
    answer: `Se publica en ${LAUNCH_DELIVERY_LABEL} desde que nos entregas logo, textos, fotos y datos de contacto. El reloj empieza cuando nos llega ese material.`,
  },
  {
    question: '¿Cómo se paga?',
    answer:
      '50% al empezar y 50% cuando estés contento con el resultado, justo antes de publicar. Primero te contactamos y confirmamos el proyecto.',
  },
  {
    question: '¿Qué contenidos tengo que entregar?',
    answer: `Logo, textos, fotos y la información de tu negocio (qué haces, cómo te contactan, horarios, redes). Si no cuentas con logo o textos, te lo presupuestamos. El plazo de ${LAUNCH_DELIVERY_LABEL} cuenta desde que nos llega el material.`,
  },
  {
    question: '¿El hosting y el dominio están incluidos?',
    answer:
      'Sí. Incluimos el hosting y el dominio durante el primer año. A partir del segundo año, podrás renovarlos con nosotros o trasladarlos al proveedor que prefieras. El coste orientativo es de 80–150 € + IVA al año. La web y el dominio quedan a tu nombre.',
  },
  {
    question: '¿La web es mía? ¿Puedo pedir cambios?',
    answer:
      'Sí. La web y el dominio quedan a tu nombre. Antes de publicar la revisas; si algo importante no encaja, lo ajustamos. El 50% final se paga cuando apruebes. Cambios posteriores se presupuestan aparte.',
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

      <ServiceIncludes
        title='Qué incluye la web'
        intro={
          <>
            Esta oferta es para una{' '}
            <strong className='font-extrabold'>
              web profesional para negocios
            </strong>
            . Hasta 5 secciones, tu marca, formulario, WhatsApp y publicación.
            Precio cerrado.
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
        ids={['hatena', 'carper']}
        images={{
          hatena: '/img/portfolio/hatena-landing.webp',
          carper: '/img/portfolio/carper-landing.webp',
        }}
        urls={{
          hatena: 'https://hatena.es',
          carper: 'https://carpersonido.com',
        }}
        onProjectClick={(id) => {
          if (id === 'hatena' || id === 'carper') {
            trackLandingPromo349PortfolioClick(id);
          }
        }}
        headingLabel='Proyectos lanzados'
        headingTitle='Proyectos que ya han sido lanzados'
        headingDescription={
          <>
            Clientes que ya tienen su web profesional. Así puede quedar la tuya
            por{' '}
            <strong className='font-extrabold'>{getLaunchPriceLabel()}</strong>.
          </>
        }
        sectorPrompt='¿Quieres ver ejemplos de tu sector? Te enseñamos proyectos similares antes de empezar.'
        sectorCtaText='Ver ejemplos de mi sector'
        sectorCtaHref='#contacto'
      />

      <Testimonials />

      <section className='page-section'>
        <div className='container mx-auto max-w-4xl text-center'>
          <div className='page-title-block mx-auto'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              No se publica hasta que estés conforme
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              {getLaunchPriceLabel()} · 50% al empezar · 50% cuando apruebes. La
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
    </>
  );
};

export default LandingWebProfesional;
