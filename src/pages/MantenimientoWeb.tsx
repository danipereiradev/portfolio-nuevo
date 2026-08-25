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
import { SITE_MAINTENANCE_PATH, SITE_WEB_PATH } from '../config/contact';
import { Headphones, ShieldCheck, Wrench } from 'lucide-react';

const SITE_URL = 'https://36web.es';

const maintenanceProjectTypes = [
  'La web la hicisteis vosotros',
  'La web la hizo otro',
  'Todavía no lo tengo claro',
] as const;

const faqs = [
  {
    question: '¿Cuánto cuesta el mantenimiento web?',
    answer:
      'El mantenimiento es una cuota mensual. Orientación: muchos planes quedan entre 60 € y 100 € + IVA al mes. Tras hablar te mandamos un presupuesto concreto, con lo que entra y desde cuándo.',
  },
  {
    question: '¿Cuándo arranca?',
    answer:
      'Primero hablamos y te mandamos la propuesta en 24–48 h laborables. Si encaja, activamos el plan. No hay que pagar para pedir precio.',
  },
  {
    question: '¿Qué incluye?',
    answer:
      'Actualizaciones, copias, que la web siga online, cambios pequeños de textos y fotos, y soporte cuando algo falla. El detalle de cada plan va por escrito en la propuesta, antes de cobrar nada.',
  },
  {
    question: '¿Mantenéis WordPress, tiendas y webs a medida?',
    answer:
      'Sí. WordPress, WooCommerce, Shopify u otra base si encaja. Primero vemos el caso; luego te decimos si podemos cogerla, sin venderte lo más caro por sistema.',
  },
  {
    question: '¿Puedo pedir cambios cada mes?',
    answer:
      'Sí. Entran los cambios pequeños del plan: un texto, una foto, un teléfono, un horario. Páginas nuevas o un rediseño van aparte, con precio antes de hacerlos.',
  },
  {
    question: '¿Mantenéis webs que no hicisteis vosotros?',
    answer:
      'Sí, en muchos casos. Primero miramos cómo está: hosting, actualizaciones, plugins, copias. Si tiene sentido, te lo decimos. Si es un pozo, también.',
  },
  {
    question: '¿El hosting y el dominio están incluidos?',
    answer:
      'Depende del plan. El dominio es tuyo. Si el hosting entra o lo gestionamos en tu cuenta, lo aclaramos en la propuesta.',
  },
  {
    question: '¿Qué pasa si cancelo? ¿De quién es la web?',
    answer:
      'La web es tuya. Si cancelas, no se apaga. Te dejamos accesos y copias. A partir de ahí, las actualizaciones y el soporte corren de tu cuenta. El mantenimiento no es obligatorio.',
  },
];

