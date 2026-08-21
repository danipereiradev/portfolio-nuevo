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
import { Briefcase, Building2, RefreshCw, Store } from 'lucide-react';

const SITE_URL = 'https://pereiraweb.es';

const faqs = [
  {
    question: '¿Qué incluye un proyecto de diseño web?',
    answer:
      'Diseño de la página web, estructura, versión móvil, formulario o WhatsApp, base de SEO técnico y publicación con tu dominio. Hosting para arrancar. Precio y plazos van por escrito en la propuesta, antes de cobrar nada.',
  },
  {
    question: '¿Cuánto cuesta una página web profesional?',
    answer:
      'El precio de una página web depende del alcance. Orientación: muchas webs a medida quedan entre 400 € y 3.000 € + IVA. Tras hablar te mandamos un presupuesto concreto, con lo que entra y el plazo.',
  },
  {
    question: '¿Hay que pagar para pedir presupuesto de diseño web?',
    answer:
      'No. Primero hablamos, te mandamos la propuesta en 24–48 h laborables y decides. El 50% se paga al aceptar y arrancar; el resto, al publicar.',
  },
  {
    question: '¿Cuánto tarda el diseño y desarrollo de una web?',
    answer:
      'El plazo va por escrito en la propuesta. Una página web de negocio suele estar en 3 a 8 semanas cuando tenemos textos y fotos. Cuenta desde el arranque pagado, no desde el primer contacto.',
  },
  {
    question: '¿Hacéis diseño web a medida o usáis plantillas?',
    answer:
      'Diseño web a medida. Se adapta a tu marca, textos y fotos. Si solo quieres una plantilla barata igual para todos, hay sitios mejores para eso.',
  },
  {
    question: '¿Montáis WordPress o desarrollo a medida?',
    answer:
      'Lo que pida el caso. WordPress si encaja; desarrollo a medida u otra base si hace falta. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
  },
  {
    question: '¿La página web es responsive y se ve bien en el móvil?',
    answer:
      'Sí. La revisamos en móvil, tablet y escritorio antes de publicar. Una web que no se lee en el teléfono te cuesta consultas.',
  },
  {
    question: '¿Incluís SEO en el diseño web?',
    answer:
      'Incluimos una base de SEO on-page: títulos, encabezados, URLs limpias cuando aplica y que la página cargue. El posicionamiento mes a mes no va en el precio de la web; si lo quieres, lo valoramos aparte.',
  },
  {
    question: '¿Puedo editar la web yo después?',
    answer:
      'Sí. Te dejamos un panel sencillo para textos, fotos y cambios de día a día. Si prefieres no tocarla, el mantenimiento web mensual es opcional.',
  },
  {
    question: '¿Rediseñáis una web antigua?',
    answer:
      'Sí. Partimos de tu marca, textos, fotos y dominio, y montamos la nueva página web. No es un parche sobre la vieja.',
  },
  {
    question: '¿El hosting está incluido? ¿Puedo usar mi dominio?',
    answer:
      'Sí a las dos. El dominio es tuyo. Lo configuramos o te ayudamos a registrar uno nuevo. El hosting para publicar lo confirmamos en la propuesta.',
  },
  {
    question: '¿De quién es la web cuando está online?',
    answer:
      'Tuya. Te la entregamos funcionando: dominio, móvil, formulario o WhatsApp. Archivos y accesos a tu nombre. El mantenimiento mensual es opcional.',
  },
  {
    question: '¿Sois una agencia de diseño web solo de Madrid?',
    answer:
      'Estudio de diseño web en Madrid; trabajamos en remoto con autónomos y empresas de toda España. Si estás en Madrid, también podemos vernos.',
  },
];

