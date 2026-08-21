import { useMemo } from 'react';
import {
  BadgeCheck,
  Clock,
  CreditCard,
  Handshake,
  LayoutTemplate,
  ShieldCheck,
} from 'lucide-react';
import Portfolio from '../components/Portfolio';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import TrustBar from '../components/TrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';
import CompareVsAi from '../components/CompareVsAi';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { ADS_SHOP_LANDING_PATH } from '../config/contact';

const landingTrustPoints = [
  { icon: CreditCard, text: 'Pagos y envíos' },
  { icon: Clock, text: 'Propuesta en 24–48 h' },
  { icon: ShieldCheck, text: 'Hosting incluido' },
  { icon: BadgeCheck, text: 'La tienda es tuya' },
];

const processSteps = [
  {
    number: '1',
    title: 'Cuentas qué vendes',
    description:
      'Formulario, WhatsApp o llamada. Catálogo, cómo cobras y cómo envías. Aún no hay nada que pagar.',
  },
  {
    number: '2',
    title: 'Te mandamos la propuesta',
    description:
      'En 24–48 h laborables: precio, plazos y qué entra, por escrito. Si encaja, el 50% al aceptar y arrancamos. Si no, lo dices y no pasa nada.',
  },
  {
    number: '3',
    title: 'La montamos',
    description:
      'Catálogo, pagos, envíos y móvil, con tu marca. Si falta algo, te decimos qué necesitamos. Tú revisas.',
  },
  {
    number: '4',
    title: 'Se publica y queda tuya',
    description:
      'Conectamos el dominio, se cobra bien en el móvil y gestionas pedidos. La tienda es tuya.',
  },
];

const problems = [
  {
    icon: LayoutTemplate,
    title: 'Precio y plazos, por escrito',
    description:
      'Antes de empezar: qué entra, cuánto sale y cuándo está. Sin packs hinchados ni “ya te digo”.',
  },
  {
    icon: CreditCard,
    title: 'Una tienda para vender, no una plantilla',
    description:
      'Catálogo, checkout, pagos y envíos. WooCommerce, Shopify o a medida, según el caso. Si buscas la de 79 €, no somos eso.',
  },
  {
    icon: Handshake,
    title: 'Hablas con quien la monta',
    description:
      'Estudio pequeño. Te atiende el equipo que diseña y desarrolla el ecommerce, no un comercial que luego desaparece.',
  },
];

