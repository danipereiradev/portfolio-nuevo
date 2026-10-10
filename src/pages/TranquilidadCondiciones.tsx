import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import {
  tranquilityPlans,
  tranquilityScope,
  tranquilityCancellation,
  tranquilityAttention,
} from '../config/tranquility';
import { buildWhatsAppUrl } from '../config/contact';
import {
  trackCtaClick,
  trackEvent,
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import { getMeasurementConsent } from '../utils/measurementConsent';
import { usePageMeta } from '../hooks/usePageMeta';

export default function TranquilidadCondiciones() {
  const [params] = useSearchParams();
  const plan = tranquilityPlans.find(
    (item) => item.name.toLowerCase() === params.get('plan'),
  );
  const [reviewed, setReviewed] = useState(false);
  const [accepted, setAccepted] = useState(false);
  usePageMeta('/pago/tranquilidad-digital');
  useEffect(() => {
    setReviewed(false);
    setAccepted(false);
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
        <Button href='/tranquilidad-digital/#planes'>Ver planes</Button>
      </main>
    );
  const contact = buildWhatsAppUrl(
    `Hola, me interesa el plan ${plan.name} de Tranquilidad Digital. Quiero contaros mi proyecto y recibir el alcance y las condiciones por escrito antes de pagar.`,
  );
  return (
    <main className='max-w-3xl mx-auto px-5 pt-[calc(var(--site-header-h)+2rem)] pb-16'>
      <a href='/tranquilidad-digital/#planes' className='underline text-accent'>
        ← Volver a los planes
      </a>
      <p className='text-accent font-bold mt-7 mb-3'>
        1. Tu proyecto · 2. Propuesta y condiciones · 3. Pago seguro
      </p>
      <h1 className='text-3xl md:text-4xl font-bold'>
        Antes de activar {plan.name}, dejémoslo claro.
      </h1>
      <p className='text-lg mt-5'>
        Esta página resume el plan. Tu propuesta escrita concreta el trabajo
        para tu negocio. No pagues hasta que hayamos revisado el proyecto y
        confirmado contigo el alcance.
      </p>
      <section className='rounded-2xl bg-surface-muted p-6 my-7'>
        <h2 className='text-2xl font-bold'>Cuánto pagarás</h2>
        <dl className='space-y-3 mt-4'>
          <div className='flex justify-between gap-4'>
            <dt>Alta y creación de la web o tienda</dt>
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
          Sin permanencia. Una web o una tienda por suscripción. Los trabajos
          adicionales solo se realizan con presupuesto y aceptación previos.
        </p>
      </section>
      <section className='my-8'>
        <h2 className='text-2xl font-bold mb-4'>Qué incluye {plan.name}</h2>
        <ul className='list-disc pl-5 space-y-3'>
          {plan.features.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className='mt-4'>{plan.detail}</p>
      </section>
      <section className='my-8'>
        <h2 className='text-2xl font-bold mb-4'>
          Alcance y trabajos adicionales
        </h2>
        <ul className='list-disc pl-5 space-y-3'>
          {tranquilityScope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className='my-8'>
        <h2 className='text-2xl font-bold mb-4'>
          Preparación, plazos y atención
        </h2>
        <p>
          Antes del pago recibirás la fecha estimada de entrega y las fases del
          proyecto. Necesitamos textos, fotos, accesos y datos del negocio; en
          tiendas, también catálogo, precios y condiciones de envío. La fecha
          depende del alcance y de disponer de esos materiales. Si faltan,
          acordamos un nuevo calendario.
        </p>
        <p className='mt-4'>{tranquilityAttention}</p>
      </section>
      <section className='my-8'>
        <h2 className='text-2xl font-bold mb-4'>Si cancelas</h2>
        <p>{tranquilityCancellation}</p>
        <p className='mt-4'>
          Puedes solicitar la baja en{' '}
          <a href='mailto:hola@36web.es' className='underline'>
            hola@36web.es
          </a>
          . Concretamos contigo la entrega y transferencia para que sepas cómo
          continuar.
        </p>
      </section>
      <section className='rounded-2xl border border-accent/30 p-6 my-8'>
        <h2 className='text-2xl font-bold'>
          ¿Aún no hemos revisado tu proyecto?
        </h2>
        <p className='mt-3 mb-5'>
          Cuéntanos qué necesitas. Te responderemos con el siguiente paso, sin
          pedirte que pagues ahora.
        </p>
        <Button
          className='!m-0 !w-full'
          href={contact}
          allowAdsOutbound
          onClick={(event) => {
            event.preventDefault();
            trackWhatsAppClick(`TranquilidadDigital_Revision_${plan.name}`);
            trackGoogleAdsWhatsAppConversion(contact);
          }}
        >
          Cuéntanos qué necesitas
        </Button>
      </section>
      <section className='border-t pt-7' aria-labelledby='activate-title'>
        <h2 id='activate-title' className='text-2xl font-bold mb-4'>
          ¿Ya tienes nuestra propuesta y quieres empezar?
        </h2>
        <label className='flex gap-3 py-3 items-start'>
          <input
            type='checkbox'
            className='mt-1 w-5 h-5 shrink-0'
            checked={reviewed}
            onChange={(event) => setReviewed(event.target.checked)}
          />
          <span>
            36WEB ha revisado mi proyecto y he recibido y aceptado por escrito
            su alcance, catálogo si corresponde, funciones, plazos y posibles
            extras.
          </span>
        </label>
        <label className='flex gap-3 py-3 items-start'>
          <input
            type='checkbox'
            className='mt-1 w-5 h-5 shrink-0'
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
          />
          <span>
            He leído estas condiciones, la renovación de {plan.total} €/mes con
            IVA y las condiciones de cancelación. He leído los{' '}
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
          disabled={!reviewed || !accepted}
          onClick={() => {
            if (!reviewed || !accepted) return;
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
          El cobro se confirma en Stripe. Estas casillas no realizan ningún
          pago.
        </p>
      </section>
    </main>
  );
}
