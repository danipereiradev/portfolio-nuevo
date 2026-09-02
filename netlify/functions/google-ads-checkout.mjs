import { handleGoogleAdsCheckout } from '../../server/googleAdsCheckout.mjs';

export const handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const result = await handleGoogleAdsCheckout({
    method: event.httpMethod,
    origin,
  });

  return {
    statusCode: result.status,
    headers: result.headers,
    body: result.body,
  };
};
