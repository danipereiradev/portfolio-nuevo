import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Check, Minus, Plus } from 'lucide-react';
import Button from '../components/Button';
import { trackHoursPackCheckout } from '../utils/analytics';
import {
  buildStripeHoursCheckoutUrl,
  clampHours,
  formatEuro,
  getHourlyTotals,
  getPaymentById,
  getPaymentTotals,
  getTotalsFromNet,
  GOOGLE_ADS_CHECKOUT_PATH,
  HOURLY_MAX_HOURS,
  HOURLY_MIN_HOURS,
  parseHours,
  PAYMENT_ROBOTS,
  type PaymentConfig,
} from '../config/payments';

const SITE_URL = 'https://36web.es';

const Pago = () => {
  const { id } = useParams<{ id: string }>();
  const payment = getPaymentById(id);

  useEffect(() => {
    const title = payment
      ? `${payment.serviceName} | 36web`
      : 'Enlace de pago no disponible | 36web';
    const description = payment
      ? payment.description
      : 'Enlace de pago no disponible.';
    const canonicalPath = id ? `/pago/${id}` : '/pago';
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    document.title = title;

    const setMeta = (
      attr: 'name' | 'property',
      key: string,
      content: string,
    ) => {
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      );
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'robots', PAYMENT_ROBOTS);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    return () => {
      document.querySelector('meta[name="robots"]')?.remove();
    };
  }, [id, payment]);

  return (
    <main className='flex min-h-screen items-start justify-center bg-white px-4 pb-10 pt-[calc(var(--site-header-h)+2.5rem)] text-[#101010] md:px-6 md:pb-14'>
      <div className='w-full max-w-lg'>
        {payment ? (
          payment.pricingMode === 'hourly' ? (
            <HourlyPaymentCard payment={payment} />
          ) : payment.pricingMode === 'setup_subscription' ? (
            <SetupSubscriptionCard payment={payment} />
          ) : (
            <PaymentCard payment={payment} />
          )
        ) : (
          <div>
            <h1
              className='text-2xl font-bold md:text-3xl'
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Enlace de pago no disponible.
            </h1>
          </div>
        )}
      </div>
    </main>
  );
};

