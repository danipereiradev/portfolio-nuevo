import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Building2, Lightbulb, RefreshCw } from 'lucide-react';
import HeroCta, { HeroCtaList } from '../components/HeroCta';
import { ContactFormHero } from '../components/ContactFormHero';
import { TextImage } from '../components/TextImage';
import AppPortfolio, { AppProjectVisual } from '../components/AppPortfolio';
import Testimonials from '../components/Testimonials';
import SEOFAQ from '../components/SEOFAQ';
import SEOProcess from '../components/SEOProcess';
import SEOBenefits from '../components/SEOBenefits';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { useBootHeroSlot } from '../hooks/useBootHeroSlot';
import { SITE_APPS_PATH, SITE_WEB_PATH, SITE_SHOP_PATH } from '../config/contact';
import { APP_PROJECTS } from '../data/appProjects';

const faqs = [
  { question: '¿Cuánto cuesta desarrollar una aplicación?', answer: 'Depende de lo que tenga que hacer: pantallas, tipos de usuario, funciones, integraciones y dónde se va a utilizar. Hablamos contigo y te pasamos una propuesta con precio, alcance y plazos por escrito. Pedir presupuesto es gratis y no te compromete.' },
  { question: '¿Cuánto tarda?', answer: 'El plazo depende de la complejidad del proyecto. Primero definimos qué necesita la primera versión y qué puede esperar. Las fases, las entregas y el plazo van por escrito en la propuesta, antes de empezar.' },
  { question: '¿Una aplicación web o una app para móvil?', answer: 'Lo que pida el caso. Una aplicación web se usa desde el navegador, sin instalarla. Si necesitas una app para Android e iOS, también la desarrollamos. Te explicamos qué encaja mejor con tus usuarios y tu presupuesto.' },
  { question: '¿Podéis conectar la app con otras herramientas?', answer: 'Sí. Revisamos las herramientas que ya utilizas y cómo se pueden conectar: usuarios, datos, mapas, pagos u otros servicios. Confirmamos las integraciones y los costes de terceros en la propuesta.' },
  { question: '¿Podemos empezar con una versión sencilla?', answer: 'Sí, y suele ser un buen punto de partida. Empezamos por las funciones que necesitas para ponerla a trabajar. Después podemos ampliar la aplicación con lo que vaya pidiendo el proyecto.' },
  { question: '¿Trabajáis con aplicaciones ya empezadas?', answer: 'Sí. Primero revisamos el código, los accesos y el estado del proyecto. Con eso te decimos qué se puede aprovechar, qué hay que corregir y cómo continuar.' },
  { question: '¿La publicación en Google Play y App Store está incluida?', answer: 'Si tu proyecto necesita publicarse en las tiendas, lo especificamos en la propuesta y te acompañamos en el proceso. Las cuentas de desarrollador, sus cuotas y otros servicios externos se detallan aparte. La aprobación depende de cada plataforma.' },
  { question: '¿De quién es la aplicación? ¿Y el mantenimiento?', answer: 'La aplicación que desarrollamos para ti se entrega con su código y accesos, según lo acordado en la propuesta. Te explicamos cómo usarla y administrarla. El mantenimiento y las nuevas funcionalidades se pueden contratar aparte; los servicios de terceros mantienen sus propias condiciones.' },
];
const includes = [
  { title: 'Definición del proyecto', description: <>Nos cuentas qué necesitas y quién va a usar la aplicación. Dejamos por escrito <strong className='font-extrabold'>las funciones, las fases y el presupuesto</strong> antes de ponernos a desarrollar.</> },
  { title: 'Diseño fácil de usar', description: <>Pantallas y recorridos pensados para tus usuarios. Que puedan <strong className='font-extrabold'>hacer lo que necesitan sin perderse</strong>, desde entrar hasta terminar una tarea.</> },
  { title: 'Aplicaciones web y móvil', description: <>Desarrollamos para navegador, Android e iOS. Elegimos <strong className='font-extrabold'>la opción que encaja con tu proyecto</strong>, sin hacerte pagar por plataformas que no necesitas.</> },
  { title: 'Usuarios y permisos', description: <>Si tu aplicación necesita clientes, empleados o administradores, definimos <strong className='font-extrabold'>qué puede ver y hacer cada uno</strong>. Cada perfil, con su acceso.</> },
  { title: 'Datos y lógica del negocio', description: <>La aplicación tiene que funcionar por dentro, además de verse bien. Desarrollamos <strong className='font-extrabold'>el backend y la base de datos que necesite</strong>, o la conectamos con los que ya tengas.</> },
  { title: 'Conexión con otras herramientas', description: <>Mapas, geolocalización, pagos o servicios externos. Estudiamos <strong className='font-extrabold'>qué hay que conectar y cómo</strong>. Las integraciones acordadas quedan en la propuesta.</> },
  { title: 'Pruebas y puesta en marcha', description: <>Comprobamos los recorridos principales, revisamos contigo y preparamos la publicación en las plataformas acordadas. <strong className='font-extrabold'>Tú ves y pruebas el trabajo</strong> antes de la entrega.</> },
  { title: 'Entrega y acompañamiento', description: <>Te entregamos el proyecto y te explicamos cómo utilizarlo. Si quieres que sigamos al lado, podemos encargarnos del <strong className='font-extrabold'>mantenimiento y las siguientes mejoras</strong>.</> },
];
const processSteps = [
  { number: '1', title: 'Nos cuentas tu idea', description: <>Qué quieres hacer, quién lo va a utilizar y con qué presupuesto cuentas. No hace falta que sepas de tecnología. <strong className='font-extrabold'>Esa parte la vemos nosotros.</strong></> },
  { number: '2', title: 'Te enviamos la propuesta', description: <>Estudiamos las funciones y te pasamos un <strong className='font-extrabold'>presupuesto con precio, fases y plazos por escrito</strong>. Si falta algo por definir, lo hablamos antes.</> },
  { number: '3', title: 'Diseñamos y desarrollamos', description: <>Trabajas <strong className='font-extrabold'>directamente con quien hace tu aplicación</strong>. Vamos enseñándote los avances para que puedas probarlos y revisarlos.</> },
  { number: '4', title: 'Tu aplicación en marcha', description: <>Tras las pruebas y tu revisión, ponemos en marcha la aplicación. <strong className='font-extrabold'>Te entregamos el proyecto y sus accesos</strong> y te explicamos cómo utilizarlo.</> },
];
const audiences = [
  { icon: Lightbulb, title: 'Una idea que quieres poner en marcha', description: <>Empezamos por una primera versión con <strong className='font-extrabold'>lo que de verdad necesitan tus usuarios</strong>. Siempre hay tiempo de añadir más funciones.</> },
  { icon: Building2, title: 'Empresas que necesitan una herramienta propia', description: <>Aplicaciones para gestionar tareas, clientes o procesos que ahora te hacen perder tiempo. <strong className='font-extrabold'>Adaptadas a tu forma de trabajar.</strong></> },
  { icon: RefreshCw, title: 'Aplicaciones que necesitan seguir creciendo', description: <>Si ya tienes una aplicación, revisamos su estado y te proponemos <strong className='font-extrabold'>cómo mejorarla o continuar el desarrollo</strong>.</> },
];

