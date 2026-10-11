import { Check } from 'lucide-react';
import Button from './Button';
import {
  getPlanGrossPriceLabel,
  getPlanPriceLabel,
  MAINTENANCE_PLANS,
  maintenanceListClass,
  maintenancePriceCardClass,
  maintenancePriceCtaWrapClass,
  type MaintenancePlan,
} from '../config/maintenanceOffer';
import { trackMaintenancePlanClick } from '../utils/analytics';

const MaintenancePlans = ({ contactFirst = false }: { contactFirst?: boolean }) => {
  return (
    <section
      id='planes'
      className='page-section bg-surface-muted'
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
            <PlanCard key={plan.id} plan={plan} contactFirst={contactFirst} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ plan, contactFirst }: { plan: MaintenancePlan; contactFirst: boolean }) => {
  const planId = plan.id;

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
      <ul className={`mt-6 space-y-2 text-sm md:text-base ${maintenanceListClass}`}>
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
      <div className={maintenancePriceCtaWrapClass}>
        {plan.notes?.map((note) => (
          <p key={note} className='mb-4 text-sm font-bold text-ink-medium'>
            {note}
          </p>
        ))}
        <Button
          href={contactFirst ? '#contacto' : plan.ctaHref}
          className='!mx-0 !mt-0 w-full max-w-none'
          onClick={() => trackMaintenancePlanClick(planId)}
        >
          {contactFirst ? 'Consultar este plan' : plan.cta}
        </Button>
        <p className='mt-3 text-sm text-center md:text-left'>
          {getPlanGrossPriceLabel(plan)}. Sin permanencia.
        </p>
      </div>
    </article>
  );
};

export default MaintenancePlans;
