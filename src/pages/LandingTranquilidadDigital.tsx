import {
  Check,
  MessageCircle,
  Phone,
  ShieldCheck,
  Frown,
  ArrowRight,
} from 'lucide-react';
import Button from '../components/Button';
import SEOFAQ from '../components/SEOFAQ';
import Testimonials from '../components/Testimonials';
import { usePageMeta } from '../hooks/usePageMeta';
import { buildWhatsAppUrl, PHONE_TEL_LINK } from '../config/contact';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackPhoneClick,
  trackCtaClick,
} from '../utils/analytics';

const plans = [
  {
    name: 'Esencial',
    price: '59,90',
    total: '72,48',
    checkout: 'https://buy.stripe.com/aFaaEX7CrfSU1wV29c4AU0b',
    intro: 'Tu negocio en internet, con alguien que se ocupa.',
    features: [
      'Web de presentación con hasta 5 secciones',
      'Dominio estándar y su renovación, alojamiento, SSL y mantenimiento técnico',
      'Configuración inicial de herramientas de Google que correspondan a tu negocio',
      'Enlaces e integración básica de tus redes sociales',
      'Atención personal para las incidencias del servicio',
    ],
    detail:
      'Sin cambios de contenido incluidos. Si necesitas uno, lo valoramos contigo antes de hacerlo.',
  },
  {
    name: 'Impulso',
    price: '99,90',
    total: '120,88',
    checkout: 'https://buy.stripe.com/fZucN55uj7mo7Vjg024AU0c',
    intro: 'Una presencia digital que avanza contigo.',
    features: [
      'Web de presentación sin límite de secciones',
      'Los servicios de Esencial, ampliando su límite de secciones',
      '3 pequeños cambios al mes: textos, imágenes, horarios o precios',
      'Revisión SEO y mejoras sobre las páginas existentes',
      'Seguimiento de las prioridades de tu web',
      'Orientación para tus próximos pasos digitales',
    ],
    detail:
      'Incluye 3 ajustes puntuales al mes sobre el contenido existente. Las nuevas funcionalidades se valoran aparte. Concretamos las tareas SEO antes de contratar.',
  },
  {
    name: 'Integral',
    price: '199,90',
    total: '241,88',
    checkout: 'https://buy.stripe.com/9B6dR99Kz6ikfnL4hk4AU0d',
    intro: 'Tu web evoluciona al ritmo de tus ideas.',
    features: [
      'Web de presentación sin límite de secciones',
      'Todo lo incluido en Impulso',
      'Cambios ilimitados: una petición a la vez',
      'Seguimiento SEO continuado',
      'Planificación de mejoras de contenido y diseño',
      'Atención prioritaria dentro del horario de servicio',
    ],
    detail:
      'Sin límite de peticiones de cambios sobre tu web. Trabajamos una a la vez y, al terminarla, pasamos a la siguiente. Los desarrollos nuevos se valoran aparte.',
  },
];

