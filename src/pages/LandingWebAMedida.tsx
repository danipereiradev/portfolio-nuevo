import { useState } from 'react';
import { Globe, MessageCircle, Search, ShieldCheck, Smartphone, Layers } from 'lucide-react';
import HeroCta from '../components/HeroCta';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import Portfolio, {
  ALL_SHOWCASE_PROJECT_IDS,
  pickRandomProjectIds,
} from '../components/Portfolio';
import LaunchExitPopup from '../components/LaunchExitPopup';
import { usePageMeta } from '../hooks/usePageMeta';
import { ADS_CUSTOM_WEB_EXIT_FORM_ORIGIN } from '../config/contact';

const items = [
  { icon: Layers, title: 'Diseño con identidad', description: 'Una presencia que refleja quién eres y ayuda a entender por qué elegir tu negocio.' },
  { icon: Smartphone, title: 'Cómoda en cualquier pantalla', description: 'Pensamos cada recorrido para que navegar y contactar sea fácil también desde el móvil.' },
  { icon: MessageCircle, title: 'Cada página tiene un propósito', description: 'Ordenamos tus servicios y tus mensajes para llevar al visitante hacia el siguiente paso.' },
  { icon: Search, title: 'Una base técnica cuidada', description: 'Velocidad, estructura y contenido pensados para las personas y los buscadores.' },
  { icon: Globe, title: 'Desarrollo según tu proyecto', description: 'Estudiamos las funcionalidades e integraciones que necesitas y te proponemos cómo resolverlas.' },
  { icon: ShieldCheck, title: 'Acompañamiento de principio a fin', description: 'Hablas con el equipo, revisas los avances y apruebas la web antes de publicarla.' },
];
const faqs = [
  { question: '¿Cuánto cuesta una web a medida?', answer: 'Depende de lo que necesite tu proyecto. Primero hablamos de tus objetivos, diseño y funcionalidades. Después recibes una propuesta personalizada, con presupuesto y condiciones por escrito antes de decidir.' },
  { question: '¿Tengo que tener claro todo lo que necesito?', answer: 'No. Puedes venir con una idea, con una web que quieras renovar o con un problema que quieras resolver. Te ayudamos a ordenar prioridades y definir el siguiente paso.' },
  { question: '¿Podéis renovar mi web actual?', answer: 'Sí. Revisamos contigo qué funciona, qué quieres mejorar y qué necesitas conservar para plantear el rediseño.' },
  { question: '¿Podré editar los contenidos?', answer: 'Si necesitas gestionar textos, imágenes u otros contenidos, lo valoramos contigo y concretamos el sistema de edición en la propuesta.' },
  { question: '¿Cuánto tarda el proyecto?', answer: 'Como orientación, una web corporativa a medida puede estar lista en 2–4 semanas desde que tenemos los contenidos. Los proyectos con funcionalidades más complejas necesitan más tiempo. Te indicaremos el calendario en la propuesta.' },
  { question: '¿Trabajáis con empresas de mi ciudad?', answer: 'Trabajamos online con negocios de toda España. Podemos hablar por teléfono o videollamada y compartir los avances para revisarlos juntos.' },
  { question: '¿Pedir una propuesta tiene compromiso?', answer: 'No. La primera conversación es para conocernos y entender tu proyecto. Tú decides después de recibir la propuesta.' },
];
export default function LandingWebAMedida() {
  usePageMeta('/landing-web-a-medida');
  const [showcaseIds] = useState(() =>
    pickRandomProjectIds(
      ALL_SHOWCASE_PROJECT_IDS,
      ALL_SHOWCASE_PROJECT_IDS.length,
    ),
  );
  return <>
    <HeroCta label='Diseño y desarrollo web a medida' title={<>Tu negocio no es como los demás.<br />Tu web tampoco debería serlo.</>}
      description={<><p>Una web que represente tu marca, explique lo que haces y facilite que tus próximos clientes contacten contigo.</p><p className='mt-3 font-bold'>Diseño con personalidad. Desarrollo pensado para tu proyecto. Trato directo con el equipo.</p></>}
      convertFirstOnMobile buttonText='Cuéntanos tu proyecto' buttonHref='#contacto' heroType='form' hasButton formTitle='Hablemos de tu proyecto'
      formDescription='Déjanos tus datos y hablamos de lo que necesitas. Sin compromiso.' formSectionInfo='landing_web_a_medida' formSubmitLabel='Quiero hablar de mi proyecto' formId='contacto' hasBackground={false} hasReviewBadge isTopHero />
    <ServiceIncludes title='Una web pensada para tu negocio' intro='Empezamos por entender tus objetivos. A partir de ahí, damos forma al diseño, los contenidos y la experiencia que necesita tu proyecto.' items={items} />
    <Portfolio
      ids={showcaseIds}
      pageSize={3}
      headingLabel='Portfolio'
      headingTitle='Proyectos de diseño web'
      headingDescription={
        <>
          Mira todos los diseños, de 3 en 3, sin salir de esta página. Cada
          proyecto se diseña a medida del negocio.
        </>
      }
      ctaText='Hablemos de mi proyecto'
      ctaHref='#contacto'
    />
    <Team compact label='El equipo de 36WEB' title='Personas que se implican en tu proyecto' paragraphs={['Diseño y desarrollo trabajando juntos, con comunicación directa y revisiones contigo durante el proceso.']} />
    <Testimonials />
    <SEOProcess compact title='De tu idea a una web que te representa' subtitle='Nos cuentas tu proyecto. Le damos forma contigo. Revisas y publicamos.' steps={[
      {number:'1',title:'Entendemos lo que necesitas',description:'Hablamos de tu negocio, tus objetivos y lo que esperas de la web. Te presentamos una propuesta personalizada antes de empezar.'},
      {number:'2',title:'Diseñamos y desarrollamos',description:'Transformamos lo acordado en una web con identidad propia. Compartimos los avances y revisamos contigo las decisiones importantes.'},
      {number:'3',title:'Revisamos y publicamos',description:'Comprobamos navegación, contenidos y formularios. Publicamos con tu aprobación y te acompañamos en la puesta en marcha.'},
    ]} />
    <div id='faq'><SEOFAQ title='Resolvemos tus dudas' faqs={faqs} /></div>
    <div id='contacto-final'><HeroCta title='Demos forma a tu próxima web' description='Cuéntanos dónde estás y qué quieres conseguir. Empezamos con una conversación.' buttonText='Cuéntanos tu proyecto' buttonHref='#contacto' heroType='form' hasButton={false} formTitle='Hablemos de tu proyecto' formDescription='Sin compromiso. Te llamamos para conocer tu idea.' formSectionInfo='landing_web_a_medida_final' formSubmitLabel='Quiero hablar de mi proyecto' hasBackground={false} hasReviewBadge={false} /></div>
    <LaunchExitPopup origin={ADS_CUSTOM_WEB_EXIT_FORM_ORIGIN} />
  </>;
}
