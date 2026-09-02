import { useMemo } from 'react';
import HeroCta from '../components/HeroCta';
import { TextImage } from '../components/TextImage';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import { Team } from '../components/Team';
import SEOFAQ from '../components/SEOFAQ';
import SEOProcess from '../components/SEOProcess';
import SEOBenefits from '../components/SEOBenefits';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { SITE_SHOP_PATH, SITE_WEB_PATH } from '../config/contact';
import { Briefcase, Building2, RefreshCw } from 'lucide-react';

const SITE_URL = 'https://36web.es';

const faqs = [
  {
    question: '¿Cuánto cuesta una página web profesional?',
    answer:
      'El precio de una página web depende del alcance. Orientación: muchas webs a medida quedan entre 600 € y 3.000 € + IVA. Tras hablar te mandamos un presupuesto concreto, con lo que entra y el plazo.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'El plazo va por escrito en la propuesta. Una página web de negocio suele estar en 3 a 8 semanas cuando tenemos textos y fotos. Cuenta desde el arranque pagado, no desde el primer contacto.',
  },
  {
    question: '¿Qué incluye?',
    answer:
      'Diseño de la página web, estructura, versión móvil, Formulario y WhatsApp, base de SEO técnico, editor de contenidos y publicación con tu dominio. Hosting para arrancar. Precio y plazos van por escrito en la propuesta, antes de cobrar nada.',
  },
  {
    question: '¿WordPress o desarrollo a medida?',
    answer:
      'Lo que pida el caso. WordPress si encaja; desarrollo a medida u otra base si hace falta. Te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
  },
  {
    question: '¿Puedo editarla después?',
    answer:
      'Sí. Te dejamos un panel sencillo para textos, fotos y cambios de día a día. Si prefieres no tocarla, el mantenimiento web mensual es opcional.',
  },
  {
    question: '¿Rediseñáis webs existentes?',
    answer:
      'Sí. Partimos de tu marca, textos, fotos y dominio, y montamos la nueva página web. No es un parche sobre la vieja.',
  },
  {
    question: '¿El hosting y dominio están incluidos?',
    answer:
      'Sí a las dos. El dominio es tuyo. Lo configuramos o te ayudamos a registrar uno nuevo. El hosting para publicar lo confirmamos en la propuesta.',
  },
  {
    question: '¿De quién es la web?',
    answer:
      'Tuya. Te la entregamos funcionando: dominio, móvil, Formulario y WhatsApp. Archivos y accesos a tu nombre. El mantenimiento mensual es opcional.',
  },
];

