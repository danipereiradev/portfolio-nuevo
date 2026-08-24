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
import { Headphones, RefreshCw, ShieldCheck, Wrench } from 'lucide-react';

const SITE_URL = 'https://pereiraweb.es';

const faqs = [
  {
    question: '¿Qué incluye el mantenimiento web?',
    answer:
      'Actualizaciones, copias, que la web siga online, cambios pequeños de textos y fotos, y soporte cuando algo falla. El detalle de cada plan va en la propuesta, antes de cobrar nada.',
  },
  {
    question: '¿Cuánto cuesta el mantenimiento de una página web?',
    answer:
      'Es una cuota mensual según el tamaño de la web y los cambios que haga falta. No hay un pack único en la web. Tras hablar te mandamos un número concreto. Pedirlo es gratis.',
  },
  {
    question: '¿Hay que pagar para pedir presupuesto de mantenimiento?',
    answer:
      'No. Primero hablamos, te mandamos la propuesta en 24–48 h laborables y decides. Si encaja, arrancamos el plan. Si no, lo dices y no pasa nada.',
  },
  {
    question: '¿Mantenéis webs que no hicisteis vosotros?',
    answer:
      'Sí, en muchos casos. Primero miramos cómo está: hosting, actualizaciones, plugins, copias. Si tiene sentido, te lo decimos. Si es un pozo, también.',
  },
  {
    question: '¿El mantenimiento web es obligatorio?',
    answer:
      'No. Recomendable, pero opcional. Sin él la web sigue siendo tuya y puede seguir online. Dejas de tener actualizaciones, copias, soporte y los cambios del plan.',
  },
  {
    question: '¿Qué pasa si cancelo el mantenimiento?',
    answer:
      'La web no se apaga. Te dejamos accesos y copias. A partir de ahí, las actualizaciones y el soporte corren de tu cuenta.',
  },
  {
    question: '¿Cuántos cambios de textos y fotos entran al mes?',
    answer:
      'Los del plan. Cambios pequeños: un texto, una foto, un teléfono. Páginas nuevas o un rediseño van aparte, con precio antes de hacerlos.',
  },
  {
    question: '¿Mantenéis WordPress, tiendas y webs a medida?',
    answer:
      'Sí. WordPress, WooCommerce, Shopify u otra base si encaja. Primero vemos el caso; luego te decimos si podemos cogerla.',
  },
  {
    question: '¿El hosting y el dominio van incluidos?',
    answer:
      'Depende del plan. El dominio es tuyo. Si el hosting entra o lo gestionamos en tu cuenta, lo aclaramos en la propuesta.',
  },
  {
    question: '¿En cuánto tiempo respondéis si la web se cae?',
    answer:
      'En horario laboral, pronto. No prometemos un SLA de gran corporación. Si está caída, es lo primero. El detalle queda por escrito en el plan.',
  },
  {
    question: '¿Hacéis mantenimiento web solo en Madrid?',
    answer:
      'Estudio en Madrid; mantenemos webs en remoto para negocios de toda España. Si estás en Madrid, también podemos vernos.',
  },
  {
    question: '¿Y si lo que necesito es una web nueva, no mantenimiento?',
    answer:
      'Eso es otro proyecto: diseño web a medida. Lo vemos en la conversación y te decimos si encaja o si hay que plantearlo aparte.',
  },
];

const includes = [
  {
    title: 'Actualizaciones de seguridad',
    description:
      'CMS, plugins y lo que toque para que no se quede desfasada. Una web sin actualizar es un problema esperando.',
  },
  {
    title: 'Copias periódicas',
    description:
      'Por si un día falla un plugin, un hackeo o un clic de más. Poder volver atrás no es un lujo.',
  },
  {
    title: 'Que siga online',
    description:
      'Revisamos que carga, que el certificado no caduca y que el formulario o el WhatsApp siguen mandando.',
  },
  {
    title: 'Cambios pequeños',
    description:
      'Textos, fotos, un teléfono, un horario. Lo de día a día, sin abrir un proyecto nuevo cada vez.',
  },
  {
    title: 'Soporte cuando falla algo',
    description:
      'WhatsApp, correo o el chat. Te atiende quien conoce la web, no un ticket que da vueltas.',
  },
  {
    title: 'Resumen de lo hecho',
    description:
      'Al mes te contamos qué se actualizó, qué se cambió y si hubo algún susto. Sin jerga innecesaria.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Cuentas la web',
    description:
      'Qué tienes ahora, si la hicimos nosotros o no, y qué te preocupa: caídas, copias, cambios, plugins.',
  },
  {
    number: '2',
    title: 'Presupuesto del plan',
    description:
      'En 24–48 h laborables te mandamos qué entra, la cuota y desde cuándo. Sin pagar por pedir precio.',
  },
  {
    number: '3',
    title: 'Activamos el mantenimiento',
    description:
      'Miramos hosting, copias y actualizaciones. Te decimos si hay algo urgente antes de dejarlo en piloto automático.',
  },
  {
    number: '4',
    title: 'Mes a mes',
    description:
      'Actualizamos, copiamos, cambiamos lo del plan y respondemos cuando algo falla. Cancelas cuando quieras.',
  },
];

