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

const DESKTOP_MQ = '(min-width: 768px)';
const SCRIPT_ID = 'crisp-js';
const PROACTIVE_ENGAGED_KEY = 'crisp-proactive-engaged';

declare global {
  interface Window {
    $crisp?: unknown[] & { is?: (name: string) => boolean };
    CRISP_WEBSITE_ID?: string;
    CRISP_RUNTIME_CONFIG?: { locale?: string };
  }
}

const pushCrisp = (...args: unknown[]) => {
  window.$crisp = window.$crisp || [];
  window.$crisp.push(args);
};

const setChatVisible = (visible: boolean) => {
  pushCrisp('do', visible ? 'chat:show' : 'chat:hide');
};

const hasEngaged = () => sessionStorage.getItem(PROACTIVE_ENGAGED_KEY) === '1';

const markEngaged = () => sessionStorage.setItem(PROACTIVE_ENGAGED_KEY, '1');

let onChatClosed: (() => void) | null = null;

const loadCrisp = () => {
  if (document.getElementById(SCRIPT_ID) || window.CRISP_WEBSITE_ID) {
    return;
  }

  window.$crisp = window.$crisp || [];
  window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;
  window.CRISP_RUNTIME_CONFIG = { locale: 'es' };

  pushCrisp('safe', true);
  pushCrisp('config', 'color:theme', [CRISP_THEME_COLOR]);
  // Por debajo del header (z-50) y de los modales (z-9999).
  pushCrisp('config', 'container:index', [40]);
  pushCrisp('on', 'chat:opened', [
    () => {
      markEngaged();
      trackCrispChatOpened();
    },
  ]);
  pushCrisp('on', 'chat:closed', [() => onChatClosed?.()]);
  pushCrisp('on', 'message:sent', [trackCrispMessageSent]);
  pushCrisp('on', 'session:loaded', [
    () => {
      pushCrisp('config', 'color:theme', [CRISP_THEME_COLOR]);
      setChatVisible(window.matchMedia(DESKTOP_MQ).matches);
    },
  ]);

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = 'https://client.crisp.chat/l.js';
  script.async = true;
  document.head.appendChild(script);
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

    const mq = window.matchMedia(DESKTOP_MQ);
    let proactiveTimer: number | undefined;

    const clearProactiveTimer = () => {
      if (proactiveTimer) {
        window.clearTimeout(proactiveTimer);
        proactiveTimer = undefined;
      }
    };

    const showProactiveMessage = () => {
      if (hasEngaged() || !mq.matches) return;
      if (window.$crisp?.is?.('chat:opened')) return;

      pushCrisp('do', 'chat:show');
      pushCrisp('do', 'message:show', ['text', CRISP_PROACTIVE_TEXT]);
    };

    const scheduleProactiveMessage = () => {
      if (proactiveTimer || hasEngaged() || !mq.matches) return;

      proactiveTimer = window.setTimeout(() => {
        proactiveTimer = undefined;
        showProactiveMessage();
      }, CRISP_PROACTIVE_DELAY_MS);
    };

    const whenCrispReady = (callback: () => void) => {
      if (window.$crisp?.is?.('session:ongoing')) {
        callback();
        return;
      }
      pushCrisp('on', 'session:loaded', [callback]);
    };

    onChatClosed = () => {
      if (hasEngaged()) return;
      clearProactiveTimer();
      scheduleProactiveMessage();
    };

    const sync = () => {
      if (mq.matches) {
        loadCrisp();
        pushCrisp('config', 'color:theme', [CRISP_THEME_COLOR]);
        setChatVisible(true);
        whenCrispReady(scheduleProactiveMessage);
      } else {
        setChatVisible(false);
        clearProactiveTimer();
      }
    };

    sync();
    mq.addEventListener('change', sync);
    return () => {
      onChatClosed = null;
      mq.removeEventListener('change', sync);
      clearProactiveTimer();
    };
  }, []);

  return null;
};

export default CrispChat;
