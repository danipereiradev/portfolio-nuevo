import { useEffect } from 'react';
import { CRISP_THEME_COLOR, CRISP_WEBSITE_ID } from '../config/crisp';
import {
  trackCrispChatOpened,
  trackCrispMessageSent,
} from '../utils/analytics';

const SCRIPT_ID = 'crisp-js';

declare global {
  interface Window {
    $crisp?: unknown[] & {
      is?: (name: string) => boolean;
    };
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
  pushCrisp('on', 'chat:opened', trackCrispChatOpened);
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

    loadCrisp();
    pushCrisp('config', 'color:theme', [CRISP_THEME_COLOR]);
    pushCrisp('config', 'hide:on:mobile', [false]);
    setChatVisible(true);
  }, []);

  return null;
};

export default CrispChat;
