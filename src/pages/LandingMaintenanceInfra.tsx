import { useEffect } from 'react';
import { Check, HardDrive, Server, ShieldCheck, Wrench } from 'lucide-react';
import SEOFAQ from '../components/SEOFAQ';
import Testimonials from '../components/Testimonials';
import TrustBar from '../components/TrustBar';
import HeroCta from '../components/HeroCta';
import MaintenanceInfraPaymentTable from '../components/MaintenanceInfraPaymentTable';
import MaintenanceInfraCtaActions from '../components/MaintenanceInfraCtaActions';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  ADS_MAINTENANCE_INFRA_FORM_ORIGIN,
  ADS_MAINTENANCE_INFRA_LANDING_PATH,
} from '../config/contact';
import {
  getMaintenanceInfraMonthlyLabel,
  getMaintenanceInfraSetupLabel,
  MAINTENANCE_INFRA_CONDITIONS,
  MAINTENANCE_INFRA_MONTHLY_INCLUDES,
  MAINTENANCE_INFRA_SETUP_INCLUDES,
} from '../config/maintenanceInfraOffer';
import { trackLandingMaintenanceInfraView } from '../utils/analytics';

const landingTrustPoints = [
  { icon: Wrench, text: getMaintenanceInfraMonthlyLabel() },
  { icon: Server, text: `Puesta en marcha ${getMaintenanceInfraSetupLabel()}` },
  { icon: ShieldCheck, text: 'Monitorización 24/7' },
  { icon: HardDrive, text: 'Backups externos' },
];

