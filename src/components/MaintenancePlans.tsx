import { Check } from 'lucide-react';
import Button from './Button';
import {
  APP_MAINTENANCE_FROM,
  getPlanPriceLabel,
  MAINTENANCE_APPS_ID,
  MAINTENANCE_CONTACT_ID,
  MAINTENANCE_PLANS,
  maintenanceCardAlignClass,
  maintenanceListClass,
  maintenancePriceCardClass,
  type MaintenancePlan,
  type MaintenancePlanId,
} from '../config/maintenanceOffer';
import { formatEuro } from '../config/payments';
import { trackMaintenancePlanClick } from '../utils/analytics';

const MaintenancePlans = () => {
  return (
    <section
      id='planes'
      className='page-section scroll-mt-[calc(var(--site-header-h)+1rem)] bg-surface-muted'
    >
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-5xl text-center'>
          <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            Si tu web es importante para tu negocio, no esperes a que se rompa.
          </h2>
          <p className='text-xl text-ink-dark md:text-2xl'>
            Nos ocupamos de ella cada mes y tienes a alguien técnico a quien
            escribir cuando aparece un problema.
          </p>
        </div>

        <div className='grid items-stretch gap-page-gap lg:grid-cols-3'>
          {MAINTENANCE_PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <article
          id={MAINTENANCE_APPS_ID}
          className={`scroll-mt-[calc(var(--site-header-h)+1rem)] flex flex-col ${maintenanceCardAlignClass} rounded-lg bg-white p-content-pad shadow-xl ring-1 ring-black/10`}
        >
          <h3 className='text-2xl font-extrabold text-ink-dark md:text-3xl'>
            ¿No es WordPress? También.
          </h3>
          <p className='mt-text-gap text-lg text-ink-dark md:text-xl'>
            Mantenemos aplicaciones y proyectos con frontend, backend, APIs,
            servidores e integraciones. En estos proyectos el precio depende
            de la arquitectura y de la responsabilidad técnica. Antes se revisa
            el stack: no prometemos hacernos cargo de cualquier tecnología sin
            verla.
          </p>
          <p className='mt-text-gap text-base text-ink-medium md:text-lg'>
            React / Next.js, Vue / Angular, Node, PHP / Laravel, APIs, bases de
            datos, Nginx, Vercel, servidores e integraciones externas.
          </p>
          <p className='mt-text-gap text-2xl font-extrabold text-ink-dark md:text-3xl'>
            Mantenimiento de aplicaciones desde {formatEuro(APP_MAINTENANCE_FROM)}{' '}
            + IVA/mes
          </p>
          <Button
            href={`#${MAINTENANCE_CONTACT_ID}`}
            className='mt-6 mx-auto md:mx-0'
            onClick={() => trackMaintenancePlanClick('apps')}
          >
            Cuéntanos cómo está construida
          </Button>
        </article>
      </div>
    </section>
  );
};

const PlanCard = ({ plan }: { plan: MaintenancePlan }) => {
  const planId = plan.id as Exclude<MaintenancePlanId, 'apps'>;

  return (
    <article className={maintenancePriceCardClass(plan.featured)}>
      {plan.featured ? (
        <p className='mb-3 text-sm font-extrabold uppercase tracking-wide text-accent'>
          {plan.featuredLabel}
        </p>
      ) : null}
      <h3 className='text-2xl font-extrabold md:text-3xl'>{plan.name}</h3>
      <p className='mt-2 text-3xl font-extrabold md:text-4xl'>
        {getPlanPriceLabel(plan)}
      </p>
      <p className='mt-3 text-base text-ink-medium md:text-lg'>
        {plan.ideal}
      </p>
      <ul className={`mt-6 flex-1 space-y-2 text-sm md:text-base ${maintenanceListClass}`}>
        {plan.includes.map((item) => (
          <li key={item} className='flex items-start gap-2'>
            <Check
              className='mt-0.5 h-4 w-4 shrink-0 text-accent'
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {plan.notes?.map((note) => (
        <p key={note} className='mt-4 text-sm font-bold text-ink-medium'>
          {note}
        </p>
      ))}
      <Button
        href={plan.ctaHref}
        className='mt-8 !mx-0 w-full max-w-none'
        onClick={() => trackMaintenancePlanClick(planId)}
      >
        {plan.cta}
      </Button>
    </article>
  );
};

export default MaintenancePlans;
