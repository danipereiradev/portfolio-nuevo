import { usePrefs } from './prefs';
import { useServices } from './i18n/content';
import { LOCAL_WEB_LISTED_CITIES } from '../data/localWebCities';
import { localWebCityHref } from '../config/contact';
import { CASES_PATH } from './cases';
import { Logo36 } from './SiteHeader';
import {
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  CONTACT_EMAIL,
  CONTACT_PATH,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  PORTFOLIO_PATH,
  TALENT_PATH,
  buildWhatsAppUrl,
} from '../config/contact';
import { BLOG_PATH } from '../blog/posts';

const LEGAL = [
  { href: '/politica-de-privacidad', label: ['Privacidad', 'Privacy'] },
  { href: '/terminos-y-condiciones', label: ['Términos', 'Terms'] },
  { href: '/politica-de-cookies', label: ['Cookies', 'Cookies'] },
  { href: '/aviso-legal', label: ['Aviso legal', 'Legal notice'] },
];

const COMPANY = [
  { href: CASES_PATH, label: ['Casos de éxito', 'Case studies'] },
  { href: PORTFOLIO_PATH, label: ['Portfolio', 'Portfolio'] },
  { href: BLOG_PATH, label: ['36Blog', '36Blog'] },
  { href: TALENT_PATH, label: ['Trabaja con nosotros', 'Careers'] },
  { href: CONTACT_PATH, label: ['Contacto', 'Contact'] },
];

export default function SiteFooter() {
  const { t } = usePrefs();
  const { services, extra } = useServices();
  const SERVICES = [...services, ...extra];
  return (
    <footer className='rd relative isolate overflow-hidden border-t border-white/10 bg-[#0b0c0a] text-white'>
      <span aria-hidden='true' className='rd-bgword'>36WEB</span>
      <div className='mx-auto max-w-[1320px] px-5 pb-10 pt-20 md:px-8'>
        <div className='flex flex-col gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <p className='rd-eyebrow mb-5'>{t('// a construir', "// let's build")}</p>
            <h2 className='rd-h2 max-w-[14ch]'>
              {t('¿TIENES UN', 'GOT A')} <span className='rd-mark'>{t('PROYECTO', 'PROJECT')}</span> <span className='text-[#e1f56e]'>{t('EN MENTE?', 'IN MIND?')}</span>
            </h2>
          </div>
          <div className='flex flex-wrap gap-3'>
            <a href={CONTACT_PATH} className='rd-btn'>{t('Cuéntanos', 'Tell us')} ↗</a>
            <a href={buildWhatsAppUrl()} target='_blank' rel='noopener noreferrer' className='rd-btn-ghost'>
              WhatsApp {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className='grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <a href='/' className='mb-5 flex items-center gap-3'>
              <Logo36 />
              <span className='text-xl font-extrabold'>36WEB<span className='text-[#e1f56e]'>.</span></span>
            </a>
            <p className='max-w-xs text-sm leading-relaxed text-white/55'>
              {t('Web, tiendas online, posicionamiento y redes para negocios que quieren crecer sin tener que entender de tecnología.', 'Websites, online stores, SEO and social media for businesses that want to grow without having to understand technology.')}
            </p>
          </div>
          <div>
            <p className='rd-eyebrow mb-4'>{t('Servicios', 'Services')}</p>
            <ul className='space-y-2.5'>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a href={s.href} className='rd-footlink'>{s.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='rd-eyebrow mb-4'>36web</p>
            <ul className='space-y-2.5'>
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className='rd-footlink'>{t(l.label[0], l.label[1])}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='rd-eyebrow mb-4'>{t('Contacto', 'Contact')}</p>
            <ul className='space-y-2.5 text-sm text-white/70'>
              <li><a href={PHONE_TEL_LINK} className='rd-footlink'>{PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className='rd-footlink'>{CONTACT_EMAIL}</a></li>
              <li><a href={INSTAGRAM_URL} target='_blank' rel='noopener noreferrer' className='rd-footlink'>Instagram</a></li>
              <li className='pt-2 text-white/45'>{BUSINESS_ADDRESS}</li>
              <li className='text-white/45'>{t('L-V', 'Mon–Fri')} {BUSINESS_HOURS.replace('L-V de ', '').replace(' a ', t(' a ', ' – '))}</li>
            </ul>
          </div>
        </div>

        {/* Zonas: enlaces internos a las páginas locales */}
        <nav aria-label={t('Diseño web por zonas', 'Web design by area')} className='flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-white/10 py-6'>
          <span className='rd-eyebrow'>{t('Zonas', 'Areas')}</span>
          {LOCAL_WEB_LISTED_CITIES.map((c) => (
            <a key={c.slug} href={localWebCityHref(c.slug)} className='rd-footlink !text-xs'>
              {t(`Diseño web en ${c.ciudad}`, `Web design in ${c.ciudad}`)}
            </a>
          ))}
        </nav>

        <div className='flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between'>
          <p>© {new Date().getFullYear()} 36web</p>
          <ul className='flex flex-wrap gap-5'>
            {LEGAL.map((l) => (
              <li key={l.href}><a href={l.href} className='hover:text-white'>{t(l.label[0], l.label[1])}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
