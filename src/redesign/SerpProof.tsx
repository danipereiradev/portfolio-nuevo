import { useEffect, useState } from 'react';
import { usePrefs } from './prefs';

export type Serp = {
  /** Búsquedas reales en las que el cliente sale el primero (en minúsculas, como se escriben) */
  queries: string[];
  /** Dominio que se muestra en el resultado */
  domain: string;
  /** Titular del resultado, como aparece en Google */
  resultTitle: string;
  /** Mes en el que se comprobó la posición, p. ej. 'noviembre 2026' / 'November 2026' */
  checked: [string, string];
};

const TYPE_MS = 55;
const HOLD_MS = 2200;

/**
 * Prueba visual de posicionamiento: un buscador que escribe las búsquedas del
 * cliente y lo muestra en primera posición. Sin animación si el usuario lo pide.
 */
export default function SerpProof({ serp, name }: { serp: Serp; name: string }) {
  const { t } = usePrefs();
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState(serp.queries[0]);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const q = serp.queries[qi];
    if (reduce) {
      setTyped(q);
      const id = window.setTimeout(() => setQi((i) => (i + 1) % serp.queries.length), HOLD_MS + 800);
      return () => window.clearTimeout(id);
    }
    let n = 0;
    setTyped('');
    let hold: number | undefined;
    const id = window.setInterval(() => {
      n += 1;
      setTyped(q.slice(0, n));
      if (n >= q.length) {
        window.clearInterval(id);
        hold = window.setTimeout(() => setQi((i) => (i + 1) % serp.queries.length), HOLD_MS);
      }
    }, TYPE_MS);
    return () => {
      window.clearInterval(id);
      if (hold) window.clearTimeout(hold);
    };
  }, [qi, serp.queries]);

  const done = typed === serp.queries[qi];

  return (
    <div className='grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#121311] lg:grid-cols-[1.35fr_1fr]'>
      {/* Buscador */}
      <div className='relative p-6 md:p-10'>
        <div className='rd-grid-bg pointer-events-none absolute inset-0 opacity-60' />
        <div className='relative'>
          <p className='font-mono text-[10px] uppercase tracking-[0.22em] text-white/45'>
            {t('Google · búsqueda orgánica', 'Google · organic search')}
          </p>

          <div className='mt-5 flex items-center gap-3 rounded-full border border-white/15 bg-[#0b0c0a] px-5 py-4'>
            <svg viewBox='0 0 24 24' className='h-4 w-4 shrink-0 text-white/40' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
              <circle cx='11' cy='11' r='7' />
              <path d='m20 20-3.5-3.5' />
            </svg>
            <span className='min-w-0 flex-1 truncate font-mono text-sm text-white md:text-base' aria-live='polite'>
              {typed}
              <span className='rd-caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-[#e1f56e]' aria-hidden='true' />
            </span>
          </div>

          <ol className='mt-6 space-y-3'>
            <li
              className={`flex gap-4 rounded-2xl border p-4 transition-all duration-500 ${
                done ? 'border-[#e1f56e] bg-[#e1f56e] text-[#0b0c0a]' : 'border-white/10 bg-white/[0.04]'
              }`}
            >
              <span className={`font-mono text-xs font-bold ${done ? 'text-[#0b0c0a]' : 'text-white/40'}`}>01</span>
              <div className='min-w-0'>
                <p className={`truncate font-mono text-[11px] ${done ? 'text-[#0b0c0a]/65' : 'text-white/45'}`}>{serp.domain}</p>
                <p className={`mt-1 truncate font-bold ${done ? 'text-[#0b0c0a]' : 'text-white/80'}`}>{serp.resultTitle}</p>
              </div>
            </li>
            {[0.75, 0.6].map((w, i) => (
              <li key={w} className='flex gap-4 rounded-2xl border border-white/10 p-4' aria-hidden='true'>
                <span className='font-mono text-xs text-white/30'>0{i + 2}</span>
                <div className='flex-1 space-y-2 pt-0.5'>
                  <span className='block h-2 w-1/3 rounded-full bg-white/10' />
                  <span className='block h-2.5 rounded-full bg-white/10' style={{ width: `${w * 100}%` }} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Resultado */}
      <div className='flex flex-col justify-between gap-10 border-t border-white/10 p-6 md:p-10 lg:border-l lg:border-t-0'>
        <div>
          <p className='font-mono text-[10px] uppercase tracking-[0.22em] text-white/45'>{t('Posición', 'Position')}</p>
          <p className='mt-3 text-[clamp(4.5rem,11vw,8rem)] font-black leading-none tracking-tight'>
            <span className='rd-mark px-3'>Nº1</span>
          </p>
          <p className='mt-6 text-lg leading-relaxed text-white/65'>
            {t(
              `${name} sale el primero en Google en estas búsquedas:`,
              `${name} ranks first on Google for these searches:`,
            )}
          </p>
        </div>

        <ul className='flex flex-wrap gap-2'>
          {serp.queries.map((q, i) => (
            <li key={q}>
              <button
                type='button'
                onClick={() => setQi(i)}
                className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
                  i === qi
                    ? 'border-[#e1f56e] bg-[#e1f56e] text-[#0b0c0a]'
                    : 'border-white/15 text-white/60 hover:border-[#e1f56e] hover:text-[#e1f56e]'
                }`}
              >
                {q}
              </button>
            </li>
          ))}
        </ul>

        <p className='font-mono text-[10px] uppercase tracking-[0.18em] text-white/35'>
          {t(`Comprobado en ${serp.checked[0]}`, `Checked in ${serp.checked[1]}`)}
        </p>
      </div>
    </div>
  );
}