export default function Aplicaciones() {
  usePageMeta(SITE_APPS_PATH);
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://36web.es/' },
        { '@type': 'ListItem', position: 2, name: 'Aplicaciones', item: `https://36web.es${SITE_APPS_PATH}/` },
      ] },
      { '@type': 'Service', name: 'Desarrollo de aplicaciones web y móviles a medida', serviceType: 'Desarrollo de aplicaciones', description: 'Aplicaciones web, Android e iOS a medida para empresas y nuevos proyectos.', url: `https://36web.es${SITE_APPS_PATH}/`, areaServed: { '@type': 'Country', name: 'España' }, provider: { '@type': 'ProfessionalService', name: '36web', url: 'https://36web.es/' } },
      { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    ],
  }), []);
  useJsonLd('jsonld-aplicaciones', jsonLd);
  const formSlot = useBootHeroSlot();
  const heroForm = <ContactFormHero id='contacto' title='Presupuesto de tu aplicación' description='Cuéntanos tu idea. Sin compromiso.' page='Aplicaciones Hero' compactOnMobile className={formSlot ? 'md:!w-full' : ''} />;
  return <>
    {formSlot ? createPortal(heroForm, formSlot) : <HeroCta
      title='Una aplicación hecha para lo que necesita tu negocio'
      description={<><p>Desarrollamos aplicaciones web y móviles pensadas para <strong className='font-extrabold'>hacer más fácil el día a día de tus usuarios</strong>.</p><HeroCtaList className='mx-auto mt-text-gap w-full list-none text-center md:mx-0 md:list-disc md:list-outside md:pl-5 md:text-left' items={[
        <>Web, Android o iOS. <strong className='font-extrabold'>Lo que necesite tu proyecto.</strong></>,
        <>Propuesta personalizada, con <strong className='font-extrabold'>precio y plazos por escrito</strong>.</>,
        <><strong className='font-extrabold'>Hablas con quien va a desarrollar la aplicación, no con un comercial.</strong></>,
      ]} /></>}
      buttonText='PEDIR PROPUESTA' buttonHref='#contacto' heroType='form' hasButton={false} formTitle='Presupuesto de tu aplicación' formDescription='Cuéntanos tu idea. Sin compromiso.' formSectionInfo='Aplicaciones Hero' formId='contacto' hasBackground={false} hasReviewBadge isTopHero convertFirstOnMobile
    />}
    <TextImage label='¿Por qué una aplicación con 36web?' title='Desarrollamos aplicaciones que resuelven algo de verdad.' paragraphs={[
      <>Puede que tengas una idea para un nuevo negocio o que necesites una herramienta para trabajar mejor. Lo primero es entender <strong className='font-extrabold'>qué tiene que hacer la aplicación y para quién</strong>.</>,
      <>Tendremos muy en cuenta <strong className='font-extrabold'>tus necesidades y presupuesto</strong>. Podemos crear una herramienta sencilla o una plataforma con usuarios, mapas, datos en tiempo real y otras funciones. Siempre vamos a aconsejarte <strong className='font-extrabold'>lo mejor para ti, no lo más caro</strong>.</>,
    ]} imageContent={<AppProjectVisual project={APP_PROJECTS[0]} />} buttonText='PEDIR PROPUESTA' buttonHref='#contacto' />
    <ServiceIncludes title='Qué hacemos en el desarrollo de tu aplicación' intro={<>Esta es la base desde la que trabajamos. Las funciones que necesita tu aplicación y todo lo que entra irán especificados en la propuesta final. <strong className='font-extrabold'>Sin sorpresas.</strong></>} items={includes} />
    <TextImage label='APLICACIONES WEB, ANDROID E IOS' title='La tecnología la elegimos según tu proyecto.' paragraphs={[
      <>Una aplicación web se utiliza desde el navegador. Una app móvil se instala en el teléfono. <strong className='font-extrabold'>No todos los proyectos necesitan las dos cosas.</strong></>,
      <>Trabajamos con <strong className='font-extrabold'>React, React Native, Expo y TypeScript</strong> para crear las pantallas y la experiencia de uso. Para la parte de datos y las funciones del servidor, trabajamos también con Node.js, Express y MongoDB.</>,
      <>Nuestro equipo ha desarrollado aplicaciones para Android e iOS, plataformas de juegos y marcadores para Android TV. Te explicamos <strong className='font-extrabold'>qué opción tiene sentido en tu caso y por qué</strong>, sin llenarte la propuesta de palabras que no necesitas.</>,
    ]} imageContent={<AppProjectVisual project={APP_PROJECTS[1]} />} imageLeft buttonText='PEDIR PROPUESTA' buttonHref='#contacto' />
    <SEOBenefits title='Una aplicación distinta según lo que necesite tu negocio.' subtitle={<>Trabajamos con empresas que necesitan <strong className='font-extrabold'>herramientas propias</strong>, nuevos proyectos y aplicaciones que ya están en marcha.</>} benefits={audiences} />
    <SEOProcess title='Cómo es el proceso de contratación' subtitle={<><strong className='font-extrabold'>Cuatro sencillos pasos.</strong> Nos cuentas tu idea, estudiamos el proyecto y te pasamos una propuesta. Aceptas y empezamos a trabajar.</>} steps={processSteps} />
    <TextImage label='APLICACIONES A MEDIDA' title='Empezamos por lo que realmente necesitas.' paragraphs={[
      <><strong className='font-extrabold'>No tenemos un pack cerrado de aplicaciones.</strong> El presupuesto depende de las pantallas, las funciones, las integraciones y las plataformas donde se va a utilizar.</>,
      <>Recomendamos definir una primera versión que puedas poner a trabajar. <strong className='font-extrabold'>No necesitas hacerlo todo de golpe.</strong> Después podemos añadir funciones según lo que necesiten tu negocio y tus usuarios.</>,
      <>En la propuesta dejamos claro <strong className='font-extrabold'>qué entra, cuánto cuesta y cuándo estará</strong>. También los servicios externos que haya que contratar. Pedir presupuesto es gratis y no te compromete.</>,
    ]} imageContent={<AppProjectVisual project={APP_PROJECTS[2]} />} imageLeft buttonText='PEDIR PROPUESTA' buttonHref='#contacto' />
    <AppPortfolio />
    <Testimonials />
    <div id='faq'><SEOFAQ title='No queremos que te quedes con dudas' faqs={faqs} ctaText='PEDIR PROPUESTA' ctaHref='#contacto' /></div>
    <TextImage label='TAMBIÉN HACEMOS' title='¿Lo que necesitas es una página web?' paragraphs={[
      <>Si quieres presentar tu negocio, mostrar tus servicios y recibir contactos, podemos hacerte una <a href={SITE_WEB_PATH} className='font-bold text-link underline'>página web profesional</a>. Si lo que necesitas es vender productos, te ofrecemos una <a href={SITE_SHOP_PATH} className='font-bold text-link underline'>tienda online</a>.</>,
      <>Cuéntanos qué quieres conseguir. <strong className='font-extrabold'>Te ayudamos a elegir.</strong></>,
    ]} imageSrc='/img/portfolio/new/carper.webp' imageAlt='Página web de Carper Sonido' buttonText='VER DISEÑO WEB' buttonHref={SITE_WEB_PATH} />
    <HeroCta title='Pide presupuesto de tu aplicación' description={<>Cuéntanos tu idea y qué tiene que hacer la aplicación. Te preparamos una <strong className='font-extrabold'>propuesta personalizada, con precio y plazos por escrito</strong>. Si no encaja, lo dices y no pasa nada.</>} buttonText='PEDIR PROPUESTA' buttonHref='#contacto' heroType='form' hasButton={false} formTitle='Hablemos de tu aplicación' formDescription='Cuéntanos tu idea. Sin compromiso.' formSectionInfo='Aplicaciones CTA final' hasBackground={false} hasReviewBadge formId='contacto-final' />
  </>;
}
