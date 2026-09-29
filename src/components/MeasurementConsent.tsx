import { useState } from 'react';
import { getMeasurementConsent, saveMeasurementConsent } from '../utils/measurementConsent';
export default function MeasurementConsent() {
  const [open, setOpen] = useState(() => !getMeasurementConsent());
  const [analytics, setAnalytics] = useState(() => getMeasurementConsent()?.analytics ?? false);
  const [advertising, setAdvertising] = useState(() => getMeasurementConsent()?.advertising ?? false);
  function save(a: boolean, b: boolean) { saveMeasurementConsent(a, b); setAnalytics(a); setAdvertising(b); setOpen(false); }
  if (!open) return <button type="button" onClick={() => setOpen(true)} className="fixed bottom-2 left-2 z-[100] rounded bg-white px-3 py-2 text-xs text-slate-700 shadow">Privacidad</button>;
  return <section aria-label="Preferencias de privacidad" className="fixed bottom-3 left-3 right-3 z-[100] max-w-lg rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-800 shadow-xl">
    <h2 className="mb-2 text-base font-semibold">Tu privacidad</h2>
    <p>Con tu permiso usamos Google para medir visitas y anuncios. Al enviar un formulario, la medición publicitaria comparte tu email y teléfono mediante hash para atribuir el contacto. Puedes pedir presupuesto sin aceptar.</p>
    <a href="/politica-de-cookies" className="underline">Más información</a>
    <div className="my-3 flex flex-wrap gap-4">
      <label><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} /> Estadísticas</label>
      <label><input type="checkbox" checked={advertising} onChange={e => setAdvertising(e.target.checked)} /> Medición publicitaria</label>
    </div>
    <div className="flex flex-wrap gap-2">
      <button type="button" className="rounded border border-slate-400 px-3 py-2" onClick={() => save(false, false)}>Rechazar</button>
      <button type="button" className="rounded border border-slate-400 px-3 py-2" onClick={() => save(analytics, advertising)}>Guardar selección</button>
      <button type="button" className="rounded border border-slate-400 px-3 py-2" onClick={() => save(true, true)}>Aceptar todo</button>
    </div>
  </section>;
}
