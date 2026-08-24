// Token de sesión que solo se escribe tras un envío de formulario
// confirmado por el backend (Formspree). La página /gracias exige este
// token; sin él redirige a inicio. Así evitamos que visitas directas,
// bots o recargas cuenten como conversión por URL de destino.

export const FORM_SUCCESS_SESSION_KEY = '36web_form_success';
const THANK_YOU_TRACKED_KEY = '36web_thank_you_tracked';

export const markFormSubmissionSuccess = () => {
  try {
    sessionStorage.setItem(FORM_SUCCESS_SESSION_KEY, String(Date.now()));
    sessionStorage.removeItem(THANK_YOU_TRACKED_KEY);
  } catch {
    // sessionStorage puede fallar en modo privado estricto
  }
};

export const hasFormSubmissionSuccess = (): boolean => {
  try {
    return Boolean(sessionStorage.getItem(FORM_SUCCESS_SESSION_KEY));
  } catch {
    return false;
  }
};

/** True solo la primera vez que /gracias se muestra para este envío. */
export const shouldTrackThankYouView = (): boolean => {
  try {
    if (sessionStorage.getItem(THANK_YOU_TRACKED_KEY)) return false;
    sessionStorage.setItem(THANK_YOU_TRACKED_KEY, '1');
    return true;
  } catch {
    return false;
  }
};

/** Invalida el acceso a /gracias (tras un breve delay para sobrevivir StrictMode). */
export const clearFormSubmissionSuccess = () => {
  try {
    sessionStorage.removeItem(FORM_SUCCESS_SESSION_KEY);
    sessionStorage.removeItem(THANK_YOU_TRACKED_KEY);
  } catch {
    // ignore
  }
};
