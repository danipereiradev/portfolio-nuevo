import { useLocation } from 'react-router-dom';
import { SERVICE_NAV } from '../config/nav';
import { isAdsLandingPath } from '../config/contact';

const labels: Record<string, string> = {
  ...Object.fromEntries(SERVICE_NAV.map(({ href, label }) => [href, label])),
  '/portfolio': 'Portfolio',
  '/contacto': 'Contacto',
  '/sobre-36web': 'Nuestra agencia',
  '/blog': 'Blog',
  '/trabaja-con-nosotros': 'Trabaja con nosotros',
  '/condiciones-del-proyecto': 'Condiciones del proyecto',
  '/politica-de-privacidad': 'Política de privacidad',
  '/terminos-y-condiciones': 'Términos y condiciones',
  '/politica-de-cookies': 'Cookies',
  '/aviso-legal': 'Aviso legal',
};

const HERO_BREADCRUMB_PATHS = new Set(SERVICE_NAV.map(({ href }) => href));

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '');
  if (isAdsLandingPath(pathname) || HERO_BREADCRUMB_PATHS.has(path)) return null;
  const label = labels[path];
  if (!label) return null;
  return (
    <>
      <div className='h-12 md:hidden' aria-hidden='true' />
      <nav
        aria-label='Migas de pan'
        className='absolute inset-x-0 top-[6.5rem] z-10 mx-auto mb-4 w-[95%] max-w-page px-page-x text-center text-sm text-ink-dark md:mb-0 md:text-left'
      >
        <ol className='mb-4 flex flex-wrap items-center justify-center gap-2 md:mb-0 md:justify-start'>
          <li>
            <a
              href='/'
              className='underline underline-offset-4 hover:text-accent'
            >
              Inicio
            </a>
          </li>
          <li aria-hidden='true'>/</li>
          <li aria-current='page'>{label}</li>
        </ol>
      </nav>
    </>
  );
}
