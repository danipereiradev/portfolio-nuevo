import { useEffect, useRef, useState } from 'react';
import { usePrefs, type Lang, type Theme } from './prefs';

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className='mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50'>{label}</p>
      <div className='grid grid-cols-2 gap-1 rounded-full border border-white/10 p-1' role='radiogroup' aria-label={label}>
        {options.map((o) => {
          const on = o.id === value;
          return (
            <button
              key={o.id}
              type='button'
              role='radio'
              aria-checked={on}
              onClick={() => onChange(o.id)}
              className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                on ? 'bg-[#e1f56e] text-[#0b0c0a]' : 'text-white/70 hover:text-white'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SettingsPanel() {
  const { theme, setTheme, lang, setLang, t } = usePrefs();
  return (
    <div className='space-y-5'>
      <Segmented<Theme>
        label={t('Tema', 'Theme')}
        value={theme}
        onChange={setTheme}
        options={[
          { id: 'dark', label: t('Oscuro', 'Dark') },
          { id: 'light', label: t('Claro', 'Light') },
        ]}
      />
      <Segmented<Lang>
        label={t('Idioma', 'Language')}
        value={lang}
        onChange={setLang}
        options={[
          { id: 'es', label: 'Español' },
          { id: 'en', label: 'English' },
        ]}
      />
    </div>
  );
}

export default function SettingsMenu() {
  const { t } = usePrefs();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className='relative'>
      <button
        type='button'
        aria-label={t('Configuración', 'Settings')}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className='flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[#e1f56e] hover:text-[#e1f56e]'
      >
        <svg viewBox='0 0 24 24' className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-90' : ''}`} fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
          <path d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
          <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z' />
        </svg>
      </button>
      {open ? (
        <div className='rd-settings absolute right-0 top-full z-50 mt-3 w-[260px] rounded-2xl border border-white/10 bg-[#121311] p-5 shadow-2xl'>
          <p className='mb-4 text-sm font-extrabold uppercase tracking-wide text-white'>{t('Configuración', 'Settings')}</p>
          <SettingsPanel />
        </div>
      ) : null}
    </div>
  );
}