const includes = [
  {
    title: 'Diseño web a medida',
    description: (
      <>
        Estructura, textos y estilo pensados para tu proyecto.{' '}
        <strong className='font-extrabold'>
          No reutilizamos diseños entre clientes
        </strong>
        . Cada página web es diferente.
      </>
    ),
  },
  {
    title: 'Página web responsive',
    description: (
      <>
        Tu página web se verá bien en móvil, tablet y ordenador. Hoy en día{' '}
        <strong className='font-extrabold'>
          más del 80% de las visitas vienen de un smartphone
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Imágenes y textos',
    description: (
      <>
        Tu logo oficial, textos personalizados e imágenes profesionales. Si no
        cuentas con ello, nuestro departamento de{' '}
        <strong className='font-extrabold'>diseño gráfico y copywriting</strong>{' '}
        puede encargarse de crearlos. Consúltanos.
      </>
    ),
  },
  {
    title: 'Todas las secciones que necesites',
    description: (
      <>
        Páginas web escalables.{' '}
        <strong className='font-extrabold'>
          No hay límite de secciones ni contenidos
        </strong>
        . Tenemos en cuenta que tu negocio puede crecer y añadir servicios o
        departamentos, sin necesidad de crear una nueva página web.
      </>
    ),
  },
  {
    title: 'Formulario, WhatsApp o chat',
    description: (
      <>
        Un formulario de contacto con los campos necesarios para que puedan
        escribirte desde la web y un botón de{' '}
        <strong className='font-extrabold'>WhatsApp</strong> para que no pierdas
        ningún cliente.
      </>
    ),
  },
  {
    title: 'Posicionamiento SEO base',
    description: (
      <>
        Títulos, encabezados, descripciones y URLs limpias. Una página web lenta
        o mal marcada no le gusta a Google: no se posiciona. Ofrecemos{' '}
        <strong className='font-extrabold'>SEO continuo</strong>. Consúltanos.
      </>
    ),
  },
  {
    title: 'Hosting, dominio y publicación',
    description: (
      <>
        Incluimos{' '}
        <strong className='font-extrabold'>
          un año de hosting, dominio y publicación
        </strong>
        . La web siempre estará a tu nombre y podrás llevarla al hosting que tú
        quieras.
      </>
    ),
  },
  {
    title: 'Editor de contenidos',
    description: (
      <>
        Podrás cambiar cualquier imagen, texto o estilo de la página web.
        Nosotros te enseñamos. Si no, puedes contratar un mantenimiento con
        nosotros por{' '}
        <strong className='font-extrabold'>
          un 35% menos que el precio al público
        </strong>
        .
      </>
    ),
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas tu proyecto',
    description: (
      <>
        En esta charla inicial nos hablas de tu proyecto, tus necesidades y tu
        presupuesto para poder hacerte{' '}
        <strong className='font-extrabold'>la mejor propuesta posible</strong>.
      </>
    ),
  },
  {
    number: '2',
    title: 'El mismo día te enviamos la propuesta',
    description: (
      <>
        Con toda la info que nos has dado, estudiamos tu caso y preparamos un{' '}
        <strong className='font-extrabold'>presupuesto cerrado</strong> donde te
        explicamos todo lo que entra.
      </>
    ),
  },
  {
    number: '3',
    title: 'Empezamos a diseñar tu página web',
    description: (
      <>
        Cuando aceptas la propuesta, empiezas a trabajar{' '}
        <strong className='font-extrabold'>
          directamente con quien diseña y desarrolla tu proyecto
        </strong>
        .
      </>
    ),
  },
  {
    number: '4',
    title: 'Tu página publicada',
    description: (
      <>
        Tras las revisiones necesarias por tu parte y la confirmación de que
        todo está a tu gusto,{' '}
        <strong className='font-extrabold'>
          publicamos la página web y la ponemos en marcha
        </strong>
        . Ya tienes tu página web.
      </>
    ),
  },
];

const audiences = [
  {
    icon: Briefcase,
    title: 'Trabajadores autónomos',
    description: (
      <>
        Una página web profesional para que te encuentren, ofrezcas tus
        servicios, <strong className='font-extrabold'>captes clientes</strong> y
        des una buena imagen.
      </>
    ),
  },
  {
    icon: Building2,
    title: 'Pequeñas y medianas empresas',
    description: (
      <>
        Páginas web con servicios, clientes, un portfolio de trabajos,{' '}
        <strong className='font-extrabold'>
          área privada para clientes y empleados
        </strong>{' '}
        y mucho más.
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: 'Empresas que ya tienen web',
    description: (
      <>
        Si tu web actual es lenta o no obtiene suficientes visitas, el diseño
        puede estar obsoleto.{' '}
        <strong className='font-extrabold'>Realizamos rediseños</strong>. Puedes
        ver nuestro portfolio.
      </>
    ),
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

  useJsonLd('jsonld-diseno-web', jsonLd);

  return (
    <>
      <HeroCta
        title='Una página web con todo lo necesario para captar nuevos clientes'
        description={
          <>
            Diseñamos páginas web claras, rápidas y pensadas para{' '}
            <strong className='font-extrabold'>
              convertir visitas en clientes
            </strong>
            . Todo lo necesario para que puedas empezar a trabajar{' '}
            <strong className='font-extrabold'>desde el primer día</strong>.
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/img/hero/hero-diseno-web-36web.webp'
        heroType='form'
        hasButton={false}
        formTitle='Presupuesto de diseño web'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='DisenoWeb Hero'
        hasBackground
        grayscale
        overlay='black'
        hasReviewBadge
        isTopHero
      />

      <TextImage
        label='¿Por qué una página con 36web?'
        title='Diseñamos páginas web pensadas para conseguir resultados.'
        paragraphs={[
          <>
            Llevamos mucho tiempo en esto y tenemos las claves para que tu web{' '}
            <strong className='font-extrabold'>
              le guste tanto a Google como a tus clientes
            </strong>
            . Por eso te ofrecemos una página que{' '}
            <strong className='font-extrabold'>
              cargue rápido, pese poco y sea sencilla de entender
            </strong>
            .
          </>,
          <>
            Tendremos muy en cuenta{' '}
            <strong className='font-extrabold'>
              tus necesidades y presupuesto
            </strong>{' '}
            a la hora de elegir las tecnologías para diseñar tu página web.
            Podemos crearte una web original y sencilla con 3 o 4 secciones, o
            una web con funcionalidades complejas (citas, reservas, calendario,
            mensajería automática, etc.). Siempre vamos a aconsejarte{' '}
            <strong className='font-extrabold'>
              lo mejor para ti, no lo más caro
            </strong>
            .
          </>,
        ]}
        imageSrc='/img/portfolio/mock-carper.webp'
        imageAlt='Mock de página web de Carper Sonido'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <ServiceIncludes
        title='Qué incluimos en el diseño de tu página web'
        intro={
          <>
            Esta es la base de todas nuestras páginas web. Todo el resto irá
            especificado en la propuesta final.{' '}
            <strong className='font-extrabold'>Sin sorpresas.</strong>
          </>
        }
        items={includes}
      />

      <TextImage
        label='DISEÑO WEB CON WORDPRESS'
        title='Diseño de páginas web con WordPress'
        paragraphs={[
          <>
            Contamos con expertos en{' '}
            <strong className='font-extrabold'>WordPress</strong> y sus
            lenguajes de programación.
          </>,
          <>
            Entendemos que WordPress puede ser una solución{' '}
            <strong className='font-extrabold'>rápida y potente</strong> a la
            hora de crear una página web, sobre todo para quien ya conoce su
            ecosistema y su panel de control.
          </>,
          <>
            Trabajamos con WordPress cuando es{' '}
            <strong className='font-extrabold'>
              la opción que mejor encaja con el proyecto
            </strong>
            . Podemos partir de un diseño propio o personalizar una base
            existente, siempre adaptándola a tu marca y necesidades.
          </>,

          <>
            Si lo que necesitas es un catálogo de productos con pasarela de pago
            y envíos, te ofrecemos una{' '}
            <a href={SITE_SHOP_PATH} className='font-bold text-link underline'>
              tienda online profesional
            </a>
            .
          </>,
        ]}
        imageSrc='/img/portfolio/mock-viajamos.webp'
        imageAlt='Mock de página web de Hoy Viajamos'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <SEOBenefits
        title='Una página web distinta según lo que necesite tu negocio.'
        subtitle={
          <>
            Hacemos páginas web para{' '}
            <strong className='font-extrabold'>trabajadores autónomos</strong>,{' '}
            <strong className='font-extrabold'>
              pequeñas y medianas empresas
            </strong>
            , equipos deportivos, asociaciones de todo tipo y mucho más.
          </>
        }
        benefits={audiences}
      />

      <SEOProcess
        title='Cómo es el proceso de contratación'
        subtitle={
          <>
            <strong className='font-extrabold'>Cuatro sencillos pasos.</strong>{' '}
            Nos dejas tus datos, charlamos y nos cuentas tu proyecto. Te pasamos
            una propuesta personalizada. Aceptas y empezamos a trabajar.
          </>
        }
        steps={processSteps}
      />

      <TextImage
        label='DISEÑO WEB A MEDIDA'
        title='Diseño de páginas web a medida'
        paragraphs={[
          <>
            <strong className='font-extrabold'>
              No tenemos un pack cerrado
            </strong>{' '}
            de diseño web. El presupuesto depende de{' '}
            <strong className='font-extrabold'>
              páginas, contenidos, idioma y las horas de dedicación
            </strong>
            .
          </>,
          <>
            Muchas páginas web a medida quedan entre{' '}
            <strong className='font-extrabold'>600 € y 3.000 € + IVA</strong>,
            según las necesidades del proyecto y su complejidad.
          </>,
          <>
            En 36web recomendamos empezar por{' '}
            <strong className='font-extrabold'>
              lo que realmente necesitas
            </strong>{' '}
            e ir escalando según{' '}
            <strong className='font-extrabold'>tu negocio va creciendo</strong>.
          </>,
        ]}
        imageSrc='/img/portfolio/hatena-mock.webp'
        imageAlt='Mock de página web de Clínica Veterinaria Hatena'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <Portfolio variant='web' contained />
      <Testimonials />
      <Team
        label='CONOCE A TU FUTURO EQUIPO DE DISEÑO WEB'
        title='Trato directo durante todo el proyecto.'
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
        title='¿Necesitas una tienda online?'
        paragraphs={[
          <>
            Si vendes productos, el proyecto es un{' '}
            <strong className='font-extrabold'>ecommerce</strong>: catálogo,
            pagos y envíos.{' '}
            <strong className='font-extrabold'>
              No es lo mismo que una página web de empresa
            </strong>
            .
          </>,
        ]}
        imageSrc='/img/portfolio/mock-chicxs.webp'
        imageAlt='Mock de tienda online de Chicxs de la Calle'
        buttonText='VER TIENDAS ONLINE'
        buttonHref={SITE_SHOP_PATH}
      />

      <HeroCta
        title='Pide presupuesto de diseño web'
        description={
          <>
            Cuéntanos qué haces y qué tiene que hacer la página. Te devolvemos{' '}
            <strong className='font-extrabold'>propuesta</strong>{' '}
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
        formTitle='Presupuesto de diseño web'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='DisenoWeb CTA final'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default DisenoWeb;
