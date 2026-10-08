import { useEffect, useMemo } from 'react';
import {
  Globe,
  MessageCircle,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { Team } from '../components/Team';
import Button from '../components/Button';
import LaunchPaymentTable from '../components/LaunchPaymentTable';
import SEOFAQ from '../components/SEOFAQ';
import SEOProcess from '../components/SEOProcess';
import { ContactFormHero } from '../components/ContactFormHero';
import { ServiceIncludes } from '../components/ServiceOnPage';
import { allTestimonials } from '../data/testimonials';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import {
  ADS_LAUNCH_LANDING_PATH,
  buildWhatsAppUrl,
  ADS_LAUNCH_WHATSAPP_MESSAGE,
} from '../config/contact';
import {
  trackLandingPromo590View,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';

// Oferta de esta landing; no modifica los paquetes inmobiliarios ni pagos existentes.
const getLaunchPriceAmountLabel = () => '399 € + IVA';
const getLaunchInstallmentLabel = () => '199,50 € + IVA';
const LAUNCH_DELIVERY_LABEL = '1–2 semanas';
const FORM_ORIGIN = 'landing web servicios 399';
const includes = [
  {
    icon: Smartphone,
    title: 'Se ve bien en móvil',
    description:
      'Diseño responsive para que se vea y funcione bien desde el teléfono.',
  },
  {
    icon: MessageCircle,
    title: 'Formulario y WhatsApp',
    description:
      'Incluimos formulario y botón de WhatsApp para facilitar el contacto.',
  },
  {
    icon: Share2,
    title: 'Tus redes sociales',
    description: 'Conectamos Instagram, Facebook y las redes que utilices.',
  },
  {
    icon: Search,
    title: 'Preparada para Google y rápida',
    description:
      'Títulos, encabezados y una página que carga rápido, para que te encuentren y te escriban.',
  },
  {
    icon: Globe,
    title: 'Publicación',
    description:
      'Hosting y dominio (.es o .com) incluidos el primer año. También podemos publicar en tu hosting.',
  },
  {
    icon: ShieldCheck,
    title: 'Revisión antes de publicar',
    description:
      'Revisamos contigo el diseño y los contenidos para que la web represente bien tu negocio.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas tu negocio',
    description: (
      <>
        Hablamos sin compromiso. Si decides contratar, confirmamos alcance,
        plazos y condiciones antes del anticipo.{' '}
        <strong className='font-extrabold'>
          {getLaunchPriceAmountLabel()}. Te lo cerramos por escrito
        </strong>
        .
      </>
    ),
  },
  {
    number: '2',
    title: 'Montamos y adaptamos',
    description: (
      <>
        Adaptamos la web a tu negocio y te ayudamos a preparar los textos para
        explicar tus servicios con claridad.{' '}
        <strong className='font-extrabold'>
          El plazo de {LAUNCH_DELIVERY_LABEL} empieza aquí
        </strong>
        .
      </>
    ),
  },
  {
    number: '3',
    title: 'Revisas y publicamos',
    description: (
      <>
        Revisamos juntos la web, ajustamos lo acordado y la publicamos con tu
        aprobación.
      </>
    ),
  },
];

const faqs = [
  {
    question: '¿Qué cubre la garantía técnica de 60 días?',
    answer:
      'Durante los 60 días posteriores a la publicación corregimos sin coste los fallos de funcionamiento atribuibles a nuestra entrega, dentro del alcance acordado: formularios, enlaces y visualización en móvil, tablet y ordenador. No incluye nuevas secciones, cambios de diseño o contenido, mantenimiento ni incidencias causadas por modificaciones de terceros o servicios externos. No es una garantía de visitas, ventas ni posicionamiento.',
  },
  {
    question: '¿Tengo que pagar para pedir información?',
    answer:
      'No. La primera conversación es sin compromiso y sin pagar. Si decides contratar, te enviamos alcance, plazos y condiciones por escrito antes de abonar el primer tramo.',
  },
  {
    question: '¿Trabajáis con negocios de mi ciudad?',
    answer:
      'Trabajamos online con negocios de toda España. Puedes gestionar tu propuesta por email o WhatsApp.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer: `El precio cerrado es de ${getLaunchPriceAmountLabel()}. No hay sorpresas, ni letra pequeña, ni costes ocultos. Te lo cerramos por escrito antes de empezar, para que sepas exactamente lo que pagas de principio a fin. Ecommerce, desarrollo a medida o tiendas online con catálogos grandes se presupuestan aparte.`,
  },
  {
    question: '¿Cuánto tarda?',
    answer: `Tu web está lista y publicada en ${LAUNCH_DELIVERY_LABEL}. El plazo empieza cuando nos das la información básica de tu negocio (fotos, textos e ideas). Los plazos van por escrito.`,
  },
  {
    question: '¿Y si no tengo los textos preparados?',
    answer:
      'Te ayudamos a preparar los textos de tu web a partir de lo que nos cuentes sobre tu negocio y tus servicios. Los revisamos contigo antes de publicar.',
  },
  {
    question: '¿Cómo se paga?',
    answer: `Dos tramos fijos: ${getLaunchInstallmentLabel()} al empezar, para poner en marcha el diseño, y ${getLaunchInstallmentLabel()} antes de publicar. El último pago solo lo haces cuando has revisado la web y estás conforme con el resultado.`,
  },
  {
    question: '¿El hosting y el dominio están incluidos?',
    answer:
      'Sí. El primer año incluye hosting y registro de dominio (.es o .com). A partir del segundo año se renuevan aparte; te indicamos su coste por escrito antes de contratar. No es obligatorio contratar mantenimiento. Si ya tienes hosting, la montamos ahí sin coste.',
  },
  {
    question: '¿La web es mía? ¿Puedo pedir cambios?',
    answer:
      'Sí, la web es tuya. Sin suscripción ni permanencia mensual. Al terminar te entregamos los accesos. Podrás cambiar textos e imágenes desde el panel. Cambios posteriores o secciones nuevas se presupuestan aparte.',
  },
];

const projects = [
  {
    name: 'Noemí Bonet · Psicología',
    image: 'noemi',
    url: 'https://noemibonetpsicologia.com/',
    description:
      'Presentación de la profesional y sus servicios de psicología, con una estructura clara para conocer su enfoque y contactar.',
  },
  {
    name: 'Hatena · Clínica veterinaria',
    image: 'hatena',
    url: 'https://hatena.es/',
    description:
      'Una web para presentar la clínica, explicar sus servicios y facilitar que los dueños de mascotas encuentren cómo contactar.',
  },
  {
    name: 'Noma · Abogados',
    image: 'noma',
    url: 'https://nomaabogados.com/',
    description:
      'Presentación del despacho y sus áreas de práctica para que quien necesita asesoramiento pueda conocer al equipo y consultar.',
  },
];

const WhatsAppCta = () => {
  const url = buildWhatsAppUrl(ADS_LAUNCH_WHATSAPP_MESSAGE);
  return (
    <Button
      href={url}
      variant='outline'
      className='!m-0 !w-full md:!w-auto'
      onClick={(e) => {
        e.preventDefault();
        trackWhatsAppClick(FORM_ORIGIN);
        trackGoogleAdsWhatsAppConversion(url);
      }}
    >
      <MessageCircle size={20} aria-hidden='true' /> Preguntar por WhatsApp
    </Button>
  );
};
const Actions = ({ centered = false }: { centered?: boolean }) => (
  <div
    className={`flex flex-wrap justify-center gap-3 ${
      centered ? '' : 'md:justify-start'
    }`}
  >
    <Button href='#contacto' className='!m-0 !w-full md:!w-auto'>
      Recibir una propuesta para mi negocio
    </Button>
    <WhatsAppCta />
  </div>
);

export default function LandingWebProfesional() {
  usePageMeta(ADS_LAUNCH_LANDING_PATH);
  useEffect(() => {
    trackLandingPromo590View();
  }, []);
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    }),
    [],
  );
  useJsonLd('jsonld-landing-web-profesional-faq', schema);
  return (
    <>
      <section id='hero' className='page-hero bg-accent-light text-ink-dark'>
        <div className='container mx-auto grid items-center gap-8 lg:grid-cols-2'>
          <div className='space-y-4 md:space-y-6 text-center md:text-left'>
            <p className='font-extrabold uppercase text-accent'>
              Para estrenar o renovar tu web de servicios
            </p>
            <h1 className='text-3xl font-extrabold md:text-5xl lg:text-6xl'>
              Una web a la altura de tu negocio.{' '}
              <span className='block mt-3 text-accent'>399 € + IVA.</span>
            </h1>
            <a
              href='https://noemibonetpsicologia.com/'
              target='_blank'
              rel='noopener noreferrer'
              data-ads-outbound='allow'
              className='block lg:hidden'
            >
              <img
                src='/img/portfolio/new/noemi.webp'
                alt='Proyecto real: web de Noemí Bonet en ordenador, tablet y móvil'
                fetchPriority='high'
                className='mx-auto h-40 w-auto rounded-lg'
              />
              <span className='text-sm text-accent underline'>
                Ver proyecto real: Noemí Bonet ↗
              </span>
            </a>
            <p className='text-xl md:text-2xl'>
              Presenta lo que haces, transmite confianza y facilita que te
              contacten. Diseñamos y publicamos tu web, contigo en cada paso.
            </p>
            <p className='text-lg font-bold'>
              Hasta 5 secciones · Lista en 1–2 semanas desde recibir el material
              · Hosting y dominio el primer año
            </p>
            <p className='inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-bold text-accent border border-accent'>
              <ShieldCheck size={24} aria-hidden='true' /> Garantía técnica de
              60 días
            </p>
            <Actions />
            <p>
              Alcance, precio y plazo por escrito. Sin compromiso ni pago para
              pedir información.
            </p>
          </div>
          <figure className='hidden lg:block rounded-2xl border border-gray-200 bg-white p-4 shadow-lg'>
            <img
              src='/img/portfolio/new/noemi.webp'
              alt='Proyecto real de Noemí Bonet Psicología en ordenador, tablet y móvil'
              className='w-full rounded-lg'
              fetchPriority='high'
              width={1200}
              height={900}
            />
            <figcaption className='mt-3 text-center'>
              <strong>Noemí Bonet · Psicología</strong>
              <p className='mt-1'>
                Un proyecto real de nuestro equipo. Tu web se adapta a tu
                negocio.
              </p>
              <a
                href='https://noemibonetpsicologia.com/'
                target='_blank'
                rel='noopener noreferrer'
                data-ads-outbound='allow'
                className='mt-2 inline-block font-bold text-accent underline'
              >
                Visitar esta web ↗
              </a>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className='page-section text-ink-dark'>
        <div className='container mx-auto max-w-5xl text-center space-y-5'>
          <h2 className='text-3xl md:text-4xl font-extrabold'>
            Tu negocio funciona. Ahora tu web tiene que representarlo.
          </h2>
          <p className='text-xl md:text-2xl'>
            Si aún no tienes web, o la que tienes se ha quedado atrás, te
            ayudamos a explicar tus servicios y dar una buena primera impresión
            cuando alguien te busca.
          </p>
          <p className='text-lg'>
            Una web de presentación para profesionales, consultas, despachos y
            negocios de servicios. Sin tienda online, áreas privadas ni
            integraciones a medida: esas necesidades se valoran aparte.
          </p>
        </div>
      </section>
      <ServiceIncludes
        title='Lo necesario para presentar bien tu negocio'
        intro='399 € + IVA, precio cerrado para una web de hasta cinco secciones. Revisamos contigo los contenidos y dejamos por escrito lo que vamos a entregar antes de empezar.'
        items={includes}
      />
      <section id='portfolio' className='page-section text-ink-dark'>
        <div className='container mx-auto space-y-8'>
          <div className='page-title-block text-center'>
            <h2 className='text-3xl md:text-4xl font-extrabold'>
              Así presentamos otros negocios de servicios
            </h2>
            <p className='text-xl md:text-2xl'>
              Tres proyectos reales que puedes visitar. Son referencias de
              nuestro trabajo; tu propuesta concreta las secciones y funciones
              incluidas en el paquete.
            </p>
          </div>
          <div className='grid gap-6 md:grid-cols-3'>
            {projects.map((project) => (
              <article
                key={project.image}
                className='flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm'
              >
                <img
                  src={`/img/portfolio/new/${project.image}.webp`}
                  alt={`Web de ${project.name} en ordenador, tablet y móvil`}
                  loading='lazy'
                  className='w-full'
                />
                <div className='p-6 flex flex-col gap-4 flex-1'>
                  <h3 className='text-2xl font-bold'>{project.name}</h3>
                  <p className='flex-1'>{project.description}</p>
                  <a
                    href={project.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    data-ads-outbound='allow'
                    className='font-bold text-accent underline'
                  >
                    Visitar la web ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
          <Actions centered />
        </div>
      </section>
      <section
        id='testimonials'
        className='page-section bg-accent-light text-ink-dark'
      >
        <div className='container mx-auto space-y-8'>
          <div className='page-title-block text-center'>
            <h2 className='text-3xl md:text-4xl font-extrabold'>
              Lo que cuentan quienes han trabajado con nosotros
            </h2>
            <p className='text-xl md:text-2xl'>
              Opiniones reales sobre el trabajo y el trato recibido.
            </p>
          </div>
          <div className='grid gap-6 md:grid-cols-2'>
            {allTestimonials
              .filter((t) => ['Bruno Tomás', 'Juanvi Raga'].includes(t.name))
              .map((t) => (
                <figure
                  key={t.name}
                  className='rounded-xl bg-white p-6 shadow-sm'
                >
                  <blockquote className='text-lg'>
                    “{[t.text.trim(), t.highlight].filter(Boolean).join(' ')}”
                  </blockquote>
                  <figcaption className='mt-4'>
                    <strong>{t.name}</strong>
                    <p>{t.company}</p>
                    <a
                      href={t.sourceUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      data-ads-outbound='allow'
                      className='text-accent underline'
                    >
                      Ver reseñas en Google ↗
                    </a>
                  </figcaption>
                </figure>
              ))}
          </div>
        </div>
      </section>
      <Team
        compact
        label='El equipo de 36WEB'
        title='Personas que te acompañan de principio a fin'
        paragraphs={[
          'Diseño y desarrollo trabajando juntos. Puedes resolver tus dudas por email, WhatsApp, teléfono o videollamada.',
        ]}
      />
      <SEOProcess
        title='Sabes qué vas a recibir antes de empezar'
        subtitle='Propuesta por escrito, revisión contigo y publicación con tu aprobación.'
        steps={processSteps}
        compact
      />
      <div id='faq'>
        <SEOFAQ title='Todo claro antes de decidir' faqs={faqs} />
      </div>
      <section
        id='contacto'
        className='page-section bg-accent-light text-ink-dark'
      >
        <div className='container mx-auto grid gap-8 items-center lg:grid-cols-2'>
          <div className='space-y-5'>
            <h2 className='text-3xl md:text-4xl font-extrabold'>
              Recibe una propuesta para tu negocio
            </h2>
            <p className='text-xl md:text-2xl'>
              Déjanos tu nombre y email. Te escribiremos para conocer tu negocio
              y concretar alcance, precio y plazo. Tú decides después.
            </p>
            <LaunchPaymentTable
              installment={getLaunchInstallmentLabel()}
              total={getLaunchPriceAmountLabel()}
              className='md:mx-0'
            />
            <p>
              La web es tuya. Sin mantenimiento obligatorio ni permanencia
              mensual.
            </p>
            <WhatsAppCta />
          </div>
          <ContactFormHero
            title='Recibe tu propuesta por email'
            description='Solo nombre y email. Sin compromiso. Te pediremos los detalles de tu proyecto por escrito.'
            page={FORM_ORIGIN}
            emailOnly
            submitLabel='Recibir una propuesta para mi negocio'
            className='!w-full [&_form]:!w-full'
          />
        </div>
      </section>
    </>
  );
}
