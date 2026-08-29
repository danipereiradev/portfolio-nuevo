import { useMemo } from 'react';
import {
  BadgeCheck,
  Clock,
  Handshake,
  ShieldCheck,
  Wrench,
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
import { ADS_MAINTENANCE_LANDING_PATH } from '../config/contact';

const landingTrustPoints = [
  { icon: ShieldCheck, text: 'Actualizaciones y copias' },
  { icon: Clock, text: 'Propuesta el mismo día' },
  { icon: Wrench, text: 'Cambios pequeños incluidos' },
  { icon: BadgeCheck, text: 'Cancelas cuando quieras' },
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas la web',
    description:
      'Formulario, WhatsApp o llamada. Qué tienes ahora y qué te falla. Aún no hay nada que pagar.',
  },
  {
    number: '2',
    title: 'Te mandamos la propuesta',
    description:
      'Te devolvemos propuesta en el mismo día: cuota, qué entra y desde cuándo, por escrito. Si encaja, arrancamos. Si no, lo dices y no pasa nada.',
  },
  {
    number: '3',
    title: 'Activamos el plan',
    description:
      'Miramos hosting, copias y actualizaciones. Si hay algo urgente, te lo decimos antes de dejarlo en marcha.',
  },
  {
    number: '4',
    title: 'Mes a mes',
    description:
      'Actualizamos, copiamos, cambiamos lo del plan y respondemos cuando algo falla. La web sigue siendo tuya.',
  },
];

const problems = [
  {
    icon: ShieldCheck,
    title: 'Que no se rompa sola',
    description:
      'Actualizaciones, copias y que siga online. Una web sin cuidar es un problema esperando.',
  },
  {
    icon: Wrench,
    title: 'Cambios sin abrir un proyecto',
    description:
      'Un texto, una foto, un teléfono. Lo de día a día entra en el plan. Páginas nuevas, aparte y con precio antes.',
  },
  {
    icon: Handshake,
    title: 'Hablas con quien la mira',
    description:
      'Estudio pequeño. Te atiende el equipo, no un comercial que luego desaparece ni un ticket eterno.',
  },
];

const faqs = [
  {
    question: '¿Qué entra en el mantenimiento?',
    answer:
      'Actualizaciones, copias, que siga online, cambios pequeños de textos y fotos, y soporte. El detalle va en la propuesta.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer:
      'Cuota mensual según la web y los cambios. No hay un pack fijo. Tras hablar te mandamos un número concreto por escrito. El presupuesto es gratis.',
  },
  {
    question: '¿Hay que pagar para que me deis precio?',
    answer:
      'No. Primero hablamos, te mandamos la propuesta el mismo día y decides. Si encaja, arrancamos el plan.',
  },
  {
    question: '¿Mantenéis una web que no hicisteis vosotros?',
    answer:
      'Sí, en muchos casos. Primero la miramos. Si se puede mantener bien, te lo decimos. Si es un pozo, también.',
  },
  {
    question: '¿Es obligatorio?',
    answer:
      'No. Recomendable, pero opcional. Sin el plan la web sigue siendo tuya y puede seguir online.',
  },
  {
    question: '¿Qué pasa si cancelo?',
    answer:
      'La web no se apaga. Dejas de tener actualizaciones, copias, soporte y los cambios del plan.',
  },
  {
    question: '¿Cuántos cambios de textos entran?',
    answer:
      'Los del plan: cambios pequeños. Una página nueva o un rediseño se presupuesta aparte.',
  },
  {
    question: '¿El hosting está incluido?',
    answer:
      'Depende del plan. Lo confirmamos en la propuesta. El dominio es tuyo.',
  },
  {
    question: '¿Y si la web se cae?',
    answer:
      'En horario laboral lo vemos pronto. No vendemos un SLA de gran empresa. Si está caída, es lo primero.',
  },
  {
    question: '¿Trabajáis solo en Madrid?',
    answer:
      'No. Trabajamos en remoto con clientes de toda España. Si estás en Madrid, también podemos vernos.',
  },
  {
    question: '¿WordPress, tienda o a medida?',
    answer:
      'Lo que pida el caso. Primero vemos la web; luego te decimos si podemos cogerla.',
  },
  {
    question: '¿Y si lo que necesito es una web nueva?',
    answer:
      'Eso es un proyecto de diseño web, otro servicio. Lo vemos en la conversación y te decimos si encaja o si hay que plantearlo aparte.',
  },
];

const LandingMaintenance = () => {
  usePageMeta(ADS_MAINTENANCE_LANDING_PATH);

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

  useJsonLd('jsonld-landing-maintenance-faq', faqJsonLd);

  return (
    <>
      <HeroCta
        title='Mantenimiento web. Cuota y alcance por escrito.'
        description='Actualizaciones, copias y alguien a quien escribir cuando falla. Hablas con quien la mira. Te decimos qué entra y cuánto sale, antes de cobrar nada.'
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        backgroundUrl='/img/hero/hero-mantenimiento-36web.webp'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='Landing mantenimiento web — Hero'
        hasBackground
        grayscale
        overlay='black'
        hasReviewBadge
        isTopHero
        highlights={[
          'Cuota mensual. Cerrada en la propuesta.',
          'Actualizaciones, copias y soporte.',
          'Webs propias o de otros.',
          'Propuesta en el mismo día.',
        ]}
      />
      <TrustBar points={landingTrustPoints} />
      <SEOBenefits
        title='Si estás contratando mantenimiento web, esto es lo que te llevas'
        subtitle='Cuota clara, web cuidada y trato directo. Lo que buscas cuando escribes “mantenimiento de páginas web”.'
        benefits={problems}
      />
      <CompareVsAi />
      <SEOProcess
        title='Así se contrata el mantenimiento'
        subtitle='Cuatro pasos. Sabes la cuota y lo que entra antes de empezar. Cancelas cuando quieras.'
        steps={processSteps}
      />

      <HeroCta
        title='¿Hablamos de tu web?'
        description={
          <>
            Cuéntanos qué tienes ahora y qué te preocupa. Te devolvemos{' '}
            <strong className='font-extrabold'>propuesta</strong>{' '}
            <strong className='font-extrabold'>en el mismo día</strong>, con
            cuota y alcance. Si no encaja, lo dices y no pasa nada.
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='Landing mantenimiento web — CTA medio'
        hasBackground={false}
        hasReviewBadge={false}
      />

      <Team
        label={'TUS EXPERTOS EN MANTENIMIENTO WEB'}
        title='Trato directo durante todo el proyecto.'
        paragraphs={[
          <>
            Desde la primera reunión, podrás hablar directamente con{' '}
            <strong className='font-extrabold'>
              la persona encargada de tu mantenimiento
            </strong>{' '}
            por{' '}
            <strong className='font-extrabold'>
              email, teléfono o videollamada
            </strong>
            .
          </>,
        ]}
      />
      <Portfolio casos contained />
      <Testimonials hasVideo />

      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ
          title='No te vayas quedándote con dudas'
          faqs={faqs}
          ctaText='PEDIR PROPUESTA'
          ctaHref='#contacto'
        />
      </div>
      <HeroCta
        title='Cuando quieras, empezamos'
        description={
          <>
            Formulario, WhatsApp o llamada. Te devolvemos cuota y alcance por
            escrito{' '}
            <strong className='font-extrabold'>en el mismo día</strong>. El
            mantenimiento es mensual; cancelas cuando quieras. La web sigue
            siendo tuya.
          </>
        }
        buttonText='PEDIR PROPUESTA'
        buttonHref='#contacto'
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='Landing mantenimiento web — CTA final'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default LandingMaintenance;
