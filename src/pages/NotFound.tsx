import { useEffect } from 'react';
import { Home as HomeIcon, MessageCircle } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  useEffect(() => {
    const title = 'Página no encontrada (404) | PereiraWeb';
    const description =
      'La página que buscas no existe o se ha movido. Vuelve al inicio o revisa nuestros servicios de desarrollo web.';

    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    let robotsMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, follow');

    // Una 404 no debe llevar canonical: no es una URL final indexable.
    document.querySelector('link[rel="canonical"]')?.remove();

    // Evita dejar metadata social de la página anterior en una 404.
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.remove();
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', description);

    return () => {
      robotsMeta?.remove();
    };
  }, []);

  return (
    <section className='min-h-[70vh] flex items-center justify-center px-6 py-24 text-center content-container'>
      <div className='max-w-lg mx-auto'>
        <p className='text-accent font-bold text-lg mb-2'>Error 404</p>
        <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mb-4'>
          Esta página no existe
        </h1>
        <p className='text-gray-600 mb-8'>
          Puede que el enlace esté roto o que la página se haya movido.
          Prueba a volver al inicio o pide presupuesto para tu proyecto.
        </p>
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button to='/' variant='primary'>
            <HomeIcon className='w-4 h-4' />
            Volver al inicio
          </Button>
          <Button to='/web-autonomos-pymes' variant='ghost'>
            <MessageCircle className='w-4 h-4' />
            Solicitar propuesta
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
