import { Check } from 'lucide-react';
import Button from './Button';
import {
  getHourPackHref,
  getHourPackPriceLabel,
  getHourPackRateLabel,
  getHourPackRemainderCopy,
  getHourPackValidityCopy,
  HOUR_PACKS,
  maintenanceListClass,
  maintenancePriceCardClass,
  type HourPack,
  type HourPackId,
} from '../config/maintenanceOffer';
import { trackHourPackClick } from '../utils/analytics';

const MaintenanceHourPacks = () => {
  return (
    <section
      id='bonos'
      className='page-section'
    >
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-5xl text-center'>
          <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            ¿Solo necesitas ayuda puntual?
          </h2>
          <p className='text-xl text-ink-dark md:text-2xl'>
            No necesitas contratar una cuota mensual. Compra un bono de horas
            y utilizamos ese tiempo exclusivamente en lo que necesita tu web.
          </p>
        </div>

        <div className='grid items-stretch gap-page-gap md:grid-cols-3'>
          {HOUR_PACKS.map((pack) => (
            <HourPackCard key={pack.id} pack={pack} />
          ))}
        </div>

        <div className='mx-auto max-w-3xl space-y-3 text-center text-base leading-relaxed text-ink-dark md:text-left md:text-lg'>
          <p className='font-extrabold'>{getHourPackValidityCopy()}</p>
          <p>
            Antes de empezar revisamos brevemente la tarea. Si creemos que el
            bono no es suficiente o que el problema requiere otro enfoque, te lo
            decimos antes de consumir horas.
          </p>
          <p>{getHourPackRemainderCopy()}</p>
          <p className='font-extrabold'>
            No continuamos por encima de las horas contratadas sin tu
            aprobación.
          </p>
        </div>
      </div>
    </section>
  );
};

const HourPackCard = ({ pack }: { pack: HourPack }) => {
  const href = getHourPackHref(pack);
  const hours = pack.hours as HourPackId;

  return (
    <article className={maintenancePriceCardClass(pack.featured)}>
      {pack.featured ? (
        <p className='mb-3 text-sm font-extrabold uppercase tracking-wide text-accent'>
          {pack.featuredLabel}
        </p>
      ) : null}
      <h3 className='text-2xl font-extrabold md:text-3xl'>{pack.name}</h3>
      <p className='mt-2 text-3xl font-extrabold md:text-4xl'>
        {getHourPackPriceLabel(pack)}
      </p>
      <p className='mt-1 text-base font-bold text-ink-medium'>
        {getHourPackRateLabel(pack)}
      </p>
      <p className='mt-3 text-sm font-bold text-ink-dark'>
        {getHourPackValidityCopy()}
      </p>
      <ul className={`mt-6 flex-1 space-y-2 text-sm md:text-base ${maintenanceListClass}`}>
        {pack.ideal.map((item) => (
          <li key={item} className='flex items-start gap-2'>
            <Check
              className='mt-0.5 h-4 w-4 shrink-0 text-accent'
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Button
        href={href}
        className='mt-8 !mx-0 w-full max-w-none'
        onClick={() => trackHourPackClick(Number(hours) as 3 | 6 | 10)}
      >
        {pack.cta}
      </Button>
    </article>
  );
};

export default MaintenanceHourPacks;
