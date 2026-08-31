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
        <p className='flex items-baseline font-display text-[calc(1.25rem*1.15)] font-normal tracking-tight md:text-[calc(1.5rem*1.15)]'>
          <span className='text-accent'>&gt;&nbsp;</span>
          <span className='font-bold text-white'>36Web</span>
          <span className='text-ink-light'>.es</span>
          <span className='animate-pulse text-accent'>&nbsp;_</span>
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
