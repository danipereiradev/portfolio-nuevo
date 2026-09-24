declare global {
  interface Window {
    renderTrustindexWidgets?: () => void;
  }
}

const TRUSTINDEX_LOADER_SRC = 'https://cdn.trustindex.io/loader.js';

let loaderRequested = false;

const renderWidgets = () => {
  window.renderTrustindexWidgets?.();
};

/** Carga el widget de Trustindex fuera del camino crítico del hero. */
export const loadTrustindex = () => {
  if (typeof window === 'undefined') return;
  if (typeof window.renderTrustindexWidgets === 'function') {
    renderWidgets();
    return;
  }
  if (loaderRequested) return;
  loaderRequested = true;

  const script = document.createElement('script');
  script.src = TRUSTINDEX_LOADER_SRC;
  script.async = true;
  script.defer = true;
  script.onload = renderWidgets;
  document.body.appendChild(script);
};

export const scheduleTrustindex = () => {
  if (typeof window === 'undefined') return;

  const run = () => loadTrustindex();

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(run, { timeout: 6000 });
    return;
  }

  window.setTimeout(run, 4000);
};
