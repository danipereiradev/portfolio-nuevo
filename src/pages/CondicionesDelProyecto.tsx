import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import HeroCta from '../components/HeroCta';
import { usePageMeta } from '../hooks/usePageMeta';
import { useContactModal } from '../contexts/ContactModalContext';
import Button from '../components/Button';
import {
  ADS_LAUNCH_LANDING_PATH,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_PATH,
  SITE_WEB_PATH,
} from '../config/contact';
import {
  APP_MAINTENANCE_FROM,
  HOUR_PACKS,
  MAINTENANCE_BONOS_ID,
  MAINTENANCE_PLANES_ID,
  MAINTENANCE_PLANS,
  getHourPackPriceLabel,
  getHourPackRemainderCopy,
  getHourPackValidityCopy,
  getPlanPriceLabel,
} from '../config/maintenanceOffer';
import {
  LAUNCH_DELIVERY_HOURS,
  getLaunchPriceLabel,
  getLaunchRemainderLabel,
  getLaunchReserveLabel,
} from '../config/launchOffer';
import {
  formatEuro,
  GOOGLE_ADS_MONTHLY_AMOUNT,
  GOOGLE_ADS_PAYMENT_ID,
  GOOGLE_ADS_SETUP_AMOUNT,
  GOOGLE_ADS_TODAY_AMOUNT,
  paymentPath,
} from '../config/payments';

const PROJECT_CONDITIONS_PATH = '/condiciones-del-proyecto';

const planWeb = MAINTENANCE_PLANS.find((plan) => plan.id === 'web');
const planNegocio = MAINTENANCE_PLANS.find((plan) => plan.id === 'negocio');
const planEcommerce = MAINTENANCE_PLANS.find((plan) => plan.id === 'ecommerce');

