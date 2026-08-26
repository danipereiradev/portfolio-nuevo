import { useEffect } from 'react';
import {
  PAYMENT_ROBOTS,
  PAYMENT_SUCCESS_PATH,
} from '../config/payments';

const SITE_URL = 'https://36web.es';

const PagoGracias = () => {
  useEffect(() => {
    const title = 'Pago recibido | 36web';
    const description = 'Gracias. Hemos recibido tu pago.';
    const canonicalUrl = `${SITE_URL}${PAYMENT_SUCCESS_PATH}`;

    document.title = title;

    const setMeta = (
      attr: 'name' | 'property',
      key: string,
      content: string,
    ) => {
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      );
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'robots', PAYMENT_ROBOTS);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    return () => {
      document.querySelector('meta[name="robots"]')?.remove();
    };
  }, []);

  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-4 text-center text-[#101010]'>
      <div>
        <h1
          className='text-2xl font-bold md:text-3xl'
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Pago recibido
        </h1>
        <p className='mt-4 text-base leading-relaxed text-[#4d4d4c]'>
          Gracias. Hemos recibido tu pago.
        </p>
      </div>
    </main>
  );
};

export default PagoGracias;
