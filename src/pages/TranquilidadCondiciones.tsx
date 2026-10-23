import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import {
  tranquilityPlans,
  getTranquilityCheckoutFeatures,
  tranquilityScope,
  tranquilityCancellation,
  tranquilityAttention,
  tranquilityOwnership,
} from '../config/tranquility';
import { trackCtaClick, trackEvent } from '../utils/analytics';
import { getMeasurementConsent } from '../utils/measurementConsent';
import { usePageMeta } from '../hooks/usePageMeta';

export default function TranquilidadCondiciones() {
  const [params] = useSearchParams();
  const plansHref =
    params.get('origin') === 'ads'
      ? '/landing-tranquilidad-digital/#planes'
      : '/tranquilidad-digital/#planes';
  const plan = tranquilityPlans.find(
    (item) => item.name.toLowerCase() === params.get('plan'),
  );
  const [accepted, setAccepted] = useState(false);
  const [openCondition, setOpenCondition] = useState<number | null>(0);
  usePageMeta('/pago/tranquilidad-digital');
  useEffect(() => {
    setAccepted(false);
    setOpenCondition(0);
    if (plan && getMeasurementConsent()?.analytics)
      trackEvent('tranquilidad_conditions_view', { plan: plan.name });
  }, [plan]);
  if (!plan)
    return (
      <main className='max-w-2xl mx-auto px-5 pt-[calc(var(--site-header-h)+2rem)] pb-16'>
        <h1 className='text-3xl font-bold'>
          Elige el plan que quieres revisar
        </h1>
        <p className='my-5'>
          Primero revisamos tu proyecto y sus condiciones. Todavía no hay ningún
          cobro.
        </p>
        <Button href={plansHref}>Ver planes</Button>
      </main>
    );
  return (
    <main className='max-w-3xl mx-auto px-5 pt-[calc(var(--site-header-h)+2rem)] pb-16'>
      <a href={plansHref} className='underline text-accent'>
        ← Volver a los planes
      </a>
      <p className='text-accent font-bold mt-7 mb-3'>
        1. Tu proyecto · 2. Propuesta y condiciones · 3. Pago seguro
      </p>
      <h1 className='text-3xl md:text-4xl font-bold'>
        Antes de activar {plan.name}, dejémoslo claro.
      </h1>
      <p className='text-lg mt-5'>Esta página resume el plan seleccionado.</p>
      <section className='rounded-2xl bg-surface-muted p-6 my-7'>
        <h2 className='text-2xl font-bold'>Cuánto pagarás</h2>
        <p className='mt-4 font-semibold text-accent'>{plan.initialDesign}, valorado en {plan.initialValue} €, incluido sin pago inicial adicional.</p>
        <dl className='space-y-3 mt-4'>
          <div className='flex justify-between gap-4'>
            <dt>Alta y creación de la web</dt>
            <dd className='font-bold'>0 €</dd>
          </div>
          <div className='flex justify-between gap-4'>
            <dt>Primera cuota</dt>
            <dd className='font-bold'>{plan.price} € + IVA</dd>
          </div>
          <div className='flex justify-between gap-4 border-t pt-3'>
            <dt>Total hoy, si decides contratar</dt>
            <dd className='font-bold'>{plan.total} €</dd>
          </div>
          <div className='flex justify-between gap-4'>
            <dt>Renovación mensual, IVA incluido</dt>
            <dd className='font-bold'>{plan.total} €/mes</dd>
          </div>
        </dl>
        <p className='mt-4 text-sm'>
          Sin permanencia. Una web por suscripción, sin tienda online. Los trabajos
          adicionales solo se realizan con presupuesto y aceptación previos.
        </p>
        <p className='mt-4 font-bold text-accent'>{tranquilityOwnership}</p>
      </section>
      <div className='my-8 overflow-hidden rounded-2xl border border-accent/20 divide-y divide-accent/20'>
        {[
          {
            title: `Qué incluye ${plan.name}`,
            content: (
              <>
                <ul className='list-disc pl-5 space-y-3'>
                  {getTranquilityCheckoutFeatures(plan).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className='mt-4'>{plan.detail}</p>
              </>
            ),
          },
          {
            title: 'Alcance y trabajos adicionales',
            content: (
              <ul className='list-disc pl-5 space-y-3'>
                {tranquilityScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          },
          {
            title: 'Preparación, plazos y atención',
            content: (
              <>
                <p>
                  Al activar el plan, te asignamos un desarrollador y
                  empezamos. Te pedimos textos, fotos, accesos y datos del
                  negocio. Antes de pagar, acordamos por escrito el alcance, la
                  fecha estimada de entrega y las fases según los materiales disponibles. Si falta algo, te lo
                  decimos y acordamos un nuevo calendario.
                </p>
                <p className='mt-4'>{tranquilityAttention}</p>
              </>
            ),
          },
          {
            title: 'Propiedad tras 12 cuotas y cancelación',
            content: (
              <>
                <p>{tranquilityCancellation}</p>
                <p className='mt-4'>
                  Puedes solicitar la baja en{' '}
                  <a href='mailto:hola@36web.es' className='underline'>
                    hola@36web.es
                  </a>
                  . Concretamos contigo la entrega y transferencia para que
                  sepas cómo continuar.
                </p>
              </>
            ),
          },
        ].map((item, index) => (
          <section key={item.title} className='bg-surface-muted'>
            <h2>
              <button
                id={`pago-condition-trigger-${index}`}
                type='button'
                aria-expanded={openCondition === index}
                aria-controls={`pago-condition-panel-${index}`}
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
            </h2>
            <div
              id={`pago-condition-panel-${index}`}
              role='region'
              aria-labelledby={`pago-condition-trigger-${index}`}
              hidden={openCondition !== index}
              className='px-5 pb-6 text-base leading-relaxed md:px-6'
            >
              {item.content}
            </div>
          </section>
        ))}
      </div>
      <section className='border-t pt-7' aria-labelledby='activate-title'>
        <h2 id='activate-title' className='text-2xl font-bold mb-4'>
          ¿Empezamos con tu proyecto? Estás en buenas manos.
        </h2>
        <label className='flex gap-3 py-3 items-start'>
          <input
            type='checkbox'
            className='mt-1 w-5 h-5 shrink-0'
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
          />
          <span>
            He leído estas condiciones, la renovación de {plan.total} €/mes con
            IVA, el alcance de la propuesta acordada, la entrega de la web tras 12 cuotas pagadas y las condiciones de cancelación. He leído los{' '}
            <a
              href='/terminos-y-condiciones/'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              términos de contratación
            </a>
            .
          </span>
        </label>
        <Button
          className='!mx-0 !w-full'
          disabled={!accepted}
          onClick={() => {
            if (!accepted) return;
            trackCtaClick(`Activar ${plan.name}`, 'TranquilidadDigital_Stripe');
            if (getMeasurementConsent()?.analytics)
              trackEvent('begin_checkout', {
                currency: 'EUR',
                value: Number(plan.price.replace(',', '.')),
                items: [
                  {
                    item_id: `tranquilidad-${plan.name.toLowerCase()}`,
                    item_name: plan.name,
                    quantity: 1,
                  },
                ],
              });
            window.location.assign(plan.checkout);
          }}
        >
          Continuar a pago seguro · {plan.total} €
        </Button>
        <p className='text-sm mt-3'>
          El cobro se confirma en Stripe. Esta casilla no realiza ningún
          pago.
        </p>
      </section>
    </main>
  );
}