const audiences = [
  {
    icon: ShieldCheck,
    title: 'Webs que ya montamos',
    description:
      'Si la hicimos nosotros, conocemos el código y el hosting. El mantenimiento es la continuación lógica.',
  },
  {
    icon: Wrench,
    title: 'Webs de otros',
    description:
      'WordPress, tienda o a medida. Primero la miramos. Si se puede mantener bien, te lo decimos; si no, también.',
  },
  {
    icon: RefreshCw,
    title: 'Sin ganas de pelearte con plugins',
    description:
      'Actualizar, copiar y que no se rompa no tiene que ser tu trabajo. Por eso existe el plan mensual.',
  },
  {
    icon: Headphones,
    title: 'Alguien a quien escribir',
    description:
      'Cuando el formulario no llega o la web va lenta, hace falta una persona, no un tutorial.',
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

  useJsonLd('jsonld-mantenimiento-web', jsonLd);

  return (
    <>
      <HeroCta
        title='Mantenimiento web para que no se rompa sola'
        description='Actualizaciones, copias, cambios de textos y fotos, y alguien a quien escribir cuando falla algo. Estudio en Madrid, webs en toda España. Cuota y alcance por escrito antes de empezar.'
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
        label='MANTENIMIENTO WEB'
        title='Que la web siga online, actualizada y con alguien al otro lado'
        paragraphs={[
          'PereiraWeb es una agencia de diseño web y marketing digital en Madrid. Más de 12 años montando y cuidando páginas web para autónomos y empresas de toda España. El mantenimiento no es un extra escondido: es un plan mensual, con lo que entra por escrito.',
          'Una web sin copias, sin actualizar o con un formulario muerto te cuesta consultas. Por eso el mantenimiento aquí es actualizaciones, copias, cambios pequeños y soporte. No un “ya lo miramos”.',
        ]}
        imageSrc='/img/fikret-tozak-rfNLa1HL7eY-unsplash.jpg'
        imageAlt='Equipo de PereiraWeb trabajando en mantenimiento web'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <ServiceIncludes
        title='Qué incluye el mantenimiento de una web'
        intro='Esto es lo que entra en un plan típico. El detalle exacto —cuántos cambios, qué hosting, qué CMS— va en la propuesta.'
        items={includes}
      />

      <TextImage
        label='WEB PROPIA O DE OTROS'
        title='Mantenemos la que hicimos y, en muchos casos, la que ya tienes'
        paragraphs={[
          'Si la web la montamos nosotros, el plan encaja directo: conocemos el código, el hosting y cómo se edita. Si la hizo otro, primero la miramos. WordPress, tienda o a medida: te decimos si se puede mantener bien o si conviene otra cosa.',
          'No cogemos un pozo a ciegas. Si hay que actualizar 40 plugins o rehacer medio sitio, te lo decimos antes de la cuota, no a mitad de mes.',
          <>
            Si lo que necesitas no es cuidar la web, sino hacerla de nuevo, mira
            el{' '}
            <a href={SITE_WEB_PATH} className='font-bold text-link underline'>
              diseño web a medida
            </a>
            . No es el mismo servicio.
          </>,
        ]}
        imageSrc='/img/portfolio/mock-core.png'
        imageAlt='Mock de página web en mantenimiento'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <SEOBenefits
        title='Para quién es este mantenimiento web'
        subtitle='Planes mensuales para autónomos y empresas que ya tienen web y no quieren pelearse con ella.'
        benefits={audiences}
      />

      <SEOProcess
        title='Cómo se contrata el mantenimiento web'
        subtitle='Cuatro pasos. Sabes la cuota y lo que entra antes de pagar. Cancelas cuando quieras.'
        steps={processSteps}
        imageSrc='/img/justin-morgan-wordpress.jpg'
        imageAlt='Proceso de mantenimiento de una página web'
      />

      <TextImage
        label='PRESUPUESTO'
        title='Precio del mantenimiento web'
        paragraphs={[
          'No hay una cuota única en la web. Depende del CMS, del hosting, de si hay tienda y de cuántos cambios mensuales quieres.',
          'En 24–48 h laborables te mandamos un número concreto, con lo que entra y desde cuándo. Pedir presupuesto de mantenimiento web es gratis y no te compromete.',
          'La cuota es mensual. El mantenimiento no es obligatorio: si lo cancelas, la web no se apaga. Dejas de tener actualizaciones, copias y soporte del plan.',
        ]}
        imageSrc='/img/portfolio/mock-delish.png'
        imageAlt='Mock de página web con plan de mantenimiento'
        imageLeft
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
      />

      <Portfolio contained />
      <Testimonials />
      <Team
        label='EQUIPO DE MANTENIMIENTO WEB'
        title='La web la cuidamos nosotros'
        paragraphs={[
          'Actualizaciones, copias y soporte. Hablas con el equipo, no con un comercial. Una web caída o un formulario mudo te cuesta clientes; por eso hay alguien al otro lado.',
        ]}
      />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='Preguntas frecuentes sobre mantenimiento web'
          faqs={faqs}
          ctaText='PEDIR PROPUESTA'
          ctaHref='#contacto'
        />
      </div>

      <TextImage
        label='TAMBIÉN HACEMOS'
        title='¿Necesitas una página web nueva, no mantenimiento?'
        paragraphs={[
          'Si la web actual no da más de sí, el servicio es diseño web a medida: la montamos de nuevo, con tu dominio.',
        ]}
        imageSrc='/img/portfolio/mock-carper.png'
        imageAlt='Mock de página web de Carper Sonido'
        buttonText='VER DISEÑO WEB'
        buttonHref={SITE_WEB_PATH}
      />

      <HeroCta
        title='Pide presupuesto de mantenimiento web'
        description='Cuéntanos qué web tienes y qué te preocupa. Te devolvemos propuesta en 24–48 h, con cuota y lo que entra. Si no encaja, lo dices y no pasa nada.'
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
      />
    </>
  );
};

export default MantenimientoWeb;
