import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  CONTACT_EMAIL,
  CONTACT_PATH,
  CONTACT_PAGE_WHATSAPP_MESSAGE,
  FORM_CC_EMAIL,
  FORM_THANKS_PATH,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  buildWhatsAppUrl,
} from '../config/contact';
import {
  trackEmailClick,
  trackFormError,
  trackFormStart,
  trackFormSubmit,
  trackGa4FormSubmit,
  trackGoogleAdsFormConversion,
  trackPhoneClick,
  trackWhatsAppClick,
  unlockGoogleAdsFormConversion,
} from '../utils/analytics';
import { usePrefs } from './prefs';
import { useServices } from './i18n/content';
import BgDigit from './BgDigit';

const FORM_ORIGIN = 'Página de contacto';

type Form = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  web: string;
  consent: boolean;
};
const empty: Form = { name: '', email: '', company: '', phone: '', service: '', message: '', web: '', consent: false };

const field =
  'w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-base text-white placeholder:text-white/30 focus:border-[#e1f56e] focus:outline-none focus:ring-0';
const label = 'rd-eyebrow !text-white/50';

export default function ContactV2() {
  const { t } = usePrefs();
  const { all: ALL_SERVICES } = useServices();
  const OPTIONS = [...ALL_SERVICES.map((s) => s.name), t('No sé cuál necesito', 'I’m not sure yet')];
  usePageMeta(CONTACT_PATH);
  const navigate = useNavigate();
  const [f, setF] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const started = useRef(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    if (!started.current) {
      started.current = true;
      trackFormStart(FORM_ORIGIN);
    }
    setF((p) => ({ ...p, [k]: v }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = t('Dinos tu nombre', 'Tell us your name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = t('Introduce un email válido', 'Enter a valid email');
    if (f.phone.replace(/\D/g, '').length < 9) e.phone = t('Introduce un teléfono válido', 'Enter a valid phone number');
    if (!f.service) e.service = t('Elige un área', 'Choose an area');
    if (f.message.trim().length < 10) e.message = t('Cuéntanos un poco más', 'Tell us a bit more');
    if (!f.consent) e.consent = t('Acepta la política de privacidad', 'Please accept the privacy policy');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (sending) return;
    if (!validate()) {
      trackFormError('validation_error');
      return;
    }
    unlockGoogleAdsFormConversion();
    setSending(true);
    setFailed(false);
    const pagina = window.location.pathname;
    const fecha = new Date().toLocaleString('es-ES');
    try {
      const res = await fetch('https://formspree.io/f/movlevkj', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          phone: f.phone,
          company: f.company,
          web: f.web,
          service: f.service,
          origen: FORM_ORIGIN,
          page: FORM_ORIGIN,
          pagina,
          consent: f.consent,
          submissionDate: fecha,
          _subject: `[${FORM_ORIGIN}] ${f.service} — ${f.name}`,
          _replyto: f.email.trim(),
          _cc: FORM_CC_EMAIL,
          message: `Origen: ${FORM_ORIGIN}\nPágina: ${pagina}\nNombre: ${f.name}\nEmpresa: ${f.company}\nEmail: ${f.email}\nTeléfono: ${f.phone}\nWeb: ${f.web}\nServicio: ${f.service}\n\nMensaje:\n${f.message}\n\nconsent: ${f.consent}\nFecha: ${fecha}`,
        }),
      });
      const out = await res.json().catch(() => null);
      if (!res.ok || !out || out.ok !== true) throw new Error(`Error ${res.status}`);
      trackFormSubmit(FORM_ORIGIN);
      trackGa4FormSubmit(FORM_ORIGIN);
      void trackGoogleAdsFormConversion({ email: f.email, phone: f.phone });
      navigate(FORM_THANKS_PATH);
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      setFailed(true);
      trackFormError('submit_error');
    } finally {
      setSending(false);
    }
  };

  const err = (k: string) => (errors[k] ? <p className='mt-2 text-xs text-[#ff8a7a]'>{errors[k]}</p> : null);
  const wa = buildWhatsAppUrl(CONTACT_PAGE_WHATSAPP_MESSAGE);

  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)] isolate'>
        <BgDigit d='6' side='left' />
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-20 pt-16 md:px-8 lg:grid-cols-[1.4fr_1fr]'>
          <div>
            <p className='rd-eyebrow mb-6'>{t('Contacto — Hablemos', 'Contact — Let’s talk')}</p>
            <h1 className='rd-h1'>
              {t('¿Qué le falta', 'What is your')}
              <br />
              {t('a tu', '')} <span className='rd-mark'>{t('negocio', 'business')}</span>
              <span className='text-[#e1f56e]'>{t('?', ' missing?')}</span>
            </h1>
            <p className='mt-7 max-w-lg text-lg text-white/65'>
              {t('Cuéntanos qué quieres conseguir, dónde estás ahora y qué te frena. Te respondemos el mismo día con próximos pasos claros. Sin compromiso.', 'Tell us what you want to achieve, where you are now and what’s holding you back. We reply the same day with clear next steps. No strings attached.')}
            </p>
          </div>
          <div className='relative mx-auto hidden aspect-square w-full max-w-[340px] lg:block' aria-hidden='true'>
            <div className='absolute inset-0 rounded-full border border-dashed border-white/15' />
            <div className='absolute inset-[18%] rounded-full border border-white/10' />
            <div className='absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(51,70,193,0.4),transparent_62%)]' />
            <div className='rd-float absolute inset-[34%] flex flex-col items-center justify-center rounded-full bg-[#e1f56e] text-[#0b0c0a]'>
              <span className='font-mono text-[10px] uppercase tracking-[0.2em]'>// let&apos;s</span>
              <span className='text-2xl font-black uppercase'>build</span>
            </div>
          </div>
        </div>
      </section>

      <section className='rd-light relative isolate overflow-hidden'>
        <BgDigit d='3' side='right' />
        <div className='mx-auto grid max-w-[1320px] gap-14 px-5 py-20 md:px-8 lg:grid-cols-[0.8fr_1.2fr]'>
          <aside>
            <p className='rd-eyebrow mb-6'>{t('Canales directos', 'Direct channels')}</p>
            <ul className='divide-y divide-white/10 border-y border-white/10'>
              <li>
                <a href={wa} target='_blank' rel='noopener noreferrer' onClick={() => trackWhatsAppClick('ContactPage')} className='group flex items-center justify-between py-5'>
                  <span><span className={label}>WhatsApp</span><span className='mt-1 block text-xl font-bold'>{PHONE_DISPLAY}</span></span>
                  <span className='text-white/30 group-hover:text-[#e1f56e]'>↗</span>
                </a>
              </li>
              <li>
                <a href={PHONE_TEL_LINK} onClick={() => trackPhoneClick('ContactPage')} className='group flex items-center justify-between py-5'>
                  <span><span className={label}>{t('Teléfono', 'Phone')}</span><span className='mt-1 block text-xl font-bold'>{PHONE_DISPLAY}</span></span>
                  <span className='text-white/30 group-hover:text-[#e1f56e]'>↗</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => trackEmailClick('ContactPage')} className='group flex items-center justify-between py-5'>
                  <span><span className={label}>Email</span><span className='mt-1 block text-xl font-bold'>{CONTACT_EMAIL}</span></span>
                  <span className='text-white/30 group-hover:text-[#e1f56e]'>↗</span>
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target='_blank' rel='noopener noreferrer' className='group flex items-center justify-between py-5'>
                  <span><span className={label}>Instagram</span><span className='mt-1 block text-xl font-bold'>@36web.es</span></span>
                  <span className='text-white/30 group-hover:text-[#e1f56e]'>↗</span>
                </a>
              </li>
            </ul>
            <div className='mt-8 space-y-1 text-sm text-white/45'>
              <p>{BUSINESS_ADDRESS}</p>
              <p>{t(BUSINESS_HOURS, 'Mon–Fri, 9:00–20:00')}</p>
            </div>
          </aside>

          <form onSubmit={submit} noValidate className='rd-card !transform-none p-7 md:p-10'>
            <p className='rd-eyebrow mb-8'>{t('Tu proyecto', 'Your project')}</p>
            <div className='grid gap-x-8 gap-y-7 md:grid-cols-2'>
              <div>
                <label htmlFor='c-name' className={label}>{t('Nombre', 'Name')}</label>
                <input id='c-name' className={field} placeholder={t('Tu nombre', 'Your name')} value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete='name' />
                {err('name')}
              </div>
              <div>
                <label htmlFor='c-company' className={label}>{t('Empresa (opcional)', 'Company (optional)')}</label>
                <input id='c-company' className={field} placeholder={t('¿Desde qué negocio nos escribes?', 'Which business are you writing from?')} value={f.company} onChange={(e) => set('company', e.target.value)} autoComplete='organization' />
              </div>
              <div>
                <label htmlFor='c-email' className={label}>Email</label>
                <input id='c-email' type='email' className={field} placeholder={t('tu@negocio.com', 'you@business.com')} value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete='email' />
                {err('email')}
              </div>
              <div>
                <label htmlFor='c-phone' className={label}>{t('Teléfono', 'Phone')}</label>
                <input id='c-phone' type='tel' className={field} placeholder={t('Para llamarte si lo prefieres', 'So we can call you if you prefer')} value={f.phone} onChange={(e) => set('phone', e.target.value)} autoComplete='tel' />
                {err('phone')}
              </div>
              <div>
                <label htmlFor='c-service' className={label}>{t('¿Qué necesitas?', 'What do you need?')}</label>
                <select id='c-service' className={`${field} [&>option]:text-[#141414]`} value={f.service} onChange={(e) => set('service', e.target.value)}>
                  <option value=''>{t('Elige un área', 'Choose an area')}</option>
                  {OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                {err('service')}
              </div>
              <div>
                <label htmlFor='c-web' className={label}>{t('Tu web (opcional)', 'Your website (optional)')}</label>
                <input id='c-web' className={field} placeholder={t('tunegocio.es', 'yourbusiness.com')} value={f.web} onChange={(e) => set('web', e.target.value)} autoComplete='url' />
              </div>
              <div className='md:col-span-2'>
                <label htmlFor='c-msg' className={label}>{t('Cuéntanos', 'Tell us more')}</label>
                <textarea id='c-msg' rows={4} className={`${field} resize-none`} placeholder={t('Qué quieres conseguir, qué tienes ahora y qué te frena.', 'What you want to achieve, what you have now and what’s holding you back.')} value={f.message} onChange={(e) => set('message', e.target.value)} maxLength={1000} />
                {err('message')}
              </div>
            </div>
            <label className='mt-8 flex cursor-pointer items-start gap-3 text-sm text-white/60'>
              <input type='checkbox' checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className='mt-0.5 h-4 w-4 rounded border-white/30 bg-transparent accent-[#e1f56e]' />
              <span>
                {t('He leído y acepto la', 'I have read and accept the')} <a href='/politica-de-privacidad' className='underline hover:text-[#e1f56e]'>{t('política de privacidad', 'privacy policy')}</a>.
              </span>
            </label>
            {err('consent')}
            {failed ? <p className='mt-6 text-sm text-[#ff8a7a]'>{t('No se ha podido enviar. Prueba otra vez o escríbenos por WhatsApp.', 'We couldn’t send your message. Please try again or message us on WhatsApp.')}</p> : null}
            <button type='submit' disabled={sending} className='rd-btn mt-8 disabled:opacity-60'>
              {sending ? t('Enviando…', 'Sending…') : t('Enviar ↗', 'Send ↗')}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
