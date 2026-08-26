import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../components/Button';
import {
  BILLING_INTERVAL_LABEL,
  formatEuro,
  getPaymentById,
  getPaymentTotals,
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
          <PaymentCard payment={payment} />
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
  const interval =
    payment.billingInterval && BILLING_INTERVAL_LABEL[payment.billingInterval];
  const stripeLink = payment.stripePaymentLink.trim();
  const includes = payment.includes?.filter(Boolean) ?? [];

  const amountLabel = isSubscription
    ? `${formatEuro(total)}/mes IVA incluido`
    : `${formatEuro(payment.amount)} + IVA`;

  const totalLabel = isSubscription
    ? `${formatEuro(total)} / mes IVA incluido`
    : formatEuro(total);

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
          <dt className='text-sm text-[#6f6f6d]'>Cliente</dt>
          <dd className='mt-0.5 text-lg font-bold uppercase tracking-wide'>
            {payment.clientName}
          </dd>
        </div>
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
          {isSubscription && interval ? (
            <div className='flex justify-between gap-4'>
              <dt className='text-[#6f6f6d]'>Periodicidad</dt>
              <dd className='font-medium'>{interval}</dd>
            </div>
          ) : null}
          <div className='flex justify-between gap-4 border-t border-[#3346C1]/15 pt-2 text-base'>
            <dt className='font-semibold'>
              {isSubscription ? 'Total mensual' : 'Total con IVA'}
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
          <Button
            href={stripeLink}
            className='mt-0'
            rel='noopener noreferrer'
          >
            {isSubscription ? 'Activar pago mensual' : 'Pagar ahora'}
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

export default Pago;