const includes = [
  {
    title: 'Diseño web a medida',
    description:
      'Estructura, textos y aspecto pensados para tu negocio. No reutilizamos la misma plantilla para todos los clientes.',
  },
  {
    title: 'Página web responsive',
    description:
      'Se lee y se usa bien en el móvil, la tablet y el ordenador. La mayor parte de las visitas llegan del teléfono.',
  },
  {
    title: 'Formulario o WhatsApp',
    description:
      'La web tiene que servir para que te escriban. Dejamos el contacto a la vista, sin rodeos.',
  },
  {
    title: 'SEO on-page de base',
    description:
      'Títulos, encabezados, meta description y URLs limpias. Una página web lenta o mal marcada no posiciona.',
  },
  {
    title: 'Dominio y publicación',
    description:
      'Publicamos con tu dominio. El hosting para arrancar lo confirmamos en la propuesta. La web queda a tu nombre.',
  },
  {
    title: 'Panel para editar',
    description:
      'Puedes cambiar textos y fotos sin pedir cita. Si no quieres tocarla, el mantenimiento es opcional.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Cuentas el caso',
    description:
      'Qué haces, a quién te diriges y qué tiene que hacer la página web: consultas, citas, marca o información.',
  },
  {
    number: '2',
    title: 'Presupuesto de diseño web',
    description:
      'En 24–48 h laborables te mandamos qué entra, cuánto sale y cuándo está. Sin pagar por pedir precio.',
  },
  {
    number: '3',
    title: 'Diseño y desarrollo',
    description:
      'Montamos la web con tu marca, textos y fotos. Tú revisas. Corregimos antes de publicar.',
  },
  {
    number: '4',
    title: 'Publicación',
    description:
      'La página web sale con tu dominio, en móvil y con formulario o WhatsApp. Accesos a tu nombre.',
  },
];

const audiences = [
  {
    icon: Briefcase,
    title: 'Autónomos',
    description:
      'Una página web profesional para que te encuentren y te escriban, sin un departamento de marketing.',
  },
  {
    icon: Building2,
    title: 'Pymes y empresas',
    description:
      'Diseño de páginas web de empresa: servicios, equipo, casos y un contacto que se usa de verdad.',
  },
  {
    icon: RefreshCw,
    title: 'Rediseño web',
    description:
      'Si la web actual es lenta, antigua o no se ve en el móvil, la hacemos de nuevo. No la parcheamos.',
  },
  {
    icon: Store,
    title: 'Negocios en toda España',
    description:
      'Estudio en Madrid y trabajo en remoto. Da igual la ciudad: el proceso es el mismo.',
  },
];

