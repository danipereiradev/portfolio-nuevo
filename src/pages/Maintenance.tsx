import { useEffect } from 'react';

const Maintenance = () => {
  useEffect(() => {
    const title = 'Web en mantenimiento | 36web';
    const description = 'Estamos actualizando la web. Volvemos en un rato.';

    document.title = title;

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);

    let robotsMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description);

    return () => {
      robotsMeta?.remove();
    };
  }, []);

  return (
    <main className='flex min-h-screen items-center justify-center bg-ink-dark px-page-x py-page-y'>
      <div className='flex max-w-lg flex-col gap-page-gap'>
        <p
          className='flex items-center text-xl font-extrabold md:text-2xl'
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className='font-mono text-brand-light'>&gt;</span>
          <span className='ml-1 font-mono tracking-tight text-white'>
            36web
          </span>
          <span className='font-mono font-normal text-ink-light'> .es</span>
          <span className='ml-0 animate-pulse font-mono text-brand'>_</span>
        </p>

        <span className='block h-1 w-10 bg-brand' />

        <div className='flex flex-col gap-title-gap'>
          <h1 className='text-3xl font-extrabold text-white md:text-5xl'>
            Estamos actualizando la web
          </h1>
        </div>
      </div>
    </main>
  );
};

export default Maintenance;
