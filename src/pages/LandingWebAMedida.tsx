import {
  Globe,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Layers,
} from 'lucide-react';
import HeroCta from '../components/HeroCta';
import Button from '../components/Button';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import { ServiceIncludes } from '../components/ServiceOnPage';
import Testimonials from '../components/Testimonials';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import LaunchExitPopup from '../components/LaunchExitPopup';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  ADS_CUSTOM_WEB_EXIT_FORM_ORIGIN,
  ADS_CUSTOM_WEB_LANDING_PATH,
  buildWhatsAppUrl,
} from '../config/contact';

function SuccessCases() {
  const cases = [
    {
      name: 'Clínica Hatena',
      category: 'Web de servicios · Ourense',
      title:
        'Menos de 2 segundos para cargar. Más fácil conocer la clínica y contactar.',
      image: '/img/portfolio/new/hatena.webp',
      url: 'https://hatena.es/',
      challenge:
        'Presentar la clínica y sus servicios con claridad, facilitar el contacto y trabajar su presencia en las búsquedas locales de Ourense.',
      solution:
        'Diseñamos una web a medida que da protagonismo a la clínica, ordena sus servicios y cuida la velocidad y la estructura para el posicionamiento local.',
      result:
        'Páginas que cargan en menos de 1 segundo y un recorrido directo para conocer la clínica y contactar. Una base rápida y clara para su presencia en Ourense.',
      note: 'El tiempo de carga puede variar según la conexión y el dispositivo.',
    },
    {
      name: 'Camisetas Ahora',
      category: 'Tienda online · Productos personalizados',
      title: 'De un personalizador limitado a diseñar con libertad.',
      image: '/img/portfolio/new/camisetas.webp',
      url: 'https://camisetas-ahora.com/',
      challenge:
        'El personalizador basado en un plugin funcionaba, pero su experiencia de uso era limitada. Crear un producto con tu propio diseño debía ser mucho más cómodo.',
      solution:
        'Rediseñamos la tienda WooCommerce con un tema creado especialmente para ellas y desarrollamos un personalizador visual adaptado a sus productos.',
      result:
        'Ahora puedes subir tu diseño, moverlo, cambiar su tamaño y preparar una o dos impresiones. Ves cómo queda antes de añadirlo al carrito: una experiencia más rápida, visual y cómoda.',
    },
  ];
  return (
    <section
      id='portfolio'
      className='px-5 py-16 md:py-24'
      aria-labelledby='success-title'
    >
      <div className='max-w-6xl mx-auto'>
        <p className='text-accent font-bold mb-3'>Casos de éxito</p>
        <h2 id='success-title' className='text-3xl md:text-5xl font-bold mb-5'>
          Dos negocios. Dos retos. Soluciones a medida.
        </h2>
        <p className='text-lg max-w-3xl mb-10'>
          Así llevamos a la práctica lo que te proponemos: una web que presenta
          mejor tu negocio y una tienda que hace más fácil comprar.
        </p>
        <div className='grid gap-10'>
          {cases.map((project) => (
            <article
              key={project.name}
              className='grid md:grid-cols-2 overflow-hidden rounded-2xl border border-accent/20 bg-white'
            >
              <div className='bg-surface-muted flex items-center p-4 md:p-6'>
                <img
                  src={project.image}
                  alt={`Diseño de ${project.name} en ordenador, tablet y móvil`}
                  width={1536}
                  height={1024}
                  loading='lazy'
                  className='w-full h-auto object-contain'
                />
              </div>
              <div className='p-6 md:p-9'>
                <p className='text-sm font-bold text-accent mb-2'>
                  {project.category}
                </p>
                <h3 className='text-2xl font-bold mb-2'>{project.name}</h3>
                <p className='text-xl font-semibold mb-6'>{project.title}</p>
                <dl className='space-y-5'>
                  <div>
                    <dt className='font-bold'>El reto</dt>
                    <dd>{project.challenge}</dd>
                  </div>
                  <div>
                    <dt className='font-bold'>Lo que hicimos</dt>
                    <dd>{project.solution}</dd>
                  </div>
                  <div>
                    <dt className='font-bold'>El resultado</dt>
                    <dd>{project.result}</dd>
                  </div>
                </dl>
                {project.note && <p className='text-sm mt-3'>{project.note}</p>}
                <Button
                  href={project.url}
                  allowAdsOutbound
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='outline'
                  className='mt-6 !mx-0'
                >
                  Visitar {project.name}
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className='text-center mt-10'>
          <Button href='#contacto' className='!mt-0'>
            Quiero una propuesta para mi negocio
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhatsAppContact() {
  const url = buildWhatsAppUrl(
    'Hola, me interesa una web a medida. ¿Podemos hablar de mi proyecto por aquí?',
  );
  return (
    <div className='flex flex-col md:items-start items-center gap-3'>
      <Button
        href={url}
        allowAdsOutbound
        className='m-0 !mx-0'
        onClick={(event) => {
          event.preventDefault();
          trackWhatsAppClick('LandingWebAMedida');
          trackGoogleAdsWhatsAppConversion(url);
        }}
      >
        <MessageCircle className='h-5 w-5 shrink-0' aria-hidden='true' />
        Hablemos por WhatsApp
      </Button>
      <p className='text-base md:text-left'>
        Cuéntanos tu idea por aquí, sin necesidad de una llamada. Si prefieres
        que te llamemos, déjanos tus datos.
      </p>
    </div>
  );
}

const packages = [
  {
    id: 'ultra-velocidad-seo',
    name: 'Ultra-Velocidad y SEO',
    audience: 'Para negocios de servicios y profesionales',
    problem:
      'Necesitas tu primera web profesional o renovar una que carga despacio, no explica bien tus servicios o dificulta el contacto.',
    solution:
      'Una web diseñada y desarrollada a medida, sin plantillas prediseñadas, con tus servicios bien explicados y un camino claro para contactar.',
    price: '1.200–1.500 € + IVA',
    priceNote:
      'Orientación para una web de servicios. Presupuesto cerrado tras conocer tu proyecto.',
    points: [
      'Revisión del rendimiento y de los obstáculos para contactar.',
      'Diseño móvil, contenidos ordenados y llamadas a la acción claras.',
      'Optimización de carga y base de SEO técnico: estructura, títulos e indexación.',
      'Comprobación de rendimiento y formularios; comparación antes y después cuando renovamos una web.',
    ],
    cta: 'Quiero contratar',
    message:
      'Hola, me interesa Ultra-Velocidad y SEO. Quiero crear o mejorar la web de mi negocio.',
  },
  {
    id: 'tienda-sin-fricciones',
    name: 'Tienda sin Fricciones',
    audience: 'Para empezar a vender online o renovar tu tienda',
    problem:
      'Quieres abrir tu tienda online o renovar una en la que elegir productos y completar el pedido resulta complicado.',
    solution:
      'Una tienda WooCommerce con diseño y desarrollo a medida, sin plantillas prediseñadas, que facilite elegir y completar el pedido.',
    price: 'Desde 1.500 € + IVA',
    priceNote:
      'El catálogo, las integraciones y la migración se valoran en la propuesta.',
    points: [
      'Creación o rediseño de tu tienda con WooCommerce a medida.',
      'Fichas de producto claras y navegación pensada para encontrar lo que buscas.',
      'Revisión de carrito, formularios y proceso de pago en móvil y escritorio.',
      'Configuración de pagos y envíos acordados, y pruebas del recorrido de compra.',
    ],
    cta: 'Quiero contratar',
    message:
      'Hola, me interesa Tienda sin Fricciones. Quiero crear o rediseñar mi tienda online.',
  },
];

function SolutionPackages() {
  return (
    <section
      id='soluciones'
      className='px-5 py-16 md:py-24 bg-surface-muted'
      aria-labelledby='solutions-title'
    >
      <div className='max-w-6xl mx-auto'>
        <p className='text-accent font-bold mb-3'>
          Dos soluciones, un punto de partida: tu negocio
        </p>
        <h2
          id='solutions-title'
          className='text-3xl md:text-5xl font-bold mb-5'
        >
          Tu próxima web empieza por lo que necesitas
        </h2>
        <p className='text-lg max-w-3xl mb-10'>
          Estrena tu web, abre tu tienda online o renueva la que ya tienes.
          Diseñamos y desarrollamos cada proyecto a medida de tu negocio.
        </p>
        <div className='grid md:grid-cols-2 gap-6'>
          {packages.map((pack) => (
            <article
              key={pack.id}
              id={pack.id}
              className='scroll-mt-28 rounded-2xl border border-accent/20 bg-white p-6 md:p-9 flex flex-col'
            >
              <p className='text-sm font-bold text-accent mb-3'>
                {pack.audience}
              </p>
              <h3 className='text-3xl font-bold mb-5'>{pack.name}</h3>
              <p className='mb-4'>{pack.problem}</p>
              <p className='text-lg font-semibold mb-6'>{pack.solution}</p>
              <ul className='list-disc pl-5 space-y-3 mb-8'>
                {pack.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className='mt-auto'>
                <p className='text-2xl font-bold text-accent'>{pack.price}</p>
                <p className='text-sm mt-2 mb-6'>{pack.priceNote}</p>
                <Button
                  href={buildWhatsAppUrl(pack.message)}
                  allowAdsOutbound
                  className='!w-full !m-0'
                  onClick={(event) => {
                    event.preventDefault();
                    trackWhatsAppClick(`LandingWebAMedida_${pack.id}`);
                    trackGoogleAdsWhatsAppConversion(
                      buildWhatsAppUrl(pack.message),
                    );
                  }}
                >
                  <MessageCircle
                    className='w-5 h-5 shrink-0'
                    aria-hidden='true'
                  />
                  {pack.cta}
                </Button>
                <a
                  href='#contacto'
                  className='block text-center underline mt-4'
                >
                  Prefiero dejar mis datos
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className='text-sm mt-6'>
          Alcance, inversión y calendario por escrito antes de empezar.
          Mantenimiento opcional. Las licencias, servicios externos y trabajos
          adicionales se concretan en el presupuesto.
        </p>
      </div>
    </section>
  );
}

const items = [
  {
    icon: Layers,
    title: 'Diseño con identidad',
    description:
      'Una presencia que refleja quién eres y ayuda a entender por qué elegir tu negocio.',
  },
  {
    icon: Smartphone,
    title: 'Cómoda en cualquier pantalla',
    description:
      'Pensamos cada recorrido para que navegar y contactar sea fácil también desde el móvil.',
  },
  {
    icon: MessageCircle,
    title: 'Cada página tiene un propósito',
    description:
      'Ordenamos tus servicios y tus mensajes para llevar al visitante hacia el siguiente paso.',
  },
  {
    icon: Search,
    title: 'Una base técnica cuidada',
    description:
      'Velocidad, estructura y contenido pensados para las personas y los buscadores.',
  },
  {
    icon: Globe,
    title: 'Desarrollo según tu proyecto',
    description:
      'Estudiamos las funcionalidades e integraciones que necesitas y te proponemos cómo resolverlas.',
  },
  {
    icon: ShieldCheck,
    title: 'Acompañamiento de principio a fin',
    description:
      'Hablas con el equipo, revisas los avances y apruebas la web antes de publicarla.',
  },
];
const faqs = [
  {
    question: '¿Qué cubre la garantía técnica de 60 días?',
    answer:
      'Durante los 60 días posteriores a la publicación corregimos sin coste los fallos de funcionamiento atribuibles a nuestra entrega, dentro del alcance acordado: formularios, enlaces y visualización en móvil, tablet y ordenador. No incluye nuevas secciones, cambios de diseño o contenido, mantenimiento ni incidencias causadas por modificaciones de terceros o servicios externos. No es una garantía de visitas, ventas ni posicionamiento.',
  },
  {
    question: '¿Cuánto cuesta una web a medida?',
    answer:
      'Ultra-Velocidad y SEO tiene una orientación de 1.200–1.500 € + IVA para webs de servicios. Tienda sin Fricciones parte de 1.500 € + IVA. Revisamos las necesidades, el catálogo y las integraciones antes de cerrar el presupuesto. Recibirás alcance, precio y condiciones por escrito.',
  },
  {
    question: '¿Garantizáis más ventas o aparecer primero en Google?',
    answer:
      'No. Mejoramos aspectos que sí podemos trabajar y comprobar: carga, navegación, contenido, formularios y proceso de compra. El posicionamiento y las ventas también dependen de la competencia, el tráfico, la oferta y otros factores. Te explicamos qué medimos y qué ha cambiado, sin promesas de resultados garantizados.',
  },
  {
    question: '¿Y si ya tengo una tienda online?',
    answer:
      'Podemos revisar y rediseñar tu tienda WooCommerce. Antes de intervenir estudiamos el catálogo, los pedidos, los pagos y las integraciones para definir qué conservar y cómo hacer el cambio. Las migraciones y funcionalidades especiales se presupuestan según su complejidad.',
  },
  {
    question: '¿Tengo que tener claro todo lo que necesito?',
    answer:
      'No. Puedes venir con una idea, con una web que quieras renovar o con un problema que quieras resolver. Te ayudamos a ordenar prioridades y definir el siguiente paso.',
  },
  {
    question: '¿Podéis renovar mi web actual?',
    answer:
      'Sí. Revisamos contigo qué funciona, qué quieres mejorar y qué necesitas conservar para plantear el rediseño.',
  },
  {
    question: '¿Podré editar los contenidos?',
    answer:
      'Si necesitas gestionar textos, imágenes u otros contenidos, lo valoramos contigo y concretamos el sistema de edición en la propuesta.',
  },
  {
    question: '¿Cuánto tarda el proyecto?',
    answer:
      'Como orientación, una web corporativa a medida puede estar lista en 2–4 semanas desde que tenemos los contenidos. Los proyectos con funcionalidades más complejas necesitan más tiempo. Te indicaremos el calendario en la propuesta.',
  },
  {
    question: '¿Trabajáis con empresas de mi ciudad?',
    answer:
      'Trabajamos online con negocios de toda España. Podemos hablar por teléfono o videollamada y compartir los avances para revisarlos juntos.',
  },
  {
    question: '¿Pedir una propuesta tiene compromiso?',
    answer:
      'No. La primera conversación es para conocernos y entender tu proyecto. Tú decides después de recibir la propuesta.',
  },
];
export default function LandingWebAMedida() {
  usePageMeta(ADS_CUSTOM_WEB_LANDING_PATH);
  return (
    <>
      <HeroCta
        label='Diseño web y tiendas online a medida'
        title='Que tu web facilite el siguiente paso'
        description='Estrena tu web, abre tu tienda online o renueva la que ya tienes. Diseño y desarrollo a medida para que entiendan tus servicios, puedan contactar y comprar resulte sencillo.'
        belowDescription={
          <p className='inline-flex items-center justify-center gap-2 rounded-lg border border-accent bg-white px-4 py-3 font-bold text-accent mx-auto md:mx-0'>
            <ShieldCheck size={24} aria-hidden='true' /> Garantía técnica de 60
            días
          </p>
        }
        ctaContent={<WhatsAppContact />}
        convertFirstOnMobile
        buttonText='Descubre las dos soluciones'
        buttonHref='#soluciones'
        heroType='form'
        hasButton
        formTitle='¿Prefieres que te llamemos?'
        formDescription='Déjanos tus datos y hablamos de lo que necesitas. Sin compromiso.'
        formSectionInfo='landing_web_a_medida'
        formSubmitLabel='Quiero que me llaméis'
        formId='contacto'
        hasBackground={false}
        hasReviewBadge
        isTopHero
      />
      <SolutionPackages />
      <SuccessCases />
      <Testimonials />
      <ServiceIncludes
        title='Del problema a una mejora concreta'
        intro='Primero entendemos qué necesita hacer tu cliente. Después diseñamos el recorrido y comprobamos que funciona en las pantallas que utiliza.'
        items={items}
      />
      <SEOProcess
        compact
        title='Revisar, resolver y comprobar'
        subtitle='Un proceso claro, con trato directo y decisiones explicadas.'
        steps={[
          {
            number: '1',
            title: 'Entendemos lo que necesitas',
            description:
              'Hablamos de tu negocio, tus objetivos y lo que esperas de la web. Te presentamos una propuesta personalizada antes de empezar.',
          },
          {
            number: '2',
            title: 'Diseñamos y desarrollamos',
            description:
              'Transformamos lo acordado en una web con identidad propia. Compartimos los avances y revisamos contigo las decisiones importantes.',
          },
          {
            number: '3',
            title: 'Revisamos y publicamos',
            description:
              'Comprobamos carga, navegación y formularios; en tiendas, también carrito y pago. Revisamos contigo y publicamos con tu aprobación.',
          },
        ]}
      />
      <div id='faq'>
        <SEOFAQ title='Resolvemos tus dudas' faqs={faqs} />
      </div>
      <div id='contacto-final'>
        <HeroCta
          ctaContent={<WhatsAppContact />}
          title='Demos forma a tu próxima web'
          description='Cuéntanos dónde estás y qué quieres conseguir. Empezamos con una conversación.'
          buttonText='Cuéntanos tu proyecto'
          buttonHref='#contacto'
          heroType='form'
          hasButton={false}
          formTitle='¿Prefieres que te llamemos?'
          formDescription='Sin compromiso. Te llamamos para conocer tu idea.'
          formSectionInfo='landing_web_a_medida_final'
          formSubmitLabel='Quiero que me llaméis'
          hasBackground={false}
          hasReviewBadge={false}
        />
      </div>
      <LaunchExitPopup origin={ADS_CUSTOM_WEB_EXIT_FORM_ORIGIN} />
    </>
  );
}
