import { Team } from '../components/Team';
import { useEffect, useState } from 'react';
import {
  tranquilityPlans as plans,
  tranquilityScope,
  tranquilityCancellation,
  tranquilityAttention,
} from '../config/tranquility';
import { allTestimonials } from '../data/testimonials';
import { getMeasurementConsent } from '../utils/measurementConsent';
import {
  Check,
  MessageCircle,
  Phone,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import Button from '../components/Button';
import SEOFAQ from '../components/SEOFAQ';
import { usePageMeta } from '../hooks/usePageMeta';
import { buildWhatsAppUrl, PHONE_TEL_LINK } from '../config/contact';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackPhoneClick,
  trackCtaClick,
  trackEvent,
} from '../utils/analytics';

function ContactButton({
  label = 'Cuéntanos qué necesitas',
  plan,
}: {
  label?: string;
  plan?: string;
}) {
  const url = buildWhatsAppUrl(
    plan
      ? `Hola, me interesa el plan ${plan} de Tranquilidad Digital. Quiero conocer el alcance para mi negocio.`
      : 'Hola, me interesa Tranquilidad Digital por suscripción. Quiero contaros lo que necesita mi negocio.',
  );
  return (
    <Button
      href={url}
      allowAdsOutbound
      className='!m-0 !w-full'
      onClick={(event) => {
        event.preventDefault();
        trackWhatsAppClick(`TranquilidadDigital_${plan ?? 'contacto'}`);
        trackGoogleAdsWhatsAppConversion(url);
      }}
    >
      <MessageCircle className='h-5 w-5 shrink-0' aria-hidden='true' />
      {label}
    </Button>
  );
}

const successCases = [
  {
    name: 'Camisetas Ahora',
    plan: 'Impulso',
    sector: 'Productos personalizados',
    image: 'camisetas',
    url: 'https://camisetas-ahora.com/',
    title: 'De un editor limitado a una compra mucho más fácil.',
    challenge:
      'Un personalizador basado en un plugin limitaba la experiencia de compra.',
    solution:
      'Rediseñamos su tienda WooCommerce con un tema propio y un personalizador visual para mover y redimensionar diseños.',
    result:
      'Personalizar es ahora más cómodo y visual: el cliente sube su diseño, lo mueve y ajusta el tamaño, prepara una o dos impresiones y ve el resultado antes de añadirlo al carrito. Menos dudas sobre lo que está comprando y más control sobre su pedido.',
  },
  {
    name: 'Clínica Hatena',
    plan: 'Esencial',
    sector: 'Clínica veterinaria · Ourense',
    image: 'hatena',
    url: 'https://hatena.es/',
    title: 'Servicios claros y un camino directo para contactar.',
    challenge:
      'Presentar la clínica y sus servicios con claridad y cuidar su presencia local en Ourense.',
    solution:
      'Diseño a medida, estructura orientada al SEO local y optimización de carga.',
    result:
      'Una web optimizada para móvil, con los servicios de la clínica y el contacto a la vista. Puedes comprobar el recorrido visitando la web.',
  },
];

function TrustSection() {
  const review = allTestimonials.find((item) => item.name === 'Juanvi Raga');
  return (
    <section
      id='testimonials'
      className='max-w-6xl mx-auto px-5 py-12'
      aria-label='Equipo y opiniones de clientes'
    >
      <Team
        compact
        label='El equipo de 36WEB'
        title='Una persona de referencia. Un equipo detrás.'
        paragraphs={['Te asignamos un desarrollador que será tu contacto habitual durante el servicio, con el respaldo del resto del equipo.']}
      />
      <div className='max-w-3xl mx-auto'>
        {review && (
          <figure className='rounded-2xl border border-accent/20 p-6'>
            <blockquote className='text-lg'>«{review.highlight}»</blockquote>
            <figcaption className='mt-4 font-bold'>
              {review.name} · {review.company}
            </figcaption>
            <a
              href={review.sourceUrl}
              target='_blank'
              rel='noopener noreferrer'
              data-ads-outbound='allow'
              className='inline-block underline mt-3 text-accent'
            >
              Leer la reseña en Google
            </a>
            <p className='text-sm mt-2'>
              Opinión sobre un proyecto de 36WEB; no acredita una contratación
              de estos planes.
            </p>
          </figure>
        )}
      </div>
      <a
        href='https://camisetas-ahora.com/'
        target='_blank'
        rel='noopener noreferrer'
        data-ads-outbound='allow'
        className='mt-6 flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-accent/20 p-5'
      >
        <img
          src='/img/portfolio/new/camisetas.webp'
          alt='Tienda online Camisetas Ahora'
          width='240'
          height='160'
          loading='lazy'
          className='w-full sm:w-60 rounded-lg'
        />
        <div>
          <h3 className='text-xl font-bold'>
            Camisetas Ahora: una compra más visual.
          </h3>
          <span className='inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent mt-3'>Suscripción Impulso</span>
          <p className='my-2'>
            Tema propio y personalizador para colocar el diseño y ver el
            resultado antes de comprar. Es un desarrollo especial; no forma
            parte automática de la cuota.
          </p>
          <span className='text-accent underline font-bold'>
            Visitar la tienda →
          </span>
        </div>
      </a>
    </section>
  );
}

