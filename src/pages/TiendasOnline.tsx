import { useMemo } from 'react';
import HeroCta from '../components/HeroCta';
import { TextImage } from '../components/TextImage';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import { Team } from '../components/Team';
import SEOFAQ from '../components/SEOFAQ';
import SEOProcess from '../components/SEOProcess';
import SEOBenefits from '../components/SEOBenefits';
import {
  ServiceIncludes,
} from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { SITE_SHOP_PATH, SITE_WEB_PATH } from '../config/contact';
import {
  shopIncludes,
  shopIncludesIntro,
  shopIncludesTitle,
} from '../data/shopIncludes';
import { CreditCard, Package, RefreshCw } from 'lucide-react';

const SITE_URL = 'https://36web.es';

const faqs = [
  {
    question: '¿Cuánto cuesta una tienda online profesional?',
    answer:
      'El precio de una tienda online depende del alcance. Orientación: muchas tiendas quedan entre 600 € y 3.000 € + IVA. Tras hablar te mandamos un presupuesto concreto. Pedirlo es gratis.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'El plazo va por escrito en la propuesta. Crear una tienda online suele llevar de 4 a 8 semanas cuando tenemos productos, fotos y textos. Cuenta desde el arranque pagado, no desde el primer contacto.',
  },
  {
    question: '¿Qué incluye?',
    answer:
      'Catálogo, fichas de producto, carrito, pasarelas de pago, envíos, versión móvil, panel para pedidos y stock, y publicación con tu dominio. Hosting para arrancar. Precio y plazos van por escrito en la propuesta, antes de cobrar nada.',
  },
  {
    question: '¿WooCommerce, Shopify o a medida?',
    answer:
      'Lo que pida el caso. Con una plataforma (WooCommerce, Shopify u otra) tú llevas el control de la tienda. A medida también, con más curva de aprendizaje: suele ser para empresas más grandes y el presupuesto puede ir a 6.000 € + IVA. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
  },
  {
    question: '¿Puedo editarla después?',
    answer:
      'Sí. Te dejamos un panel para productos, stock, fotos y pedidos. Si prefieres no tocarla, el mantenimiento mensual es opcional.',
  },
  {
    question: '¿Rediseñáis tiendas existentes?',
    answer:
      'Sí. Partimos de tu marca, catálogo, fotos y dominio, y montamos el ecommerce de nuevo. No es un parche sobre la tienda vieja.',
  },
  {
    question: '¿El hosting y dominio están incluidos?',
    answer:
      'Sí a las dos. El dominio es tuyo. Lo configuramos o te ayudamos a registrar uno nuevo. El hosting para publicar lo confirmamos en la propuesta.',
  },
  {
    question: '¿De quién es la tienda?',
    answer:
      'Tuya. Te la entregamos funcionando: dominio, móvil, pagos y pedidos. Archivos y accesos a tu nombre. El mantenimiento mensual es opcional.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas qué vendes',
    description: (
      <>
        Catálogo, cómo cobras, cómo envías y si ya tienes tienda online. Con eso
        podemos hacerte{' '}
        <strong className='font-extrabold'>la mejor propuesta posible</strong>.
      </>
    ),
  },
  {
    number: '2',
    title: 'El mismo día te enviamos la propuesta',
    description: (
      <>
        Te devolvemos{' '}
        <strong className='font-extrabold'>propuesta</strong>{' '}
        <strong className='font-extrabold'>en el mismo día</strong>: un{' '}
        <strong className='font-extrabold'>presupuesto cerrado</strong> con qué
        entra, cuánto sale y cuándo está. Sin pagar por pedir precio.
      </>
    ),
  },
  {
    number: '3',
    title: 'Diseño y desarrollo del ecommerce',
    description: (
      <>
        Montamos catálogo, pagos y envíos con tu marca. Tú revisas. Empiezas a
        trabajar{' '}
        <strong className='font-extrabold'>
          directamente con quien diseña y desarrolla tu proyecto
        </strong>
        .
      </>
    ),
  },
  {
    number: '4',
    title: 'Tu tienda publicada',
    description: (
      <>
        Tras las revisiones necesarias por tu parte,{' '}
        <strong className='font-extrabold'>
          la tienda online sale con tu dominio, en móvil y lista para cobrar
        </strong>
        . Accesos a tu nombre.
      </>
    ),
  },
];

