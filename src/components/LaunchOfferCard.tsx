import { Check, Clock } from 'lucide-react';
import LaunchPaymentTable from './LaunchPaymentTable';
import LaunchReserveActions from './LaunchReserveActions';
import {
  getLaunchAvailabilityCopy,
  isLaunchSoldOut,
  LAUNCH_DELIVERY_HOURS,
  LAUNCH_OFFER_MAX,
} from '../config/launchOffer';

const LaunchOfferCard = ({ className = '' }: { className?: string }) => {
  const soldOut = isLaunchSoldOut();
  const availability = getLaunchAvailabilityCopy();

  return (
    <div
      className={`z-10 flex w-full justify-center md:w-1/2 ${className}`.trim()}
    >
      <div
        id='reserva'
        className='w-full scroll-mt-[calc(var(--site-header-h)+1rem)] rounded-lg bg-surface-muted p-content-pad shadow-xl md:w-3/4'
      >
        <div className='page-title-block text-center'>
          <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
            Oferta de lanzamiento · Máximo {LAUNCH_OFFER_MAX} proyectos
          </p>
          <p
            className={`text-2xl font-extrabold md:text-3xl ${
              soldOut ? 'text-ink-medium' : 'text-ink-dark'
            }`}
          >
            {availability}
          </p>
          <p className='text-lg text-gray-900'>
            Limitada a las {LAUNCH_OFFER_MAX} primeras reservas.
          </p>
        </div>

        <div className='mt-page-gap flex flex-col gap-content-gap'>
          <LaunchPaymentTable />
          <p className='flex items-center justify-center gap-2 text-base font-bold text-ink-dark'>
            <Clock className='h-5 w-5 shrink-0 text-accent' aria-hidden />
            Entrega en {LAUNCH_DELIVERY_HOURS} h máximo
          </p>
          <ul className='mx-auto w-fit space-y-2 text-left text-sm text-ink-dark md:mx-0 md:text-base'>
            {[
              'Logo si no tienes',
              'Textos y fotos de tu sector',
              'Hosting y dominio incluidos',
            ].map((item) => (
              <li key={item} className='flex items-start gap-2'>
                <Check
                  className='mt-0.5 h-4 w-4 shrink-0 text-accent'
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <LaunchReserveActions location='LaunchHero' align='start' />

          <p className='text-center text-sm text-ink-medium md:text-left'>
            Pago seguro con Stripe. Sin permanencia. La web es tuya.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaunchOfferCard;
