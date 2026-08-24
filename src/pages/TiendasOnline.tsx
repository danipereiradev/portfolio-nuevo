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
  ServiceBreadcrumb,
  ServiceIncludes,
} from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { SITE_SHOP_PATH, SITE_WEB_PATH } from '../config/contact';
import { CreditCard, Package, RefreshCw } from 'lucide-react';

const SITE_URL = 'https://36web.es';

const faqs = [
  {
    question: '¿Cuánto cuesta una tienda online profesional?',
    answer:
      'El precio de una tienda online depende del catálogo, las pasarelas y lo que tenga que hacer el ecommerce. No hay un pack fijo. Tras hablar te mandamos un presupuesto concreto. Pedirlo es gratis.',
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
      'Lo que pida el caso. WooCommerce, Shopify u otra base si encaja mejor. Ecommerce a medida cuando el catálogo o el proceso de compra lo necesitan. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
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

const includes = [
  {
    title: 'Catálogo y fichas de producto',
    description: (
      <>
        Estructura del catálogo, variantes, fotos y textos.{' '}
        <strong className='font-extrabold'>
          El cliente tiene que entender qué compra sin pedir ayuda
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Carrito y proceso de compra',
    description: (
      <>
        Un checkout claro en el móvil.{' '}
        <strong className='font-extrabold'>
          Si el proceso de compra es largo o confuso, se pierden pedidos
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Pasarelas de pago',
    description: (
      <>
        Redsys, Stripe, PayPal, Bizum u otras.{' '}
        <strong className='font-extrabold'>
          Lo cerramos según cómo cobras hoy
        </strong>
        , no según lo que nos convenga a nosotros.
      </>
    ),
  },
  {
    title: 'Envíos y gastos de envío',
    description: (
      <>
        Zonas, tarifas y mensajes claros antes de pagar.{' '}
        <strong className='font-extrabold'>
          Menos abandonos en el carrito
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Tienda online responsive',
    description: (
      <>
        El ecommerce se usa bien con el pulgar.{' '}
        <strong className='font-extrabold'>
          La mayor parte de las ventas empiezan o acaban en el teléfono
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Panel para pedidos y stock',
    description: (
      <>
        Gestionas productos, pedidos y fotos.{' '}
        <strong className='font-extrabold'>
          Si no quieres tocarla, el mantenimiento es opcional
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Hosting, dominio y publicación',
    description: (
      <>
        Incluimos{' '}
        <strong className='font-extrabold'>
          hosting para arrancar y publicación con tu dominio
        </strong>
        . El dominio es tuyo. Lo configuramos o te ayudamos a registrar uno
        nuevo.
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
        Catálogo, cómo cobras, cómo envías y si ya tienes tienda online. Con eso
        podemos hacerte{' '}
        <strong className='font-extrabold'>la mejor propuesta posible</strong>.
      </>
    ),
  },
  {
    number: '2',
    title: 'En 24–48 h te enviamos la propuesta',
    description: (
      <>
        En 24–48 h laborables te mandamos un{' '}
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
    title: 'Ecommerce que hay que rehacer',
    description: (
      <>
        Si la tienda actual es lenta, no cobra bien o no se usa en el móvil,{' '}
        <strong className='font-extrabold'>la montamos de nuevo</strong>.
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
            <strong className='font-extrabold'>cobrar de verdad</strong>:
            catálogo, pagos, envíos y móvil. Todo lo necesario para que puedas
            empezar a vender{' '}
            <strong className='font-extrabold'>desde el primer día</strong>.
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/img/sumup-ShB9pI4mpRg-unsplash.jpg'
        heroType='form'
        hasButton={false}
        formTitle='Presupuesto de tienda online'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='TiendasOnline Hero'
        hasBackground
        hasReviewBadge
        isTopHero
        breadcrumb={
          <ServiceBreadcrumb
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Tiendas online' },
            ]}
          />
        }
      />

      <TextImage
        label='¿Por qué una tienda con 36web?'
        title='Diseñamos tiendas online pensadas para conseguir pedidos.'
        paragraphs={[
          <>
            Llevamos mucho tiempo en esto. Una tienda online lenta o un checkout
            confuso te cuesta pedidos. Por eso te ofrecemos un ecommerce{' '}
            <strong className='font-extrabold'>
              claro, rápido y listo para cobrar con tu dominio
            </strong>
            .
          </>,
          <>
            Tendremos muy en cuenta{' '}
            <strong className='font-extrabold'>
              tus necesidades y presupuesto
            </strong>{' '}
            a la hora de elegir la plataforma. WooCommerce, Shopify o a medida,
            según el caso. Siempre vamos a aconsejarte{' '}
            <strong className='font-extrabold'>
              lo mejor para ti, no lo más caro
            </strong>
            .
          </>,
        ]}
        imageSrc='/img/portfolio/mock-chicxs.png'
        imageAlt='Mock de tienda online de Chicxs de la Calle'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <ServiceIncludes
        title='Qué incluimos en el diseño de tu tienda online'
        intro={
          <>
            Esta es la base de un ecommerce típico. El alcance exacto —
            WooCommerce, Shopify o a medida — irá especificado en la propuesta
            final.{' '}
            <strong className='font-extrabold'>Sin sorpresas.</strong>
          </>
        }
        items={includes}
      />

      <TextImage
        label='WOOCOMMERCE, SHOPIFY O A MEDIDA'
        title='Diseño de tiendas online con WooCommerce, Shopify o a medida'
        paragraphs={[
          <>
            <strong className='font-extrabold'>WooCommerce</strong> encaja si ya
            estás en WordPress o quieres controlar catálogo y contenidos en el
            mismo sitio.{' '}
            <strong className='font-extrabold'>Shopify</strong> encaja si
            priorizas un panel sencillo y un ecosistema de apps.
          </>,
          <>
            El desarrollo a medida entra cuando{' '}
            <strong className='font-extrabold'>
              el proceso de compra no cabe en una tienda estándar
            </strong>
            . En la propuesta te decimos qué plataforma usamos y por qué. Sin
            venderte lo más caro por sistema.
          </>,
          <>
            Además, dejamos el panel preparado para que puedas{' '}
            <strong className='font-extrabold'>
              gestionar productos, stock y pedidos sin depender de nosotros
            </strong>
            .
          </>,
          <>
            Si no vendes productos y lo que necesitas es una página de empresa
            para que te escriban, mira el{' '}
            <a href={SITE_WEB_PATH} className='font-bold text-link underline'>
              diseño web a medida
            </a>
            .{' '}
            <strong className='font-extrabold'>No es el mismo proyecto</strong>.
          </>,
        ]}
        imageSrc='/img/portfolio/mock-camisetas.png'
        imageAlt='Mock de tienda online de Camisetas Ahora'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <SEOBenefits
        title='Una tienda online distinta según lo que necesite tu negocio.'
        subtitle={
          <>
            Hacemos ecommerce para{' '}
            <strong className='font-extrabold'>
              marcas que empiezan a vender online
            </strong>
            ,{' '}
            <strong className='font-extrabold'>negocios con tienda física</strong>{' '}
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
        imageSrc='/img/sumup-ShB9pI4mpRg-unsplash.jpg'
        imageAlt='Proceso de diseño y desarrollo de una tienda online'
      />

      <TextImage
        label='PRESUPUESTO'
        title='Precio de una tienda online profesional'
        paragraphs={[
          <>
            <strong className='font-extrabold'>
              No tenemos un pack cerrado
            </strong>{' '}
            de ecommerce. El presupuesto depende de{' '}
            <strong className='font-extrabold'>
              productos, pasarelas, envíos, idiomas y si hay que migrar una
              tienda antigua
            </strong>
            .
          </>,
          <>
            No publicamos un precio único porque no sería cierto. En{' '}
            <strong className='font-extrabold'>24–48 h laborables</strong> te
            mandamos un número concreto, con lo que entra y el plazo. Pedir
            presupuesto de tienda online es gratis y no te compromete.
          </>,
          <>
            El 50% se paga al aceptar y arrancar. El resto, al publicar.
            Recomendamos empezar por{' '}
            <strong className='font-extrabold'>
              lo que realmente necesitas
            </strong>
            , sin hinchar el proyecto.
          </>,
        ]}
        imageSrc='/img/portfolio/camisetas-ahora.png'
        imageAlt='Mock de ecommerce de Camisetas Ahora'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <Portfolio contained />
      <Testimonials />
      <Team
        label='CONOCE A TU FUTURO EQUIPO DE TIENDAS ONLINE'
        title='Estas somos las personas que vamos a encargarnos de montar tu ecommerce.'
        paragraphs={[
          <>
            Queremos que nos pongas caras. Que puedas ver nuestros portfolios y
            contactar con nosotros para lo que necesites:{' '}
            <strong className='font-extrabold'>siempre contestamos</strong>.
            Sobre todo, que sientas{' '}
            <strong className='font-extrabold'>
              seguridad al confiarnos la parte digital de tu negocio
            </strong>
            . Un ecommerce lento o confuso te cuesta ventas; por eso lo hacemos{' '}
            <strong className='font-extrabold'>
              claro, rápido y listo para cobrar
            </strong>
            .
          </>,
        ]}
      />

      <div id='faq' className='scroll-mt-24'>
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
        imageSrc='/img/portfolio/mock-carper.png'
        imageAlt='Mock de página web de Carper Sonido'
        buttonText='VER DISEÑO WEB'
        buttonHref={SITE_WEB_PATH}
      />

      <HeroCta
        title='Pide presupuesto de tienda online'
        description={
          <>
            Cuéntanos qué vendes y qué tiene que hacer el ecommerce. Te
            devolvemos propuesta en{' '}
            <strong className='font-extrabold'>24–48 h</strong>, con precio y
            plazos.{' '}
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
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='TiendasOnline CTA final'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default TiendasOnline;
