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
import Testimonials from '../components/Testimonials';
import TrustBar from '../components/TrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta, { HeroCtaList } from '../components/HeroCta';
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
  { icon: Wallet, text: 'Desde 900 €' },
  { icon: ShieldCheck, text: 'Hosting incluido' },
  { icon: BadgeCheck, text: 'Dominio incluido' },
  { icon: Clock, text: 'Propuesta 24 h' },
];

const whyUs = [
  {
    icon: FileCheck,
    title: 'Precio y plazo, por escrito',
    description: (
      <>
        No hay un pack cerrado. Te devolvemos{' '}
        <strong className='font-extrabold'>propuesta</strong>{' '}
        <strong className='font-extrabold'>en el mismo día</strong> con qué
        entra, cuánto sale y cuándo está.{' '}
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
    question: '¿Cuánto cuesta y cómo se paga?',
    answer:
      'Depende del alcance, no hay un pack fijo. Orientación: muchas tiendas quedan entre 900 € y 3.000 € + IVA. Tras hablar te mandamos un número concreto, por escrito. Pedirlo es gratis. El 50% se paga al aceptar y arrancar. El resto, al publicar.',
  },
  {
    question: '¿Qué tienda cuesta 900 €?',
    answer:
      'Los 900 € son para tiendas sencillas: catálogo contenido y lo justo para vender. Si hace falta más productos, integraciones o funciones, el número sube. Antes de empezar te mandamos un presupuesto cerrado, según lo que necesites.',
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
    question: '¿El hosting y el dominio están incluidos?',
    answer:
      'Sí. Incluimos el hosting y el dominio durante el primer año para que puedas arrancar sin costes adicionales. A partir del segundo año, podrás renovarlos con nosotros o trasladarlos al proveedor que prefieras. El coste orientativo es de 80–150 € + IVA al año, según las características y el espacio. La tienda y el dominio quedan a tu nombre.',
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
        title='Te hacemos una tienda online completa preparada para vender desde 900 € + IVA. Precio y entrega cerrados.'
        description={
          <HeroCtaList
            items={[
              <>
                Te devolvemos{' '}
                <strong className='font-extrabold'>propuesta</strong>{' '}
                <strong className='font-extrabold'>en el mismo día</strong> con lo
                que entra, lo que cuesta y cuándo está.
              </>,
              <>
                <strong className='font-extrabold'>
                  Hablas con quien te va a hacer la tienda, no con un comercial
                </strong>
                .
              </>,
              'Si no encaja, lo dices y no pasa nada.',
            ]}
          />
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/video/hero-nubes.jpg'
        videoUrl='/video/hero-nubes-loop.mp4'
        heroType='form'
        hasButton={false}
        formTitle='Nosotros te llamamos'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='Landing tiendas online — Hero'
        formId='contacto'
        hasBackground
        overlay='none'
        hasReviewBadge
        isTopHero
        convertFirstOnMobile
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

      <Portfolio />

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

      <Testimonials hasVideo       />

      <div id='faq'>
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
        formTitle='Nosotros te llamamos'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='Landing tiendas online — CTA final'
        hasBackground={false}
        hasReviewBadge
      />
    </>
  );
};

export default LandingShop;
