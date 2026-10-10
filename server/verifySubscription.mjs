// Only these live Payment Links may generate a Tranquilidad Digital sale.
export const PLANS = Object.freeze({
  plink_1UOwvoDWpERSPC8lFhM9mvF2: { id: 'esencial', name: 'Esencial' },
  plink_1UOwwwDWpERSPC8lfW4aVndy: { id: 'impulso', name: 'Impulso' },
  plink_1UOwyDDWpERSPC8lgFDeV4du: { id: 'integral', name: 'Integral' },
});
const reply = (statusCode, data) => ({ statusCode, headers: {
  'Content-Type': 'application/json', 'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
}, body: JSON.stringify(data) });

export async function verifySubscription(event, { secret = process.env.STRIPE_SECRET_KEY, fetcher = fetch } = {}) {
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Método no permitido.' });
  let sessionId;
  try { sessionId = JSON.parse(event.body || '{}').session_id; } catch { return reply(400, { error: 'Solicitud no válida.' }); }
  if (typeof sessionId !== 'string' || !/^cs_live_[a-zA-Z0-9]{16,240}$/.test(sessionId)) return reply(400, { error: 'Referencia de pago no válida.' });
  if (!secret) return reply(503, { error: 'No podemos comprobar el pago en este momento.' });
  try {
    const response = await fetcher(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
      headers: { Authorization: `Bearer ${secret}` }, signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return reply(response.status === 404 ? 404 : 502, { error: 'No hemos podido verificar este pago.' });
    const session = await response.json();
    const plan = PLANS[session.payment_link];
    if (!plan || session.livemode !== true || session.mode !== 'subscription' || typeof session.subscription !== 'string') return reply(400, { error: 'Este pago no corresponde a un plan de Tranquilidad Digital.' });
    if (session.status !== 'complete' || session.payment_status !== 'paid') return reply(202, { paid: false });
    if (session.currency !== 'eur' || !Number.isInteger(session.amount_total) || session.amount_total <= 0) return reply(400, { error: 'Importe no válido.' });
    // These three prices contain 21% VAT in their fixed Stripe amount.
    const value = Math.round(session.amount_total / 1.21) / 100;
    return reply(200, { paid: true, transaction_id: session.subscription, value, currency: 'EUR', plan: plan.id, plan_name: plan.name });
  } catch {
    return reply(502, { error: 'No hemos podido comprobar el pago. Inténtalo de nuevo.' });
  }
}