const PaymentCard = ({ payment }: { payment: PaymentConfig }) => {
  const { total } = getPaymentTotals(payment);
  const isSubscription = payment.paymentType === 'subscription';
  const stripeLink = payment.stripePaymentLink.trim();
  const includes = payment.includes?.filter(Boolean) ?? [];
  const excludes = payment.excludes?.filter(Boolean) ?? [];
  const isNamedPage = !payment.clientName.trim();
  const ctaLabel =
    payment.cta?.trim() ||
    (isSubscription ? 'Activar pago mensual' : 'Pagar ahora');

  const amountLabel = isSubscription
    ? `${formatEuro(payment.amount)} + IVA / mes`
    : `${formatEuro(payment.amount)} + IVA`;

  const totalLabel = isSubscription
    ? `${formatEuro(total)} / mes`
    : formatEuro(total);

  return (
    <article>
      <h1
        className='text-2xl font-bold md:text-3xl'
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {isNamedPage ? payment.serviceName : 'Activación del servicio'}
      </h1>

      {isNamedPage ? null : (
        <dl className='mt-6 space-y-4'>
          {payment.clientName.trim() ? (
            <div>
              <dt className='text-sm text-[#6f6f6d]'>Cliente</dt>
              <dd className='mt-0.5 text-lg font-bold uppercase tracking-wide'>
                {payment.clientName}
              </dd>
            </div>
          ) : null}
          <div>
            <dt className='text-sm text-[#6f6f6d]'>Servicio</dt>
            <dd
              className='mt-0.5 text-lg font-bold'
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {payment.serviceName}
            </dd>
          </div>
        </dl>
      )}

      <p className='mt-4 text-base leading-relaxed text-[#4d4d4c]'>
        {payment.description}
      </p>

      <div className='mt-6 rounded-lg bg-[rgb(237,239,247)] px-5 py-5'>
        <p
          className='text-2xl font-bold md:text-3xl'
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {amountLabel}
        </p>

        <dl className='mt-4 space-y-2 text-sm'>
          <div className='flex justify-between gap-4 border-t border-[#3346C1]/15 pt-2 text-base'>
            <dt className='font-semibold'>
              {isSubscription ? 'Total mensual con IVA' : 'Total con IVA'}
            </dt>
            <dd className='font-bold'>{totalLabel}</dd>
          </div>
        </dl>
      </div>

      {includes.length > 0 ? (
        <section className='mt-6'>
          <h2
            className='text-base font-bold'
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Qué incluye
          </h2>
          <ul className='mt-3 space-y-2'>
            {includes.map((item) => (
              <li key={item} className='flex items-start gap-2 text-sm'>
                <Check
                  className='mt-0.5 h-4 w-4 shrink-0 text-[#3346C1]'
                  aria-hidden='true'
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {excludes.length > 0 ? (
        <section className='mt-6'>
          <h2
            className='text-base font-bold'
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Qué no incluye
          </h2>
          <ul className='mt-3 space-y-2'>
            {excludes.map((item) => (
              <li
                key={item}
                className='flex items-start gap-2 text-sm text-[#4d4d4c]'
              >
                <Minus
                  className='mt-0.5 h-4 w-4 shrink-0 text-[#6f6f6d]'
                  aria-hidden='true'
                />
                <span className='min-w-0'>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className='mt-8'>
        {stripeLink ? (
          <Button
            href={stripeLink}
            className='mt-0'
            rel='noopener noreferrer'
          >
            {ctaLabel}
          </Button>
        ) : (
          <p className='text-center text-sm text-[#6f6f6d]'>
            Enlace de pago pendiente de configuración.
          </p>
        )}
      </div>

      {payment.conditions ? (
        <p className='mt-4 text-center text-xs leading-relaxed text-[#6f6f6d] whitespace-pre-line'>
          {payment.conditions}
        </p>
      ) : null}
    </article>
  );
};

const IncludeList = ({ title, items }: { title: string; items: string[] }) => {
  if (items.length === 0) return null;

  return (
    <section className='mt-6'>
      <h2
        className='text-base font-bold'
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
      </h2>
      <ul className='mt-3 space-y-2'>
        {items.map((item) => (
          <li key={item} className='flex items-start gap-2 text-sm'>
            <Check
              className='mt-0.5 h-4 w-4 shrink-0 text-[#3346C1]'
              aria-hidden='true'
            />
            <span className='min-w-0'>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

const SetupSubscriptionCard = ({ payment }: { payment: PaymentConfig }) => {
  const setupAmount = payment.setupAmount ?? 0;
  const monthlyAmount = payment.monthlyAmount ?? 0;
  const todayAmount = payment.amount;
  const { total } = getTotalsFromNet(todayAmount, payment.vatRate);
  const setupIncludes = payment.setupIncludes?.filter(Boolean) ?? [];
  const monthlyIncludes = payment.monthlyIncludes?.filter(Boolean) ?? [];
  const excludes = payment.excludes?.filter(Boolean) ?? [];
  const checkoutPath = payment.checkoutPath?.trim() || GOOGLE_ADS_CHECKOUT_PATH;
  const stripeLink = payment.stripePaymentLink.trim();
  const ctaLabel = payment.cta?.trim() || 'Pagar ahora';
  const [isStartingCheckout, setIsStartingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const startCheckout = async () => {
    setCheckoutError('');
    setIsStartingCheckout(true);
    try {
      const response = await fetch(checkoutPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = (await response.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!response.ok || !data.url) {
        throw new Error(data.error || 'No se pudo crear el pago.');
      }
      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : 'No se pudo crear el pago.',
      );
      setIsStartingCheckout(false);
    }
  };

  return (
    <article>
      <h1
        className='text-2xl font-bold md:text-3xl'
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {payment.serviceName}
      </h1>

      <p className='mt-4 text-base leading-relaxed text-[#4d4d4c]'>
        {payment.description}
      </p>

      <div className='mt-6 rounded-lg bg-[rgb(237,239,247)] px-5 py-5'>
        <p
          className='text-2xl font-bold md:text-3xl'
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Hoy: {formatEuro(todayAmount)} + IVA
        </p>
        <p className='mt-2 text-lg font-bold text-[#101010]'>
          Después: {formatEuro(monthlyAmount)} + IVA / mes
        </p>

        <dl className='mt-4 space-y-2 text-sm'>
          <div className='flex justify-between gap-4'>
            <dt className='text-[#6f6f6d]'>Setup inicial (pago único)</dt>
            <dd className='font-medium'>{formatEuro(setupAmount)} + IVA</dd>
          </div>
          <div className='flex justify-between gap-4'>
            <dt className='text-[#6f6f6d]'>Gestión mensual</dt>
            <dd className='font-medium'>{formatEuro(monthlyAmount)} + IVA / mes</dd>
          </div>
          <div className='flex justify-between gap-4 border-t border-[#3346C1]/15 pt-2 text-base'>
            <dt className='font-semibold'>Total hoy con IVA</dt>
            <dd className='font-bold'>{formatEuro(total)}</dd>
          </div>
        </dl>
      </div>

      <IncludeList title='Qué incluye el setup' items={setupIncludes} />
      <IncludeList title='Qué incluye la gestión mensual' items={monthlyIncludes} />

      {excludes.length > 0 ? (
        <section className='mt-6'>
          <h2
            className='text-base font-bold'
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Qué no incluye
          </h2>
          <ul className='mt-3 space-y-2'>
            {excludes.map((item) => (
              <li
                key={item}
                className='flex items-start gap-2 text-sm text-[#4d4d4c]'
              >
                <Minus
                  className='mt-0.5 h-4 w-4 shrink-0 text-[#6f6f6d]'
                  aria-hidden='true'
                />
                <span className='min-w-0'>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className='mt-8'>
        {stripeLink ? (
          <Button
            href={stripeLink}
            className='mt-0 !mx-0'
            rel='noopener noreferrer'
          >
            {ctaLabel}
          </Button>
        ) : (
          <>
            <Button
              className='mt-0 !mx-0'
              onClick={() => {
                void startCheckout();
              }}
              disabled={isStartingCheckout}
              isLoading={isStartingCheckout}
            >
              {ctaLabel}
            </Button>
            {checkoutError ? (
              <p className='mt-3 text-left text-sm text-accent'>
                {checkoutError}
              </p>
            ) : null}
          </>
        )}
      </div>

      {payment.conditions ? (
        <p className='mt-4 text-left text-xs leading-relaxed text-[#6f6f6d] whitespace-pre-line'>
          {payment.conditions}
        </p>
      ) : null}
    </article>
  );
};

const HOURS_QUERY = 'horas';

const HourlyPaymentCard = ({ payment }: { payment: PaymentConfig }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hoursFromUrl = parseHours(searchParams.get(HOURS_QUERY) ?? '');
  const [hoursInput, setHoursInput] = useState(
    hoursFromUrl ? String(hoursFromUrl) : '',
  );
  const hours = parseHours(hoursInput);
  const totals = hours ? getHourlyTotals(hours, payment) : null;
  const stripeLink = payment.stripePaymentLink.trim();
  const checkoutUrl =
    stripeLink && hours ? buildStripeHoursCheckoutUrl(stripeLink, hours) : '';
  const includes = payment.includes?.filter(Boolean) ?? [];

  const syncHoursToUrl = (nextHours: number) => {
    const next = new URLSearchParams(searchParams);
    next.set(HOURS_QUERY, String(nextHours));
    setSearchParams(next, { replace: true });
  };

  const setHours = (nextHours: number) => {
    const clamped = clampHours(nextHours);
    setHoursInput(String(clamped));
    syncHoursToUrl(clamped);
  };

  const checkoutLabel = hours
    ? `Pagar ${formatEuro(totals?.total ?? 0)}`
    : 'Pagar ahora';

  return (
    <article>
      <h1
        className='text-2xl font-bold md:text-3xl'
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Activación del servicio
      </h1>

      <dl className='mt-6 space-y-4'>
        <div>
          <dt className='text-sm text-[#6f6f6d]'>Servicio</dt>
          <dd
            className='mt-0.5 text-lg font-bold'
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {payment.serviceName}
          </dd>
        </div>
        <div>
          <dt className='text-sm text-[#6f6f6d]'>Tarifa</dt>
          <dd className='mt-0.5 text-lg font-bold'>
            {formatEuro(payment.amount)} / h + IVA
          </dd>
        </div>
      </dl>

      <p className='mt-4 text-base leading-relaxed text-[#4d4d4c]'>
        {payment.description}
      </p>

      <div className='mt-6'>
        <label
          htmlFor='horas'
          className='block text-sm font-medium text-[#6f6f6d]'
        >
          Horas
        </label>
        <div className='mt-2 flex items-center gap-2'>
          <button
            type='button'
            className='inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-ink-dark bg-white text-ink-dark transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40'
            onClick={() => setHours((hours ?? HOURLY_MIN_HOURS) - 1)}
            disabled={!hours || hours <= HOURLY_MIN_HOURS}
            aria-label='Quitar una hora'
          >
            <Minus className='h-5 w-5' aria-hidden='true' />
          </button>
          <input
            id='horas'
            type='number'
            inputMode='numeric'
            min={HOURLY_MIN_HOURS}
            max={HOURLY_MAX_HOURS}
            step={1}
            value={hoursInput}
            onChange={(event) => {
              const raw = event.target.value;
              setHoursInput(raw);
              const parsed = parseHours(raw);
              if (parsed) syncHoursToUrl(parsed);
            }}
            onBlur={() => {
              if (hours) {
                setHours(hours);
                return;
              }
              setHoursInput('');
            }}
            className='w-full [appearance:textfield] rounded-lg border-2 border-ink-dark bg-white px-4 py-3 text-center text-2xl font-bold text-[#101010] focus:border-accent focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            placeholder='0'
            aria-describedby='horas-ayuda'
          />
          <button
            type='button'
            className='inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-ink-dark bg-white text-ink-dark transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40'
            onClick={() => setHours((hours ?? 0) + 1)}
            disabled={!!hours && hours >= HOURLY_MAX_HOURS}
            aria-label='Añadir una hora'
          >
            <Plus className='h-5 w-5' aria-hidden='true' />
          </button>
        </div>
        <p id='horas-ayuda' className='mt-2 text-sm text-[#6f6f6d]'>
          Mínimo {HOURLY_MIN_HOURS} hora. Máximo {HOURLY_MAX_HOURS}.
        </p>
      </div>

      <div className='mt-6 rounded-lg bg-[rgb(237,239,247)] px-5 py-5'>
        <p
          className='text-2xl font-bold md:text-3xl'
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {hours
            ? `${hours} ${hours === 1 ? 'hora' : 'horas'} · ${formatEuro(payment.amount)} / h + IVA`
            : `${formatEuro(payment.amount)} / h + IVA`}
        </p>

        <dl className='mt-4 space-y-2 text-sm'>
          <div className='flex justify-between gap-4'>
            <dt className='text-[#6f6f6d]'>Base imponible</dt>
            <dd className='font-medium'>
              {totals ? formatEuro(totals.amount) : '—'}
            </dd>
          </div>
          <div className='flex justify-between gap-4'>
            <dt className='text-[#6f6f6d]'>IVA ({payment.vatRate} %)</dt>
            <dd className='font-medium'>
              {totals ? formatEuro(totals.vatAmount) : '—'}
            </dd>
          </div>
          <div className='flex justify-between gap-4 border-t border-[#3346C1]/15 pt-2 text-base'>
            <dt className='font-semibold'>Total con IVA</dt>
            <dd className='font-bold'>
              {totals ? formatEuro(totals.total) : '—'}
            </dd>
          </div>
        </dl>
      </div>

      {includes.length > 0 ? (
        <section className='mt-6'>
          <h2
            className='text-base font-bold'
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Este servicio incluye
          </h2>
          <ul className='mt-3 space-y-2'>
            {includes.map((item) => (
              <li key={item} className='flex items-start gap-2 text-sm'>
                <Check
                  className='mt-0.5 h-4 w-4 shrink-0 text-[#3346C1]'
                  aria-hidden='true'
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className='mt-8'>
        {stripeLink ? (
          hours && checkoutUrl ? (
            <Button
              href={checkoutUrl}
              className='mt-0'
              rel='noopener noreferrer'
              onClick={() => {
                if (totals) trackHoursPackCheckout(hours, totals.total);
              }}
            >
              {checkoutLabel}
            </Button>
          ) : (
            <Button className='mt-0' disabled>
              Indica las horas
            </Button>
          )
        ) : (
          <p className='text-center text-sm text-[#6f6f6d]'>
            Enlace de pago pendiente de configuración.
          </p>
        )}
      </div>

      {payment.conditions ? (
        <p className='mt-4 text-center text-xs leading-relaxed text-[#6f6f6d] whitespace-pre-line'>
          {payment.conditions}
        </p>
      ) : null}
    </article>
  );
};

export default Pago;
