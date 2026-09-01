import { useEffect } from 'react';
import {
  PAYMENT_ROBOTS,
  THANK_YOU_PAGES,
  type ThankYouVariant,
} from '../config/payments';
import { trackLaunchReserveThankYou } from '../utils/analytics';

const SITE_URL = 'https://36web.es';

const PagoGracias = ({
  variant = 'default',
}: {
  variant?: ThankYouVariant;
}) => {
  const copy = THANK_YOU_PAGES[variant];

  useEffect(() => {
    const description = `${copy.heading}. ${copy.body}`;
    const canonicalUrl = `${SITE_URL}${copy.path}`;

    document.title = copy.title;

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
    setMeta('property', 'og:title', copy.title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:title', copy.title);
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

    if (variant === 'web-299') {
      trackLaunchReserveThankYou();
    }

    return () => {
      document.querySelector('meta[name="robots"]')?.remove();
    };
  }, [copy.body, copy.heading, copy.path, copy.title, variant]);

  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-4 text-center text-[#101010]'>
      <div>
        <h1
          className='text-2xl font-bold md:text-3xl'
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {copy.heading}
        </h1>
        <p className='mt-4 text-base leading-relaxed text-[#4d4d4c]'>
          {copy.body}
        </p>
      </div>
    </main>
  );
};

export default PagoGracias;
