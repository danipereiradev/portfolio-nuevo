import {
  getMaintenanceInfraMonthlyLabel,
  getMaintenanceInfraSetupLabel,
} from '../config/maintenanceInfraOffer';

const MaintenanceInfraPaymentTable = () => {
  const rows = [
    {
      title: 'Puesta en marcha inicial',
      amount: getMaintenanceInfraSetupLabel(),
    },
    {
      title: 'Mantenimiento mensual',
      amount: getMaintenanceInfraMonthlyLabel(),
    },
  ];

  return (
    <div className='mx-auto w-full max-w-xl overflow-hidden rounded-lg border-2 border-ink-dark bg-white text-left text-base text-ink-dark md:text-lg'>
      <div className='grid grid-cols-[1fr_auto] gap-4 border-b border-ink-light bg-surface-muted px-5 py-3 text-sm font-extrabold uppercase tracking-wide md:text-base'>
        <p>Concepto</p>
        <p className='text-right'>Importe</p>
      </div>
      {rows.map((row) => (
        <div
          key={row.title}
          className='grid grid-cols-[1fr_auto] items-center gap-4 border-b border-ink-light px-5 py-4 last:border-b-0'
        >
          <p className='font-extrabold'>{row.title}</p>
          <p className='whitespace-nowrap text-right font-extrabold'>
            {row.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MaintenanceInfraPaymentTable;
