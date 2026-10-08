import { useLocation } from 'react-router-dom';
import { SERVICE_NAV } from '../config/nav';

const labels: Record<string, string> = {
  ...Object.fromEntries(SERVICE_NAV.map(({ href, label }) => [href, label])),
  '/portfolio': 'Portfolio',
  '/sobre-36web': 'Nuestra agencia',
  '/blog': 'Blog',
  '/trabaja-con-nosotros': 'Trabaja con nosotros',
  '/landing-web-profesional': 'Web profesional',
  '/landing-web-a-medida': 'Web a medida',
  '/landing-web-psicologos': 'Web para psicólogos',
  '/landing-web-profesional-inmobiliarias': 'Web para inmobiliarias',
  '/landing-mantenimiento-web': 'Mantenimiento web',
  '/condiciones-del-proyecto': 'Condiciones del proyecto',
  '/politica-de-privacidad': 'Política de privacidad',
  '/terminos-y-condiciones': 'Términos y condiciones',
  '/politica-de-cookies': 'Cookies',
  '/aviso-legal': 'Aviso legal',
};

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const label = labels[pathname.replace(/\/+$/, '')];
  if (!label) return null;
  return (
    <nav aria-label='Migas de pan' className='absolute inset-x-0 top-[6.5rem] z-10 mx-auto w-[95%] max-w-page px-page-x text-sm text-ink-dark'>
      <ol className='flex flex-wrap items-center gap-2'>
        <li><a href='/' className='underline underline-offset-4 hover:text-accent'>Inicio</a></li>
        <li aria-hidden='true'>/</li>
        <li aria-current='page'>{label}</li>
      </ol>
    </nav>
  );
}
