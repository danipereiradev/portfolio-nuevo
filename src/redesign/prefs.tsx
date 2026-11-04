import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

// Preferencias del visitante: tema (oscuro/claro) e idioma (es/en).
// Se guardan en localStorage cuando está disponible.

export type Theme = 'dark' | 'light';
export type Lang = 'es' | 'en';

type Prefs = {
  theme: Theme;
  lang: Lang;
  setTheme: (t: Theme) => void;
  setLang: (l: Lang) => void;
  /** t('texto en español', 'English text') */
  t: (es: string, en: string) => string;
};

const PrefsContext = createContext<Prefs | null>(null);

const read = <T extends string>(key: string, allowed: readonly T[], fallback: T): T => {
  try {
    const v = window.localStorage.getItem(key) as T | null;
    return v && allowed.includes(v) ? v : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* sin almacenamiento: la preferencia dura lo que la visita */
  }
};

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'dark' : read<Theme>('36web-theme', ['dark', 'light'], 'dark'),
  );
  const [lang, setLangState] = useState<Lang>(() =>
    typeof window === 'undefined' ? 'es' : read<Lang>('36web-lang', ['es', 'en'], 'es'),
  );

  useEffect(() => {
    document.documentElement.classList.toggle('rd-theme-light', theme === 'light');
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    write('36web-theme', t);
  }, []);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    write('36web-lang', l);
  }, []);
  const t = useCallback((es: string, en: string) => (lang === 'en' ? en : es), [lang]);

  const value = useMemo(() => ({ theme, lang, setTheme, setLang, t }), [theme, lang, setTheme, setLang, t]);
  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs(): Prefs {
  const ctx = useContext(PrefsContext);
  if (!ctx) {
    return { theme: 'dark', lang: 'es', setTheme: () => {}, setLang: () => {}, t: (es) => es };
  }
  return ctx;
}

/** Aviso para páginas cuyo contenido solo existe en español. */
export function SpanishOnlyNotice({ message = 'This page is currently available in Spanish only.' }: { message?: string }) {
  const { lang } = usePrefs();
  if (lang !== 'en') return null;
  return (
    <div role='status' className='fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-[#e1f56e] px-5 py-2.5 text-center text-xs font-bold text-[#0b0c0a] shadow-xl'>
      {message}
    </div>
  );
}
