import { Globe, MessageCircle, Search, ShieldCheck, Smartphone, Layers } from 'lucide-react';
import HeroCta from '../components/HeroCta';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import PortfolioAMedida from '../components/PortfolioAMedida';
import { usePageMeta } from '../hooks/usePageMeta';

const items = [
  { icon: Layers, title: 'Tu identidad profesional', description: 'Presenta tu experiencia, tu enfoque y tu equipo con una imagen que se sienta tuya.' },
  { icon: Smartphone, title: 'Cómoda en cualquier pantalla', description: 'Pensamos cada recorrido para que navegar y contactar sea fácil también desde el móvil.' },
  { icon: MessageCircle, title: 'Contacto sin complicaciones', description: 'Servicios claros y vías de contacto visibles para pedir información sobre tu consulta.' },
  { icon: Search, title: 'Una base técnica cuidada', description: 'Velocidad, estructura y contenido pensados para las personas y los buscadores.' },
  { icon: Globe, title: 'Las herramientas que necesitas', description: 'Si necesitas blog, edición de contenidos o conexión con una agenda, estudiamos cómo integrarlos y lo detallamos en tu propuesta.' },
  { icon: ShieldCheck, title: 'Acompañamiento de principio a fin', description: 'Hablas con el equipo, revisas los avances y apruebas la web antes de publicarla.' },
];
const faqs = [
  { question: '¿Cuánto cuesta una web para psicólogos?', answer: 'Depende de lo que necesite tu proyecto. Primero hablamos de tus objetivos, diseño y funcionalidades. Después recibes una propuesta personalizada, con presupuesto y condiciones por escrito antes de decidir.' },
  { question: '¿Tengo que tener claro todo lo que necesito?', answer: 'No. Puedes venir con una idea, con una web que quieras renovar o con un problema que quieras resolver. Te ayudamos a ordenar prioridades y definir el siguiente paso.' },
  { question: '¿Podéis renovar mi web actual?', answer: 'Sí. Revisamos contigo qué funciona, qué quieres mejorar y qué necesitas conservar para plantear el rediseño.' },
  { question: '¿Podré editar los contenidos?', answer: 'Si necesitas gestionar textos, imágenes u otros contenidos, lo valoramos contigo y concretamos el sistema de edición en la propuesta.' },
  { question: '¿Cuánto tarda el proyecto?', answer: 'Como orientación, una web corporativa a medida puede estar lista en 2–4 semanas desde que tenemos los contenidos. Los proyectos con funcionalidades más complejas necesitan más tiempo. Te indicaremos el calendario en la propuesta.' },
  { question: '¿Trabajáis con consultas de mi ciudad?', answer: 'Trabajamos online con profesionales y centros de toda España. Podemos hablar por teléfono o videollamada y compartir los avances para revisarlos juntos.' },
  { question: '¿Puedo conectar una agenda de citas?', answer: 'Cuéntanos qué herramienta utilizas. Revisamos si podemos enlazarla o integrarla y te indicamos el alcance y los posibles costes externos antes de contratar.' },
  { question: '¿Pedir una propuesta tiene compromiso?', answer: 'No. La primera conversación es para conocernos y entender tu proyecto. Tú decides después de recibir la propuesta.' },
];
export default function LandingWebPsicologos() {
  usePageMeta('/landing-web-psicologos');
  return <>
    <HeroCta label='Diseño web para psicólogos' title={<>Una web que transmita confianza.<br />Y refleje tu forma de acompañar.</>}
      description={<><p>Presenta tu consulta, explica cómo trabajas y facilita que las personas interesadas den el primer paso para contactar contigo.</p><p className='mt-3 font-bold'>Diseño a medida para profesionales y centros de psicología. Explora nuestros proyectos del sector y una demo navegable.</p></>}
      convertFirstOnMobile buttonText='Cuéntanos tu proyecto' buttonHref='#contacto' heroType='form' hasButton formTitle='Hablemos de tu proyecto'
      formDescription='Déjanos tus datos y hablamos de lo que necesitas. Sin compromiso.' formSectionInfo='landing_web_psicologos' formSubmitLabel='Quiero hablar de mi proyecto' formId='contacto' hasBackground={false} hasReviewBadge isTopHero />
    <ServiceIncludes title='Tu consulta, con una presencia propia' intro='Una web clara y cercana que explique quién eres, qué servicios ofreces y cómo pedir información. Adaptamos el diseño a tu identidad y a tu forma de trabajar.' items={items} />
    <PortfolioAMedida ids={['noemi', 'somatica', 'demo-psicologia']} title='Ideas para la web de tu consulta' description='Dos proyectos reales de nuestro equipo y una demo sectorial para explorar. Entra y recorre cada web.' />
    <Team compact label='El equipo de 36WEB' title='Personas que se implican en tu proyecto' paragraphs={['Diseño y desarrollo trabajando juntos, con comunicación directa y revisiones contigo durante el proceso.']} />
    <Testimonials />
    <SEOProcess compact title='De tu idea a una web que te representa' subtitle='Nos cuentas tu proyecto. Le damos forma contigo. Revisas y publicamos.' steps={[
      {number:'1',title:'Entendemos lo que necesitas',description:'Hablamos de tu consulta, tus servicios y lo que esperas de la web. Te presentamos una propuesta personalizada antes de empezar.'},
      {number:'2',title:'Diseñamos y desarrollamos',description:'Transformamos lo acordado en una web con identidad propia. Compartimos los avances y revisamos contigo las decisiones importantes.'},
      {number:'3',title:'Revisamos y publicamos',description:'Comprobamos navegación, contenidos y formularios. Publicamos con tu aprobación y te acompañamos en la puesta en marcha.'},
    ]} />
    <div id='faq'><SEOFAQ title='Resolvemos tus dudas' faqs={faqs} /></div>
    <div id='contacto-final'><HeroCta title='Hablemos de la web de tu consulta' description='Cuéntanos dónde estás y qué quieres conseguir. Empezamos con una conversación.' buttonText='Cuéntanos tu proyecto' buttonHref='#contacto' heroType='form' hasButton={false} formTitle='Hablemos de tu proyecto' formDescription='Sin compromiso. Te llamamos para conocer tu idea.' formSectionInfo='landing_web_psicologos_final' formSubmitLabel='Quiero hablar de mi proyecto' hasBackground={false} hasReviewBadge={false} /></div>
  </>;
}