function ContactButton({
  label = 'Hablemos de tu negocio',
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
    name: 'Chicxsdelacalle',
    sector: 'Merch de bandas',
    image: 'chicxs',
    url: 'https://chicxsdelacalle.com/',
    title: 'Más ventas para una marca con identidad propia.',
    challenge:
      'Dar una presencia online al merchandising de bandas y organizar su venta.',
    solution:
      'Una tienda con catálogo, gestión de stock y pedidos para sus productos.',
    result:
      'Desde que trabaja con 36WEB, Chicxsdelacalle ha aumentado sus ventas. Su tienda reúne el merchandising, facilita la compra online y permite gestionar catálogo, stock y pedidos en un mismo lugar.',
  },
  {
    name: 'Clínica Hatena',
    sector: 'Clínica veterinaria · Ourense',
    image: 'hatena',
    url: 'https://hatena.es/',
    title: 'Menos de 2 segundos para cargar. Más fácil contactar.',
    challenge:
      'Presentar la clínica y sus servicios con claridad y cuidar su presencia local en Ourense.',
    solution:
      'Diseño a medida, estructura orientada al SEO local y optimización de carga.',
    result:
      'Páginas que cargan en menos de 2 segundos y un recorrido claro para conocer la clínica y contactar.',
  },
  {
    name: 'Delish Vegan',
    sector: 'Repostería vegana · Madrid',
    image: 'delish',
    url: 'https://delishvegan.com/',
    nofollow: true,
    title: 'Más ventas, más allá de las puertas de su local.',
    challenge:
      'Llevar sus productos más allá del local y facilitar la compra a distancia.',
    solution:
      'Una tienda online para presentar su repostería vegana y recibir pedidos con envío nacional.',
    result:
      'Delish Vegan ha aumentado sus ventas desde que trabaja con 36WEB. Sus clientes pueden descubrir la repostería, elegir sus productos y hacer pedidos con envío nacional sin acercarse al local.',
  },
];

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
        Estas webs y tiendas muestran cómo trabajamos. Los desarrollos
        especiales como gestor de reservas, personalizadores online etc... se
        incluyen la suscripción.
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
                rel={
                  project.nofollow
                    ? 'nofollow noopener noreferrer'
                    : 'noopener noreferrer'
                }
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
  usePageMeta('/tranquilidad-digital');
  return (
    <>
      <section className='bg-surface-muted px-5 pb-16 pt-[calc(var(--site-header-h)+var(--page-hero-offset)+1.5rem)] md:pb-24'>
        <div className='max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center'>
          <div>
            <p className='font-bold text-accent mb-4'>
              36WEB · Tu equipo digital por suscripción
            </p>
            <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-6'>
              Tú llevas tu negocio.
              <br />
              Nosotros cuidamos de lo digital.
            </h1>
            <p className='text-xl mb-6'>
              Tu web, su mantenimiento y una persona a quien acudir. Un servicio
              mensual para dejar de resolverlo todo por tu cuenta, vendas online
              o no.
            </p>
            <p className='text-2xl font-bold mb-2'>Desde 59,90 € + IVA / mes</p>
            <p className='inline-block rounded-lg border border-accent/20 bg-white px-4 py-3 font-bold text-accent mb-3'>
              Tu web y dominio incluidos. 0 € de alta.
            </p>
            <p className='mb-7'>
              Al contratar, solo pagas la primera cuota mensual. Sin
              permanencia. Web incluida mientras la suscripción esté activa.
            </p>
            <Button href='#planes' className='!m-0'>
              Encuentra tu plan <ArrowRight className='h-5 w-5' />
            </Button>
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
              'Una web para tu negocio',
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
      <section className='max-w-6xl mx-auto px-5 py-16 md:py-20'>
        <h2 className='text-3xl md:text-4xl font-bold mb-9'>
          ¿Lo digital te está quitando demasiado tiempo?
        </h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {[
            [
              'Tu negocio merece una web mejor',
              'Pero nunca encuentras el momento de empezar o de renovar la que tienes.',
            ],
            [
              'Cada cambio es un lío',
              'No sabes a quién pedirlo, cuánto costará o si alguien te responderá.',
            ],
            [
              'Lo técnico te preocupa',
              'Actualizaciones, errores y mantenimiento que no quieres resolver tú.',
            ],
            [
              'Tienes demasiados interlocutores',
              'Necesitas a alguien que vea el conjunto y te ayude a decidir.',
            ],
          ].map(([title, text]) => (
            <article
              key={title}
              className='rounded-2xl border border-gray-200 p-6'
            >
              <Frown
                className='mx-auto mb-4 h-7 w-7 text-accent md:mx-0'
                aria-hidden='true'
              />
              <h3 className='font-bold text-xl mb-3'>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className='text-xl mt-8 max-w-3xl'>
          No necesitas aprender a hacerlo todo. Necesitas un equipo que entienda
          tu negocio y se ocupe contigo.
        </p>
      </section>
      <section
        id='planes'
        className='scroll-mt-28 bg-surface-muted px-5 py-16 md:py-24'
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
                  Web y dominio .es .com incluidos · 0 € de alta
                </p>
                <p className='text-sm mb-5'>
                  Para empezar, solo la primera cuota de {plan.price} € + IVA.
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
                  <Button href={plan.checkout} allowAdsOutbound className='!m-0 !w-full' onClick={() => trackCtaClick(`Contratar ${plan.name}`, 'TranquilidadDigital_Stripe')}>
                    Contratar {plan.name}<ArrowRight className='h-5 w-5 shrink-0' aria-hidden='true' />
                  </Button>
                  <p className='text-sm mt-3 text-center'>{plan.total} €/mes con IVA. Primera cuota al contratar y renovación mensual. Sin alta ni permanencia.</p>
                  <a href={buildWhatsAppUrl(`Hola, tengo una duda sobre el plan ${plan.name} de Tranquilidad Digital antes de contratar.`)} className='flex min-h-12 items-center justify-center gap-2 underline mt-2' onClick={(event) => { event.preventDefault(); trackWhatsAppClick(`TranquilidadDigital_${plan.name}`); trackGoogleAdsWhatsAppConversion(buildWhatsAppUrl(`Hola, tengo una duda sobre el plan ${plan.name} de Tranquilidad Digital antes de contratar.`)); }}><MessageCircle className='h-4 w-4' aria-hidden='true' />Tengo una duda</a>
                </div>
              </article>
            ))}
          </div>
          <div className='mt-8 rounded-2xl border border-accent/20 bg-white p-6 text-center'>
            <h3 className='text-xl font-bold mb-2'>¿Prefieres un pago único?</h3>
            <p className='mb-4'>También creamos tu web o tienda a medida como proyecto independiente. Cuéntanos qué necesitas y recibe un presupuesto con alcance, precio y plazo por escrito.</p>
            <a className='inline-flex min-h-12 items-center justify-center gap-2 font-bold text-accent underline' href={buildWhatsAppUrl('Hola, me interesa un proyecto web con pago único. Quiero pedir un presupuesto a medida.')} onClick={(event) => { event.preventDefault(); trackWhatsAppClick('TranquilidadDigital_PagoUnico'); trackGoogleAdsWhatsAppConversion(buildWhatsAppUrl('Hola, me interesa un proyecto web con pago único. Quiero pedir un presupuesto a medida.')); }}>Pedir presupuesto de pago único <ArrowRight className='h-5 w-5' aria-hidden='true' /></a>
          </div>
          <p className='text-sm mt-6'>
            La cuota corresponde al servicio descrito. Publicidad, licencias de
            pago, desarrollos especiales y servicios externos no están incluidos
            salvo acuerdo expreso. No se garantizan posiciones en Google ni
            ventas.
          </p>
        </div>
      </section>
      <section className='px-5 py-16 md:py-24 max-w-6xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-10'>
          <div>
            <p className='font-bold text-accent mb-3'>
              Más que tener una web alojada
            </p>
            <h2 className='text-3xl md:text-4xl font-bold mb-5'>
              Una persona que conoce tu negocio. Un equipo detrás.
            </h2>
            <p className='text-lg'>
              No tienes que empezar de cero cada vez que necesitas ayuda.
              Hablamos contigo y seguimos el contexto de tu proyecto por
              WhatsApp, teléfono o videollamada cuando haga falta.
            </p>
          </div>
          <div className='rounded-2xl bg-surface-muted p-7'>
            <h3 className='text-2xl font-bold mb-4'>
              Y cuando tu proyecto necesita más, seguimos contigo.
            </h3>
            <p className='mb-4'>
              Desarrollo web y de aplicaciones, tiendas online, diseño gráfico
              para redes y marketing digital. Podemos ayudarte a coordinar el
              siguiente paso y presupuestarlo según lo que necesites.
            </p>
            <p>
              Si prefieres un colaborador de tu zona, consultamos
              disponibilidad. Estos trabajos adicionales no están incluidos
              automáticamente en la cuota.
            </p>
          </div>
        </div>
      </section>
      <SuccessCases />
      <Testimonials />
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
              'Recibes el alcance, las tareas incluidas, los plazos y las condiciones de tu suscripción.',
            ],
            [
              '03',
              'Te asignamos tu desarrollador y empezamos',
              'Te asignamos un desarrollador que crea tu web y te acompaña mes a mes. Hablarás siempre directamente con él para consultas, cambios y próximos pasos: la misma persona al frente de tu proyecto durante todo el servicio.',
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
              'Esencial incluye hasta 5 secciones. Impulso e Integral incluyen una web de presentación sin límite de secciones. Organizamos contigo la estructura y el calendario de entrega. Las funcionalidades especiales se valoran aparte; el número de secciones no limita la estructura de tu web en estos dos planes.',
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
            answer:
              'Contratas una web como servicio, disponible mientras la suscripción está activa. Al terminar el periodo abonado deja de prestarse el alojamiento y la web deja de estar publicada con nosotros. La entrega del código o la compra de la web no están incluidas en la cuota. Te explicaremos las opciones antes de contratar.',
          },
          {
            question: '¿El dominio está incluido?',
            answer:
              'Sí. Los tres planes incluyen un dominio estándar disponible y su renovación mientras la suscripción esté activa. Los dominios premium o con precios especiales se valoran aparte. Si ya tienes un dominio, lo revisamos contigo para utilizarlo.',
          },
          {
            question: '¿Qué pasa con mis contenidos y datos?',
            answer:
              'Tus textos, imágenes, marca y datos de clientes no se reutilizan para otros negocios. Al finalizar el servicio recuperas tus contenidos y datos sin coste. Antes de contratar concretamos la titularidad del dominio y cómo te los entregamos.',
          },
          {
            question: '¿Puedo contratarlo si ya tengo una web?',
            answer:
              'Sí. Revisamos cómo está construida y qué necesita antes de confirmar el plan. La migración de tu web actual está incluida, sin coste adicional. Un desarrollo especial se valora por separado si hace falta.',
          },
          {
            question: '¿Incluye una tienda online o una aplicación?',
            answer:
              'La web incluida es de presentación, con el alcance acordado. Una tienda, una aplicación, un personalizador o una integración especial necesitan una valoración propia. Podemos desarrollarlos y acordar su acompañamiento mensual.',
          },
          {
            question: '¿Qué cambios y SEO incluye cada plan?',
            answer:
              'Esencial no incluye cambios de contenido. Impulso incluye 3 pequeños cambios al mes sobre contenido existente, como sustituir una imagen o actualizar un texto, horario o precio. Integral incluye cambios ilimitados sobre tu web, con una petición activa a la vez. Las nuevas funcionalidades se valoran aparte. Impulso y Integral incluyen las acciones SEO descritas en su alcance, sin garantizar posiciones ni ventas.',
          },
          {
            question: '¿Cómo funcionan los cambios ilimitados de Integral?',
            answer:
              'Puedes solicitar tantos cambios sobre tu web como necesites mientras tu suscripción esté activa. Los priorizamos contigo y trabajamos una petición a la vez: terminamos una y continuamos con la siguiente. El plazo depende de la complejidad de cada petición; no implica entregas inmediatas ni un número garantizado de cambios al mes. Nuevas aplicaciones, tiendas o integraciones especiales se valoran aparte.',
          },
          {
            question: '¿Cómo hablo con vosotros?',
            answer:
              'Por WhatsApp o teléfono y, cuando el proyecto lo requiere, por videollamada. Tienes atención personal dentro del horario de servicio; no es un servicio de asistencia 24 horas.',
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
