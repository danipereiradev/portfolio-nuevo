import {
  getLaunchAvailabilityCopy,
  getLaunchPriceLabel,
  getLaunchRemaining,
  getLaunchReserveLabel,
  isLaunchSoldOut,
  LAUNCH_DELIVERY_HOURS,
  LAUNCH_OFFER_MAX,
} from '../config/launchOffer';

const LaunchTrustBar = () => {
  const remaining = getLaunchRemaining();
  const soldOut = isLaunchSoldOut();

  const items = [
    {
      value: getLaunchPriceLabel(),
      label: 'Precio cerrado',
    },
    {
      value: soldOut ? '0' : String(remaining),
      suffix: ` / ${LAUNCH_OFFER_MAX}`,
      label: soldOut
        ? 'Plazas agotadas'
        : remaining === LAUNCH_OFFER_MAX
          ? 'Plazas de lanzamiento'
          : 'Plazas restantes',
    },
    {
      value: getLaunchReserveLabel(),
      label: 'Para reservar',
    },
    {
      value: `${LAUNCH_DELIVERY_HOURS} h`,
      label: 'Entrega máxima',
    },
  ];

  return (
    <section className='launch-trustbar bg-brand'>
      <div className='container mx-auto grid grid-cols-2 md:grid-cols-4'>
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-6 text-center md:py-8 ${
              index % 2 === 0 ? 'border-r border-ink-dark/15 md:border-r-0' : ''
            } ${index < 2 ? 'border-b border-ink-dark/15 md:border-b-0' : ''} ${
              index < 3 ? 'md:border-r md:border-ink-dark/15' : ''
            }`}
          >
            <p className='font-display text-2xl font-extrabold leading-none text-ink-dark md:text-3xl'>
              {item.value}
              {item.suffix ? (
                <span className='text-lg font-bold text-ink-dark/70 md:text-xl'>
                  {item.suffix}
                </span>
              ) : null}
            </p>
            <p className='text-sm font-bold text-ink-dark md:text-base'>
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <p className='sr-only'>{getLaunchAvailabilityCopy()}</p>
    </section>
  );
};

export default LaunchTrustBar;
