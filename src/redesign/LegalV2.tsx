import LegalPages, { LegalPageId } from '../components/LegalPages';
import { usePageMeta } from '../hooks/usePageMeta';
import { CONTACT_EMAIL, CONTACT_PATH } from '../config/contact';
import { SpanishOnlyNotice, usePrefs } from './prefs';
import BgDigit from './BgDigit';

const DOCS_EN: Record<string, { label: string; title: [string, string] }> = {
  privacy: { label: 'Privacy policy', title: ['PRIVACY', 'POLICY.'] },
  terms: { label: 'Terms and conditions', title: ['TERMS AND', 'CONDITIONS.'] },
  cookies: { label: 'Cookie policy', title: ['COOKIE', 'POLICY.'] },
  legal: { label: 'Legal notice', title: ['LEGAL', 'NOTICE.'] },
};

const DOCS: { id: LegalPageId; href: string; label: string; title: [string, string] }[] = [
  { id: 'privacy', href: '/politica-de-privacidad', label: 'Política de privacidad', title: ['POLÍTICA DE', 'PRIVACIDAD.'] },
  { id: 'terms', href: '/terminos-y-condiciones', label: 'Términos y condiciones', title: ['TÉRMINOS Y', 'CONDICIONES.'] },
  { id: 'cookies', href: '/politica-de-cookies', label: 'Política de cookies', title: ['POLÍTICA DE', 'COOKIES.'] },
  { id: 'legal', href: '/aviso-legal', label: 'Aviso legal', title: ['AVISO', 'LEGAL.'] },
];

export default function LegalV2({ page, path }: { page: LegalPageId; path: string }) {
  usePageMeta(path);
  const { t, lang } = usePrefs();
  const L = (d: (typeof DOCS)[number]) => (lang === 'en' ? { ...d, ...DOCS_EN[d.id] } : d);
  const doc = L(DOCS.find((d) => d.id === page) ?? DOCS[0]);

  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)] isolate'>
        <BgDigit d='6' side='right' />
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-20 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end'>
          <div>
            <p className='rd-eyebrow mb-6'>00 — Legal · {doc.label}</p>
            <h1 className='rd-h1'>
              {doc.title[0]}
              <br />
              <span className='rd-mark'>{doc.title[1]}</span>
            </h1>
          </div>
          <p className='text-lg leading-relaxed text-white/65'>
            {t('Lo importante, claro y sin letra pequeña. Si tienes cualquier duda sobre este texto, escríbenos a', 'The essentials, clearly and without small print. If you have any questions about this text, write to us at')}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className='text-[#e1f56e] underline underline-offset-4'>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>

      <section className='rd-light'>
        <div className='mx-auto grid max-w-[1320px] gap-12 px-5 py-20 md:px-8 lg:grid-cols-[260px_1fr]'>
          <aside className='lg:sticky lg:top-28 lg:self-start'>
            <p className='rd-eyebrow mb-4'>{t('Documentos', 'Documents')}</p>
            <ul className='divide-y divide-white/10 border-y border-white/10'>
              {DOCS.map(L).map((d) => (
                <li key={d.id}>
                  <a
                    href={d.href}
                    aria-current={d.id === page ? 'page' : undefined}
                    className={`flex items-center justify-between py-3.5 text-sm font-semibold ${
                      d.id === page ? 'text-[#141414]' : 'text-white/55 hover:text-[#141414]'
                    }`}
                  >
                    {d.label}
                    <span className={d.id === page ? 'text-[#3346c1]' : 'text-white/30'}>→</span>
                  </a>
                </li>
              ))}
            </ul>
            <a href={CONTACT_PATH} className='rd-btn mt-8 w-full justify-center'>
              {t('Contactar', 'Contact us')} →
            </a>
          </aside>

          <article className='rd-legal rounded-[1.5rem] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-12'>
            <LegalPages page={page} bare />
          </article>
        </div>
      </section>
      <SpanishOnlyNotice message='The full legal text is available in Spanish only.' />
    </main>
  );
}