const audiences = [
  {
    icon: Package,
    title: 'Marcas que empiezan a vender online',
    description: (
      <>
        Crear una tienda online desde cero: catálogo, pagos y envíos,{' '}
        <strong className='font-extrabold'>sin hinchar el proyecto</strong>.
      </>
    ),
  },
  {
    icon: CreditCard,
    title: 'Negocios con tienda física',
    description: (
      <>
        Pasar el catálogo a una tienda online profesional, con{' '}
        <strong className='font-extrabold'>
          los pagos y envíos que ya usas
        </strong>
        .
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: 'Tienda que hay que rehacer',
    description: (
      <>
        Si la tienda actual es lenta, tiene errores o tus clientes no terminan
        de comprar,{' '}
        <strong className='font-extrabold'>
          te ofrecemos un rediseño completo
        </strong>
        .
      </>
    ),
  },
];

const TiendasOnline = () => {
  usePageMeta(SITE_SHOP_PATH);

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: `${SITE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Tiendas online',
              item: `${SITE_URL}${SITE_SHOP_PATH}/`,
            },
          ],
        },
        {
          '@type': 'Service',
          name: 'Diseño de tiendas online',
          serviceType: 'Ecommerce',
          description:
            'Diseño y desarrollo de tiendas online y ecommerce: WooCommerce, Shopify o a medida.',
          url: `${SITE_URL}${SITE_SHOP_PATH}/`,
          areaServed: { '@type': 'Country', name: 'España' },
          provider: {
            '@type': 'ProfessionalService',
            name: '36web',
            url: `${SITE_URL}/`,
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    }),
    [],
  );

  useJsonLd('jsonld-tiendas-online', jsonLd);

  return (
    <>
      <HeroCta
        title='Una tienda online con todo lo necesario para vender'
        description={
          <>
            Creamos tiendas online claras, rápidas y pensadas para{' '}
            <strong className='font-extrabold'>
              convertir visitas en ventas de verdad
            </strong>
            : catálogo, pagos y envíos, listas para vender{' '}
            <strong className='font-extrabold'>desde el primer día</strong>.
            Desde{' '}
            <strong className='font-extrabold'>600 € + IVA</strong>, según el
            alcance.
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/img/hero/hero-tienda-online-36web.webp'
        heroType='form'
        hasButton={false}
        formTitle='Presupuesto de tienda online'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='TiendasOnline Hero'
        hasBackground
        grayscale
        overlay='black'
        hasReviewBadge
        isTopHero
      />

      <TextImage
        label='¿Por qué una tienda con 36web?'
        title='Diseñamos tiendas online pensadas para convertir visitas en ventas.'
        paragraphs={[
          <>
            Las estadísticas no engañan. Una tienda online lenta o una pasarela
            de pago confusa te cuesta pedidos. Por eso ofrecemos tiendas online{' '}
            <strong className='font-extrabold'>
              claras, rápidas y listas para empezar a vender desde su
              publicación
            </strong>
            .
          </>,
          <>
            Tendremos muy en cuenta{' '}
            <strong className='font-extrabold'>
              tus necesidades y presupuesto
            </strong>{' '}
            a la hora de elegir el tipo de diseño. Con plataformas como
            WooCommerce, PrestaShop y Shopify o una tienda a medida que cumpla
            con todas las funciones que requiere tu proyecto. Siempre
            aconsejamos{' '}
            <strong className='font-extrabold'>
              lo mejor para ti, no lo más caro
            </strong>
            .
          </>,
        ]}
        imageSrc='/img/portfolio/mock-chicxs.webp'
        imageAlt='Mock de tienda online de Chicxs de la Calle'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <ServiceIncludes
        title={shopIncludesTitle}
        intro={shopIncludesIntro}
        items={shopIncludes}
      />

      <TextImage
        label='PLATAFORMA O A MEDIDA'
        title='Tú controlas la tienda. Nosotros te decimos con qué.'
        paragraphs={[
          <>
            Montamos la tienda con una plataforma —WooCommerce, Shopify u otra
            si encaja— o a medida. En la propuesta te decimos cuál y por qué.{' '}
            <strong className='font-extrabold'>
              Lo mejor para ti, no lo más caro
            </strong>
            .
          </>,
          <>
            Con una plataforma{' '}
            <strong className='font-extrabold'>
              terminas llevando tú el control
            </strong>
            : productos, stock, pedidos y fotos, sin depender de nosotros. Hay
            un poco de aprendizaje; incluimos una formación de 1 h. La mayoría
            de clientes se quedan ellos al mando.
          </>,

          <>
            Si no vendes productos, lo que necesitas es una{' '}
            <a href={SITE_WEB_PATH} className='font-bold text-link underline'>
              página web profesional
            </a>
            .{' '}
          </>,
        ]}
        imageSrc='/img/portfolio/mock-camisetas.webp'
        imageAlt='Mock de tienda online de Camisetas Ahora'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <SEOBenefits
        title='Una tienda online distinta según lo que necesite tu negocio.'
        subtitle={
          <>
            Hacemos tiendas online para{' '}
            <strong className='font-extrabold'>
              marcas que empiezan a vender online
            </strong>
            ,{' '}
            <strong className='font-extrabold'>
              negocios con tienda física
            </strong>{' '}
            y tiendas que hay que rehacer.
          </>
        }
        benefits={audiences}
      />

      <SEOProcess
        title='Cómo es el proceso de contratación'
        subtitle={
          <>
            <strong className='font-extrabold'>Cuatro sencillos pasos.</strong>{' '}
            Nos dejas tus datos, charlamos y nos cuentas qué vendes. Te pasamos
            una propuesta personalizada. Aceptas y empezamos a trabajar.
          </>
        }
        steps={processSteps}
      />

      <TextImage
        label='TIENDA ONLINE A MEDIDA'
        title='Precio de una tienda online profesional'
        paragraphs={[
          <>
            <strong className='font-extrabold'>
              No tenemos un pack de tienda online cerrado
            </strong>
            . El presupuesto depende del número de{' '}
            <strong className='font-extrabold'>
              productos, pasarelas, envíos, idiomas y si hay que migrar una
              tienda online antigua
            </strong>
            .
          </>,
          <>
            No publicamos un precio único porque no sería cierto. Orientación:
            muchas tiendas quedan entre{' '}
            <strong className='font-extrabold'>600 € y 3.000 € + IVA</strong>,
            según el alcance. Te devolvemos{' '}
            <strong className='font-extrabold'>propuesta</strong>{' '}
            <strong className='font-extrabold'>en el mismo día</strong> con un
            precio cerrado, lo que entra y el plazo. Pedir
            presupuesto de tienda online es gratis y no te compromete.
          </>,
          <>
            El 50% se paga al aceptar y arrancar. El resto, al publicar.
            Recomendamos empezar por{' '}
            <strong className='font-extrabold'>
              lo que realmente necesitas
            </strong>
            , sin hinchar el proyecto, siempre hay tiempo de escalar tu tienda
            online.
          </>,
        ]}
        imageSrc='/img/portfolio/resilience-mock.webp'
        imageAlt='Mock de tienda online de Resilience'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <Portfolio variant='tiendas' contained />
      <Testimonials />
      <Team
        label='CONOCE A TU FUTURO EQUIPO DE TIENDAS ONLINE'
        title='Trato directo durante todo el proyecto.'
        paragraphs={[
          <>
            Desde la primera reunión hasta la entrega, podrás hablar
            directamente con{' '}
            <strong className='font-extrabold'>
              la persona encargada de tu tienda online
            </strong>{' '}
            por{' '}
            <strong className='font-extrabold'>
              email, teléfono o videollamada
            </strong>
            .
          </>,
        ]}
      />

      <div id='faq'>
        <SEOFAQ
          title='No queremos que te quedes con dudas'
          faqs={faqs}
          ctaText='PEDIR PROPUESTA'
          ctaHref='#contacto'
        />
      </div>

      <TextImage
        label='TAMBIÉN HACEMOS'
        title='¿Necesitas una página web, no una tienda?'
        paragraphs={[
          <>
            Si no vendes productos y lo que quieres es una web de empresa para
            que te escriban, el proyecto es una{' '}
            <strong className='font-extrabold'>página web</strong>.{' '}
            <strong className='font-extrabold'>
              No es lo mismo que un ecommerce
            </strong>
            .
          </>,
        ]}
        imageSrc='/img/portfolio/mock-carper.webp'
        imageAlt='Mock de página web de Carper Sonido'
        buttonText='VER DISEÑO WEB'
        buttonHref={SITE_WEB_PATH}
      />

      <HeroCta
        title='Pide presupuesto de tienda online'
        description={
          <>
            Cuéntanos qué vendes y qué tiene que hacer el ecommerce. Te
            devolvemos <strong className='font-extrabold'>propuesta</strong>{' '}
            <strong className='font-extrabold'>en el mismo día</strong>, con
            precio y plazos.{' '}
            <strong className='font-extrabold'>
              Si no encaja, lo dices y no pasa nada
            </strong>
            .
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Presupuesto de tienda online'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='TiendasOnline CTA final'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default TiendasOnline;