function SuccessCases() {
  return (
    <section
      id='casos-de-exito'
      className='max-w-6xl mx-auto px-5 py-16 md:py-24'
      aria-labelledby='cases-title'
    >
      <p className='font-bold text-accent mb-3'>Casos de éxito</p>
      <h2 id='cases-title' className='text-3xl md:text-5xl font-bold mb-5'>
        Una web que cambia la experiencia de sus clientes.
      </h2>
      <p className='text-lg max-w-3xl mb-10'>
        Camisetas Ahora nos acompaña con el plan Impulso y Clínica Hatena con
        Esencial. Visita sus proyectos y conoce el trabajo realizado. Los
        desarrollos especiales, como el personalizador, tienen un alcance
        independiente de la suscripción.
      </p>
      <div className='grid md:grid-cols-2 gap-7'>
        {successCases.map((project) => (
          <article
            key={project.name}
            className='flex flex-col overflow-hidden rounded-2xl border border-accent/20 bg-white'
          >
            <img
              src={`/img/portfolio/new/${project.image}.webp`}
              alt={`Proyecto web de ${project.name}`}
              width={1536}
              height={1024}
              loading='lazy'
              className='w-full h-auto object-contain bg-surface-muted'
            />
            <div className='flex flex-col flex-1 p-6 md:p-8'>
              <p className='text-accent text-sm font-bold mb-2'>
                {project.sector}
              </p>
              <h3 className='text-2xl font-bold mb-3'>{project.name}</h3>
              <span className='self-start inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent mb-4'>Suscripción {project.plan}</span>
              <p className='text-xl font-semibold mb-5'>{project.title}</p>
              <dl className='space-y-4 mb-6'>
                <div>
                  <dt className='font-bold'>El reto</dt>
                  <dd>{project.challenge}</dd>
                </div>
                <div>
                  <dt className='font-bold'>La solución</dt>
                  <dd>{project.solution}</dd>
                </div>
                <div>
                  <dt className='font-bold'>El resultado</dt>
                  <dd>{project.result}</dd>
                </div>
              </dl>
              <Button
                href={project.url}
                target='_blank'
                rel={'noopener noreferrer'}
                allowAdsOutbound
                variant='outline'
                className='!mt-auto !mx-0 !w-full'
              >
                Visitar {project.name}
                <ArrowRight className='w-5 h-5 shrink-0' aria-hidden='true' />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function LandingTranquilidadDigital() {
  const [openCondition, setOpenCondition] = useState<number | null>(null);
  usePageMeta('/tranquilidad-digital');
  useEffect(() => {
    if (getMeasurementConsent()?.analytics)
      trackEvent('tranquilidad_view', { service: 'tranquilidad_digital' });
  }, []);
  return (
    <>
      <section className='bg-surface-muted px-5 pb-16 pt-[calc(var(--site-header-h)+var(--page-hero-offset)+0.5rem)] md:pb-24'>
        <div className='max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center'>
          <div>
            <p className='font-bold text-sm text-accent mb-3'>
              36WEB · Acompañamiento digital
            </p>
            <h1 className='text-[1.75rem] md:text-5xl font-bold leading-tight mb-4'>
              Tu web y su mantenimiento, con una persona a quien acudir.
            </h1>
            <p className='text-lg mb-4'>
              Para autónomos y pequeños negocios que necesitan una web o tienda
              online, o quieren delegar la que ya tienen.
            </p>
            <p className='text-2xl font-bold mb-2'>Desde 59,90 € + IVA / mes</p>
            <p className='inline-block rounded-lg border border-accent/20 bg-white px-4 py-3 font-bold text-accent mb-3'>
              Tu web o tienda online y dominio incluidos. 0 € de alta.
            </p>
            <div className='flex flex-col sm:flex-row gap-3'>
              <ContactButton />
              <Button
                href='#planes'
                variant='outline'
                className='!m-0 !w-full'
                onClick={() =>
                  trackCtaClick('Ver planes', 'TranquilidadDigital')
                }
              >
                Ver planes
              </Button>
            </div>
            <p className='mt-4 text-sm'>
              Sin permanencia. Primero revisamos tu proyecto y recibes alcance,
              precio y plazo por escrito. Después decides.
            </p>
            <p className='mt-5 text-sm'>
              WhatsApp, llamada o videollamada. Trato directo con una persona
              que conoce tu proyecto.
            </p>
          </div>
          <div className='rounded-3xl bg-white p-7 md:p-10 border border-accent/20 shadow-lg'>
            <ShieldCheck
              className='mx-auto mb-5 h-12 w-12 text-accent md:mx-0'
              aria-hidden='true'
            />
            <h2 className='text-3xl font-bold mb-5'>
              Por fin, saber a quién llamar.
            </h2>
            <p className='text-lg mb-7'>
              Para poner en marcha tu web, resolver una incidencia o decidir qué
              necesitas después. Te escuchamos, te explicamos las opciones y nos
              ponemos con ello.
            </p>
            {[
              'Una web o tienda para tu negocio',
              'Lo técnico, acompañado',
              'Una cuota que conoces',
              'Libertad para cancelar',
            ].map((text) => (
              <p
                key={text}
                className='flex gap-3 items-center py-3 border-t border-gray-100 font-semibold'
              >
                <Check className='text-accent w-5 h-5 shrink-0' />
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>
      <TrustSection />
      <section
        id='planes'
        className='scroll-mt-28 border-t border-accent/10 bg-white px-5 py-16 md:py-24'
      >
        <div className='max-w-6xl mx-auto'>
          <p className='font-bold text-accent mb-3'>
            Tres formas de estar acompañado
          </p>
          <h2 className='text-3xl md:text-5xl font-bold mb-5'>
            Elige cuánto necesitas delegar.
          </h2>
          <p className='text-lg max-w-3xl mb-10'>
            Empieza con lo esencial o cuenta con nosotros para avanzar cada mes.
            Concretamos contigo el alcance antes de activar el servicio.
          </p>
          <div className='grid lg:grid-cols-3 gap-6'>
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-2xl bg-white p-6 md:p-8 flex flex-col border-2 ${plan.name === 'Impulso' ? 'border-accent' : 'border-transparent'}`}
              >
                <h3 className='text-3xl font-bold mb-3'>{plan.name}</h3>
                <p className='mb-6'>{plan.intro}</p>
                <p className='text-4xl font-bold'>
                  {plan.price} €
                  <span className='text-base font-normal'> / mes</span>
                </p>
                <p className='text-sm mt-2 mb-3'>+ IVA · Sin permanencia</p>
                <p className='rounded-lg bg-surface-muted p-3 font-bold text-accent mb-6'>
                  Web o tienda y dominio incluidos · 0 € de alta
                </p>
                <p className='text-sm mb-5'>
                  Tras acordar el proyecto, solo la primera cuota de{' '}
                  {plan.price} € + IVA.
                </p>
                <ul className='space-y-4 mb-6'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='flex gap-3'>
                      <Check
                        className='w-5 h-5 shrink-0 text-accent mt-1'
                        aria-hidden='true'
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className='text-sm mb-7'>{plan.detail}</p>
                <div className='mt-auto'>
                  <Button
                    href={`/pago/tranquilidad-digital?plan=${plan.name.toLowerCase()}`}
                    allowAdsOutbound
                    className='!m-0 !w-full'
                    onClick={() =>
                      trackCtaClick(
                        `Ver condiciones ${plan.name}`,
                        'TranquilidadDigital_Condiciones',
                      )
                    }
                  >
                    Ver alcance de {plan.name}
                    <ArrowRight
                      className='h-5 w-5 shrink-0'
                      aria-hidden='true'
                    />
                  </Button>
                  <p className='text-sm mt-3 text-center'>
                    {plan.total} €/mes con IVA. Primera cuota al contratar y
                    renovación mensual. Sin alta ni permanencia.
                  </p>
                  <a
                    href={buildWhatsAppUrl(
                      `Hola, tengo una duda sobre el plan ${plan.name} de Tranquilidad Digital antes de contratar.`,
                    )}
                    className='flex min-h-12 items-center justify-center gap-2 underline mt-2'
                    onClick={(event) => {
                      event.preventDefault();
                      trackWhatsAppClick(`TranquilidadDigital_${plan.name}`);
                      trackGoogleAdsWhatsAppConversion(
                        buildWhatsAppUrl(
                          `Hola, tengo una duda sobre el plan ${plan.name} de Tranquilidad Digital antes de contratar.`,
                        ),
                      );
                    }}
                  >
                    <MessageCircle className='h-4 w-4' aria-hidden='true' />
                    Tengo una duda
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className='mt-8 overflow-hidden rounded-2xl border border-accent/20 divide-y divide-accent/20'>
            {[
              {
                title: 'Qué acordamos antes de cobrar',
                content: (
                  <ul className='list-disc pl-5 space-y-3'>
                    {tranquilityScope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: 'Si decides cancelar',
                content: <p>{tranquilityCancellation}</p>,
              },
              {
                title: 'Preparación y atención',
                content: (
                  <>
                    <p>
                      Necesitaremos textos, fotos, datos del negocio y accesos;
                      en tiendas, también catálogo, precios y datos de envío.
                      Recibirás la fecha de entrega por escrito antes de pagar,
                      según el proyecto y los materiales disponibles.
                    </p>
                    <p className='mt-3'>{tranquilityAttention}</p>
                  </>
                ),
              },
            ].map((item, index) => (
              <section key={item.title} className='bg-surface-muted'>
                <h3>
                  <button
                    id={`condition-trigger-${index}`}
                    type='button'
                    aria-expanded={openCondition === index}
                    aria-controls={`condition-panel-${index}`}
                    onClick={() =>
                      setOpenCondition((current) =>
                        current === index ? null : index,
                      )
                    }
                    className='flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-lg font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:-outline-offset-2 md:px-6'
                  >
                    {item.title}
                    <ChevronDown
                      aria-hidden='true'
                      className={`h-5 w-5 shrink-0 transition-transform ${openCondition === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>
                <div
                  id={`condition-panel-${index}`}
                  role='region'
                  aria-labelledby={`condition-trigger-${index}`}
                  hidden={openCondition !== index}
                  className='px-5 pb-6 text-base leading-relaxed md:px-6'
                >
                  {item.content}
                </div>
              </section>
            ))}
          </div>
          <div className='mt-8 rounded-2xl border border-accent/20 bg-white p-6 text-center'>
            <h3 className='text-xl font-bold mb-2'>
              ¿Prefieres un pago único?
            </h3>
            <p className='mb-4'>
              También creamos tu web o tienda a medida como proyecto
              independiente. Cuéntanos qué necesitas y recibe un presupuesto con
              alcance, precio y plazo por escrito.
            </p>
            <a
              className='inline-flex min-h-12 items-center justify-center gap-2 font-bold text-accent underline'
              href={buildWhatsAppUrl(
                'Hola, me interesa un proyecto web con pago único. Quiero pedir un presupuesto a medida.',
              )}
              onClick={(event) => {
                event.preventDefault();
                trackWhatsAppClick('TranquilidadDigital_PagoUnico');
                trackGoogleAdsWhatsAppConversion(
                  buildWhatsAppUrl(
                    'Hola, me interesa un proyecto web con pago único. Quiero pedir un presupuesto a medida.',
                  ),
                );
              }}
            >
              Pedir presupuesto de pago único{' '}
              <ArrowRight className='h-5 w-5' aria-hidden='true' />
            </a>
          </div>
          <p className='text-sm mt-6'>
            La cuota corresponde al servicio descrito. Publicidad, licencias de
            pago, desarrollos especiales y servicios externos no están incluidos
            salvo acuerdo expreso. No se garantizan posiciones en Google ni
            ventas. La monitorización 24/7 de Impulso e Integral es
            automatizada.
          </p>
        </div>
      </section>
      <SuccessCases />

      <section className='max-w-6xl mx-auto px-5 py-16'>
        <h2 className='text-3xl md:text-4xl font-bold mb-9'>
          Así empieza tu tranquilidad digital.
        </h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {[
            [
              '01',
              'Nos cuentas tu negocio',
              'Vemos si necesitas una web nueva, qué tienes ya y qué quieres delegar.',
            ],
            [
              '02',
              'Lo dejamos claro',
              'Recibes por escrito secciones, catálogo inicial, funciones, tareas SEO, calendario y condiciones de salida. Lo revisamos contigo antes de pedir el pago.',
            ],
            [
              '03',
              'Te asignamos tu desarrollador y empezamos',
              'Cuando aceptas la propuesta, revisas las condiciones y pagas la primera cuota en Stripe. Te asignamos un desarrollador que prepara tu web o tienda y será tu interlocutor durante el servicio.',
            ],
          ].map(([number, title, text]) => (
            <div key={number}>
              <p className='text-accent text-3xl font-bold mb-3'>{number}</p>
              <h3 className='font-bold text-xl mb-3'>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <SEOFAQ
        title='Sin letra pequeña en lo importante'
        faqs={[
          {
            question: '¿Cuántas secciones puede tener mi web?',
            answer:
              'Esencial incluye una web o tienda online con hasta 5 secciones. Impulso e Integral incluyen una web o tienda online sin límite de secciones. Organizamos contigo la estructura, el catálogo cuando corresponda y el calendario de entrega. Concretamos el alcance por escrito antes de empezar; las funcionalidades especiales se valoran aparte.',
          },
          {
            question: '¿Tengo que pagar la creación de la web al empezar?',
            answer:
              'No hay coste de alta ni un pago adicional por crear la web. Al contratar solo pagas la primera cuota: 59,90 € + IVA en Esencial, 99,90 € + IVA en Impulso o 199,90 € + IVA en Integral. Después se renueva mensualmente. La web permanece incluida mientras la suscripción esté activa.',
          },
          {
            question: '¿Hay permanencia?',
            answer:
              'No hay un compromiso mínimo de meses. Puedes solicitar la cancelación para evitar la siguiente renovación. Antes de contratar tendrás por escrito el procedimiento y las condiciones del servicio.',
          },
          {
            question: '¿Qué ocurre con mi web si cancelo?',
            answer: tranquilityCancellation,
          },
          {
            question: '¿El dominio está incluido?',
            answer:
              'Sí. Los tres planes incluyen un dominio estándar disponible y su renovación mientras la suscripción esté activa. Los dominios premium o con precios especiales se valoran aparte. Si ya tienes un dominio, lo revisamos contigo para utilizarlo.',
          },
          {
            question: '¿Qué pasa con mis contenidos y datos?',
            answer:
              'Tus textos, imágenes, marca y datos de clientes no se reutilizan para otros negocios. Al finalizar el servicio recuperas tus contenidos y datos sin coste. Transferimos el dominio y acordamos contigo la entrega de los contenidos y, si es una tienda, pedidos, categorías y demás datos.',
          },
          {
            question: '¿Puedo contratarlo si ya tengo una web?',
            answer:
              'Sí. Revisamos cómo está construida y qué necesita antes de confirmar el plan. Confirmamos por escrito qué traslado y adaptación incluye tu caso y si necesita trabajo adicional antes de cobrar.',
          },
          {
            question: '¿Incluye una tienda online o una aplicación?',
            answer:
              'Sí, los tres planes incluyen la creación de una web o tienda online, sin pago de alta: solo la primera cuota. Acordamos contigo la estructura y el catálogo inicial antes de empezar. Las reservas, aplicaciones, personalizadores e integraciones especiales se revisan y presupuestan aparte, salvo inclusión expresa en tu propuesta.',
          },
          {
            question: '¿Qué cambios y SEO incluye cada plan?',
            answer:
              'Esencial no incluye cambios de contenido. Impulso incluye 3 pequeños cambios al mes sobre contenido existente, como sustituir una imagen o actualizar un texto, horario o precio. Integral incluye cambios ilimitados sobre tu web, con una petición activa a la vez. Las nuevas funcionalidades se valoran aparte. Impulso y Integral incluyen las acciones SEO descritas en su alcance, sin garantizar posiciones ni ventas.',
          },
          {
            question: '¿Cómo funcionan los cambios ilimitados de Integral?',
            answer:
              'Puedes solicitar tantos cambios sobre tu web o tienda online como necesites mientras tu suscripción esté activa. Los priorizamos contigo y trabajamos una petición a la vez: terminamos una y continuamos con la siguiente. El plazo depende de la complejidad de cada petición; no implica entregas inmediatas ni un número garantizado de cambios al mes. Las aplicaciones y las integraciones especiales se valoran aparte.',
          },
          {
            question: '¿Cómo hablo con vosotros?',
            answer: tranquilityAttention,
          },
        ]}
      />
      <section
        id='contacto'
        className='bg-surface-muted px-5 py-16 md:py-24 text-center'
      >
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl md:text-5xl font-bold mb-5'>
            Deja de llevar también el departamento digital.
          </h2>
          <p className='text-xl mb-8'>
            Cuéntanos qué necesitas. Te ayudamos a elegir el plan y te
            explicamos qué podemos asumir por ti.
          </p>
          <div className='max-w-md mx-auto'>
            <ContactButton />
          </div>
          <a
            href={PHONE_TEL_LINK}
            onClick={() => trackPhoneClick('TranquilidadDigital')}
            className='inline-flex min-h-12 items-center gap-2 underline mt-5'
          >
            <Phone className='w-5 h-5' />
            Prefiero llamar
          </a>
        </div>
      </section>
    </>
  );
}
