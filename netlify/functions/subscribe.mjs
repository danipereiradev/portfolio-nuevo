const MAILERLITE_API = 'https://connect.mailerlite.com/api/subscribers';
const DEFAULT_GROUP_ID = '194521222166349149';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    ...corsHeaders,
  },
  body: JSON.stringify(body),
});

const formatMailerLiteDate = (date = new Date()) =>
  date.toISOString().slice(0, 19).replace('T', ' ');

const isValidEmail = (value) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

const isValidName = (value) =>
  /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(value.trim());

const getClientIp = (headers = {}) => {
  const forwarded =
    headers['x-forwarded-for'] ||
    headers['X-Forwarded-For'] ||
    headers['client-ip'] ||
    '';
  return String(forwarded).split(',')[0].trim() || undefined;
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const apiToken = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_GROUP_ID || DEFAULT_GROUP_ID;

  if (!apiToken) {
    console.error('Missing MAILERLITE_API_TOKEN');
    return json(500, { error: 'Server configuration error' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const consent = payload.consent === true || payload.consent === 'Sí';

  if (!isValidName(name)) {
    return json(400, { error: 'Nombre no válido' });
  }

  if (!isValidEmail(email)) {
    return json(400, { error: 'Email no válido' });
  }

  if (!consent) {
    return json(400, { error: 'El consentimiento es obligatorio' });
  }

  const clientIp = getClientIp(event.headers);
  const optedInAt = formatMailerLiteDate();

  const subscriber = {
    email,
    fields: {
      name,
      // Campo personalizado en MailerLite (clave: consentimiento).
      // Créalo en Subscribers → Fields si aún no existe.
      consentimiento: 'Sí',
    },
    groups: [String(groupId)],
    status: 'active',
    opted_in_at: optedInAt,
    ...(clientIp ? { optin_ip: clientIp, ip_address: clientIp } : {}),
  };

  try {
    const response = await fetch(MAILERLITE_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(subscriber),
    });

    const result = await response.json().catch(() => ({}));

    // Si el campo personalizado no existe, reintentamos solo con nombre.
    if (
      response.status === 422 &&
      result?.errors?.['fields.consentimiento']
    ) {
      const fallback = {
        ...subscriber,
        fields: { name },
      };

      const retry = await fetch(MAILERLITE_API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(fallback),
      });

      const retryResult = await retry.json().catch(() => ({}));

      if (!retry.ok) {
        console.error('MailerLite error (fallback):', retry.status, retryResult);
        return json(retry.status, {
          error: retryResult.message || 'Error al suscribir',
        });
      }

      return json(200, { ok: true });
    }

    if (!response.ok) {
      console.error('MailerLite error:', response.status, result);
      return json(response.status, {
        error: result.message || 'Error al suscribir',
      });
    }

    return json(200, { ok: true });
  } catch (error) {
    console.error('Subscribe function error:', error);
    return json(500, { error: 'Error interno' });
  }
};
