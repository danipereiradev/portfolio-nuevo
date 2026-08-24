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
import { CreditCard, Package, RefreshCw, Smartphone } from 'lucide-react';

const SITE_URL = 'https://36web.es';

const faqs = [
  {
    question: '¿Qué incluye el diseño de una tienda online?',
    answer:
      'Catálogo, fichas de producto, carrito, pasarelas de pago, envíos, versión móvil y publicación con tu dominio. Hosting para arrancar. Precio y plazos van por escrito en la propuesta, antes de cobrar nada.',
  },
  {
    question: '¿Cuánto cuesta crear una tienda online profesional?',
    answer:
      'El precio de una tienda online depende del catálogo, las pasarelas y lo que tenga que hacer el ecommerce. No hay un pack fijo. Tras hablar te mandamos un presupuesto concreto. Pedirlo es gratis.',
  },
  {
    question: '¿Hay que pagar para pedir presupuesto de tienda online?',
    answer:
      'No. Primero hablamos, te mandamos la propuesta en 24–48 h laborables y decides. El 50% se paga al aceptar y arrancar; el resto, al publicar.',
  },
  {
    question: '¿Cuánto tarda montar un ecommerce?',
    answer:
      'El plazo va por escrito en la propuesta. Crear una tienda online suele llevar de 4 a 8 semanas cuando tenemos productos, fotos y textos. Cuenta desde el arranque pagado.',
  },
  {
    question: '¿Hacéis tiendas WooCommerce, Shopify o a medida?',
    answer:
      'Lo que pida el caso. WooCommerce, Shopify u otra base si encaja mejor. Ecommerce a medida cuando el catálogo o el proceso de compra lo necesitan. Te lo decimos en la propuesta.',
  },
  {
    question: '¿La tienda online se ve bien en el móvil?',
    answer:
      'Sí. La mayor parte de las compras salen del teléfono. Revisamos el ecommerce en móvil, tablet y escritorio antes de publicar.',
  },
  {
    question: '¿Qué pasarelas de pago montáis en la tienda online?',
    answer:
      'Las que pida el negocio: Redsys, Stripe, PayPal, Bizum u otras. Lo cerramos en la propuesta según cómo cobras hoy.',
  },
  {
    question: '¿Puedo gestionar yo el catálogo del ecommerce?',
    answer:
      'Sí. Te dejamos un panel para productos, stock, fotos y pedidos. Si prefieres no tocarla, el mantenimiento mensual es opcional.',
  },
  {
    question: '¿Me rehacéis la tienda online que ya tengo?',
    answer:
      'Sí. Partimos de tu marca, catálogo, fotos y dominio, y montamos el ecommerce de nuevo. No es un parche sobre la tienda vieja.',
  },
  {
    question: '¿El hosting está incluido? ¿Puedo usar mi dominio?',
    answer:
      'Sí a las dos. El dominio es tuyo. Lo configuramos o te ayudamos a registrar uno nuevo. El hosting para publicar lo confirmamos en la propuesta.',
  },
  {
    question: '¿De quién es la tienda online cuando está publicada?',
    answer:
      'Tuya. Te la entregamos funcionando: dominio, móvil, pagos y pedidos. Archivos y accesos a tu nombre. El mantenimiento mensual es opcional.',
  },
  {
    question: '¿Hacéis tiendas online solo en Madrid?',
    answer:
      'Estudio en Madrid; montamos ecommerce en remoto para negocios de toda España. Si estás en Madrid, también podemos vernos.',
  },
];

const includes = [
  {
    title: 'Catálogo y fichas de producto',
    description:
      'Estructura del catálogo, variantes, fotos y textos. El cliente tiene que entender qué compra sin pedir ayuda.',
  },
  {
    title: 'Carrito y proceso de compra',
    description:
      'Un checkout claro en el móvil. Si el proceso de compra es largo o confuso, se pierden pedidos.',
  },
  {
    title: 'Pasarelas de pago',
    description:
      'Redsys, Stripe, PayPal, Bizum u otras. Lo cerramos según cómo cobras hoy, no según lo que nos convenga a nosotros.',
  },
  {
    title: 'Envíos y gastos de envío',
    description:
      'Zonas, tarifas y mensajes claros antes de pagar. Menos abandonos en el carrito.',
  },
  {
    title: 'Tienda online responsive',
    description:
      'El ecommerce se usa bien con el pulgar. La mayor parte de las ventas empiezan o acaban en el teléfono.',
  },
  {
    title: 'Panel para pedidos y stock',
    description:
      'Gestionas productos, pedidos y fotos. Si no quieres tocarla, el mantenimiento es opcional.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Cuentas qué vendes',
    description:
      'Catálogo, cómo cobras, cómo envías y si ya tienes tienda online. Con eso se puede presupuestar un ecommerce.',
  },
  {
    number: '2',
    title: 'Presupuesto de tienda online',
    description:
      'En 24–48 h laborables te mandamos qué entra, cuánto sale y cuándo está. Sin pagar por pedir precio.',
  },
  {
    number: '3',
    title: 'Diseño y desarrollo del ecommerce',
    description:
      'Montamos catálogo, pagos y envíos con tu marca. Tú revisas. Corregimos antes de publicar.',
  },
  {
    number: '4',
    title: 'Publicación',
    description:
      'La tienda online sale con tu dominio, en móvil y lista para cobrar. Accesos a tu nombre.',
  },
];

