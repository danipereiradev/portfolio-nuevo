import { Check, Clock } from 'lucide-react';
import LaunchPaymentTable from './LaunchPaymentTable';
import LaunchReserveActions from './LaunchReserveActions';
import { LAUNCH_DELIVERY_HOURS } from '../config/launchOffer';

const LaunchOfferCard = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`z-10 flex w-full justify-center md:w-1/2 ${className}`.trim()}
    >
      <div
        id='reserva'
        className='w-full rounded-lg bg-surface-muted p-content-pad shadow-xl md:w-3/4'
      >
        <div className='page-title-block text-center'>
          <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
            Web profesional
          </p>
          <p className='text-2xl font-extrabold text-ink-dark md:text-3xl'>
            Reserva para empezar
          </p>
          <p className='text-lg text-gray-900'>
            El resto se paga antes de publicar.
          </p>
        </div>

        <div className='mt-page-gap flex flex-col gap-content-gap'>
          <LaunchPaymentTable />
          <p className='flex items-start justify-center gap-2 text-base font-bold text-ink-dark'>
            <Clock className='mt-0.5 h-5 w-5 shrink-0 text-accent' aria-hidden />
            Se publica en un máximo de {LAUNCH_DELIVERY_HOURS} h desde que nos
            entregas la información de tu negocio
          </p>
          <ul className='mx-auto w-fit space-y-2 text-left text-sm text-ink-dark md:mx-0 md:text-base'>
            {['Hosting y publicación incluido'].map((item) => (
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
            <a href='#contacto' className='font-bold text-accent underline'>
              ¿Prefieres que te llamemos?
            </a>{' '}
            Déjanos tus datos, sin compromiso.
          </p>

          <p className='text-center text-sm text-ink-medium md:text-left'>
            Pago seguro con Stripe. Sin permanencia. La web es tuya.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaunchOfferCard;