const includes = [
  {
    title: 'Actualizaciones de seguridad',
    description: (
      <>
        CMS, plugins y lo que toque para que no se quede desfasada.{' '}
        <strong className='font-extrabold'>
          Una web sin actualizar es un problema esperando
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Copias periódicas',
    description: (
      <>
        Por si un día falla un plugin, un hackeo o un clic de más.{' '}
        <strong className='font-extrabold'>
          Poder volver atrás no es un lujo
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Que siga online',
    description: (
      <>
        Revisamos que carga, que el certificado no caduca y que el formulario o
        el WhatsApp siguen mandando.{' '}
        <strong className='font-extrabold'>
          Una web caída te cuesta clientes
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Cambios pequeños',
    description: (
      <>
        Textos, fotos, un teléfono, un horario.{' '}
        <strong className='font-extrabold'>
          Lo de día a día, sin abrir un proyecto nuevo cada vez
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Soporte cuando falla algo',
    description: (
      <>
        WhatsApp, correo o el chat, en horario laboral.{' '}
        <strong className='font-extrabold'>
          Te atiende quien conoce la web, no un ticket que da vueltas
        </strong>
        .
      </>
    ),
  },
  {
    title: 'Resumen de lo hecho',
    description: (
      <>
        Al mes te contamos qué se actualizó, qué se cambió y si hubo algún
        susto.{' '}
        <strong className='font-extrabold'>Sin jerga innecesaria</strong>.
      </>
    ),
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas tu web',
    description: (
      <>
        En esta charla inicial nos hablas de qué tienes ahora, si la hicimos
        nosotros o no, y qué te preocupa, para poder hacerte{' '}
        <strong className='font-extrabold'>la mejor propuesta posible</strong>.
      </>
    ),
  },
  {
    number: '2',
    title: 'En 24–48 h te enviamos la propuesta',
    description: (
      <>
        Con toda la info que nos has dado, estudiamos tu caso y preparamos un{' '}
        <strong className='font-extrabold'>presupuesto cerrado</strong> con la
        cuota, lo que entra y desde cuándo. Sin pagar por pedir precio.
      </>
    ),
  },
  {
    number: '3',
    title: 'Activamos el mantenimiento',
    description: (
      <>
        Cuando aceptas, miramos hosting, copias y actualizaciones. Empiezas a
        tratar{' '}
        <strong className='font-extrabold'>
          directamente con quien cuida tu web
        </strong>
        . Si hay algo urgente, te lo decimos antes.
      </>
    ),
  },
  {
    number: '4',
    title: 'Mes a mes',
    description: (
      <>
        Actualizamos, copiamos, cambiamos lo del plan y respondemos cuando algo
        falla.{' '}
        <strong className='font-extrabold'>Cancelas cuando quieras</strong>. La
        web sigue siendo tuya.
      </>
    ),
  },
];

const audiences = [
  {
    icon: ShieldCheck,
    title: 'Webs que ya montamos',
    description: (
      <>
        Si la hicimos nosotros, conocemos el código y el hosting.{' '}
        <strong className='font-extrabold'>
          El mantenimiento es la continuación lógica
        </strong>
        .
      </>
    ),
  },
  {
    icon: Wrench,
    title: 'Webs de otros',
    description: (
      <>
        WordPress, tienda o a medida. Primero la miramos.{' '}
        <strong className='font-extrabold'>
          Si se puede mantener bien, te lo decimos; si no, también
        </strong>
        .
      </>
    ),
  },
  {
    icon: Headphones,
    title: 'Alguien a quien escribir',
    description: (
      <>
        Cuando el formulario no llega o la web va lenta, hace falta una persona,
        no un tutorial.{' '}
        <strong className='font-extrabold'>Siempre contestamos</strong>.
      </>
    ),
  },
];

const MantenimientoWeb = () => {
  usePageMeta(SITE_MAINTENANCE_PATH);

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
              name: 'Mantenimiento web',
              item: `${SITE_URL}${SITE_MAINTENANCE_PATH}/`,
            },
          ],
        },
        {
          '@type': 'Service',
          name: 'Mantenimiento web',
          serviceType: 'Mantenimiento web',
          description:
            'Mantenimiento mensual de páginas web y tiendas online: actualizaciones, copias, cambios pequeños y soporte.',
          url: `${SITE_URL}${SITE_MAINTENANCE_PATH}/`,
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

  useJsonLd('jsonld-mantenimiento-web', jsonLd);

  return (
    <>
      <HeroCta
        title='Un mantenimiento web con todo lo necesario para que no se rompa sola'
        description={
          <>
            Actualizaciones, copias, cambios de textos y fotos, y{' '}
            <strong className='font-extrabold'>
              alguien a quien escribir cuando falla algo
            </strong>
            . Cuota mensual, alcance por escrito y puedes cancelar cuando
            quieras.
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/img/justin-morgan-wordpress.jpg'
        heroType='form'
        hasButton={false}
        formTitle='Presupuesto de mantenimiento'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='MantenimientoWeb Hero'
        hasBackground
        hasReviewBadge
        isTopHero
        showProjectType
        projectTypes={maintenanceProjectTypes}
        breadcrumb={
          <ServiceBreadcrumb
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Mantenimiento web' },
            ]}
          />
        }
      />

      <TextImage
        label='¿Por qué el mantenimiento con 36web?'
        title='Cuidamos tu web para que siga online y con alguien al otro lado.'
        paragraphs={[
          <>
            Llevamos mucho tiempo en esto. Una web sin copias, sin actualizar o
            con un formulario muerto te cuesta consultas. Por eso el
            mantenimiento aquí es{' '}
            <strong className='font-extrabold'>
              actualizaciones, copias, cambios pequeños y soporte
            </strong>
            . No un “ya lo miramos”.
          </>,
          <>
            Tendremos muy en cuenta{' '}
            <strong className='font-extrabold'>
              tus necesidades y presupuesto
            </strong>
            . Si la web la montamos nosotros, el plan encaja directo. Si la hizo
            otro, primero la miramos. Siempre vamos a aconsejarte{' '}
            <strong className='font-extrabold'>
              lo mejor para ti, no lo más caro
            </strong>
            .
          </>,
        ]}
        imageSrc='/img/portfolio/silly-sally-mock.webp'
        imageAlt='Mock de página web de Silly Sally'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <ServiceIncludes
        title='Qué incluimos en el mantenimiento de tu web'
        intro={
          <>
            Esta es la base de un plan típico. El detalle exacto —cuántos
            cambios, qué hosting, qué CMS— irá especificado en la propuesta
            final.{' '}
            <strong className='font-extrabold'>Sin sorpresas.</strong>
          </>
        }
        items={includes}
      />

      <TextImage
        label='WEB NUESTRA O DE OTROS'
        title='Mantenemos la que hicimos y, en muchos casos, la que ya tienes'
        paragraphs={[
          <>
            Si la web la montamos nosotros, conocemos el código, el hosting y
            cómo se edita.{' '}
            <strong className='font-extrabold'>El plan encaja directo</strong>.
          </>,
          <>
            Si la hizo otro, primero la miramos. WordPress, tienda o a medida:
            te decimos si se puede mantener bien o si conviene otra cosa.{' '}
            <strong className='font-extrabold'>
              No cogemos un pozo a ciegas
            </strong>
            . Si hay que actualizar 40 plugins o rehacer medio sitio, te lo
            decimos antes de la cuota, no a mitad de mes.
          </>,
          <>
            Además, te atiende{' '}
            <strong className='font-extrabold'>
              quien conoce la web, no un comercial
            </strong>
            .
          </>,
          <>
            Si lo que necesitas no es cuidar la web, sino hacerla de nuevo, mira
            el{' '}
            <a href={SITE_WEB_PATH} className='font-bold text-link underline'>
              diseño web a medida
            </a>
            .{' '}
            <strong className='font-extrabold'>No es el mismo servicio</strong>.
          </>,
        ]}
        imageSrc='/img/portfolio/mock-core.png'
        imageAlt='Mock de página web en mantenimiento'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <SEOBenefits
        title='Un mantenimiento distinto según lo que necesite tu web.'
        subtitle={
          <>
            Hacemos planes mensuales para{' '}
            <strong className='font-extrabold'>webs que ya montamos</strong>,{' '}
            <strong className='font-extrabold'>webs de otros</strong> y para
            quien no quiere pelearse con plugins.
          </>
        }
        benefits={audiences}
      />

      <SEOProcess
        title='Cómo es el proceso de contratación'
        subtitle={
          <>
            <strong className='font-extrabold'>Cuatro sencillos pasos.</strong>{' '}
            Nos dejas tus datos, charlamos y nos cuentas tu web. Te pasamos una
            propuesta personalizada. Aceptas y empezamos a cuidarla.
          </>
        }
        steps={processSteps}
        imageSrc='/img/portfolio/mock-core.png'
        imageAlt='Mock de página web de Core Generator'
      />

      <TextImage
        label='PRESUPUESTO'
        title='Precio del mantenimiento web'
        paragraphs={[
          <>
            <strong className='font-extrabold'>
              No tenemos un pack cerrado
            </strong>
            . La cuota depende del CMS, del hosting, de si hay tienda y de
            cuántos cambios mensuales quieres.
          </>,
          <>
            Muchos planes quedan entre{' '}
            <strong className='font-extrabold'>
              60 € y 100 € + IVA al mes
            </strong>
            . En 24–48 h laborables te mandamos un número concreto, con lo que
            entra y desde cuándo. Pedirlo es gratis y no te compromete.
          </>,
          <>
            El mantenimiento{' '}
            <strong className='font-extrabold'>no es obligatorio</strong>. Si lo
            cancelas, la web no se apaga. En 36web recomendamos el plan que{' '}
            <strong className='font-extrabold'>realmente necesitas</strong>, no
            el más caro.
          </>,
        ]}
        imageSrc='/img/portfolio/mock-delish.png'
        imageAlt='Mock de tienda online de Delish Vegan'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <Portfolio contained />
      <Testimonials />
      <Team
        label='CONOCE A TU FUTURO EQUIPO DE MANTENIMIENTO WEB'
        title='Estas somos las personas que vamos a encargarnos de cuidar tu web.'
        paragraphs={[
          <>
            Queremos que nos pongas caras. Que puedas ver nuestros portfolios y
            contactar con nosotros para lo que necesites:{' '}
            <strong className='font-extrabold'>siempre contestamos</strong>.
            Sobre todo, que sientas{' '}
            <strong className='font-extrabold'>
              seguridad al confiarnos la parte digital de tu negocio
            </strong>
            . Una web caída o un formulario mudo te cuesta clientes; por eso hay{' '}
            <strong className='font-extrabold'>alguien al otro lado</strong>.
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
        title='¿Necesitas una página web nueva, no mantenimiento?'
        paragraphs={[
          <>
            Si la web actual no da más de sí, el servicio es{' '}
            <strong className='font-extrabold'>diseño web a medida</strong>: la
            montamos de nuevo, con tu dominio.{' '}
            <strong className='font-extrabold'>
              No es lo mismo que un plan mensual
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
        title='Pide presupuesto de mantenimiento web'
        description={
          <>
            Cuéntanos qué web tienes y qué te preocupa. Te devolvemos propuesta
            en <strong className='font-extrabold'>24–48 h</strong>, con cuota y
            lo que entra.{' '}
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
        formTitle='Presupuesto de mantenimiento'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='MantenimientoWeb CTA final'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
        showProjectType
        projectTypes={maintenanceProjectTypes}
      />
    </>
  );
};

export default MantenimientoWeb;