const audiences = [
  {
    icon: Package,
    title: 'Marcas que empiezan a vender online',
    description:
      'Crear una tienda online desde cero: catálogo, pagos y envíos, sin hinchar el proyecto.',
  },
  {
    icon: RefreshCw,
    title: 'Ecommerce que hay que rehacer',
    description:
      'Si la tienda actual es lenta, no cobra bien o no se usa en el móvil, la montamos de nuevo.',
  },
  {
    icon: CreditCard,
    title: 'Negocios con tienda física',
    description:
      'Pasar el catálogo a una tienda online profesional, con los pagos y envíos que ya usas.',
  },
  {
    icon: Smartphone,
    title: 'Ventas desde el móvil',
    description:
      'Si la mayoría de tus clientes compran con el teléfono, el diseño de la tienda online parte de ahí.',
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
        title='Diseño de tiendas online y ecommerce'
        description='Creamos tiendas online para vender: catálogo, pagos, envíos y móvil. WooCommerce, Shopify o a medida, según el caso. Estudio en Madrid, proyectos en toda España. Precio y plazos por escrito.'
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
        label='ECOMMERCE A MEDIDA'
        title='Diseño y desarrollo de tiendas online, con quien las monta'
        paragraphs={[
          '36web es un estudio en Madrid con más de 12 años montando tiendas online para marcas y negocios de toda España. No hay un comercial que luego desaparece: hablas con el equipo que diseña y desarrolla el ecommerce.',
          'Una tienda online lenta o un checkout confuso te cuesta pedidos. Por eso el diseño de tienda online aquí es claro, rápido y queda listo para cobrar con tu dominio.',
        ]}
        imageSrc='/img/portfolio/mock-chicxs.png'
        imageAlt='Mock de tienda online de Chicxs de la Calle'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <ServiceIncludes
        title='Qué incluye crear una tienda online'
        intro='Esto es lo que entra en un ecommerce típico. El alcance exacto —WooCommerce, Shopify o a medida— va en la propuesta.'
        items={includes}
      />

      <TextImage
        label='WOOCOMMERCE, SHOPIFY O A MEDIDA'
        title='WooCommerce, Shopify o ecommerce a medida'
        paragraphs={[
          'WooCommerce encaja si ya estás en WordPress o quieres controlar catálogo y contenidos en el mismo sitio. Shopify encaja si priorizas un panel sencillo y un ecosistema de apps. El desarrollo a medida entra cuando el proceso de compra no cabe en una tienda estándar.',
          'En la propuesta te decimos qué plataforma usamos y por qué. Sin venderte lo más caro por sistema. Montar una tienda online no es copiar una plantilla y subir productos.',
          <>
            Si no vendes productos y lo que necesitas es una página de empresa
            para que te escriban, mira el{' '}
            <a href={SITE_WEB_PATH} className='font-bold text-link underline'>
              diseño web a medida
            </a>
            . No es el mismo proyecto.
          </>,
        ]}
        imageSrc='/img/portfolio/mock-camisetas.png'
        imageAlt='Mock de tienda online de Camisetas Ahora'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <SEOBenefits
        title='Para quién es esta tienda online'
        subtitle='Ecommerce para marcas y negocios que necesitan vender online con un proceso de compra claro.'
        benefits={audiences}
      />

      <SEOProcess
        title='Cómo se contrata una tienda online'
        subtitle='Cuatro pasos. Sabes precio y plazos antes de pagar. El ecommerce queda a tu nombre.'
        steps={processSteps}
        imageSrc='/img/sumup-ShB9pI4mpRg-unsplash.jpg'
        imageAlt='Proceso de diseño y desarrollo de una tienda online'
      />

      <TextImage
        label='PRESUPUESTO'
        title='Precio de una tienda online profesional'
        paragraphs={[
          'El presupuesto de un ecommerce depende del número de productos, pasarelas, envíos, idiomas y si hay que migrar una tienda antigua.',
          'No publicamos un precio único porque no sería cierto. En 24–48 h laborables te mandamos un número concreto, con lo que entra y el plazo. Pedir presupuesto de tienda online es gratis y no te compromete.',
          'El 50% se paga al aceptar y arrancar. El resto, al publicar. Hosting para empezar y dominio tuyo. El mantenimiento mensual, si lo quieres, es aparte.',
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
        label='EQUIPO DE TIENDAS ONLINE'
        title='El ecommerce lo montamos nosotros'
        paragraphs={[
          'Diseño de tienda online, desarrollo y publicación. Hablas con el equipo. Un ecommerce lento o confuso te cuesta ventas; por eso lo hacemos claro, rápido y listo para cobrar.',
        ]}
      />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='Preguntas frecuentes sobre tiendas online'
          faqs={faqs}
          ctaText='PEDIR PROPUESTA'
          ctaHref='#contacto'
        />
      </div>

      <TextImage
        label='TAMBIÉN HACEMOS'
        title='¿Necesitas una página web, no una tienda?'
        paragraphs={[
          'Si no vendes productos y lo que quieres es una web de empresa para que te escriban, el servicio es otro.',
        ]}
        imageSrc='/img/portfolio/mock-carper.png'
        imageAlt='Mock de página web de Carper Sonido'
        buttonText='VER DISEÑO WEB'
        buttonHref={SITE_WEB_PATH}
      />

      <HeroCta
        title='Pide presupuesto de tienda online'
        description='Cuéntanos qué vendes y qué tiene que hacer el ecommerce. Te devolvemos propuesta en 24–48 h, con precio y plazos. Si no encaja, lo dices y no pasa nada.'
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
