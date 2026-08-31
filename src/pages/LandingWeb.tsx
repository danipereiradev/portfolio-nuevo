import { useMemo } from 'react';
import {
  BadgeCheck,
  Clock,
  FileCheck,
  Handshake,
  LayoutTemplate,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import Portfolio from '../components/Portfolio';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import TrustBar from '../components/TrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { ADS_LANDING_PATH } from '../config/contact';

const landingTrustPoints = [
  { icon: Wallet, text: 'Desde 600€' },
  { icon: Clock, text: 'Propuesta el mismo día' },
  { icon: ShieldCheck, text: 'Hosting incluido' },
  { icon: BadgeCheck, text: 'La web es tuya' },
];

const includes = [
  {
    title: 'Diseño a tu medida',
    description: (
      <>
        No hacemos la misma web para todo el mundo. La hacemos con tu marca, tus
        textos y tus fotos.{' '}
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
    title: 'Nos cuentas el caso',
    description: (
      <>
        Formulario, WhatsApp o llamada. Qué haces y qué tiene que hacer la web.{' '}
        <strong className='font-extrabold'>Aún no hay nada que pagar</strong>.
      </>
    ),
  },
  {
    number: '2',
    title: 'Te mandamos la propuesta',
    description: (
      <>
        Te devolvemos <strong className='font-extrabold'>propuesta</strong>{' '}
        <strong className='font-extrabold'>en el mismo día</strong>: precio,
        plazos y qué entra, por escrito. Si encaja, el 50% al aceptar y
        arrancamos.
      </>
    ),
  },
  {
    number: '3',
    title: 'La montamos',
    description: (
      <>
        Con tu marca, tus textos y tus fotos. Si falta algo, te lo decimos. Tú
        revisas.{' '}
        <strong className='font-extrabold'>
          Hablas con quien la está haciendo
        </strong>
        .
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
    question: '¿Cuánto cuesta y cómo se paga?',
    answer:
      'Depende del alcance, no hay un pack fijo. Orientación: muchas webs quedan entre 600 € y 3.000 € + IVA. Tras hablar te mandamos un número concreto, por escrito. Pedirlo es gratis. El 50% se paga al aceptar y arrancar. El resto, al publicar.',
  },
  {
    question: '¿Qué web cuesta 600 €?',
    answer:
      'Los 600 € son para proyectos web profesional sencillos con 4-5 secciones. Si hace falta más, el número sube. Antes de empezar te mandamos un presupuesto cerrado, según lo que necesites.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'El plazo va por escrito en la propuesta. Suele ser de 2 a 4 semanas cuando tenemos textos y fotos. Cuenta desde el arranque pagado, no desde el primer “hola”.',
  },
  {
    question: '¿Qué incluye?',
    answer:
      'Diseño a medida, versión móvil, formulario o WhatsApp, SEO de base, panel para textos y fotos, y publicación con tu dominio. Hosting para arrancar. Lo concreto de tu caso va en la propuesta, antes de cobrar nada.',
  },
  {
    question: '¿WordPress o a medida?',
    answer:
      'Lo que pida el caso. WordPress si encaja; a medida u otra base si hace falta. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
  },
  {
    question: '¿Puedo editarla yo después?',
    answer:
      'Sí. Te dejamos un panel sencillo para textos, fotos y cambios de día a día. Si prefieres no tocarla, el mantenimiento mensual es opcional.',
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

const LandingWeb = () => {
  usePageMeta(ADS_LANDING_PATH);

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

  useJsonLd('jsonld-landing-web-faq', faqJsonLd);

  return (
    <>
      <HeroCta
        title='Te hacemos una web completa para captar clientes desde 600 € + IVA. Precio y entrega cerrados.'
        description={
          <>
            Cuéntanos qué haces. Te devolvemos{' '}
            <strong className='font-extrabold'>propuesta</strong>{' '}
            <strong className='font-extrabold'>en el mismo día</strong> con lo
            que entra, lo que cuesta y cuándo está.{' '}
            <strong className='font-extrabold'>
              Hablas con quien te va a hacer la web, no con un comercial
            </strong>
            . Si no encaja, lo dices y no pasa nada.
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/img/hero/hero-diseno-web-36web.webp'
        heroType='form'
        hasButton={false}
        formTitle='Pide tu propuesta'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='Landing diseño web — Hero'
        hasBackground
        grayscale
        overlay='black'
        hasReviewBadge
        isTopHero
      />

      <TrustBar points={landingTrustPoints} />

      <ServiceIncludes
        title='Qué incluye la web'
        intro={
          <>
            Esto entra en todas. El resto lo cerramos en la propuesta,{' '}
            <strong className='font-extrabold'>antes de cobrar nada</strong>.
          </>
        }
        items={includes}
      />

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
            <strong className='font-extrabold'>Cuatro pasos.</strong> Sabes
            precio y plazo antes de empezar, y la web queda a tu nombre.
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
          ctaText='PEDIR PROPUESTA'
          ctaHref='#contacto'
        />
      </div>

      <HeroCta
        title='Cuando quieras, lo vemos'
        description={
          <>
            Déjanos nombre y teléfono. Te devolvemos{' '}
            <strong className='font-extrabold'>propuesta</strong>{' '}
            <strong className='font-extrabold'>en el mismo día</strong>, con
            precio y plazos.{' '}
            <strong className='font-extrabold'>Sin compromiso.</strong>
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Pide tu propuesta'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='Landing diseño web — CTA final'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default LandingWeb;
