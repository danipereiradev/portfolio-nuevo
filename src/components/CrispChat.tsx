import { useEffect } from 'react';
import {
  CRISP_PROACTIVE_DELAY_MS,
  CRISP_PROACTIVE_TEXT,
  CRISP_THEME_COLOR,
  CRISP_WEBSITE_ID,
} from '../config/crisp';
import {
  trackCrispChatOpened,
  trackCrispMessageSent,
} from '../utils/analytics';

const SCRIPT_ID = 'crisp-js';
const PROACTIVE_SHOWN_KEY = 'crisp-proactive-shown';

declare global {
  interface Window {
    $crisp?: unknown[] & { is?: (name: string) => boolean };
    CRISP_WEBSITE_ID?: string;
    CRISP_RUNTIME_CONFIG?: { locale?: string };
    CRISP_READY_TRIGGER?: () => void;
  }
}

const pushCrisp = (...args: unknown[]) => {
  window.$crisp = window.$crisp || [];
  window.$crisp.push(args);
};

const setChatVisible = (visible: boolean) => {
  pushCrisp('do', visible ? 'chat:show' : 'chat:hide');
};

const readSessionFlag = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeSessionFlag = (key: string, value: string) => {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Safari privado / sin almacenamiento: no bloquear el saludo.
  }
};

const hasShownProactive = () => readSessionFlag(PROACTIVE_SHOWN_KEY) === '1';

const markProactiveShown = () => writeSessionFlag(PROACTIVE_SHOWN_KEY, '1');

let onChatClosed: (() => void) | null = null;
let proactiveTimer: number | undefined;
let proactiveScheduled = false;

const loadCrisp = () => {
  if (document.getElementById(SCRIPT_ID) || window.CRISP_WEBSITE_ID) {
    return;
  }

  window.$crisp = window.$crisp || [];
  window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;
  window.CRISP_RUNTIME_CONFIG = { locale: 'es' };

  pushCrisp('safe', true);
  pushCrisp('config', 'color:theme', [CRISP_THEME_COLOR]);
  pushCrisp('config', 'hide:on:mobile', [false]);
  // Por encima del header (z-50) para que el chat abierto en móvil no quede
  // tapado; por debajo de los modales (z-9999).
  pushCrisp('config', 'container:index', [60]);
  pushCrisp('on', 'chat:opened', () => {
    markProactiveShown();
    trackCrispChatOpened();
  });
  pushCrisp('on', 'chat:closed', () => onChatClosed?.());
  pushCrisp('on', 'message:sent', trackCrispMessageSent);
  pushCrisp('on', 'session:loaded', () => {
    pushCrisp('config', 'color:theme', [CRISP_THEME_COLOR]);
    pushCrisp('config', 'hide:on:mobile', [false]);
    setChatVisible(true);
  });

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = 'https://client.crisp.chat/l.js';
  script.async = true;
  document.head.appendChild(script);
};

const whenCrispReady = (callback: () => void) => {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    callback();
  };

  const waitForSession = () => {
    if (window.$crisp?.is?.('session:ongoing')) {
      run();
      return;
    }
    pushCrisp('on', 'session:loaded', run);
    window.setTimeout(run, 4000);
  };

  if (typeof window.$crisp?.is === 'function') {
    waitForSession();
    return;
  }

  const previousReady = window.CRISP_READY_TRIGGER;
  window.CRISP_READY_TRIGGER = () => {
    previousReady?.();
    waitForSession();
  };

  window.setTimeout(run, 6000);
};

const CrispChat = () => {
  useEffect(() => {
    if (!CRISP_WEBSITE_ID) {
      if (import.meta.env.DEV) {
        console.warn(
          'Crisp: falta VITE_CRISP_WEBSITE_ID en el .env. El chat no se carga.',
        );
      }
      return;
    }

    const clearProactiveTimer = () => {
      if (proactiveTimer) {
        window.clearTimeout(proactiveTimer);
        proactiveTimer = undefined;
      }
    };

    const showProactiveMessage = () => {
      if (hasShownProactive()) return;
      if (window.$crisp?.is?.('chat:opened')) {
        markProactiveShown();
        return;
      }

      markProactiveShown();
      setChatVisible(true);
      // En móvil el globo ignora message:show si el widget aún no está pintado.
      window.setTimeout(() => {
        pushCrisp('do', 'message:show', ['text', CRISP_PROACTIVE_TEXT]);
      }, 400);
    };

    const scheduleProactiveMessage = () => {
      if (proactiveScheduled || hasShownProactive()) return;
      proactiveScheduled = true;

      const startTimer = () => {
        if (proactiveTimer || hasShownProactive()) return;
        proactiveTimer = window.setTimeout(() => {
          proactiveTimer = undefined;
          showProactiveMessage();
        }, CRISP_PROACTIVE_DELAY_MS);
      };

      if (document.visibilityState === 'visible') {
        startTimer();
        return;
      }

      const onVisible = () => {
        if (document.visibilityState !== 'visible') return;
        document.removeEventListener('visibilitychange', onVisible);
        startTimer();
      };
      document.addEventListener('visibilitychange', onVisible);
    };

    onChatClosed = () => {
      markProactiveShown();
      clearProactiveTimer();
    };

    loadCrisp();
    pushCrisp('config', 'color:theme', [CRISP_THEME_COLOR]);
    pushCrisp('config', 'hide:on:mobile', [false]);
    setChatVisible(true);
    whenCrispReady(scheduleProactiveMessage);

    return () => {
      onChatClosed = null;
    };
  }, []);

  return null;
};

export default CrispChat;
