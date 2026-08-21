// Website ID público del chatbox (igual que el ID de GA en index.html).
// Se puede sustituir con VITE_CRISP_WEBSITE_ID en el entorno.
export const CRISP_WEBSITE_ID =
  import.meta.env.VITE_CRISP_WEBSITE_ID?.trim() ||
  'dfd05fb5-ada2-4d14-a2a7-d0df20eacfb4';

export const CRISP_THEME_COLOR = '#e1f56e';

export const CRISP_PROACTIVE_DELAY_MS = 8000;

export const CRISP_PROACTIVE_TEXT =
  '¿Te podemos ayudar? No somos una IA.';