const faqs = [
  {
    question: '¿Es una plantilla igual para todos?',
    answer:
      'No. Se adapta a tu marca, catálogo y forma de cobrar. Si solo quieres una plantilla barata, hay sitios mejores para eso.',
  },
  {
    question: '¿Cuánto cuesta una tienda online?',
    answer:
      'Presupuesto según catálogo, pasarelas y envíos. No hay un pack fijo. Tras hablar te mandamos un número concreto por escrito. El presupuesto es gratis.',
  },
  {
    question: '¿Hay que pagar para que me deis precio?',
    answer:
      'No. Primero hablamos, te mandamos la propuesta en 24–48 h laborables y decides. El 50% se paga al aceptar y arrancar; el resto, al publicar.',
  },
  {
    question: '¿Montáis WooCommerce, Shopify o a medida?',
    answer:
      'Lo que pida el caso. WooCommerce, Shopify u otra base si encaja mejor. A medida cuando el proceso de compra lo necesita. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
  },
  {
    question: '¿Puedo gestionar yo el catálogo después?',
    answer:
      'Sí. Te dejamos un panel para productos, stock, fotos y pedidos. Si prefieres no tocarla, el mantenimiento mensual es opcional.',
  },
  {
    question: '¿Me rehacéis la tienda que ya tengo?',
    answer:
      'Sí. Partimos de tu marca, catálogo, fotos y dominio, y montamos el ecommerce de nuevo. No es un parche sobre la vieja.',
  },
  {
    question: '¿Quién prepara textos e imágenes de producto?',
    answer:
      'Tú nos mandas lo que tengas. Lo ordenamos y lo metemos en la tienda. Redactar o fotografiar todo desde cero se valora aparte.',
  },
  {
    question: '¿Puedo usar mi dominio?',
    answer:
      'Sí, es tuyo. Lo configuramos o te ayudamos a registrar uno nuevo.',
  },
  {
    question: '¿El hosting está incluido?',
    answer: 'Sí, para publicar la tienda. Lo confirmamos en la propuesta.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'El plazo va por escrito en la propuesta. Montar un ecommerce suele ser de 4 a 8 semanas cuando tenemos productos, fotos y textos. Cuenta desde el arranque pagado, no desde el primer “hola”.',
  },
  {
    question: '¿Trabajáis solo en Madrid?',
    answer:
      'No. Trabajamos en remoto con clientes de toda España. Si estás en Madrid, también podemos vernos.',
  },
  {
    question: '¿Qué pasa cuando la tienda está online?',
    answer:
      'Te la entregamos funcionando: dominio, móvil, pagos y pedidos. El mantenimiento mensual es opcional.',
  },
  {
    question: '¿Y si no vendo productos, solo quiero una web?',
    answer:
      'Eso es una web de empresa, otro tipo de proyecto. Lo vemos en la conversación y te decimos si encaja o si hay que plantearlo aparte.',
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
        title='Tienda online para tu negocio. Precio y plazos por escrito.'
        description='Catálogo, pagos y envíos. WooCommerce, Shopify o a medida. Hablas con quien la monta. Te decimos qué entra, cuánto sale y cuándo está, antes de cobrar nada.'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/img/sumup-ShB9pI4mpRg-unsplash.jpg'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='Landing tiendas online — Hero'
        hasBackground
        hasReviewBadge
        isTopHero
        highlights={[
          'Precio cerrado en la propuesta.',
          'Plazo por escrito. Suele ser 4–8 semanas.',
          'Propuesta en 24–48 h laborables.',
          'Hosting incluido. La tienda es tuya.',
        ]}
      />
      <TrustBar points={landingTrustPoints} />
      <SEOBenefits
        title='Si estás contratando una tienda online, esto es lo que te llevas'
        subtitle='Precio cerrado, ecommerce a medida y trato directo. Lo que buscas cuando escribes “agencia de tiendas online”.'
        benefits={problems}
      />
      <CompareVsAi />
      <SEOProcess
        title='Así se contrata la tienda'
        subtitle='Cuatro pasos. Sabes precio y plazos antes de empezar, y el ecommerce queda a tu nombre.'
        steps={processSteps}
      />

      <HeroCta
        title='¿Hablamos de tu tienda?'
        description='Cuéntanos qué vendes y qué tiene que hacer el ecommerce. Te devolvemos propuesta en 24–48 h, con precio y plazos. Si no encaja, lo dices y no pasa nada.'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='Landing tiendas online — CTA medio'
        hasBackground={false}
        hasReviewBadge={false}
      />

      <Team
        label={'TUS EXPERTOS EN TIENDAS ONLINE'}
        title='La montamos nosotros. Tú hablas con el equipo, no con un comercial.'
        paragraphs={[
          'Estudio pequeño en Madrid. Diseño, desarrollo y publicación con tu dominio. Una tienda lenta o un checkout confuso te cuesta pedidos; por eso la hacemos clara, rápida y lista para cobrar.',
        ]}
      />
      <Portfolio contained />
      <Testimonials />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='Te resolvemos todas tus dudas'
          faqs={faqs}
          ctaText='PEDIR PROPUESTA'
          ctaHref='#contacto'
        />
      </div>
      <HeroCta
        title='Cuando quieras, empezamos'
        description='Formulario, WhatsApp o llamada. Te devolvemos precio y plazos por escrito en 24–48 h. El 50% al aceptar; el resto, al publicar. La tienda queda a tu nombre.'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='Landing tiendas online — CTA final'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default LandingShop;
