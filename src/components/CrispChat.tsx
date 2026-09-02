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
const PROACTIVE_DISMISSED_KEY = 'crisp-proactive-dismissed';

declare global {
  interface Window {
    $crisp?: unknown[] & {
      is?: (name: string) => boolean;
    };
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

const isMobileViewport = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px)').matches;

const applyCrispVisibility = () => {
  pushCrisp('config', 'hide:on:mobile', [true]);
  setChatVisible(!isMobileViewport());
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
    // Safari privado / sin almacenamiento.
  }
};

const hasShownProactive = () => readSessionFlag(PROACTIVE_SHOWN_KEY) === '1';
const markProactiveShown = () => writeSessionFlag(PROACTIVE_SHOWN_KEY, '1');
const hasDismissedProactive = () =>
  readSessionFlag(PROACTIVE_DISMISSED_KEY) === '1';
const markProactiveDismissed = () =>
  writeSessionFlag(PROACTIVE_DISMISSED_KEY, '1');

const messageContent = (message: unknown): string => {
  if (typeof message === 'string') return message;
  if (!message || typeof message !== 'object' || !('content' in message)) {
    return '';
  }
  const content = (message as { content: unknown }).content;
  return typeof content === 'string' ? content : '';
};

let proactiveTimer: number | undefined;
let showMessageTimer: number | undefined;
let proactiveScheduled = false;
let proactivePushed = false;
let proactiveDismissed = false;
let snippetClickBound = false;

const clearProactiveTimers = () => {
  if (proactiveTimer) {
    window.clearTimeout(proactiveTimer);
    proactiveTimer = undefined;
  }
  if (showMessageTimer) {
    window.clearTimeout(showMessageTimer);
    showMessageTimer = undefined;
  }
};

const onSnippetClick = (event: Event) => {
  const target = event.target;
  if (!(target instanceof Element) || !target.closest('.crisp-client')) {
    return;
  }

  window.setTimeout(() => {
    if (window.$crisp?.is?.('chat:opened')) return;
    dismissProactive();
  }, 80);
};

const unbindSnippetClick = () => {
  if (!snippetClickBound) return;
  document.removeEventListener('click', onSnippetClick, true);
  snippetClickBound = false;
};

const bindSnippetClick = () => {
  if (snippetClickBound) return;
  document.addEventListener('click', onSnippetClick, true);
  snippetClickBound = true;
};

let overlayObserver: MutationObserver | undefined;
let suppressTimer: number | undefined;

const hideProactiveOverlay = () => {
  pushCrisp('do', 'message:hide');
  pushCrisp('do', 'message:read');
};

const stopOverlayWatch = () => {
  overlayObserver?.disconnect();
  overlayObserver = undefined;
  if (suppressTimer) {
    window.clearInterval(suppressTimer);
    suppressTimer = undefined;
  }
};

const startDismissedWatchdog = () => {
  stopOverlayWatch();
  hideProactiveOverlay();
  let ticks = 0;
  suppressTimer = window.setInterval(() => {
    ticks += 1;
    if (!hasDismissedProactive() || ticks > 80) {
      if (suppressTimer) {
        window.clearInterval(suppressTimer);
        suppressTimer = undefined;
      }
      return;
    }
    hideProactiveOverlay();
  }, 250);
};

const overlayStillVisible = () => {
  const root = document.querySelector('.crisp-client');
  if (!root) return false;
  return (root.textContent || '').includes(CRISP_PROACTIVE_TEXT);
};

const watchOverlayClose = () => {
  stopOverlayWatch();
  const root = document.querySelector('.crisp-client');
  if (!root) return;

  let seen = overlayStillVisible();
  overlayObserver = new MutationObserver(() => {
    if (hasDismissedProactive()) return;
    const visible = overlayStillVisible();
    if (seen && !visible && !window.$crisp?.is?.('chat:opened')) {
      dismissProactive();
    }
    seen = visible;
  });
  overlayObserver.observe(root, {
    childList: true,
    subtree: true,
    characterData: true,
  });
};

const dismissProactive = () => {
  proactiveDismissed = true;
  markProactiveShown();
  markProactiveDismissed();
  clearProactiveTimers();
  unbindSnippetClick();
  hideProactiveOverlay();
  startDismissedWatchdog();
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
  pushCrisp('config', 'hide:on:mobile', [true]);
  pushCrisp('config', 'container:index', [60]);
  pushCrisp('on', 'chat:opened', () => {
    markProactiveShown();
    unbindSnippetClick();
    trackCrispChatOpened();
  });
  pushCrisp('on', 'chat:closed', () => {
    dismissProactive();
  });
  pushCrisp('on', 'overlay:closed', () => {
    dismissProactive();
  });
  pushCrisp('on', 'overlay:opened', () => {
    if (hasDismissedProactive()) hideProactiveOverlay();
  });
  pushCrisp('on', 'message:sent', trackCrispMessageSent);
  pushCrisp('on', 'message:received', (message: unknown) => {
    if (!hasDismissedProactive() && !proactiveDismissed) return;
    if (messageContent(message) !== CRISP_PROACTIVE_TEXT) return;
    hideProactiveOverlay();
  });
  pushCrisp('on', 'session:loaded', () => {
    pushCrisp('config', 'color:theme', [CRISP_THEME_COLOR]);
    applyCrispVisibility();
    if (proactiveDismissed || hasDismissedProactive()) {
      hideProactiveOverlay();
    }
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

    proactiveDismissed = hasDismissedProactive();

    const showProactiveMessage = () => {
      if (isMobileViewport()) return;
      if (
        proactivePushed ||
        proactiveDismissed ||
        hasDismissedProactive() ||
        hasShownProactive()
      ) {
        return;
      }
      if (window.$crisp?.is?.('chat:opened')) {
        markProactiveShown();
        return;
      }

      proactivePushed = true;
      setChatVisible(true);
      bindSnippetClick();
      watchOverlayClose();
      showMessageTimer = window.setTimeout(() => {
        showMessageTimer = undefined;
        if (isMobileViewport()) return;
        if (proactiveDismissed || hasDismissedProactive()) return;
        if (window.$crisp?.is?.('chat:opened')) {
          markProactiveShown();
          unbindSnippetClick();
          return;
        }
        pushCrisp('do', 'message:show', ['text', CRISP_PROACTIVE_TEXT]);
        markProactiveShown();
      }, 400);
    };

    const scheduleProactiveMessage = () => {
      if (isMobileViewport()) return;
      if (
        proactiveScheduled ||
        proactivePushed ||
        proactiveDismissed ||
        hasDismissedProactive() ||
        hasShownProactive()
      ) {
        return;
      }
      proactiveScheduled = true;

      const startTimer = () => {
        if (isMobileViewport()) return;
        if (
          proactiveTimer ||
          proactivePushed ||
          proactiveDismissed ||
          hasDismissedProactive() ||
          hasShownProactive()
        ) {
          return;
        }
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

    loadCrisp();
    pushCrisp('config', 'color:theme', [CRISP_THEME_COLOR]);
    applyCrispVisibility();
    whenCrispReady(scheduleProactiveMessage);

    const media = window.matchMedia('(max-width: 767px)');
    const onChange = () => applyCrispVisibility();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return null;
};

export default CrispChat;
