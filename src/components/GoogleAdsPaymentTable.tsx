import {
  getGoogleAdsMonthlyLabel,
  getGoogleAdsSetupLabel,
  getGoogleAdsTodayLabel,
} from '../config/googleAdsOffer';

const GoogleAdsPaymentTable = () => {
  const rows = [
    {
      title: 'Setup',
      detail: 'Campaña, medición y landing',
      amount: getGoogleAdsSetupLabel(),
    },
    {
      title: 'Gestión',
      detail: 'Mensual. Sin permanencia',
      amount: getGoogleAdsMonthlyLabel(),
    },
    {
      title: 'Primer pago',
      detail: 'Setup + primer mes',
      amount: getGoogleAdsTodayLabel(),
    },
    {
      title: 'Inversión en Google',
      detail: 'La pagas tú, directo a Google',
      amount: 'Aparte',
    },
  ];

  return (
    <div className='mx-auto w-full max-w-xl overflow-hidden rounded-lg border-2 border-ink-dark bg-white text-left text-base text-ink-dark md:text-lg'>
      {rows.map((row) => (
        <div
          key={row.title}
          className='grid grid-cols-[1fr_auto] items-start gap-4 border-b border-ink-light px-5 py-4'
        >
          <div>
            <p className='font-extrabold'>{row.title}</p>
            <p className='mt-0.5 text-sm text-ink-medium md:text-base'>
              {row.detail}
            </p>
          </div>
          <p className='text-right font-extrabold'>{row.amount}</p>
        </div>
      ))}
      <div className='bg-accent-light px-5 py-4'>
        <p className='font-extrabold'>Landing incluida. Sin permanencia.</p>
      </div>
    </div>
  );
};

export default GoogleAdsPaymentTable;