const IncludeList = ({ items }: { items: readonly string[] }) => (
  <ul className='space-y-2 text-base md:text-lg'>
    {items.map((item) => (
      <li key={item} className='flex items-start gap-2'>
        <Check className='mt-1 h-4 w-4 shrink-0 text-accent' aria-hidden />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const faqs = [
  {
    question: '¿Qué se paga ahora?',
    answer: `La puesta en marcha: ${getMaintenanceInfraSetupLabel()}, pago único. El mantenimiento mensual es ${getMaintenanceInfraMonthlyLabel()} y se activa al arrancar el servicio.`,
  },
  {
    question: '¿La monitorización 24/7 significa que alguien está de guardia?',
    answer:
      'No. La monitorización 24/7 es automatizada. La atención e intervención técnica se hace dentro del horario y de los tiempos de respuesta establecidos.',
  },
  {
    question: '¿Las 2 horas mensuales se acumulan?',
    answer: 'No. Las 2 horas mensuales no son acumulables.',
  },
  {
    question: '¿El hosting y el correo van incluidos en el precio?',
    answer:
      'No. No están incluidos los costes de hosting, dominio, correo, licencias o servicios de terceros. Nosotros gestionamos la parte técnica.',
  },
  {
    question: '¿Y si hay que hacer una web nueva o un desarrollo?',
    answer:
      'Nuevos desarrollos, rediseños, nuevas funcionalidades o trabajos fuera del mantenimiento habitual se presupuestan aparte.',
  },
  {
    question: '¿Qué pasa si la web ya tiene un problema grave?',
    answer:
      'Si durante la puesta en marcha se detecta malware, una instalación previamente comprometida o una incidencia grave preexistente, se valora antes de hacer trabajos adicionales.',
  },
];

const LandingMaintenanceInfra = () => {
  usePageMeta(ADS_MAINTENANCE_INFRA_LANDING_PATH);

  useEffect(() => {
    trackLandingMaintenanceInfraView();
  }, []);

  return (
    <>
      <HeroCta
        label='Mantenimiento'
        title='Mantenimiento Negocio + Infraestructura'
        description={
          <>
            <p>
              WordPress, hosting, correo y seguridad. Nosotros lo cuidamos.
              Precio cerrado.
            </p>
            <ul className='mt-2 space-y-1 font-extrabold'>
              <li>Puesta en marcha: {getMaintenanceInfraSetupLabel()}</li>
              <li>Mensual: {getMaintenanceInfraMonthlyLabel()}</li>
            </ul>
            <ul className='mt-4 space-y-1 text-center text-base font-bold md:text-left md:text-lg'>
              <li>Monitorización automatizada 24/7</li>
              <li>Copias externas y hasta 6 correos</li>
              <li>Hasta 2 horas al mes de soporte</li>
            </ul>
          </>
        }
        mobileDescription={
          <>
            <p>WordPress, hosting, correo y seguridad. Precio cerrado.</p>
            <ul className='mt-2 space-y-1 font-extrabold'>
              <li>Puesta en marcha: {getMaintenanceInfraSetupLabel()}</li>
              <li>Mensual: {getMaintenanceInfraMonthlyLabel()}</li>
            </ul>
          </>
        }
        mobileProof={
          <ul className='space-y-1 text-center text-base font-bold'>
            <li>Monitorización automatizada 24/7</li>
            <li>Copias externas y hasta 6 correos</li>
            <li>Hasta 2 horas al mes de soporte</li>
          </ul>
        }
        convertFirstOnMobile
        buttonText='Pagar puesta en marcha'
        buttonHref='#precio'
        backgroundUrl='/video/hero-nubes.jpg'
        videoUrl='/video/hero-nubes-loop.mp4'
        heroType='form'
        hasButton={false}
        formTitle='Nosotros te llamamos'
        formDescription='Te contamos cómo se activa. Sin compromiso.'
        formSectionInfo={ADS_MAINTENANCE_INFRA_FORM_ORIGIN}
        formSubmitLabel='Quiero información'
        formId='contacto'
        hasBackground
        overlay='none'
        hasReviewBadge
        isTopHero
      />

      <TrustBar points={landingTrustPoints} />

      <section id='incluye' className='page-section bg-surface-muted'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Qué incluye el mantenimiento mensual
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              Servicio mensual — Mantenimiento Negocio + Infraestructura.{' '}
              <strong className='font-extrabold'>
                {getMaintenanceInfraMonthlyLabel()}
              </strong>
              .
            </p>
          </div>
          <article className='mx-auto w-full max-w-4xl rounded-lg border-2 border-ink-dark bg-white p-content-pad'>
            <IncludeList items={MAINTENANCE_INFRA_MONTHLY_INCLUDES} />
          </article>
        </div>
      </section>

      <section id='puesta-en-marcha' className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Puesta en marcha inicial
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              <strong className='font-extrabold'>
                {getMaintenanceInfraSetupLabel()}
              </strong>
              {' — '}
              pago único. Validamos el estado técnico antes de asumir el
              mantenimiento.
            </p>
          </div>
          <article className='mx-auto w-full max-w-4xl rounded-lg border-2 border-ink-dark bg-white p-content-pad'>
            <IncludeList items={MAINTENANCE_INFRA_SETUP_INCLUDES} />
          </article>
        </div>
      </section>

      <section id='condiciones' className='page-section bg-surface-muted'>
        <div className='container mx-auto max-w-4xl'>
          <div className='page-title-block mx-auto text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Condiciones
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              Alcance cerrado. Lo que no entra, se presupuesta.
            </p>
          </div>
          <ul className='mt-10 space-y-4 text-base text-ink-dark md:text-lg'>
            {MAINTENANCE_INFRA_CONDITIONS.map((item) => (
              <li key={item} className='flex items-start gap-3'>
                <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />

      <div id='precio'>
        <HeroCta
          title='Resumen económico'
          belowDescription={<MaintenanceInfraPaymentTable />}
          ctaContent={
            <MaintenanceInfraCtaActions
              location='MaintenanceInfraPrecio'
              align='center'
            />
          }
          heroType='clean'
          hasButton={false}
          hasBackground={false}
          hasReviewBadge
        />
      </div>

      <div id='faq'>
        <SEOFAQ
          title='Lo que suele preguntar quien contrata el mantenimiento'
          faqs={faqs}
          ctaText='Pagar puesta en marcha'
          ctaHref='#precio'
        />
      </div>

      <div id='contacto-final'>
        <HeroCta
          title='¿Quieres que lo veamos antes de pagar?'
          description={
            <>
              Nombre y teléfono. Te llamamos y te decimos cómo se activa.{' '}
              <strong className='font-extrabold'>Sin compromiso.</strong>
            </>
          }
          buttonText='Quiero información'
          buttonHref='#contacto'
          heroType='form'
          hasButton={false}
          formTitle='Nosotros te llamamos'
          formDescription='Te escribimos en horario laboral.'
          formSectionInfo={ADS_MAINTENANCE_INFRA_FORM_ORIGIN}
          formSubmitLabel='Quiero información'
          hasBackground={false}
          hasReviewBadge
        />
      </div>
    </>
  );
};

export default LandingMaintenanceInfra;
