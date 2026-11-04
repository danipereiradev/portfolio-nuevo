import { SERVICES } from './services';
import { Logo36 } from './SiteHeader';
import {
  ABOUT_PATH,
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
  { href: '/politica-de-privacidad', label: 'Privacidad' },
  { href: '/terminos-y-condiciones', label: 'Términos' },
  { href: '/politica-de-cookies', label: 'Cookies' },
  { href: '/aviso-legal', label: 'Aviso legal' },
];

const COMPANY = [
  { href: ABOUT_PATH, label: 'Sobre 36web' },
  { href: PORTFOLIO_PATH, label: 'Casos de éxito' },
  { href: BLOG_PATH, label: 'Blog' },
  { href: TALENT_PATH, label: 'Trabaja con nosotros' },
  { href: CONTACT_PATH, label: 'Contacto' },
];

export default function SiteFooter() {
  return (
    <footer className='rd relative overflow-hidden border-t border-white/10 bg-[#0b0c0a] text-white'>
      <div className='mx-auto max-w-[1320px] px-5 pb-10 pt-20 md:px-8'>
        <div className='flex flex-col gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <p className='rd-eyebrow mb-5'>// let&apos;s build</p>
            <h2 className='rd-h2 max-w-[14ch]'>
              ¿TIENES UN <span className='rd-mark'>PROYECTO</span> <span className='text-[#e1f56e]'>EN MENTE?</span>
            </h2>
          </div>
          <div className='flex flex-wrap gap-3'>
            <a href={CONTACT_PATH} className='rd-btn'>Hablemos ↗</a>
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
              Web, tiendas online, posicionamiento y redes para negocios que quieren crecer sin tener que entender de tecnología.
            </p>
          </div>
          <div>
            <p className='rd-eyebrow mb-4'>Servicios</p>
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
                  <a href={l.href} className='rd-footlink'>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='rd-eyebrow mb-4'>Contacto</p>
            <ul className='space-y-2.5 text-sm text-white/70'>
              <li><a href={PHONE_TEL_LINK} className='rd-footlink'>{PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className='rd-footlink'>{CONTACT_EMAIL}</a></li>
              <li><a href={INSTAGRAM_URL} target='_blank' rel='noopener noreferrer' className='rd-footlink'>Instagram</a></li>
              <li className='pt-2 text-white/45'>{BUSINESS_ADDRESS}</li>
              <li className='text-white/45'>L-V {BUSINESS_HOURS.replace('L-V de ', '')}</li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between'>
          <p>© {new Date().getFullYear()} 36web</p>
          <ul className='flex flex-wrap gap-5'>
            {LEGAL.map((l) => (
              <li key={l.href}><a href={l.href} className='hover:text-white'>{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