const ConditionList = ({ items }: { items: ReactNode[] }) => (
  <div className='mt-6 flex justify-center'>
    <ul className='w-full max-w-[42rem] space-y-3 text-left text-base text-ink-dark md:text-lg'>
      {items.map((item, index) => (
        <li key={index} className='flex gap-3'>
          <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ConditionBlock = ({
  title,
  intro,
  href,
  hrefLabel,
  items,
}: {
  title: string;
  intro: ReactNode;
  href?: string;
  hrefLabel?: string;
  items: ReactNode[];
}) => (
  <article className='rounded-lg border-2 border-ink-dark bg-white p-content-pad text-center'>
    <h3 className='text-2xl font-extrabold text-ink-dark md:text-3xl'>
      {title}
    </h3>
    <p className='mt-text-gap text-lg text-ink-dark md:text-xl'>{intro}</p>
    <ConditionList items={items} />
    {href && hrefLabel ? (
      <p className='mt-6'>
        <Link
          to={href}
          className='font-extrabold text-accent underline underline-offset-4 hover:text-accent-hover'
        >
          {hrefLabel}
        </Link>
      </p>
    ) : null}
  </article>
);

const CondicionesDelProyecto = () => {
  usePageMeta(PROJECT_CONDITIONS_PATH);
  const { openModal } = useContactModal();

  return (
    <>
      <HeroCta
        label='Condiciones del proyecto'
        title='Cómo se contrata y se paga cada servicio'
        description='Precio, plazos, qué entra y qué no: queda por escrito antes de empezar. Aquí está el resumen de cada servicio.'
        heroType='clean'
        hasButton={false}
        hasBackground={false}
        hasReviewBadge={false}
        isTopHero
        ctaContent={
          <Button className='!mt-0' onClick={() => openModal()}>
            Pedir propuesta
          </Button>
        }
      />

      <section className='page-section bg-surface-muted'>
        <div className='container mx-auto max-w-3xl'>
          <div className='page-title-block text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl'>
              Lo que aplica a todos
            </h2>
          </div>
          <ConditionList
            items={[
              'El alcance, el precio y los plazos van por escrito en la propuesta o en la página de pago, antes de cobrar.',
              'Los precios se muestran sin IVA, salvo que se indique lo contrario. Se aplica el IVA vigente.',
              'Formas de pago: Stripe y transferencia bancaria, según el servicio.',
              'Si hace falta algo fuera de lo acordado, te damos precio antes de hacerlo.',
              'Los retrasos en enviarnos textos, fotos o accesos pueden mover la fecha prevista.',
              <>
                El marco legal de contratación está en los{' '}
                <Link
                  to='/terminos-y-condiciones'
                  className='font-extrabold text-accent underline underline-offset-4'
                >
                  términos y condiciones
                </Link>
                .
              </>,
            ]}
          />
        </div>
      </section>

      <section className='page-section'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <div className='page-title-block mx-auto max-w-5xl text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Condiciones por servicio
            </h2>
            <p className='text-xl text-ink-dark md:text-2xl'>
              No todos se pagan igual. Elige el que te encaja y mira cómo
              funciona.
            </p>
          </div>

          <div className='grid items-stretch gap-page-gap'>
            <ConditionBlock
              title='Páginas web a medida'
              intro='Para un negocio que necesita una web propia, con precio y plazos en la propuesta.'
              href={SITE_WEB_PATH}
              hrefLabel='Ver diseño web'
              items={[
                'Habitualmente: 50 % al empezar y 50 % antes de publicar. También se puede acordar otro fraccionamiento o pago único.',
                'Si llega el plazo estimado de la propuesta y aún no nos has enviado textos, fotos o accesos, el 50 % restante se cobra igual, aunque no se haya publicado. Cuando nos lleguen, estimamos una fecha nueva de entrega.',
                'Las rondas de cambios son las de la propuesta. Sirven para afinar lo acordado, no para añadir páginas o funciones nuevas.',
                'El plazo suele estar entre 3 y 8 semanas cuando tenemos textos y fotos. Cuenta desde el arranque pagado.',
                'El dominio es tuyo. Hosting para arrancar, confirmado en la propuesta.',
                'Tras el pago íntegro adquieres los derechos de uso. El mantenimiento mensual es opcional.',
              ]}
            />

            <ConditionBlock
              title='Tiendas online'
              intro='Catálogo, cobro y pedidos. El alcance concreto (productos, envíos, pasarela) va en la propuesta.'
              href={SITE_SHOP_PATH}
              hrefLabel='Ver tiendas online'
              items={[
                'Misma lógica de pago que una web a medida: 50 % al inicio y 50 % antes de publicar, salvo otro acuerdo.',
                'Si llega el plazo estimado de la propuesta y aún no nos has enviado textos, fotos o accesos, el 50 % restante se cobra igual, aunque no se haya publicado. Cuando nos lleguen, estimamos una fecha nueva de entrega.',
                'Plazo habitual: 4 a 8 semanas, según el catálogo y las funciones. Cuenta desde el arranque pagado.',
                'Incluye formación de 1 h para gestionar productos, pedidos y el día a día.',
                'El dominio es tuyo. Hosting para arrancar, confirmado en la propuesta.',
                'El mantenimiento de la tienda se valora aparte. No se activa solo por publicar.',
              ]}
            />

            <ConditionBlock
              title='Web profesional de lanzamiento'
              intro={
                <>
                  Oferta cerrada cuando está activa: {getLaunchPriceLabel()}.
                  Reserva {getLaunchReserveLabel()}. El resto (
                  {getLaunchRemainderLabel()}) se paga antes de publicar.
                </>
              }
              href={`${ADS_LAUNCH_LANDING_PATH}#reserva`}
              hrefLabel='Ver la oferta'
              items={[
                `Se publica en un máximo de ${LAUNCH_DELIVERY_HOURS} h desde que nos entregas la información de tu negocio. Puedes reservar antes; el reloj empieza cuando nos llega ese material.`,
                'Tú entregas logo, textos y fotos. Hosting y dominio incluidos. El dominio es tuyo.',
                'Sin permanencia. La web es tuya.',
                'El pago de la reserva se hace por Stripe. El resto se paga antes de publicar.',
                'El mantenimiento después de publicar es opcional. No hace falta para acceder a la oferta.',
              ]}
            />

            <ConditionBlock
              title='Mantenimiento mensual'
              intro='Para dejar la web al día mes a mes. Los planes Web y Negocio se pagan por Stripe y no tienen permanencia. El hosting no está incluido.'
              href={`${SITE_MAINTENANCE_PATH}#${MAINTENANCE_PLANES_ID}`}
              hrefLabel='Ver mantenimiento'
              items={[
                planWeb
                  ? `Mantenimiento Web (Plan Base): ${getPlanPriceLabel(planWeb)}. Hasta 1 hora al mes para pequeños cambios. Respuesta laboral objetivo ≤ 48 h.`
                  : 'Mantenimiento Web (Plan Base): cuota mensual con 1 hora para pequeños cambios.',
                planNegocio
                  ? `Mantenimiento Negocio: ${getPlanPriceLabel(planNegocio)}. Más prioridad y hasta 2 horas al mes. Respuesta laboral objetivo ≤ 24 h.`
                  : 'Mantenimiento Negocio: más prioridad y más horas al mes.',
                planEcommerce
                  ? `Mantenimiento Ecommerce: ${getPlanPriceLabel(planEcommerce)}. Antes revisamos la tienda para confirmar que el plan encaja. No se paga online hasta esa valoración.`
                  : 'Mantenimiento Ecommerce: se valora la tienda antes de aceptar el plan.',
                `Aplicaciones: desde ${formatEuro(APP_MAINTENANCE_FROM)} + IVA/mes, según arquitectura. Antes se revisa el stack.`,
                'Las horas de ese mes no pasan al siguiente.',
                'Rediseños, nuevas funcionalidades, desarrollos grandes, licencias de terceros, hosting y migraciones complejas no están incluidos. El trabajo que pase del tiempo del plan se valora y se presupuesta antes.',
                'El dominio es tuyo. El hosting o la plataforma los pagas tú. Copias de seguridad cuando la infraestructura lo permite.',
                'Puedes cancelar. Te dejamos accesos y copias; la web sigue siendo tuya.',
                'Algunos mantenimientos de clientes ya existentes pueden tener permanencia mínima, si así se acordó por escrito.',
              ]}
            />

            <ConditionBlock
              title='Bonos técnicos'
              intro='Horas de trabajo para arreglar o mejorar tu web. Pago único. Las usamos cuando las necesites.'
              href={`${SITE_MAINTENANCE_PATH}#${MAINTENANCE_BONOS_ID}`}
              hrefLabel='Ver bonos'
              items={[
                ...HOUR_PACKS.map(
                  (pack) =>
                    `${pack.name}: ${getHourPackPriceLabel(pack)} (${formatEuro(pack.hourlyRate)}/hora).`,
                ),
                'Pago único por Stripe en la página de pago del bono.',
                'Las horas se descuentan según el tiempo real trabajado.',
                getHourPackValidityCopy(),
                getHourPackRemainderCopy(),
                'No superamos el bono sin tu aprobación.',
                'Antes de empezar revisamos la tarea. Si el bono no encaja, te lo decimos.',
              ]}
            />

            <ConditionBlock
              title='Google Ads con 36web'
              intro={
                <>
                  Hoy {formatEuro(GOOGLE_ADS_TODAY_AMOUNT)} + IVA (setup{' '}
                  {formatEuro(GOOGLE_ADS_SETUP_AMOUNT)} y primer mes{' '}
                  {formatEuro(GOOGLE_ADS_MONTHLY_AMOUNT)}). Después{' '}
                  {formatEuro(GOOGLE_ADS_MONTHLY_AMOUNT)} + IVA/mes.
                </>
              }
              href={paymentPath(GOOGLE_ADS_PAYMENT_ID)}
              hrefLabel='Ver Google Ads'
              items={[
                'El pago se hace por Stripe: setup único y gestión mensual en el mismo checkout.',
                'Sin permanencia. Puedes cancelar.',
                'La inversión publicitaria en Google no está incluida. La pagas tú directamente a Google.',
                'Setup: configuración de cuenta y campaña, tracking básico, estructura, keywords, anuncios, lanzamiento y creación de landing page.',
                'Gestión mensual: revisión, optimización, palabras clave negativas, pujas y presupuesto, anuncios, informe básico y modificación de landing page para mejorar.',
              ]}
            />
          </div>
        </div>
      </section>

      <section className='page-section bg-surface-muted'>
        <div className='container mx-auto max-w-3xl'>
          <div className='page-title-block text-center'>
            <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl'>
              Publicación, propiedad y garantía
            </h2>
          </div>
          <ConditionList
            items={[
              'En un proyecto web o tienda, publicamos cuando validas la última revisión incluida y está el pago final.',
              'Con el pago íntegro adquieres los derechos de uso. El código y las metodologías de 36web siguen siendo de 36web, según los términos de contratación.',
              'Por defecto podemos mostrar el proyecto en el portfolio. Si necesitas confidencialidad, dilo antes de empezar.',
              'En proyectos web y tiendas entregados, 3 meses de garantía: corregimos gratis errores de programación de lo entregado. No incluye rediseños ni funciones nuevas.',
              'En mantenimiento y bonos, el trabajo se hace sobre las horas o el plan contratado. No sustituyen la garantía de un proyecto nuevo.',
            ]}
          />
        </div>
      </section>

      <HeroCta
        title='¿Dudas sobre cómo se paga tu caso?'
        description='Cuéntanos el servicio y te decimos por escrito qué entra, cuánto sale y cómo se cobra.'
        buttonText='Pedir propuesta'
        heroType='clean'
        hasButton={false}
        hasBackground={false}
        hasReviewBadge={false}
        ctaContent={
          <Button className='!mt-0' onClick={() => openModal()}>
            Pedir propuesta
          </Button>
        }
      />
    </>
  );
};

export default CondicionesDelProyecto;
