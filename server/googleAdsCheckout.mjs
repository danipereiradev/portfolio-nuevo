const STRIPE_SESSIONS_URL = 'https://api.stripe.com/v1/checkout/sessions';
const DEFAULT_SITE_URL = 'https://36web.es';
const SUCCESS_PATH = '/pago/gracias/google-ads';
const CANCEL_PATH = '/pago/google-ads';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const allowedOrigins = new Set([
  'https://36web.es',
  'https://www.36web.es',
  'http://localhost:5173',
  'http://localhost:8888',
  'http://127.0.0.1:5173',
]);

const json = (status, body) => ({
  status,
  headers: {
    'Content-Type': 'application/json',
    ...corsHeaders,
  },
  body: JSON.stringify(body),
});

const normalizeOrigin = (value) => {
  if (!value) return '';
  try {
    return new URL(value).origin;
  } catch {
    return '';
  }
};

const resolveSiteUrl = (originHeader) => {
  const origin = normalizeOrigin(originHeader);
  if (origin && allowedOrigins.has(origin)) return origin;
  const envSite = process.env.SITE_URL?.replace(/\/+$/, '');
  if (envSite) return envSite;
  return DEFAULT_SITE_URL;
};

export const handleGoogleAdsCheckout = async ({ method, origin } = {}) => {
  if (method === 'OPTIONS') {
    return { status: 204, headers: corsHeaders, body: '' };
  }

  if (method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  const setupPriceId = process.env.STRIPE_GOOGLE_ADS_SETUP_PRICE_ID?.trim();
  const monthlyPriceId = process.env.STRIPE_GOOGLE_ADS_MONTHLY_PRICE_ID?.trim();

  if (!secret || !setupPriceId || !monthlyPriceId) {
    console.error('Missing Stripe env for Google Ads checkout');
    return json(500, { error: 'Pago no configurado.' });
  }

  const siteUrl = resolveSiteUrl(origin);
  const body = new URLSearchParams();
  body.set('mode', 'subscription');
  body.set('locale', 'es');
  body.set('billing_address_collection', 'required');
  body.set('client_reference_id', 'google-ads');
  body.set('success_url', `${siteUrl}${SUCCESS_PATH}?session_id={CHECKOUT_SESSION_ID}`);
  body.set('cancel_url', `${siteUrl}${CANCEL_PATH}`);
  body.set('line_items[0][price]', setupPriceId);
  body.set('line_items[0][quantity]', '1');
  body.set('line_items[1][price]', monthlyPriceId);
  body.set('line_items[1][quantity]', '1');
  body.set('metadata[service]', 'google-ads');
  body.set('subscription_data[metadata][service]', 'google-ads');

  try {
    const response = await fetch(STRIPE_SESSIONS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    const session = await response.json().catch(() => ({}));

    if (!response.ok || !session.url) {
      console.error('Stripe Checkout error:', response.status, session);
      return json(response.status >= 400 ? response.status : 500, {
        error: session.error?.message || 'No se pudo crear el pago.',
      });
    }

    return json(200, { url: session.url });
  } catch (error) {
    console.error('Google Ads checkout error:', error);
    return json(500, { error: 'Error interno' });
  }
};
