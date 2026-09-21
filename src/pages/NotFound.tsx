import { useEffect } from 'react';
import { SITE_WEB_LABEL, SITE_WEB_PATH } from '../config/contact';

/**
 * 404 de verdad: no redirige a otra página comercial.
 * En Netlify, `/diseno-web/{slug}/` de una ciudad no publicada se sirve
 * con HTTP 404 (`404.html`). En el cliente, las rutas desconocidas
 * (p. ej. `/diseno-web/sevilla`) renderizan este componente.
 */
const NotFound = () => {
  useEffect(() => {
    document.title = 'Página no encontrada | 36web';

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');

    document.querySelector('link[rel="canonical"]')?.remove();
  }, []);

  return (
    <section className='page-section pt-[calc(var(--site-header-h)+var(--page-hero-offset)+1rem)]'>
      <div className='container mx-auto max-w-3xl text-center'>
        <h1 className='text-3xl font-extrabold text-ink-dark md:text-5xl'>
          Página no encontrada
        </h1>
        <p className='mt-6 text-xl text-ink-dark md:text-2xl'>
          Esta URL no existe. Si buscabas diseño web, ve a la página de
          servicio.
        </p>
        <p className='mt-8 text-lg'>
          <a href='/' className='font-bold text-link underline'>
            Inicio
          </a>
          <span className='px-2 text-ink-medium'>·</span>
          <a href={SITE_WEB_PATH} className='font-bold text-link underline'>
            {SITE_WEB_LABEL}
          </a>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
