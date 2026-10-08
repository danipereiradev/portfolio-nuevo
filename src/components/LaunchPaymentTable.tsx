import { getLaunchInstallmentLabel, getLaunchPriceAmountLabel } from '../config/launchOffer';

const LaunchPaymentTable = ({
  className = '',
  installment = getLaunchInstallmentLabel(),
  total = getLaunchPriceAmountLabel(),
}: { className?: string; installment?: string; total?: string }) => {
  const rows = [
    {
      title: 'Al empezar',
      detail: 'Tras aceptar alcance y condiciones por escrito',
      amount: installment,
    },
    {
      title: 'Antes de publicar',
      detail: 'Cuando estés contento con el resultado',
      amount: installment,
    },
  ];

  return (
    <div
      className={`mx-auto w-full max-w-xl overflow-hidden rounded-lg border-2 border-ink-dark bg-white text-left text-base text-ink-dark md:text-lg ${className}`.trim()}
    >
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
          <p className='whitespace-nowrap text-right font-extrabold'>
            {row.amount}
          </p>
        </div>
      ))}
      <div className='grid grid-cols-[1fr_auto] items-center gap-4 bg-accent-light px-5 py-4'>
        <p className='font-extrabold'>Total del paquete</p>
        <p className='whitespace-nowrap text-right text-xl font-extrabold md:text-2xl'>
          {total}
        </p>
      </div>
    </div>
  );
};

export default LaunchPaymentTable;
