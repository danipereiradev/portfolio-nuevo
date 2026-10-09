import { useState } from 'react';
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
import {
  ADS_CUSTOM_WEB_EXIT_FORM_ORIGIN,
  buildWhatsAppUrl,
} from '../config/contact';

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
      'Como orientación, una web puede costar entre 350 y 3.000 € + IVA, según el diseño y las funcionalidades. Cuéntanos qué necesitas y recibirás un presupuesto personalizado por escrito antes de decidir.',
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
  usePageMeta('/landing-web-a-medida');
  const [showcaseIds] = useState(() =>
    pickRandomProjectIds(
      ALL_SHOWCASE_PROJECT_IDS,
      ALL_SHOWCASE_PROJECT_IDS.length,
    ),
  );
  return (
    <>
      <HeroCta
        label='Diseño y desarrollo web a medida'
        title='Diseño web a medida para tu negocio'
        description='Diseñamos y desarrollamos tu web con una identidad propia y las funcionalidades que necesita tu proyecto. Cuéntanos tu idea y te orientamos.'
        belowDescription={
          <p className='inline-flex items-center justify-center gap-2 rounded-lg border border-accent bg-white px-4 py-3 font-bold text-accent mx-auto md:mx-0'>
            <ShieldCheck size={24} aria-hidden='true' /> Garantía técnica de
            60 días
          </p>
        }
        ctaContent={<WhatsAppContact />}
        convertFirstOnMobile
        buttonText='Cuéntanos tu proyecto'
        buttonHref='#contacto'
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
      <ServiceIncludes
        title='Una web pensada para tu negocio'
        intro='Empezamos por entender tus objetivos. A partir de ahí, damos forma al diseño, los contenidos y la experiencia que necesita tu proyecto.'
        items={items}
      />
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
      <Team
        compact
        label='El equipo de 36WEB'
        title='Personas que se implican en tu proyecto'
        paragraphs={[
          'Diseño y desarrollo trabajando juntos, con comunicación directa y revisiones contigo durante el proceso.',
        ]}
      />
      <Testimonials />
      <SEOProcess
        compact
        title='De tu idea a una web que te representa'
        subtitle='Nos cuentas tu proyecto. Le damos forma contigo. Revisas y publicamos.'
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
              'Comprobamos navegación, contenidos y formularios. Publicamos con tu aprobación y te acompañamos en la puesta en marcha.',
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
