import { useEffect, useState } from 'react';
import { isAnalyticsDisabled } from '../utils/analytics';
import { getMeasurementConsent } from '../utils/measurementConsent';

type Sale = { paid: true; transaction_id: string; value: number; currency: string; plan: string; plan_name: string };
const sent = new Set<string>();
function sendSale(sale: Sale) {
  if (isAnalyticsDisabled() || typeof window.gtag !== 'function') return;
  const consent = getMeasurementConsent();
  const emitOnce = (destination: 'ads' | 'ga4') => {
    const key = `36web_sale_${destination}_${sale.transaction_id}`;
    if (sent.has(key)) return;
    try { if (localStorage.getItem(key)) return; } catch { /* In-memory deduplication remains. */ }
    const params = { transaction_id: sale.transaction_id, value: sale.value, currency: sale.currency };
    if (destination === 'ads') window.gtag?.('event', 'conversion', { ...params, send_to: 'AW-18305239496/NeJzCIWN95cdEMiTz5hE' });
    else window.gtag?.('event', 'purchase', { ...params, send_to: 'G-V288FHTPLQ', items: [{ item_id: `tranquilidad-${sale.plan}`, item_name: `Tranquilidad Digital · ${sale.plan_name}`, price: sale.value, quantity: 1 }] });
    sent.add(key);
    try { localStorage.setItem(key, '1'); } catch { /* No persistent storage in private browsing. */ }
  };
  if (consent?.advertising) emitOnce('ads');
  if (consent?.analytics) emitOnce('ga4');
}

export default function SuscripcionGracias() {
  const [sale, setSale] = useState<Sale | null>(null);
  const [message, setMessage] = useState('Estamos comprobando tu pago de forma segura.');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    document.title = 'Confirmación de suscripción | 36WEB';
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex, nofollow'; document.head.appendChild(meta);
    const controller = new AbortController();
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    if (!sessionId) setMessage('No hay una referencia de pago que podamos comprobar. Si ya has pagado, contacta con nosotros.');
    else {
      setMessage('Estamos comprobando tu pago de forma segura.');
      fetch('/.netlify/functions/verify-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: sessionId }), signal: controller.signal })
        .then(async response => {
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || 'No podemos comprobar el pago ahora.');
          if (result.paid) setSale(result);
          else setMessage('El pago todavía está pendiente de confirmación. Puedes comprobarlo de nuevo en unos instantes.');
        }).catch(error => { if (!controller.signal.aborted) setMessage(error instanceof Error ? error.message : 'No podemos comprobar el pago ahora.'); });
    }
    return () => { controller.abort(); meta.remove(); };
  }, [attempt]);
  useEffect(() => {
    if (!sale) return;
    const send = () => sendSale(sale);
    send();
    window.addEventListener('36web:consent-updated', send);
    return () => window.removeEventListener('36web:consent-updated', send);
  }, [sale]);
  return <main className='min-h-[70vh] flex items-center justify-center px-6 py-20 text-center'>
    <div className='max-w-xl'>
      <h1 className='text-3xl font-bold'>{sale ? 'Tu suscripción está confirmada' : 'Confirmación de tu suscripción'}</h1>
      <p className='mt-5 text-lg' role='status'>{sale ? `Hemos recibido el primer pago del plan ${sale.plan_name}. Nos pondremos en contacto contigo para empezar y asignarte a tu desarrollador.` : message}</p>
      {!sale && <button className='mt-6 rounded-lg bg-accent px-6 py-3 text-white' onClick={() => setAttempt(value => value + 1)}>Comprobar de nuevo</button>}
      <p className='mt-6'><a className='underline' href='/contacto/'>Contactar con 36WEB</a></p>
    </div>
  </main>;
}
