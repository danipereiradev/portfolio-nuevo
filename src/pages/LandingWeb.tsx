import { useMemo } from 'react';
import {
  BadgeCheck,
  Clock,
  FileCheck,
  Handshake,
  LayoutTemplate,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import Portfolio from '../components/Portfolio';
import SEOBenefits from '../components/SEOBenefits';
import SEOFAQ from '../components/SEOFAQ';
import { Team } from '../components/Team';
import Testimonials from '../components/Testimonials';
import TrustBar from '../components/TrustBar';
import SEOProcess from '../components/SEOProcess';
import HeroCta from '../components/HeroCta';
import CompareVsAi from '../components/CompareVsAi';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { ADS_LANDING_PATH, SITE_WEB_PATH } from '../config/contact';

const landingTrustPoints = [
  { icon: Wallet, text: 'Desde 400 € + IVA' },
  { icon: Clock, text: 'Propuesta en 24–48 h' },
  { icon: ShieldCheck, text: 'Hosting incluido' },
  { icon: BadgeCheck, text: 'La web es tuya' },
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas el caso',
    description:
      'Formulario, WhatsApp o llamada. Qué haces y qué tiene que hacer la web. Aún no hay nada que pagar.',
  },
  {
    number: '2',
    title: 'Te mandamos la propuesta',
    description:
      'En 24–48 h laborables: precio, plazos y qué entra, por escrito. Si encaja, el 50% al aceptar y arrancamos. Si no, lo dices y no pasa nada.',
  },
  {
    number: '3',
    title: 'La montamos',
    description:
      'Con tu marca, tus textos y tus fotos. Si falta algo, te decimos qué necesitamos. Tú revisas.',
  },
  {
    number: '4',
    title: 'Se publica y queda tuya',
    description:
      'Conectamos el dominio, se ve bien en el móvil y te pueden escribir. La web es tuya.',
  },
];

const problems = [
  {
    icon: FileCheck,
    title: 'Precio y plazos, por escrito',
    description:
      'Antes de empezar: qué entra, cuánto sale y cuándo está. Sin packs hinchados ni “ya te digo”.',
  },
  {
    icon: LayoutTemplate,
    title: 'Una web tuya, no una plantilla',
    description:
      'Diseño a medida con tu marca, tus textos y tus fotos. Si buscas la de 79 € igual para todos, no somos eso.',
  },
  {
    icon: Handshake,
    title: 'Hablas con quien la monta',
    description:
      'Estudio pequeño. Te atiende el equipo que diseña y desarrolla, no un comercial que luego desaparece.',
  },
];

const faqs = [
  {
    question: '¿Es una plantilla igual para todos?',
    answer:
      'No. Se adapta a tu imagen, textos y fotos. Si solo quieres una plantilla barata, hay sitios mejores para eso.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer:
      'Presupuesto según alcance, no hay un pack fijo. Tras hablar te mandamos un número concreto por escrito. Orientación: muchas webs quedan entre 400 € y 3.000 € + IVA. El presupuesto es gratis.',
  },
  {
    question: '¿Hay que pagar para que me deis precio?',
    answer:
      'No. Primero hablamos, te mandamos la propuesta en 24–48 h laborables y decides. El 50% se paga al aceptar y arrancar; el resto, al publicar.',
  },
  {
    question: '¿Montáis WordPress, a medida o plantilla?',
    answer:
      'Lo que pida el caso. A medida cuando hace falta, WordPress u otra base si encaja mejor. No hay un stack único: te lo decimos en la propuesta, sin venderte lo más caro por sistema.',
  },
  {
    question: '¿Puedo editar la web yo después?',
    answer:
      'Sí. Te dejamos un panel sencillo para textos, fotos y cosas de día a día. Si prefieres no tocarla, el mantenimiento mensual es opcional.',
  },
  {
    question: '¿Me rehacéis la web que ya tengo?',
    answer:
      'Sí. Partimos de tu marca, textos, fotos y dominio, y montamos la nueva. No es un parche sobre la vieja.',
  },
  {
    question: '¿Quién prepara textos e imágenes?',
    answer:
      'Tú nos mandas lo que tengas. Lo ordenamos y lo metemos en la web. Redactar todo desde cero se valora aparte.',
  },
  {
    question: '¿Puedo usar mi dominio?',
    answer:
      'Sí, es tuyo. Lo configuramos o te ayudamos a registrar uno nuevo.',
  },
  {
    question: '¿El hosting está incluido?',
    answer: 'Sí, para publicar la web. Lo confirmamos en la propuesta.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'El plazo va por escrito en la propuesta. En webs como estas suele ser de 3 a 8 semanas cuando tenemos textos y fotos. Cuenta desde el arranque pagado, no desde el primer “hola”.',
  },
  {
    question: '¿Trabajáis solo en Madrid?',
    answer:
      'No. Trabajamos en remoto con clientes de toda España. Si estás en Madrid, también podemos vernos.',
  },
  {
    question: '¿Qué pasa cuando la web está online?',
    answer:
      'Te la entregamos funcionando: dominio, móvil, formulario o WhatsApp. El mantenimiento mensual es opcional.',
  },
  {
    question: '¿Y si quiero vender productos?',
    answer:
      'Eso es una tienda online, otro tipo de proyecto. Lo vemos en la conversación y te decimos si encaja o si hay que plantearlo aparte.',
  },
];

