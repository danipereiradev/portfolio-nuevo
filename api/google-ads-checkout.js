import { handleGoogleAdsCheckout } from '../server/googleAdsCheckout.mjs';

export default async function handler(req, res) {
  const origin = req.headers.origin || req.headers.Origin || '';
  const result = await handleGoogleAdsCheckout({
    method: req.method,
    origin,
  });

  for (const [key, value] of Object.entries(result.headers || {})) {
    res.setHeader(key, value);
  }

  res.status(result.status);
  if (!result.body) {
    res.end();
    return;
  }

  res.send(result.body);
}
