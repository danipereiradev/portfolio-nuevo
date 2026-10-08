import { useState } from 'react';
import {
  getMeasurementConsent,
  saveMeasurementConsent,
} from '../utils/measurementConsent';

const checkboxClass = 'h-4 w-4 accent-accent rounded';
const actionClass = 'rounded-lg px-4 py-2 text-sm font-semibold';

export default function MeasurementConsent() {
  const [open, setOpen] = useState(() => !getMeasurementConsent());
  const [analytics, setAnalytics] = useState(
    () => getMeasurementConsent()?.analytics ?? false,
  );
  const [advertising, setAdvertising] = useState(
    () => getMeasurementConsent()?.advertising ?? false,
  );

  function save(nextAnalytics: boolean, nextAdvertising: boolean) {
    saveMeasurementConsent(nextAnalytics, nextAdvertising);
    setAnalytics(nextAnalytics);
    setAdvertising(nextAdvertising);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='fixed bottom-2 left-2 z-[100] rounded-lg bg-brand-light px-3 py-2 text-xs font-semibold text-ink-dark shadow-md'
      >
        Cookies
      </button>
    );
  }

  return (
    <section
      aria-label='Preferencias de cookies'
      className='fixed bottom-3 left-3 right-3 z-[100] max-w-lg rounded-xl bg-brand-light p-5 text-sm text-ink-dark shadow-xl'
    >
      <h2 className='mb-2 text-base font-semibold'>Cookies</h2>
      <p>
        Usamos cookies para que la web funcione. Si nos das permiso, también
        para estadísticas y campañas.
      </p>
      <a
        href='/politica-de-cookies'
        className='mt-2 inline-block font-medium underline underline-offset-4 hover:text-accent'
      >
        Política de cookies
      </a>
      <div className='my-3 flex flex-wrap gap-4'>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            className={checkboxClass}
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          Estadísticas
        </label>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            className={checkboxClass}
            checked={advertising}
            onChange={(e) => setAdvertising(e.target.checked)}
          />
          Campañas
        </label>
      </div>
      <div className='flex flex-wrap gap-2'>
        <button
          type='button'
          className={`${actionClass} bg-white text-ink-dark`}
          onClick={() => save(false, false)}
        >
          Rechazar
        </button>
        <button
          type='button'
          className={`${actionClass} bg-white text-ink-dark`}
          onClick={() => save(analytics, advertising)}
        >
          Guardar
        </button>
        <button
          type='button'
          className={`${actionClass} bg-accent text-white`}
          onClick={() => save(true, true)}
        >
          Aceptar
        </button>
      </div>
    </section>
  );
}