const DisenoWeb = () => {
  usePageMeta(SITE_WEB_PATH);

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
              name: 'Diseño web',
              item: `${SITE_URL}${SITE_WEB_PATH}/`,
            },
          ],
        },
        {
          '@type': 'Service',
          name: 'Diseño web a medida',
          serviceType: 'Diseño web',
          description:
            'Diseño y desarrollo de páginas web a medida para autónomos y empresas en España.',
          url: `${SITE_URL}${SITE_WEB_PATH}/`,
          areaServed: { '@type': 'Country', name: 'España' },
          provider: {
            '@type': 'ProfessionalService',
            name: 'PereiraWeb',
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

  useJsonLd('jsonld-diseno-web', jsonLd);

  return (
    <>
      <HeroCta
          title='Diseño web a medida para empresas y autónomos'
          description='Diseño de páginas web profesionales: claras, rápidas y hechas para que te escriban. Estudio en Madrid, proyectos en toda España. Precio y plazos por escrito antes de empezar.'
          buttonText='PEDIR PROPUESTA'
          buttonHref='#contacto'
          backgroundUrl='/img/web-design-charlesdeluvio.webp'
          heroType='form'
          hasButton={false}
          formTitle='Presupuesto de diseño web'
          formDescription='Propuesta en 24–48 h. Sin compromiso.'
          formSectionInfo='DisenoWeb Hero'
          hasBackground
          hasReviewBadge
          isTopHero
          breadcrumb={
            <ServiceBreadcrumb
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Diseño web' },
              ]}
            />
          }
        />

      <TextImage
        label='ESTUDIO DE DISEÑO WEB'
        title='Diseño y desarrollo web, con quien monta la página'
        paragraphs={[
          'PereiraWeb es un estudio de diseño web en Madrid. Más de 12 años haciendo páginas web para autónomos, pymes y empresas de toda España. No hay un comercial que luego desaparece: hablas con el equipo que diseña y desarrolla.',
          'Una página web lenta, confusa o que no se ve en el móvil te cuesta clientes. Por eso el diseño web a medida aquí es claro, rápido y se publica con tu dominio.',
        ]}
        imageSrc='/img/portfolio/mock-carper.png'
        imageAlt='Mock de página web de Carper Sonido'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <ServiceIncludes
        title='Qué incluye el diseño de una página web'
        intro='Esto es lo que entra en un proyecto de diseño web típico. El detalle exacto va en la propuesta, según el caso.'
        items={includes}
      />

      <TextImage
        label='WORDPRESS O A MEDIDA'
        title='Diseño web a medida, WordPress o desarrollo'
        paragraphs={[
          'No hay una única forma correcta de hacer una página web. WordPress encaja cuando quieres editar contenido con facilidad. El desarrollo a medida entra cuando la web tiene que hacer algo que una plantilla no resuelve bien.',
          'En la propuesta te decimos qué base usamos y por qué. Sin venderte lo más caro por sistema. Si lo que necesitas es una plantilla genérica a bajo precio, este no es el servicio.',
          <>
            Si lo que quieres es vender productos con catálogo, pagos y envíos,
            eso es una{' '}
            <a href={SITE_SHOP_PATH} className='font-bold text-link underline'>
              tienda online
            </a>
            , no una web corporativa. Lo vemos en la conversación.
          </>,
        ]}
        imageSrc='/img/portfolio/mock-viajamos.png'
        imageAlt='Mock de página web de Hoy Viajamos'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <SEOBenefits
        variant='plain'
        title='Para quién es este diseño web'
        subtitle='Páginas web para autónomos y empresas que necesitan verse profesionales y recibir consultas.'
        benefits={audiences}
      />

      <SEOProcess
        title='Cómo se contrata el diseño web'
        subtitle='Cuatro pasos. Sabes precio y plazos antes de pagar. La página web queda a tu nombre.'
        steps={processSteps}
        imageSrc='/img/fikret-tozak-rfNLa1HL7eY-unsplash.jpg'
        imageAlt='Proceso de diseño y desarrollo de una página web'
      />

      <TextImage
        label='PRESUPUESTO'
        title='Precio de una página web profesional'
        paragraphs={[
          'No hay un pack cerrado de diseño web. El presupuesto depende de páginas, contenidos, idioma y si hay que migrar una web antigua.',
          'Orientación: muchas páginas web a medida quedan entre 400 € y 3.000 € + IVA. En 24–48 h laborables te mandamos un número concreto, con lo que entra y el plazo. Pedir presupuesto de diseño web es gratis y no te compromete.',
          'El 50% se paga al aceptar y arrancar. El resto, al publicar. Hosting para empezar y dominio tuyo. El mantenimiento mensual, si lo quieres, es aparte.',
        ]}
        imageSrc='/img/portfolio/mock-delish.png'
        imageAlt='Mock de página web profesional'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <Portfolio contained />
      <Testimonials />
      <Team
        label='EQUIPO DE DISEÑO WEB'
        title='La página web la montamos nosotros'
        paragraphs={[
          'Diseño web, desarrollo y publicación. Hablas con el equipo, no con un comercial. Una web lenta o confusa te cuesta clientes; por eso la hacemos clara, rápida y lista para que te escriban.',
        ]}
      />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='Preguntas frecuentes sobre diseño web'
          faqs={faqs}
          ctaText='PEDIR PROPUESTA'
          ctaHref='#contacto'
        />
      </div>

      <TextImage
        label='TAMBIÉN HACEMOS'
        title='¿Necesitas una tienda online?'
        paragraphs={[
          'Si vendes productos, el proyecto es un ecommerce: catálogo, pagos y envíos. No es lo mismo que una página web de empresa.',
        ]}
        imageSrc='/img/portfolio/mock-chicxs.png'
        imageAlt='Mock de tienda online de Chicxs de la Calle'
        buttonText='VER TIENDAS ONLINE'
        buttonHref={SITE_SHOP_PATH}
      />

      <HeroCta
        title='Pide presupuesto de diseño web'
        description='Cuéntanos qué haces y qué tiene que hacer la página. Te devolvemos propuesta en 24–48 h, con precio y plazos. Si no encaja, lo dices y no pasa nada.'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Presupuesto de diseño web'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='DisenoWeb CTA final'
        hasBackground={false}
        hasReviewBadge
        formId='contacto-final'
      />
    </>
  );
};

export default DisenoWeb;
