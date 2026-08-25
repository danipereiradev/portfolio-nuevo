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
import { ADS_SHOP_LANDING_PATH } from '../config/contact';
import {
  shopIncludes,
  shopIncludesIntro,
  shopIncludesTitle,
} from '../data/shopIncludes';

const landingTrustPoints = [
  { icon: Wallet, text: 'Desde 400 €' },
  { icon: Clock, text: 'Propuesta en 24–48 h' },
  { icon: ShieldCheck, text: 'Hosting incluido' },
  { icon: BadgeCheck, text: 'La tienda es tuya' },
];

const whyUs = [
  {
    icon: FileCheck,
    title: 'Precio y plazo, por escrito',
    description: (
      <>
        No hay un pack cerrado. En 24–48 h laborables te mandamos qué entra,
        cuánto sale y cuándo está.{' '}
        <strong className='font-extrabold'>
          Pedir presupuesto es gratis y no te compromete
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
        Hablas con quien diseña y desarrolla la tienda. Estudio pequeño.{' '}
        <strong className='font-extrabold'>Siempre contestamos</strong>.
      </>
    ),
  },
  {
    icon: LayoutTemplate,
    title: 'Lo mejor para ti, no lo más caro',
    description: (
      <>
        WooCommerce, Shopify u otra plataforma si encaja. A medida solo cuando
        hace falta.{' '}
        <strong className='font-extrabold'>
          Te lo decimos en la propuesta, sin venderte lo más caro por sistema
        </strong>
        .
      </>
    ),
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas qué vendes',
    description: (
      <>
        Formulario, WhatsApp o llamada. Catálogo, cómo cobras, cómo envías y si
        ya tienes tienda.{' '}
        <strong className='font-extrabold'>Aún no hay nada que pagar</strong>.
      </>
    ),
  },
  {
    number: '2',
    title: 'Te mandamos la propuesta',
    description: (
      <>
        En 24–48 h laborables: precio, plazos y qué entra, por escrito. Si
        encaja, el 50% al aceptar y arrancamos.{' '}
        <strong className='font-extrabold'>
          Si no, lo dices y no pasa nada
        </strong>
        .
      </>
    ),
  },
  {
    number: '3',
    title: 'La montamos',
    description: (
      <>
        Catálogo, pagos, envíos y móvil, con tu marca. Tú revisas.{' '}
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
        Sale con tu dominio, se cobra bien en el móvil y gestionas pedidos.{' '}
        <strong className='font-extrabold'>La tienda es tuya</strong>.
      </>
    ),
  },
];

const faqs = [
  {
    question: '¿Cuánto cuesta?',
    answer:
      'Depende del alcance, no hay un pack fijo. Orientación: muchas tiendas quedan entre 400 € y 3.000 € + IVA. Tras hablar te mandamos un número concreto, por escrito. Pedirlo es gratis.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'El plazo va por escrito en la propuesta. Suele ser de 4 a 8 semanas cuando tenemos productos, fotos y textos. Cuenta desde el arranque pagado, no desde el primer “hola”.',
  },
  {
    question: '¿Qué incluye?',
    answer:
      'Catálogo, fichas, carrito, pagos (tarjeta, Bizum, PayPal…), envíos, versión móvil, panel para pedidos y stock, formación de 1 h y publicación con tu dominio. Hosting para arrancar. Lo concreto de tu caso va en la propuesta, antes de cobrar nada.',
  },
  {
    question: '¿WooCommerce, Shopify o a medida?',
    answer:
      'Lo que pida el caso. Con una plataforma tú llevas el control de la tienda. A medida también, con más curva de aprendizaje: suele ser para empresas más grandes. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
  },
  {
    question: '¿Puedo gestionar yo el catálogo después?',
    answer:
      'Sí. Te dejamos un panel para productos, stock, fotos y pedidos, y una formación de 1 h. La mayoría de clientes se quedan ellos al mando. Si prefieres no tocarla, el mantenimiento mensual es opcional.',
  },
  {
    question: '¿Me rehacéis la tienda que ya tengo?',
    answer:
      'Sí. Partimos de tu marca, catálogo, fotos y dominio, y montamos el ecommerce de nuevo. No es un parche sobre la vieja.',
  },
  {
    question: '¿El hosting está incluido? ¿De quién es la tienda?',
    answer:
      'Hosting para publicar, sí. El dominio es tuyo. Archivos y accesos a tu nombre. La tienda es tuya desde el día que se publica.',
  },
];

const LandingShop = () => {
  usePageMeta(ADS_SHOP_LANDING_PATH);

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

  useJsonLd('jsonld-landing-shop-faq', faqJsonLd);

  return (
    <>
      <HeroCta
        title='Te hacemos una tienda online que vende. Precio y plazos, por escrito.'
        description={
          <>
            Cuéntanos qué vendes. En 24–48 h te mandamos una propuesta con lo
            que entra, lo que cuesta y cuándo está.{' '}
            <strong className='font-extrabold'>
              Hablas con nosotros, no con un comercial
            </strong>
            . Si no encaja, lo dices y no pasa nada.
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/img/sumup-ShB9pI4mpRg-unsplash.jpg'
        heroType='form'
        hasButton={false}
        formTitle='Pide tu propuesta'
        formDescription='En 24–48 h. Sin compromiso.'
        formSectionInfo='Landing tiendas online — Hero'
        hasBackground
        hasReviewBadge
        isTopHero
      />

      <TrustBar points={landingTrustPoints} />

      <ServiceIncludes
        title={shopIncludesTitle}
        intro={shopIncludesIntro}
        items={shopIncludes}
      />

      <SEOBenefits
        title='Por qué encargárnosla a nosotros'
        subtitle={
          <>
            Tres cosas claras:{' '}
            <strong className='font-extrabold'>el precio</strong>,{' '}
            <strong className='font-extrabold'>con quién hablas</strong> y{' '}
            <strong className='font-extrabold'>
              que no te vendemos de más
            </strong>
            .
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
            precio y plazos antes de empezar, y la tienda queda a tu nombre.
          </>
        }
        steps={processSteps}
      />

      <Testimonials hasVideo />

      <Team
        label='EL EQUIPO'
        title='Somos las personas que te vamos a montar la tienda.'
        compact
        paragraphs={[
          <>
            Nos pones cara, ves el portfolio y nos escribes si quieres.{' '}
            <strong className='font-extrabold'>Contestamos nosotros</strong>.
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
            Déjanos nombre y teléfono. Te devolvemos propuesta en{' '}
            <strong className='font-extrabold'>24–48 h</strong>, con precio y
            plazos.{' '}
            <strong className='font-extrabold'>
              Si no cuadra, no pasa nada
            </strong>
            .
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Pide tu propuesta'
        formDescription='En 24–48 h. Sin compromiso.'
        formSectionInfo='Landing tiendas online — CTA final'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default LandingShop;