interface LandingWebProps {
  variant?: 'ads' | 'site';
}

const LandingWeb = ({ variant = 'ads' }: LandingWebProps) => {
  const isAds = variant === 'ads';
  usePageMeta(isAds ? ADS_LANDING_PATH : SITE_WEB_PATH);

  const faqJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }),
    [],
  );

  useJsonLd('jsonld-landing-web-faq', faqJsonLd);

  return (
    <>
      <HeroCta
        title='Web a medida para tu negocio. Precio y plazos por escrito.'
        description='Diseño propio, no plantilla. Hablas con quien la monta. Te decimos qué entra, cuánto sale y cuándo está, antes de cobrar nada.'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/img/web-design-charlesdeluvio.webp'
        heroType={isAds ? 'form' : 'clean'}
        hasButton={!isAds}
        formTitle='Te llamamos'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo={isAds ? 'LandingWeb Hero' : 'WebAMedida Hero'}
        hasBackground
        hasReviewBadge
        isTopHero
        showProjectType={isAds}
        highlights={[
          'Desde 400 € + IVA. Cerrado en la propuesta.',
          'Plazo por escrito. Suele ser 3–8 semanas.',
          'Propuesta en 24–48 h laborables.',
          'Hosting incluido. La web es tuya.',
        ]}
      />
      <TrustBar points={landingTrustPoints} />
      <SEOBenefits
        title='Si estás contratando una web, esto es lo que te llevas'
        subtitle='Precio cerrado, diseño a medida y trato directo. Lo que buscas cuando escribes “agencia de diseño web”.'
        benefits={problems}
      />
      <CompareVsAi />
      <SEOProcess
        title='Así se contrata la web'
        subtitle='Cuatro pasos. Sabes precio y plazos antes de empezar, y la web queda a tu nombre.'
        steps={processSteps}
      />

      <HeroCta
        title='¿Hablamos de tu web?'
        description='Cuéntanos qué haces y qué tiene que hacer la página. Te devolvemos propuesta en 24–48 h, con precio y plazos. Si no encaja, lo dices y no pasa nada.'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo={isAds ? 'LandingWeb CTA medio' : 'WebAMedida CTA medio'}
        hasBackground={false}
        hasReviewBadge={false}
        showProjectType
        formId={isAds ? undefined : 'contacto'}
      />

      <Team
        label={'TUS EXPERTOS EN DISEÑO WEB'}
        title='La montamos nosotros. Tú hablas con el equipo, no con un comercial.'
        paragraphs={[
          'Estudio pequeño en Madrid. Diseño, desarrollo y publicación con tu dominio. Una web lenta o confusa te cuesta clientes; por eso la hacemos clara, rápida y lista para que te escriban.',
        ]}
      />
      <Portfolio contained />
      <Testimonials />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='Te resolvemos todas tus dudas'
          faqs={faqs}
          ctaText='PEDIR PROPUESTA'
          ctaHref={isAds ? '#contacto-final' : '#contacto'}
        />
      </div>
      <HeroCta
        title='Cuando quieras, empezamos'
        description='Formulario, WhatsApp o llamada. Te devolvemos precio y plazos por escrito en 24–48 h. El 50% al aceptar; el resto, al publicar. La web queda a tu nombre.'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo={isAds ? 'LandingWeb CTA final' : 'WebAMedida CTA final'}
        hasBackground={false}
        hasReviewBadge
        showProjectType
        formId='contacto-final'
      />
    </>
  );
};

export default LandingWeb;
